class Application {

    constructor(canvasId) {
        this._context = {
            shortcuts: true
        };
        this._canvas = new Canvas(canvasId);
        this._serviceProvider = new ServiceProvider();
        Object.freeze(this._serviceProvider);
        this._storeProvider = new StoreProvider();
        Object.freeze(this._storeProvider);

        $("#undo").on("click", function(){
            this.undo();
        }.bind(this));

        $("#otvorSubor").on("change", function(){
            this.loadModel(event);
        }.bind(this));

        $("#reload").on("click", function(){
            this.reloadModel();
        }.bind(this));

        $("#saveasSVG").on("click", function(){
            this.exportasSVG(this._canvas);
        }.bind(this));

        $("#clear").on("click", function(){
            this.clearmodel();
        }.bind(this));
    }

    get canvas() {
        return this._canvas;
    }

    get context() {
        return this._context;
    }

    $service(key) {
        if (!key)
            return this._serviceProvider;
        return this._serviceProvider.getService(key);
    }

    $store(key) {
        return this._storeProvider.getStore(key);
    }

    undo() {
        if (previousStatus != null) {
            this.nacitajxml(mojparser(previousStatus));
            previousStatus = null;
        }
    }

    deleteall() {
        var cavnvas = this._canvas;
        for (let i = 0; i < arcs.length; i++) {
            this._canvas.remove(arcs[i].objektyhrany.polyciarapod);
            this._canvas.remove(arcs[i].objektyhrany.polyciara);
            this._canvas.remove(arcs[i].objektyhrany.sipka);
            arcs[i].objektyhrany.vahaelem.removeChild(arcs[i].objektyhrany.vaha);
            this._canvas.remove(arcs[i].objektyhrany.vahaelem);
        }
        arcs.splice(0, arcs.length);

        for (let i = 0; i < transitions.length; i++) {
            this._canvas.remove(transitions[i].objektyelementu.element);
            this._canvas.remove(transitions[i].objektyelementu.zamenom);
            transitions[i].objektyelementu.menoelem.removeChild(transitions[i].objektyelementu.meno);
            this._canvas.remove(transitions[i].objektyelementu.menoelem);

        }
        transitions.splice(0, transitions.length);

        for (let i = 0; i < places.length; i++) {
            this._canvas.remove(places[i].objektymiesta.element);
            this._canvas.remove(places[i].objektymiesta.zamenom);
            places[i].objektymiesta.menoelem.removeChild(places[i].objektymiesta.meno);
            this._canvas.remove(places[i].objektymiesta.menoelem);
            for (var j = 0; j < places[i].markingtokens.length; j++) {
                this._canvas.remove(places[i].markingtokens[j]);
            }
            places[i].objektymiesta.svgmarking.removeChild(places[i].objektymiesta.markingnode);
            this._canvas.remove(places[i].objektymiesta.svgmarking);
        }
        places.splice(0, places.length);

        id = 0;
    }

    nacitajxml(xmlDoc) {
        this.deleteall();
        var x_min = posunutie_suradnic;
        var y_min = posunutie_suradnic;

        var xmltransitions = xmlDoc.getElementsByTagName("transition");
        transitions = new Array();

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
            transitions[i] = new Transition(xx, yy, this._canvas);


            transitions[i].id = parseInt(xmltransitions[i].getElementsByTagName("id")[0].childNodes[0].nodeValue);

            if (id <= transitions[i].id)
                id = transitions[i].id;

            if (xmltransitions[i].getElementsByTagName("label").length > 0) {
                if (xmltransitions[i].getElementsByTagName("label")[0].childNodes.length != 0) {
                    transitions[i].label = xmltransitions[i].getElementsByTagName("label")[0].childNodes[0].nodeValue;
                    transitions[i].objektyelementu.meno.nodeValue = transitions[i].label;
                }
            }
        }


        places = new Array();

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

            places[i] = new Place(xx, yy, isStatic, this._canvas,parseInt(xmlplaces[i].getElementsByTagName("id")[0].childNodes[0].nodeValue));

            if (id <= places[i].id)
                id = places[i].id;

            places[i].marking = parseInt(xmlplaces[i].getElementsByTagName("tokens")[0].childNodes[0].nodeValue);


