class Transition {

    constructor(x, y, canvas) {
        this.type = "transition";
        this.id = attachid();
        this.index = 0;
        this.x = x;
        this.y = y;
        this.velkost = velkost;
        this.label = "";
        this.over = 1;
        this.objektyelementu = this.novy_svg_transition(this, canvas, xmlns, x, y, this.velkost);
    }

    novy_svg_transition(element, canvas, xmlns, x, y, velkost) {
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
            if (document.getElementById("delete").checked) {
                for (let i = 0; i < arcs.length; i++) {
                    if (element === arcs[i].source || element === arcs[i].target) {
                        canvas.remove(arcs[i].objektyhrany.polyciarapod);
                        canvas.remove(arcs[i].objektyhrany.polyciara);
                        canvas.remove(arcs[i].objektyhrany.sipka);
                        arcs[i].objektyhrany.vahaelem.removeChild(arcs[i].objektyhrany.vaha);
                        canvas.remove(arcs[i].objektyhrany.vahaelem);
                        arcs.splice(i, 1);
                        i--;
                    }
                }

                canvas.remove(svgelement);
                canvas.remove(svgzamenom);

                svgmeno.removeChild(labelnode);
                canvas.remove(svgmeno);
                let i = transitions.indexOf(element);
                transitions.splice(i, 1);
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
                        var actual = arcs.length;
                        arcs[actual] = new Arc(source_hrany, element, "regular", canvas);
                        var elem = arcs[actual].svgelement1;

                        Arc.elementypredhrany(canvas);
                        Arc.labelypredhranyprve(canvas);
                    }
                }
            }

            if (document.getElementById("resetarc").checked) {
                if (kresli_sa_hrana !== 0) {
                    if (source_hrany.type !== element.type) {
                        var actual = arcs.length;
                        arcs[actual] = new Arc(source_hrany, element, "reset", canvas);
                        var elem = arcs[actual].svgelement1;

                        Arc.elementypredhrany(canvas);
                        Arc.labelypredhranyprve(canvas);
                    }
                }
            }

            if (document.getElementById("inhibitorarc").checked) {
                if (kresli_sa_hrana !== 0) {
                    if (source_hrany.type !== element.type) {
                        var actual = arcs.length;
                        arcs[actual] = new Arc(source_hrany, element, "inhibitor", canvas);
                        var elem = arcs[actual].svgelement1;

                        Arc.elementypredhrany(canvas);
                        Arc.labelypredhranyprve(canvas);
                    }
                }
            }

            if (document.getElementById("readarc").checked) {
                if (kresli_sa_hrana !== 0) {
                    if (source_hrany.type !== element.type) {
                        var actual = arcs.length;
                        arcs[actual] = new Arc(source_hrany, element, "read", canvas);
                        var elem = arcs[actual].svgelement1;

                        Arc.elementypredhrany(canvas);
                        Arc.labelypredhranyprve(canvas);
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
                    element.moveprechod(element, novex, novey);
            }

            if (document.getElementById("move").checked) {
                if (hybesaprechod === 0) {
                    hybesaprechod = 1;
                    movedprechod = element;
                }
            }

            if (document.getElementById("label").checked) {
                previousStatus = generujXML(1);
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
                if (Transition.enabled(element)) {
                    Transition.consume(element);
                    Transition.produce(element);
                    Place.updatemarkings();
                    if (document.getElementById("fire").checked) {
                        for (let i = 0; i < transitions.length; i++) {
                            if (Transition.enabled(transitions[i])) {
                                transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "green");
                                transitions[i].objektyelementu.element.setAttributeNS(null, "fill", "yellowgreen");
                            }
                            else {
                                transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "red");
                                transitions[i].objektyelementu.element.setAttributeNS(null, "fill", "white");
                            }
                        }
                    }
                }
            }
        };

        svgmeno.onmousedown = function () {
            if (document.getElementById("label").checked) {
                previousStatus = generujXML(1);
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

    static moveprechod(prechod, x, y) {
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


        for (let i = 0; i < arcs.length; i++) {
            if (prechod === arcs[i].source || prechod === arcs[i].target) {
                Arc.updatehranusvg(arcs[i]);
            }
        }
    }

    static enabled(transition) {
        for (let i = 0; i < places.length; i++) {
            places[i].testmarking = places[i].marking;
        }

        for (let i = 0; i < arcs.length; i++) {
            if (arcs[i].target === transition && (arcs[i].arctype === "inhibitor") && (arcs[i].source.testmarking >= arcs[i].vaha)) {
                return false;
            }
        }

        for (let i = 0; i < arcs.length; i++) {
            if (arcs[i].target === transition && (arcs[i].arctype === "read") && (arcs[i].source.testmarking < arcs[i].vaha)) {
                return false;
            }
        }

        for (let i = 0; i < arcs.length; i++) {
            if (arcs[i].target === transition && arcs[i].arctype === "regular") {
                arcs[i].source.testmarking = arcs[i].source.testmarking - arcs[i].vaha;
            }
        }

        for (let i = 0; i < places.length; i++) {
            if (places[i].testmarking < 0) {
                return false;
            }
        }

        return true;
    }

    static consume(transition) {
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

    static produce(transition) {
        for (let i = 0; i < arcs.length; i++) {
            if (arcs[i].source === transition) {
                arcs[i].target.marking = arcs[i].target.marking + arcs[i].vaha;
            }
        }
    }
}
