function objektyelementu(a, b, c, d) {
    this.element = a;
    this.menoelem = b;
    this.meno = c;
    this.zamenom = d;
}

function attachid() {
    id++;
    return id;

}

function updateindex() {
    for (let i = 0; i < transitions.length; i++) {
        transitions[i].index = i;
    }

    for (let i = 0; i < placess.length; i++) {
        places[i].index = i;
    }
}

function doMouseMove(event) {
    var mys_x = getMousePositionX(event);
    var mys_y = getMousePositionY(event);

    var posun;

    if (kresli_sa_hrana === 1 && (document.getElementById("arc").checked || document.getElementById("resetarc").checked || document.getElementById("inhibitorarc").checked || document.getElementById("readarc").checked)) {
        if (source_hrany.type === "place") posun = polomer + 2; else posun = velkost / 2 + 2;
        if (Math.abs(source_hrany.x - mys_x) > posun || Math.abs(source_hrany.y - mys_y) > posun ) {
            if (source_hrany.x > mys_x) {
                mys_x = mys_x + 2;
            }
            if (source_hrany.x < mys_x) {
                mys_x = mys_x - 2;
            }
            if (source_hrany.y > mys_y) {
                mys_y = mys_y + 2;
            }
            if (source_hrany.y < mys_y) {
                mys_y = mys_y - 2;
            }
            var koniech = new Point(mys_x, mys_y);
            var dx = koniech.x - source_hrany.x;
            var dy = koniech.y - source_hrany.y;
            var dlzkahrany = Math.sqrt(dx * dx + dy * dy);
            var dlzkaskratena = dlzkahrany - arrowHeadSize + 2;
            var pomer = dlzkaskratena / dlzkahrany;
            var nx = source_hrany.x + dx * pomer;
            var ny = source_hrany.y + dy * pomer;
            var start = Arc.zaciatok_hrany(source_hrany, koniech);

            hranabymove.polyciara.setAttributeNS(null, "points", start.x + "," + start.y + " " + nx + "," + ny);

            if (document.getElementById("inhibitorarc").checked || document.getElementById("readarc").checked) {
                hranabymove.sipka.setAttributeNS(null, "cx", Arc.bodInhibitorSipky(start.x, start.y, mys_x, mys_y).x);
                hranabymove.sipka.setAttributeNS(null, "cy", Arc.bodInhibitorSipky(start.x, start.y, mys_x, mys_y).y);
            } else {
                hranabymove.sipka.setAttributeNS(null, "points", Arc.bodySipky(start.x, start.y, mys_x, mys_y, hranabymove.arctype));
            }

        }
    }
    if (posuva_sa_hrana === 1 && document.getElementById("move").checked) {
        posuvanahrana.bodyhrany[indexbodu].x = mys_x;
        posuvanahrana.bodyhrany[indexbodu].y = mys_y;

        Arc.updatehranusvg(posuvanahrana);
    }

    if (hybesaprechod === 1 && document.getElementById("move").checked)
        Transition.moveprechod(movedprechod, mys_x, mys_y);

    if (hybesamiesto === 1 && document.getElementById("move").checked)
        Place.movemiesto(movedmiesto, mys_x, mys_y);
}

function korekcia_x(x) {
    var xx = x;
    if (xx < posunutie_suradnic)
        xx = posunutie_suradnic;

    if (xx > appwidth - posunutie_suradnic)
        xx = appwidth - posunutie_suradnic;

    return xx;
}

function korekcia_y(y) {
    var yy = y;
    if (yy < posunutie_suradnic)
        yy = posunutie_suradnic;

    if (yy > appheight - posunutie_suradnic)
        yy = appheight - posunutie_suradnic;

    return yy;
}

function korekcia_max_x(x) {
    var xx = x;
    if (xx > maxx)
        xx = maxx;

    return xx;
}

function korekcia_max_y(y) {
    var yy = y;
    if (yy > maxy)
        yy = maxy;

    return yy;
}