            Place.updatetokeny(places[i]);
            if (xmlplaces[i].getElementsByTagName("label").length > 0) {
                if (xmlplaces[i].getElementsByTagName("label")[0].childNodes.length != 0) {
                    places[i].label = xmlplaces[i].getElementsByTagName("label")[0].childNodes[0].nodeValue;
                    places[i].objektymiesta.meno.nodeValue = places[i].label;
                }
            }


        }


        arcs = new Array();
        var source;
        var target;


        for (i = 0; i < xmlarcs.length; i++) {
            var ind = arcs.length;
            var nasielsomsource = 0;
            for (var j = 0; j < places.length; j++) {
                if (places[j].id == xmlarcs[i].getElementsByTagName("sourceId")[0].childNodes[0].nodeValue) {

                    source = places[j];
                    nasielsomsource = 1;
                    break;
                }
            }
            if (nasielsomsource == 0) {
                for (var j = 0; j < transitions.length; j++) {
                    if (transitions[j].id == xmlarcs[i].getElementsByTagName("sourceId")[0].childNodes[0].nodeValue) {

                        source = transitions[j];
                        nasielsomsource = 2;
                        break;
                    }
                }
            }


            if (nasielsomsource == 2) {
                for (var j = 0; j < places.length; j++) {
                    if (places[j].id == xmlarcs[i].getElementsByTagName("destinationId")[0].childNodes[0].nodeValue) {

                        target = places[j];
                        break;
                    }
                }
            }
            if (nasielsomsource == 1) {
                for (var j = 0; j < transitions.length; j++) {
                    if (transitions[j].id == xmlarcs[i].getElementsByTagName("destinationId")[0].childNodes[0].nodeValue) {

                        target = transitions[j];
                        break;
                    }
                }
            }


            var parsed_arc_type = "regular";

            if (xmlarcs[i].getElementsByTagName("type").length > 0) {
                if (xmlarcs[i].getElementsByTagName("type")[0].childNodes.length != 0)
                    parsed_arc_type = xmlarcs[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
            }
            arcs[ind] = new Arc(source, target, parsed_arc_type, this._canvas);


            if (xmlarcs[i].getElementsByTagName("id").length > 0) {
                arcs[ind].id = parseInt(xmlarcs[i].getElementsByTagName("id")[0].childNodes[0].nodeValue);
            }


            if (id <= arcs[i].id)
                id = arcs[i].id;


            arcs[ind].vaha = parseInt(xmlarcs[i].getElementsByTagName("multiplicity")[0].childNodes[0].nodeValue);

            if (arcs[ind].vaha == 1) {
                arcs[ind].vahalabel = "";
            }
            else
                arcs[ind].vahalabel = arcs[ind].vaha;
            arcs[ind].objektyhrany.vaha.nodeValue = arcs[ind].vahalabel;


            Arc.elementypredhrany(this._canvas);

            if (xmlarcs[i].getElementsByTagName("breakPoint").length > 0) {
                var bodyxml = xmlarcs[i].getElementsByTagName("breakPoint");


                var xx;
                var yy;

                for (var j = 0; j < bodyxml.length; j++) {

                    xx = parseInt(bodyxml[j].getElementsByTagName("x")[0].childNodes[0].nodeValue) + x_korekcia;
                    yy = parseInt(bodyxml[j].getElementsByTagName("y")[0].childNodes[0].nodeValue) + y_korekcia;
                    xx = korekcia_max_x(xx);
                    yy = korekcia_max_y(yy);


                    arcs[ind].bodyhrany[j + 1] = new Point(xx, yy);


                }
                arcs[ind].bodyhrany[j + 1] = new Point(posunutie_suradnic, posunutie_suradnic);
            }


            Arc.updatehranusvg(arcs[ind]);

        }
        Arc.elementypredhrany(this._canvas);
        Arc.labelypredhranyprve(this._canvas);
    }

    loadModel(event) {
        var subor = event.target.files[0];
        menofilu = subor.name;
        document.title = menofilu;

        var citac = new FileReader();
        citac.onload = function () {
            text = citac.result;
            originFile = text;
            this.nacitajxml(mojparser(text));
            document.getElementById('otvorSubor').value = "";
        }.bind(this);

        citac.readAsText(subor);
    };

    reloadModel() {
        if (originFile != null) {
            this.nacitajxml(mojparser(originFile));
        }
    }

    exportasSVG(canvas) {
        var prevodnik = new XMLSerializer();
        var textnazapis = prevodnik.serializeToString(canvas.svg);
        var menosuboru = prompt("Please enter the file name", menofilu + ".svg");
        if (menosuboru != null) {
            var xmlakoBlob = null;
            if (window.Blob) {
                xmlakoBlob = new Blob([textnazapis], {type: 'text/plain;charset=utf-8'});
            }

            if (xmlakoBlob != null) {
                if (window.navigator.msSaveBlob !== undefined) {
                    window.navigator.msSaveBlob(xmlakoBlob, menosuboru);
                } else {
                    downloadLink = document.createElement("a");
                    downloadLink.download = menosuboru;
                    downloadLink.innerHTML = "Download Model" + menosuboru;
                    if (window.webkitURL !== undefined) {
                        downloadLink.href = window.webkitURL.createObjectURL(xmlakoBlob);
                    }
                    else {
                        if (window.URL.createObjectURL !== undefined) {
                            downloadLink.href = window.URL.createObjectURL(xmlakoBlob);
                            downloadLink.onclick = zavripokliku;
                            downloadLink.style.display = "none";
                            document.body.appendChild(downloadLink);
                        }
                    }
                    downloadLink.click();
                }
            }
        }
    }

    clearmodel() {
        if (places.length > 0 || transitions.length > 0) {
            var c = confirm("Are you sure to clear? Any unsaved changes will be lost.");
            if (c) {
                this.deleteall();
                menofilu = "newmodel.xml";
                document.getElementById('menofilu').innerHTML = menofilu;
            }
        }
        else {
            this.deleteall();
            menofilu = "newmodel.xml";
            document.getElementById('menofilu').innerHTML = menofilu;
        }
    }

}
