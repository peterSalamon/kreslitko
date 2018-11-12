class Transition{
    constructor (x, y, canvas, app) {
        this.type = "transition";
        this.id = attachid();
        this.index = 0;
        this.x = x;
        this.y = y;
        this.velkost = velkost;
        this.label = "";
        this.over = 1;
        this.objektyelementu = this.novy_svg_transition(this, app, xmlns, x, y, this.velkost);
    }

    novy_svg_transition(element, app, xmlns, x, y, velkost) {
        let objectStore = app.$store("model").get(0);     //TODO: ok ?

        let canvas = app.canvas;

        var svgelement = document.createElementNS(xmlns, "rect");

        svgelement.setAttributeNS(null, "x", x - velkost / 2);
        svgelement.setAttributeNS(null, "y", y - velkost / 2);
        svgelement.setAttributeNS(null, "width", velkost);
        svgelement.setAttributeNS(null, "height", velkost);
        svgelement.setAttributeNS(null, "fill", "white");
        svgelement.setAttributeNS(null, "stroke", "black");
        svgelement.setAttributeNS(null, "stroke-width", "2");
        canvas.add(svgelement);

        var svgzamenom = document.createElementNS(xmlns, "rect");

        svgzamenom.setAttributeNS(null, "x", x);
        svgzamenom.setAttributeNS(null, "y", y + velkost / 2 + fontsizeoffset - korekcia);
        svgzamenom.setAttributeNS(null, "width", 0);
        svgzamenom.setAttributeNS(null, "height", fontsize);
        svgzamenom.setAttributeNS(null, "fill-opacity", "0.7");
        svgzamenom.setAttributeNS(null, "fill", "white");
        canvas.add(svgzamenom);


        var svgmeno = document.createElementNS(xmlns, "text");
        svgmeno.setAttributeNS(null, "x", x);
        svgmeno.setAttributeNS(null, "y", y + velkost / 2 + fontsizeoffset);
        svgmeno.setAttributeNS(null, "font-size", fontsize);
        svgmeno.setAttributeNS(null, "font-family", fontfamily);
        var labelnode = document.createTextNode(element.label);
        svgmeno.appendChild(labelnode);
        canvas.add(svgmeno);

        sirkatextu = svgmeno.getComputedTextLength();

        svgzamenom.setAttributeNS(null, "x", x - sirkatextu / 2);
        svgmeno.setAttributeNS(null, "x", x - sirkatextu / 2);


        svgelement.onmouseover = function () {
            if (!document.getElementById("fire").checked) {
                svgelement.setAttributeNS(null, "stroke", "blue");
                element.over = 1;
            }
        };
        svgelement.onmouseout = function () {
            if (!document.getElementById("fire").checked) {
                svgelement.setAttributeNS(null, "stroke", "black");
                element.over = 0;
            }
        };
        svgelement.onmousedown = function () {
            var bod = new Point(0,0);
            if (document.getElementById("delete").checked) {
                for (let i = 0; i < objectStore._arcs.length; i++) {
                    if (element === objectStore._arcs[i].source || element === objectStore._arcs[i].target) {
                        canvas.remove(objectStore._arcs[i].objektyhrany.polyciarapod);
                        canvas.remove(objectStore._arcs[i].objektyhrany.polyciara);
                        canvas.remove(objectStore._arcs[i].objektyhrany.sipka);
                        objectStore._arcs[i].objektyhrany.vahaelem.removeChild(objectStore._arcs[i].objektyhrany.vaha);
                        canvas.remove(objectStore._arcs[i].objektyhrany.vahaelem);
                        objectStore._arcs.splice(i, 1);
                        i--;
                    }
                }

                canvas.remove(svgelement);
                canvas.remove(svgzamenom);

                svgmeno.removeChild(labelnode);
                canvas.remove(svgmeno);
                let i = objectStore._transitions.indexOf(element);
                objectStore._transitions.splice(i, 1);
            }
            if (document.getElementById("arc").checked) {
                if (kresli_sa_hrana === 0) {
                    source_hrany = element;
                    kresli_sa_hrana = 1;
                    bod.x = element.x + arrowHeadSize; //event.pageX - HORIZONTAL_OFFSET;
                    bod.y = element.y; //event.pageY - VERTICAL_OFFSET;
                    hranabymove = Arc.novy_svg_temp_arc(canvas, xmlns, element, bod, "regular");
                }
                else {
                    if (source_hrany.type !== element.type) {
                        var actual = objectStore._arcs.length;
                        objectStore._arcs[actual] = new Arc(source_hrany, element, "regular", app);
                        var elem = objectStore._arcs[actual].svgelement1;

                        Arc.elementypredhrany(app);
                        Arc.labelypredhranyprve(app);
                    }
                }
            }

            if (document.getElementById("resetarc").checked) {
                if (kresli_sa_hrana !== 0) {
                    if (source_hrany.type !== element.type) {
                        var actual = objectStore._arcs.length;
                        objectStore._arcs[actual] = new Arc(source_hrany, element, "reset", app);
                        var elem = objectStore._arcs[actual].svgelement1;

                        Arc.elementypredhrany(app);
                        Arc.labelypredhranyprve(app);
                    }
                }
            }

            if (document.getElementById("inhibitorarc").checked) {
                if (kresli_sa_hrana !== 0) {
                    if (source_hrany.type !== element.type) {
                        var actual = objectStore._arcs.length;
                        objectStore._arcs[actual] = new Arc(source_hrany, element, "inhibitor", app);
                        var elem = objectStore._arcs[actual].svgelement1;

                        Arc.elementypredhrany(app);
                        Arc.labelypredhranyprve(app);
                    }
                }
            }

            if (document.getElementById("readarc").checked) {
                if (kresli_sa_hrana !== 0) {
                    if (source_hrany.type !== element.type) {
                        var actual = objectStore._arcs.length;
                        objectStore._arcs[actual] = new Arc(source_hrany, element, "read", app);
                        var elem = objectStore._arcs[actual].svgelement1;

                        Arc.elementypredhrany(app);
                        Arc.labelypredhranyprve(app);
                    }
                }
            }

            if (document.getElementById("position").checked) {
                var doit = false;
                var novex = element.x;
                var novey = element.y;
                var a = prompt("Please enter x-coordinate of the transition (not smaller than " + posunutie_suradnic + " and not greater than " + maxx + " ):", element.x);
                if (a != null) {
                    var x = parseInt(a);
                    if (isNaN(x)) {
                        alert("x is not a number");
                    } else {
                        if (x <= posunutie_suradnic || maxx <= x)
                            alert("x is out of dimension");
                        else {
                            novex = x;
                            doit = true;
                        }
                    }
                }
                var b = prompt("Please enter y-coordinate of the transition (not smaller than " + posunutie_suradnic + " and not greater than " + maxy + " ):", element.y);
                if (b != null) {
                    var y = parseInt(b);
                    if (isNaN(y)) {
                        alert("y is not a number");
                    } else {
                        if (y <= posunutie_suradnic || maxy <= y)
                            alert("y is out of dimension");
                        else {
                            novey = y;
                            doit = true;
                        }
                    }
                }
                if (doit)
                    Transition.movePrechod(element, novex, novey, objectStore);
            }

            if (document.getElementById("move").checked) {
                if (hybesaprechod === 0) {
                    hybesaprechod = 1;
                    movedprechod = element;
                }
            }

            if (document.getElementById("label").checked) {
                previousStatus = generujXML(1, objectStore);
                var label = prompt("Please enter transition label", element.label);
                if (label != null) {
                    element.label = label;
                    labelnode.nodeValue = element.label;
                    sirkatextu = svgmeno.getComputedTextLength();
                    svgzamenom.setAttributeNS(null, "x", element.x - sirkatextu / 2);
                    svgzamenom.setAttributeNS(null, "width", sirkatextu);
                    svgmeno.setAttributeNS(null, "x", element.x - sirkatextu / 2);
                }
            }

            if (document.getElementById("fire").checked) {
                if (Transition.enabled(element, objectStore)) {
                    this.consume(element, objectStore._arcs);
                    this.produce(element, objectStore._arcs);
                    Place.updatemarkings(objectStore._places);
                    if (document.getElementById("fire").checked) {
                        for (let i = 0; i < objectStore._transitions.length; i++) {
                            if (Transition.enabled(objectStore._transitions[i],objectStore)) {
                                objectStore._transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "green");
                                objectStore._transitions[i].objektyelementu.element.setAttributeNS(null, "fill", "yellowgreen");
                            }
                            else {
                                objectStore._transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "red");
                                objectStore._transitions[i].objektyelementu.element.setAttributeNS(null, "fill", "white");
                            }
                        }
                    }
                }
            }
        }.bind(this);

        svgmeno.onmousedown = function () {
            if (document.getElementById("label").checked) {
                previousStatus = generujXML(1, objectStore);
                var label = prompt("Please enter transition label", element.label);
                if (label != null) {
                    element.label = label;
                    labelnode.nodeValue = element.label;
                    sirkatextu = svgmeno.getComputedTextLength();
                    svgzamenom.setAttributeNS(null, "x", element.x - sirkatextu / 2);
                    svgzamenom.setAttributeNS(null, "width", sirkatextu);
                    svgmeno.setAttributeNS(null, "x", element.x - sirkatextu / 2);
                }
            }
        };

        svgmeno.onmouseout = function () {
            svgmeno.setAttributeNS(null, "fill", "black");
        };

        svgmeno.onmouseover = function () {
            svgmeno.setAttributeNS(null, "fill", "blue");
        };

        return new objektyelementu(svgelement, svgmeno, labelnode, svgzamenom);
    }




    static enabled(transition, objectStore) {


        for (let i = 0; i < objectStore._places.length; i++) {
            objectStore._places[i].testmarking = objectStore._places[i].marking;
        }

        for (let i = 0; i < objectStore._arcs.length; i++) {
            if (objectStore._arcs[i].target === transition && (objectStore._arcs[i].arctype === "inhibitor") && (objectStore._arcs[i].source.testmarking >= objectStore._arcs[i].vaha)) {
                return false;
            }
        }

        for (let i = 0; i < objectStore._arcs.length; i++) {
            if (objectStore._arcs[i].target === transition && (objectStore._arcs[i].arctype === "read") && (objectStore._arcs[i].source.testmarking < objectStore._arcs[i].vaha)) {
                return false;
            }
        }

        for (let i = 0; i < objectStore._arcs.length; i++) {
            if (objectStore._arcs[i].target === transition && objectStore._arcs[i].arctype === "regular") {
                objectStore._arcs[i].source.testmarking = objectStore._arcs[i].source.testmarking - objectStore._arcs[i].vaha;
            }
        }

        for (let i = 0; i < objectStore._places.length; i++) {
            if (objectStore._places[i].testmarking < 0) {
                return false;
            }
        }

        return true;
    }

    consume(transition, arcs) {
        for (let i = 0; i < arcs.length; i++) {
            if (arcs[i].target === transition && (arcs[i].arctype === "regular")) {
                arcs[i].source.marking = arcs[i].source.marking - arcs[i].vaha;
            }
        }

        for (let i = 0; i < arcs.length; i++) {
            if (arcs[i].target === transition && (arcs[i].arctype === "reset")) {
                arcs[i].source.marking = 0;

            }
        }
    }

    produce(transition, arcs) {
        for (let i = 0; i < arcs.length; i++) {
            if (arcs[i].source === transition) {
                arcs[i].target.marking = arcs[i].target.marking + arcs[i].vaha;
            }
        }
    }

    static movePrechod(prechod, x, y, objectStore) {
        prechod.x = x;
        prechod.y = y;
        prechod.objektyelementu.element.setAttributeNS(null, "x", x - velkost / 2);

        prechod.objektyelementu.element.setAttributeNS(null, "y", y - velkost / 2);
        prechod.objektyelementu.element.setAttributeNS(null, "stroke", "red");

        sirkatextu = prechod.objektyelementu.menoelem.getComputedTextLength();


        prechod.objektyelementu.zamenom.setAttributeNS(null, "x", x - sirkatextu / 2);
        prechod.objektyelementu.zamenom.setAttributeNS(null, "y", y + velkost / 2 + fontsizeoffset - korekcia);


        prechod.objektyelementu.menoelem.setAttributeNS(null, "x", x - sirkatextu / 2);
        prechod.objektyelementu.menoelem.setAttributeNS(null, "y", y + velkost / 2 + fontsizeoffset);


        for (let i = 0; i < objectStore._arcs.length; i++) {
            if (prechod === objectStore._arcs[i].source || prechod === objectStore._arcs[i].target) {
                Arc.updatehranusvg(objectStore._arcs[i]);
            }
        }
    }
}

class objektyelementu{
    constructor(a, b, c, d){
        this.element = a;
        this.menoelem = b;
        this.meno = c;
        this.zamenom = d;
    }
}