function doMouseDown(event, canvas) {
    var mys_x = getMousePositionX(event);
    var mys_y = getMousePositionY(event);

    mys_x = korekcia_x(mys_x);
    mys_y = korekcia_y(mys_y);

    if (kresli_sa_hrana === 1) {
        pocetmousedown++;
        if (!(pocetmousedown === 2 && kresli_sa_hrana === 1))
            previousStatus = generujXML(1);
    }
    if (pocetmousedown === 2 && kresli_sa_hrana === 1) {
        canvas.remove(hranabymove.polyciara);
        canvas.remove(hranabymove.sipka);
        pocetmousedown = 0;
        kresli_sa_hrana = 0;
    }

    if (posuva_sa_hrana === 1) {
        pocetmousedownposuv++;
        if (!(pocetmousedownposuv === 2 && posuva_sa_hrana === 1))
            previousStatus = generujXML(1);
    }
    if (pocetmousedownposuv === 2 && posuva_sa_hrana === 1) {
        posuvanahrana.bodyhrany[indexbodu].x = mys_x;
        posuvanahrana.bodyhrany[indexbodu].y = mys_y;
        pocetmousedownposuv = 0;
        posuva_sa_hrana = 0;
        Arc.updatehranusvg(posuvanahrana);
    }
    if (hybesaprechod === 1) {
        pocetmousedownposuvtran++;
        if (!(pocetmousedownposuvtran === 2 && hybesaprechod === 1))
            previousStatus = generujXML(1);
    }

    if (pocetmousedownposuvtran === 2 && hybesaprechod === 1) {
        pocetmousedownposuvtran = 0;
        hybesaprechod = 0;
        Transition.moveprechod(movedprechod, mys_x, mys_y);
        movedprechod.objektyelementu.element.setAttributeNS(null, "stroke", "blue");
    }

    if (hybesamiesto === 1) {
        pocetmousedownposuvplace++;
        if (!(pocetmousedownposuvplace === 2 && hybesamiesto === 1))
            previousStatus = generujXML(1);
    }

    if (pocetmousedownposuvplace === 2 && hybesamiesto === 1) {
        pocetmousedownposuvplace = 0;
        hybesamiesto = 0;
        Place.movemiesto(movedmiesto, mys_x, mys_y);
        movedmiesto.objektymiesta.element.setAttributeNS(null, "stroke", "blue");
    }


    if (document.getElementById("transition").checked) {
        previousStatus = generujXML(1);
        var actual = transitions.length;
        transitions[actual] = new Transition(mys_x, mys_y, canvas);
    }

    if (document.getElementById("place").checked) {
        previousStatus = generujXML(1);
        var places_actual = places.length;
        places[places_actual] = new Place(mys_x, mys_y, false, canvas);
    }

    if (document.getElementById("staticplace").checked) {
        previousStatus = generujXML(1);
        var places_actual = places.length;
        places[places_actual] = new Place(mys_x, mys_y, true, canvas);
    }
}

function zavripokliku(event) {
    document.body.removeChild(event.target);
}

function undo() {
    if (previousStatus != null) {
        nacitajxml(mojparser(previousStatus));
        previousStatus = null;
    }
}

function deleteall() {
    for (let i = 0; i < arcs.length; i++) {
        canvas.remove(arcs[i].objektyhrany.polyciarapod);
        canvas.remove(arcs[i].objektyhrany.polyciara);
        canvas.remove(arcs[i].objektyhrany.sipka);
        arcs[i].objektyhrany.vahaelem.removeChild(arcs[i].objektyhrany.vaha);
        canvas.remove(arcs[i].objektyhrany.vahaelem);
    }
    arcs.splice(0, arcs.length);

    for (let i = 0; i < transitions.length; i++) {
        canvas.remove(transitions[i].objektyelementu.element);
        canvas.remove(transitions[i].objektyelementu.zamenom);
        transitions[i].objektyelementu.menoelem.removeChild(transitions[i].objektyelementu.meno);
        canvas.remove(transitions[i].objektyelementu.menoelem);

    }
    transitions.splice(0, transitions.length);

    for (let i = 0; i < places.length; i++) {
        canvas.remove(places[i].objektymiesta.element);
        canvas.remove(places[i].objektymiesta.zamenom);
        places[i].objektymiesta.menoelem.removeChild(places[i].objektymiesta.meno);
        canvas.remove(places[i].objektymiesta.menoelem);
        for (var j = 0; j < places[i].markingtokens.length; j++) {
            canvas.remove(places[i].markingtokens[j]);
        }
        places[i].objektymiesta.svgmarking.removeChild(places[i].objektymiesta.markingnode);
        canvas.remove(places[i].objektymiesta.svgmarking);
    }
    places.splice(0, places.length);

id = 0;
}

function objektyhranymove(a, b, arctype) {
    this.polyciara = a;
    this.sipka = b;
    this.arctype = arctype;
}

function objektyhrany(a, b, c, d, e) {
    this.polyciarapod = a;
    this.polyciara = b;
    this.sipka = c;
    this.vahaelem = d;
    this.vaha = e;
}

function reset() {
    reset_hranu();

    if (document.getElementById("fire").checked) {
        for (let i = 0; i < transitions.length; i++) {
            if (Transition.enabled(transitions[i])) {
                transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "green");
                transitions[i].objektyelementu.element.setAttributeNS(null, "fill", "yellowgreen");
            }
            else {
                transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "red");
            }
        }
    }
    if (!document.getElementById("fire").checked) {
        for (let i = 0; i < transitions.length; i++) {
            transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "black");
            transitions[i].objektyelementu.element.setAttributeNS(null, "fill", "white");
        }
    }
}

function reset_hranu() {
    if (posuva_sa_hrana === 1) {
        posuvanahrana.objektyhrany.polyciara.setAttributeNS(null, "stroke", "black");
        if (posuvanahrana.arctype === "inhibitor")
            posuvanahrana.objektyhrany.sipka.setAttributeNS(null, "fill", "white");
        else
            posuvanahrana.objektyhrany.sipka.setAttributeNS(null, "fill", "black");

        posuvanahrana.objektyhrany.sipka.setAttributeNS(null, "stroke", "black");

        pocetmousedownposuv = 0;
        posuva_sa_hrana = 0;
    }
    if (kresli_sa_hrana === 1) {
        canvas.remove(hranabymove.polyciara);
        canvas.remove(hranabymove.sipka);

        pocetmousedown = 0;
        kresli_sa_hrana = 0;
    }
}