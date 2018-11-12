function mojparser(txt) {
    if (window.DOMParser) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(txt, "text/xml");
    }
    else // Internet Explorer
    {
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
    }
    return xmlDoc;
}

function nacitajxml(xmlDoc, app) {
    let objectStore = app.$store("model").get(0);     //TODO: ok ?
    let canvas = app.canvas;

    deleteall(app);
    var x_min = posunutie_suradnic;
    var y_min = posunutie_suradnic;

    var xmltransitions = xmlDoc.getElementsByTagName("transition");
    objectStore._transitions = new Array();

    for (var i = 0; i < xmltransitions.length; i++) {

        var xx = parseInt(xmltransitions[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
        var yy = parseInt(xmltransitions[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);

        if (xx < x_min) {
            x_min = xx;
        }

        if (yy < y_min) {
            y_min = yy;
        }
    }

    var xmlplaces = xmlDoc.getElementsByTagName("place");

    for (var i = 0; i < xmlplaces.length; i++) {

        var xx = parseInt(xmlplaces[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
        var yy = parseInt(xmlplaces[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);

        if (xx < x_min) {
            x_min = xx;
        }

        if (yy < y_min) {
            y_min = yy;
        }
    }

    var xmlarcs = xmlDoc.getElementsByTagName("arc");

    for (var i = 0; i < xmlarcs.length; i++) {
        if (xmlarcs[i].getElementsByTagName("breakPoint").length > 0) {
            var bodyxml = xmlarcs[i].getElementsByTagName("breakPoint");


            for (var j = 0; j < bodyxml.length; j++) {

                var xx = parseInt(bodyxml[j].getElementsByTagName("x")[0].childNodes[0].nodeValue)
                var yy = parseInt(bodyxml[j].getElementsByTagName("y")[0].childNodes[0].nodeValue);

                if (xx < x_min) {
                    x_min = xx;
                }

                if (yy < y_min) {
                    y_min = yy;
                }

            }
        }
    }


    var x_korekcia = 0;

    if (posunutie_suradnic > x_min) {
        x_korekcia = posunutie_suradnic - x_min;
    }

    var y_korekcia = 0;

    if (posunutie_suradnic > y_min) {
        y_korekcia = posunutie_suradnic - y_min;

    }
    for (var i = 0; i < xmltransitions.length; i++) {

        var xx = parseInt(xmltransitions[i].getElementsByTagName("x")[0].childNodes[0].nodeValue) + x_korekcia;
        var yy = parseInt(xmltransitions[i].getElementsByTagName("y")[0].childNodes[0].nodeValue) + y_korekcia;

        xx = korekcia_max_x(xx);
        yy = korekcia_max_y(yy);
        objectStore._transitions[i] = new Transition(xx, yy, canvas, app);


        objectStore._transitions[i].id = parseInt(xmltransitions[i].getElementsByTagName("id")[0].childNodes[0].nodeValue);

        if (id <= objectStore._transitions[i].id)
            id = objectStore._transitions[i].id;

        if (xmltransitions[i].getElementsByTagName("label").length > 0) {
            if (xmltransitions[i].getElementsByTagName("label")[0].childNodes.length != 0) {
                objectStore._transitions[i].label = xmltransitions[i].getElementsByTagName("label")[0].childNodes[0].nodeValue;
                objectStore._transitions[i].objektyelementu.meno.nodeValue = objectStore._transitions[i].label;
            }
        }
    }


    objectStore._places = new Array();

    for (var i = 0; i < xmlplaces.length; i++) {
        var xx = parseInt(xmlplaces[i].getElementsByTagName("x")[0].childNodes[0].nodeValue) + x_korekcia;
        var yy = parseInt(xmlplaces[i].getElementsByTagName("y")[0].childNodes[0].nodeValue) + y_korekcia;

        xx = korekcia_max_x(xx);
        yy = korekcia_max_y(yy);


        var isStatic = false;
        if (xmlplaces[i].getElementsByTagName("isStatic").length > 0) {
            if (xmlplaces[i].getElementsByTagName("isStatic")[0].childNodes.length != 0) {

                isStatic = (xmlplaces[i].getElementsByTagName("isStatic")[0].childNodes[0].nodeValue == "true");

            }
        }
        if (xmlplaces[i].getElementsByTagName("static").length > 0) {
            if (xmlplaces[i].getElementsByTagName("static")[0].childNodes.length != 0) {

                isStatic = (xmlplaces[i].getElementsByTagName("static")[0].childNodes[0].nodeValue == "true");

            }
        }

        objectStore._places[i] = new Place(xx, yy, isStatic, app, parseInt(xmlplaces[i].getElementsByTagName("id")[0].childNodes[0].nodeValue));

        if (id <= objectStore._places[i].id)
            id = objectStore._places[i].id;

        objectStore._places[i].marking = parseInt(xmlplaces[i].getElementsByTagName("tokens")[0].childNodes[0].nodeValue);


        Place.updatetokeny(objectStore._places[i]);
        if (xmlplaces[i].getElementsByTagName("label").length > 0) {
            if (xmlplaces[i].getElementsByTagName("label")[0].childNodes.length != 0) {
                objectStore._places[i].label = xmlplaces[i].getElementsByTagName("label")[0].childNodes[0].nodeValue;
                objectStore._places[i].objektymiesta.meno.nodeValue = objectStore._places[i].label;
            }
        }


    }


    objectStore._arcs = new Array();
    var source;
    var target;


    for (i = 0; i < xmlarcs.length; i++) {
        var ind = objectStore._arcs.length;
        var nasielsomsource = 0;
        for (var j = 0; j < objectStore._places.length; j++) {
            if (objectStore._places[j].id == xmlarcs[i].getElementsByTagName("sourceId")[0].childNodes[0].nodeValue) {

                source = objectStore._places[j];
                nasielsomsource = 1;
                break;
            }
        }
        if (nasielsomsource == 0) {
            for (var j = 0; j < objectStore._transitions.length; j++) {
                if (objectStore._transitions[j].id == xmlarcs[i].getElementsByTagName("sourceId")[0].childNodes[0].nodeValue) {

                    source = objectStore._transitions[j];
                    nasielsomsource = 2;
                    break;
                }
            }
        }


        if (nasielsomsource == 2) {
            for (var j = 0; j < objectStore._places.length; j++) {
                if (objectStore._places[j].id == xmlarcs[i].getElementsByTagName("destinationId")[0].childNodes[0].nodeValue) {

                    target = objectStore._places[j];
                    break;
                }
            }
        }
        if (nasielsomsource == 1) {
            for (var j = 0; j < objectStore._transitions.length; j++) {
                if (objectStore._transitions[j].id == xmlarcs[i].getElementsByTagName("destinationId")[0].childNodes[0].nodeValue) {

                    target = objectStore._transitions[j];
                    break;
                }
            }
        }


        var parsed_arc_type = "regular";

        if (xmlarcs[i].getElementsByTagName("type").length > 0) {
            if (xmlarcs[i].getElementsByTagName("type")[0].childNodes.length != 0)
                parsed_arc_type = xmlarcs[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
        }
        objectStore._arcs[ind] = new Arc(source, target, parsed_arc_type, app);


        if (xmlarcs[i].getElementsByTagName("id").length > 0) {
            objectStore._arcs[ind].id = parseInt(xmlarcs[i].getElementsByTagName("id")[0].childNodes[0].nodeValue);
        }


        if (id <= objectStore._arcs[i].id)
            id = objectStore._arcs[i].id;


        objectStore._arcs[ind].vaha = parseInt(xmlarcs[i].getElementsByTagName("multiplicity")[0].childNodes[0].nodeValue);

        if (objectStore._arcs[ind].vaha == 1) {
            objectStore._arcs[ind].vahalabel = "";
        }
        else
            objectStore._arcs[ind].vahalabel = objectStore._arcs[ind].vaha;
        objectStore._arcs[ind].objektyhrany.vaha.nodeValue = objectStore._arcs[ind].vahalabel;


        Arc.elementypredhrany(app);

        if (xmlarcs[i].getElementsByTagName("breakPoint").length > 0) {
            var bodyxml = xmlarcs[i].getElementsByTagName("breakPoint");


            var xx;
            var yy;

            for (var j = 0; j < bodyxml.length; j++) {

                xx = parseInt(bodyxml[j].getElementsByTagName("x")[0].childNodes[0].nodeValue) + x_korekcia;
                yy = parseInt(bodyxml[j].getElementsByTagName("y")[0].childNodes[0].nodeValue) + y_korekcia;
                xx = korekcia_max_x(xx);
                yy = korekcia_max_y(yy);


                objectStore._arcs[ind].bodyhrany[j + 1] = new Point(xx, yy);


            }
            objectStore._arcs[ind].bodyhrany[j + 1] = new Point(posunutie_suradnic, posunutie_suradnic);
        }


        Arc.updatehranusvg(objectStore._arcs[ind]);

    }
    Arc.elementypredhrany(app);
    Arc.labelypredhranyprve(app);
}