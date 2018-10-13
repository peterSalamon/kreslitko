function elementypredhrany(canvas) {
    for (let i = 0; i < places.length; i++) {
        canvas.add(places[i].objektymiesta.element);

        places[i].objektymiesta.element.setAttributeNS(null, "fill", "white");
        places[i].objektymiesta.element.setAttributeNS(null, "stroke", "black");
        if (places[i].static) {
            places[i].objektymiesta.element.setAttributeNS(null, "stroke-dasharray", "14, 5");
            places[i].objektymiesta.element.setAttributeNS(null, "stroke-width", "3");
        }
        else
            places[i].objektymiesta.element.setAttributeNS(null, "stroke-width", "2");

        for (let j = 0; j < places[i].markingtokens.length; j++) {
            canvas.add(places[i].markingtokens[j]);
        }
        places[i].objektymiesta.svgmarking.appendChild(places[i].objektymiesta.markingnode);
        canvas.add(places[i].objektymiesta.svgmarking);
    }
    updatemarkings();
    for (let i = 0; i < transitions.length; i++) {
        canvas.add(transitions[i].objektyelementu.element);
        transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "black");
        transitions[i].objektyelementu.element.setAttributeNS(null, "fill", "white");
    }
}

function novy_svg_temp_arc(canvas, xmlns, zaciatok, koniec, arctype) {
    let dx = koniec.x - zaciatok.x;
    let dy = koniec.y - zaciatok.y;
    let dlzkahrany = Math.sqrt(dx * dx + dy * dy);
    let dlzkaskratena = dlzkahrany - arrowHeadSize + 2;
    let pomer = dlzkaskratena / dlzkahrany;
    let nx = zaciatok.x + dx * pomer;
    let ny = zaciatok.y + dy * pomer;


    let svgelement = document.createElementNS(xmlns, "polyline");

    svgelement.setAttributeNS(null, "points", zaciatok.x + "," + zaciatok.y + " " + nx + "," + ny);
    svgelement.setAttributeNS(null, "fill", "none");
    svgelement.setAttributeNS(null, "stroke-width", "2");

    svgelement.setAttributeNS(null, "stroke", "blue");

    canvas.add(svgelement);

    let svgelement2;
    if (arctype === "inhibitor") {
        svgelement2 = document.createElementNS(xmlns, "circle");

        svgelement2.setAttributeNS(null, "cx", bodInhibitorSipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y).x);
        svgelement2.setAttributeNS(null, "cy", bodInhibitorSipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y).y);
        svgelement2.setAttributeNS(null, "r", `${arrowHeadSize / 2}`);
        svgelement2.setAttributeNS(null, "fill", "white");
        svgelement2.setAttributeNS(null, "stroke", "blue");
        svgelement2.setAttributeNS(null, "stroke-width", "2");
    } else if (arctype === "read") {
        svgelement2 = document.createElementNS(xmlns, "circle");

        svgelement2.setAttributeNS(null, "cx", bodInhibitorSipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y).x);
        svgelement2.setAttributeNS(null, "cy", bodInhibitorSipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y).y);
        svgelement2.setAttributeNS(null, "r", `${arrowHeadSize / 2}`);
        svgelement2.setAttributeNS(null, "fill", "black");
        svgelement2.setAttributeNS(null, "stroke", "blue");
        svgelement2.setAttributeNS(null, "stroke-width", "2");
    } else {
        svgelement2 = document.createElementNS(xmlns, "polygon");
        svgelement2.setAttributeNS(null, "points", bodySipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y, arctype));
        svgelement2.setAttributeNS(null, "fill", "blue");

        svgelement2.setAttributeNS(null, "stroke", "blue");
    }

    canvas.add(svgelement2);


    return new objektyhranymove(svgelement, svgelement2, arctype);
}

function novy_svg_arc(element, canvas, undefined, xmlns, zaciatok, koniec) {

    let dx = koniec.x - zaciatok.x;
    let dy = koniec.y - zaciatok.y;
    let dlzkahrany = Math.sqrt(dx * dx + dy * dy);
    let dlzkaskratena = dlzkahrany - arrowHeadSize + 2;
    let pomer = dlzkaskratena / dlzkahrany;
    let nx = zaciatok.x + dx * pomer;
    let ny = zaciatok.y + dy * pomer;

    let svgelement = document.createElementNS(xmlns, "polyline");

    svgelement.setAttributeNS(null, "points", zaciatok.x + "," + zaciatok.y + " " + nx + "," + ny);
    svgelement.setAttributeNS(null, "fill", "none");
    svgelement.setAttributeNS(null, "stroke-width", "4");

    svgelement.setAttributeNS(null, "stroke", "white");

    canvas.add(svgelement);


    let svgelement1 = document.createElementNS(xmlns, "polyline");

    svgelement1.setAttributeNS(null, "points", zaciatok.x + "," + zaciatok.y + " " + nx + "," + ny);
    svgelement1.setAttributeNS(null, "fill", "none");
    svgelement1.setAttributeNS(null, "stroke-width", "2");

    svgelement1.setAttributeNS(null, "stroke", "black");

    canvas.add(svgelement1);

    let svgelement2;
    if (element.arctype === "inhibitor") {
        svgelement2 = document.createElementNS(xmlns, "circle");

        svgelement2.setAttributeNS(null, "cx", bodInhibitorSipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y).x);
        svgelement2.setAttributeNS(null, "cy", bodInhibitorSipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y).y);
        svgelement2.setAttributeNS(null, "r", `${arrowHeadSize / 2}`);
        svgelement2.setAttributeNS(null, "fill", "white");
        svgelement2.setAttributeNS(null, "stroke", "black");
        svgelement2.setAttributeNS(null, "stroke-width", "2");
    } else if (element.arctype === "read") {
        svgelement2 = document.createElementNS(xmlns, "circle");

        svgelement2.setAttributeNS(null, "cx", bodInhibitorSipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y).x);
        svgelement2.setAttributeNS(null, "cy", bodInhibitorSipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y).y);
        svgelement2.setAttributeNS(null, "r", `${arrowHeadSize / 2}`);
        svgelement2.setAttributeNS(null, "fill", "black");
        svgelement2.setAttributeNS(null, "stroke", "black");
        svgelement2.setAttributeNS(null, "stroke-width", "2");
    } else {
        svgelement2 = document.createElementNS(xmlns, "polygon");
        svgelement2.setAttributeNS(null, "points", bodySipky(zaciatok.x, zaciatok.y, koniec.x, koniec.y, element.arctype));

        svgelement2.setAttributeNS(null, "fill", "black");
        svgelement2.setAttributeNS(null, "stroke", "black");
    }

    canvas.add(svgelement2);

    let svgmeno = document.createElementNS(xmlns, "text");
    let bodvaha = bodvahy(zaciatok, koniec);
    svgmeno.setAttributeNS(null, "x", bodvaha.x);
    svgmeno.setAttributeNS(null, "y", bodvaha.y);
    svgmeno.setAttributeNS(null, "font-size", fontsize.toString());
    svgmeno.setAttributeNS(null, "font-family", fontfamily);
    let labelnode = document.createTextNode(element.vahalabel);
    svgmeno.appendChild(labelnode);
    canvas.add(svgmeno);


    svgmeno.setAttributeNS(null, "x", `${bodvaha.x - vahaoffset / 3}`);
    svgmeno.setAttributeNS(null, "y", `${bodvaha.y + vahaoffset / 2}`);

    svgelement.onmouseover = function () {
        svgelement1.setAttributeNS(null, "stroke", "blue");
        if (element.arctype === "inhibitor")
            svgelement2.setAttributeNS(null, "fill", "white");
        else
            svgelement2.setAttributeNS(null, "fill", "blue");
        svgelement2.setAttributeNS(null, "stroke", "blue");
    };

    svgelement.onmouseout = function () {
        svgelement1.setAttributeNS(null, "stroke", "black");
        if (element.arctype === "inhibitor")
            svgelement2.setAttributeNS(null, "fill", "white");
        else
            svgelement2.setAttributeNS(null, "fill", "black");
        svgelement2.setAttributeNS(null, "stroke", "black");
    };


    svgelement1.onmouseover = function () {
        svgelement1.setAttributeNS(null, "stroke", "blue");
        if (element.arctype === "inhibitor")
            svgelement2.setAttributeNS(null, "fill", "white");
        else
            svgelement2.setAttributeNS(null, "fill", "blue");
        svgelement2.setAttributeNS(null, "stroke", "blue");
    };

    svgelement1.onmouseout = function () {
        svgelement1.setAttributeNS(null, "stroke", "black");
        if (element.arctype === "inhibitor")
            svgelement2.setAttributeNS(null, "fill", "white");
        else
            svgelement2.setAttributeNS(null, "fill", "black");
        svgelement2.setAttributeNS(null, "stroke", "black");
    };


    svgelement.onmousedown = function (event) {
        mysdownnahrane(event, element, svgelement, svgelement1, svgelement2, labelnode, svgmeno)
    };

    svgelement1.onmousedown = function (event) {
        mysdownnahrane(event, element, svgelement, svgelement1, svgelement2, labelnode, svgmeno)
    };


    svgelement2.onmouseover = function () {
        svgelement1.setAttributeNS(null, "stroke", "blue");
        if (element.arctype === "inhibitor")
            svgelement2.setAttributeNS(null, "fill", "white");
        else
            svgelement2.setAttributeNS(null, "fill", "blue");
        svgelement2.setAttributeNS(null, "stroke", "blue");
    };
    svgelement2.onmouseout = function () {
        svgelement1.setAttributeNS(null, "stroke", "black");
        if (element.arctype === "inhibitor")
            svgelement2.setAttributeNS(null, "fill", "white");
        else
            svgelement2.setAttributeNS(null, "fill", "black");
        svgelement2.setAttributeNS(null, "stroke", "black");
    };
    svgelement2.onmousedown = function () {
        if (document.getElementById("delete").checked) {
            canvas.remove(svgelement);
            canvas.remove(svgelement1);
            canvas.remove(svgelement2);

            svgmeno.removeChild(labelnode);
            canvas.remove(svgmeno);

            let i = arcs.indexOf(element);
            arcs.splice(i, 1);
        }

    };
    svgmeno.onmousedown = function () {
        if (document.getElementById("arc_weight").checked && (element.arctype !== "reset")) {

            let vaha = element.vaha;

            let zadane = prompt("Please enter positive arc weight", element.vaha);

            if (zadane != null) {
                vaha = parseInt(zadane);

                if (isNaN(vaha)) {
                    alert("Not a number");
                }
                if (vaha <= 0)
                    alert("Not positive number");

                if (!isNaN(vaha) && vaha > 0) {
                    element.vaha = vaha;
                    element.dataref = false;
                    if (vaha === 1)
                        element.vahalabel = "";
                    else
                        element.vahalabel = vaha;
                    labelnode.nodeValue = element.vahalabel;
                }
            }
        }
        if (document.getElementById("arc_dataref").checked && (element.arctype !== "reset")) {
            attach_data_to_arc(element);
        }
    };
    svgmeno.onmouseout = function () {
        svgmeno.setAttributeNS(null, "fill", "black");
    };
    svgmeno.onmouseover = function () {
        svgmeno.setAttributeNS(null, "fill", "blue");
    };

    return new objektyhrany(svgelement, svgelement1, svgelement2, svgmeno, labelnode);
}

function mysdownnahrane(event, element, svgelement, svgelement1, svgelement2, labelnode, svgmeno) {
    if (document.getElementById("delete").checked) {

        let novy_bod = new Point(0, 0);

        novy_bod.x = getMousePositionX(event);

        novy_bod.y = getMousePositionY(event);
        let deletujembod = 0;

        for (let i = 1; i < element.bodyhrany.length - 1; i++) {
            if (Math.abs(element.bodyhrany[i].x - novy_bod.x) <= 5 && Math.abs(element.bodyhrany[i].y - novy_bod.y) <= 5) {
                element.bodyhrany.splice(i, 1);
                updatehranusvg(element);
                deletujembod = 1;
                break;
            }
        }
        if (deletujembod === 0) {
            canvas.remove(svgelement);
            canvas.remove(svgelement1);
            canvas.remove(svgelement2);
            svgmeno.removeChild(labelnode);
            canvas.remove(svgmeno);

            let i = arcs.indexOf(element);
            arcs.splice(i, 1);
        }
    }

    if (document.getElementById("position").checked) {
        let novy_bod = new Point(0, 0);

        novy_bod.x = getMousePositionX(event);

        novy_bod.y = getMousePositionY(event);

        for (let i = 1; i < element.bodyhrany.length - 1; i++) {
            if (Math.abs(element.bodyhrany[i].x - novy_bod.x) <= 5 && Math.abs(element.bodyhrany[i].y - novy_bod.y) <= 5) {
                indexbodu = i;
                let doit = false;
                let novex = element.bodyhrany[i].x;
                let novey = element.bodyhrany[i].y;
                let a = prompt("Please enter x-coordinate of the point (not smaller than " + posunutie_suradnic + " and not greater than " + maxx + " ):", element.bodyhrany[i].x);
                if (a != null) {
                    let x = parseInt(a);
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
                let b = prompt("Please enter y-coordinate of the point (not smaller than " + posunutie_suradnic + " and not greater than " + maxy + " ):", element.bodyhrany[i].y);
                if (b != null) {
                    let y = parseInt(b);
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
                if (doit) {
                    element.bodyhrany[i].x = novex;
                    element.bodyhrany[i].y = novey;
                    updatehranusvg(element);
                }
                break;
            }
        }
    }

    if (document.getElementById("move").checked) {
        if (posuva_sa_hrana === 0) {

            let novy_bod = new Point(0, 0);

            novy_bod.x = getMousePositionX(event);

            novy_bod.y = getMousePositionY(event);

            for (let i = 1; i < element.bodyhrany.length - 1; i++) {
                if (Math.abs(element.bodyhrany[i].x - novy_bod.x) <= 5 && Math.abs(element.bodyhrany[i].y - novy_bod.y) <= 5) {
                    indexbodu = i;
                    posuvanahrana = element;
                    posuva_sa_hrana = 1;
                    updatehranusvg(element);
                    break;
                }
            }

            if (posuva_sa_hrana === 0) {
                for (let i = 0; i < element.bodyhrany.length - 1; i++) {
                    let dx = element.bodyhrany[i + 1].x - element.bodyhrany[i].x;
                    let dy = element.bodyhrany[i + 1].y - element.bodyhrany[i].y;
                    let dxn = novy_bod.x - element.bodyhrany[i].x;
                    let dyn = novy_bod.y - element.bodyhrany[i].y;
                    let dlzkahrany = Math.sqrt(dx * dx + dy * dy);
                    let dlzkapomys = Math.sqrt(dxn * dxn + dyn * dyn);
                    let pomer = dlzkapomys / dlzkahrany;
                    let nx = element.bodyhrany[i].x + dx * pomer;
                    let ny = element.bodyhrany[i].y + dy * pomer;

                    if (Math.abs(nx - novy_bod.x) <= 2 && Math.abs(ny - novy_bod.y) <= 2) {
                        element.bodyhrany.splice(i + 1, 0, novy_bod);
                        indexbodu = i + 1;
                        posuvanahrana = element;
                        posuva_sa_hrana = 1;
                        updatehranusvg(element);
                        break;
                    }
                }
            }
        }
    }

    if (document.getElementById("arc_weight").checked && (element.arctype !== "reset")) {

        let vaha = element.vaha;

        let zadane = prompt("Please enter positive arc weight", element.vaha);

        if (zadane != null) {
            vaha = parseInt(zadane);
            if (isNaN(vaha))
                alert("Not a number");

            if (vaha <= 0)
                alert("Not positive number");

            if (!isNaN(vaha) && vaha > 0) {
                element.vaha = vaha;
                element.dataref = false;
                if (vaha === 1)
                    element.vahalabel = "";
                else
                    element.vahalabel = vaha;
                labelnode.nodeValue = element.vahalabel;
            }
        }
    }
    if (document.getElementById("arc_dataref").checked && (element.arctype !== "reset")) {
        attach_data_to_arc(element);
    }
}

function objektyhrany(a, b, c, d, e) {
    this.polyciarapod = a;
    this.polyciara = b;
    this.sipka = c;
    this.vahaelem = d;
    this.vaha = e;
}

function objektyhranymove(a, b, arctype) {
    this.polyciara = a;
    this.sipka = b;
    this.arctype = arctype;
}

function prvebodyhrany(source, target) {
    let polebodov = [];
    polebodov[0] = zaciatok_hrany(source, target);
    polebodov[1] = koniec_hrany(source, target);
    return polebodov;
}

function skrattemphranu(zaciatok, koniec) {
    let dx = koniec.x - zaciatok.x;
    let dy = koniec.y - zaciatok.y;
    let dlzkahrany = Math.sqrt(dx * dx + dy * dy);
    let dlzkaskratena = dlzkahrany - arrowHeadSize + 2;
    let pomer = dlzkaskratena / dlzkahrany;
    let nx = zaciatok.x + dx * pomer;
    let ny = zaciatok.y + dy * pomer;

    return new Point(nx, ny);
}

function skrathranu(element) {
    let i = element.bodyhrany.length - 2;
    let dx = element.bodyhrany[i + 1].x - element.bodyhrany[i].x;
    let dy = element.bodyhrany[i + 1].y - element.bodyhrany[i].y;
    let dlzkahrany = Math.sqrt(dx * dx + dy * dy);
    let dlzkaskratena = dlzkahrany - arrowHeadSize + 2;
    let pomer = dlzkaskratena / dlzkahrany;
    let nx = element.bodyhrany[i].x + dx * pomer;
    let ny = element.bodyhrany[i].y + dy * pomer;

    return new Point(nx, ny);
}

function updatehranusvg(hrana) {
    let text = "";
    let last = hrana.bodyhrany.length - 1;
    let stred = parseInt(last / 2);

    if (hrana.bodyhrany.length > 2) {
        hrana.bodyhrany[0] = zaciatok_hrany(hrana.source, hrana.bodyhrany[1]);
        hrana.bodyhrany[last] = koniec_hrany(hrana.bodyhrany[last - 1], hrana.target);
    }
    else {
        hrana.bodyhrany[0] = zaciatok_hrany(hrana.source, hrana.target);
        hrana.bodyhrany[last] = koniec_hrany(hrana.source, hrana.target);
    }

    let bodvaha = bodvahy(hrana.bodyhrany[stred], hrana.bodyhrany[stred + 1]);
    for (let i = 0; i < hrana.bodyhrany.length - 1; i++) {
        text = text + hrana.bodyhrany[i].x + "," + hrana.bodyhrany[i].y + " ";
    }

    let skratenykoniec = skrathranu(hrana);
    text = text + skratenykoniec.x + "," + skratenykoniec.y;

    if (posuva_sa_hrana === 1) {
        hrana.objektyhrany.polyciara.setAttributeNS(null, "stroke", "red");
        hrana.objektyhrany.sipka.setAttributeNS(null, "stroke", "red");
        if (hrana.arctype === "inhibitor")
            hrana.objektyhrany.sipka.setAttributeNS(null, "fill", "white");
        else
            hrana.objektyhrany.sipka.setAttributeNS(null, "fill", "red");
    } else {
        hrana.objektyhrany.polyciara.setAttributeNS(null, "stroke", "black");

        hrana.objektyhrany.sipka.setAttributeNS(null, "stroke", "black");
        if (hrana.arctype === "inhibitor")
            hrana.objektyhrany.sipka.setAttributeNS(null, "fill", "white");
        else
            hrana.objektyhrany.sipka.setAttributeNS(null, "fill", "black");

    }

    hrana.objektyhrany.polyciarapod.setAttributeNS(null, "points", text);
    hrana.objektyhrany.polyciara.setAttributeNS(null, "points", text);

    if (hrana.arctype === "inhibitor" || hrana.arctype === "read") {
        hrana.objektyhrany.sipka.setAttributeNS(null, "cx", bodInhibitorSipky(hrana.bodyhrany[last - 1].x, hrana.bodyhrany[last - 1].y, hrana.bodyhrany[last].x, hrana.bodyhrany[last].y).x);
        hrana.objektyhrany.sipka.setAttributeNS(null, "cy", bodInhibitorSipky(hrana.bodyhrany[last - 1].x, hrana.bodyhrany[last - 1].y, hrana.bodyhrany[last].x, hrana.bodyhrany[last].y).y);
    } else {
        hrana.objektyhrany.sipka.setAttributeNS(null, "points", bodySipky(hrana.bodyhrany[last - 1].x, hrana.bodyhrany[last - 1].y, hrana.bodyhrany[last].x, hrana.bodyhrany[last].y, hrana.arctype));
    }

    hrana.objektyhrany.vahaelem.setAttributeNS(null, "x", `${bodvaha.x - vahaoffset / 3}`);
    hrana.objektyhrany.vahaelem.setAttributeNS(null, "y", `${bodvaha.y + vahaoffset / 2}`);
}

function Arc(source, target, arctype, canvas) {
    this.type = "arc";
    this.arctype = arctype;
    this.id = attachid();
    this.source = source;
    this.target = target;
    this.arrowHeadSize = arrowHeadSize;
    this.vaha = 1;
    this.vahalabel = "";
    this.bodyhrany = prvebodyhrany(source, target);
    this.objektyhrany = novy_svg_arc(this, canvas, undefined, xmlns, this.bodyhrany[0], this.bodyhrany[1]);
    this.dataref = false;
}

function bodvahy(startbod, endbod) {
    let startPoint_x = startbod.x;
    let startPoint_y = startbod.y;
    let endPoint_x = endbod.x;
    let endPoint_y = endbod.y;

    let dx = (endPoint_x - startPoint_x) / 2;
    let dy = (endPoint_y - startPoint_y) / 2;

    let length = Math.sqrt(dx * dx + dy * dy);
    let unitDx = dx / length;
    let unitDy = dy / length;
    let x;
    let y;

    if (dx >= 0 && dy >= 0) {
        x = (endPoint_x - dx + unitDy * vahaoffset);
        y = (endPoint_y - dy - unitDx * vahaoffset);
    }
    if (dx >= 0 && dy < 0) {
        x = (endPoint_x - dx - unitDy * vahaoffset);
        y = (endPoint_y - dy + unitDx * vahaoffset);
    }
    if (dx < 0 && dy > 0) {
        x = (endPoint_x - dx + unitDy * vahaoffset);
        y = (endPoint_y - dy - unitDx * vahaoffset);
    }
    if (dx < 0 && dy <= 0) {
        x = (endPoint_x - dx - unitDy * vahaoffset);
        y = (endPoint_y - dy + unitDx * vahaoffset);
    }

    return new Point(x, y);
}

function bodInhibitorSipky(startPoint_x, startPoint_y, endPoint_x, endPoint_y) {
    let dx = endPoint_x - startPoint_x;
    let dy = endPoint_y - startPoint_y;

    let length = Math.sqrt(dx * dx + dy * dy);
    let unitDx = dx / length;
    let unitDy = dy / length;

    let inhibitorPoint_x = (endPoint_x - unitDx * arrowHeadSize / 2);
    let inhibitorPoint_y = (endPoint_y - unitDy * arrowHeadSize / 2);

    return new Point(inhibitorPoint_x, inhibitorPoint_y);
}

function bodySipky(startPoint_x, startPoint_y, endPoint_x, endPoint_y, arctype) {

    var dx = endPoint_x - startPoint_x;
    var dy = endPoint_y - startPoint_y;

    var length = Math.sqrt(dx * dx + dy * dy);
    var unitDx = dx / length;
    var unitDy = dy / length;

    var arrowPoint1_x = (endPoint_x - unitDx * arrowHeadSize - 0.5 * unitDy * arrowHeadSize);
    var arrowPoint1_y = (endPoint_y - unitDy * arrowHeadSize + 0.5 * unitDx * arrowHeadSize);

    var arrowPoint2_x = (endPoint_x - unitDx * arrowHeadSize + 0.5 * unitDy * arrowHeadSize);
    var arrowPoint2_y = (endPoint_y - unitDy * arrowHeadSize - 0.5 * unitDx * arrowHeadSize);

    if (arctype === "reset") {
        var arrowPoint3_x = (endPoint_x - unitDx * arrowHeadSize);
        var arrowPoint3_y = (endPoint_y - unitDy * arrowHeadSize);
        var arrowPoint4_x = (arrowPoint3_x - unitDx * arrowHeadSize - 0.5 * unitDy * arrowHeadSize);
        var arrowPoint4_y = (arrowPoint3_y - unitDy * arrowHeadSize + 0.5 * unitDx * arrowHeadSize);

        var arrowPoint5_x = (arrowPoint3_x - unitDx * arrowHeadSize + 0.5 * unitDy * arrowHeadSize);
        var arrowPoint5_y = (arrowPoint3_y - unitDy * arrowHeadSize - 0.5 * unitDx * arrowHeadSize);

        return (endPoint_x + "," + endPoint_y + " " + arrowPoint1_x + "," + arrowPoint1_y + " " + arrowPoint3_x + "," + arrowPoint3_y + " " + arrowPoint4_x + "," + arrowPoint4_y + " " + arrowPoint5_x + "," + arrowPoint5_y + " " + arrowPoint3_x + "," + arrowPoint3_y + " " + arrowPoint2_x + "," + arrowPoint2_y + " ");

    }

    return (endPoint_x + "," + endPoint_y + " " + arrowPoint1_x + "," + arrowPoint1_y + " " + arrowPoint2_x + "," + arrowPoint2_y + " ");
}

function zaciatok_hrany(startElement, endElement) {

    var startPoint_x = startElement.x;
    var startPoint_y = startElement.y;
    var endPoint_x = endElement.x;
    var endPoint_y = endElement.y;
    var dx = endPoint_x - startPoint_x;
    var dy = endPoint_y - startPoint_y;

    var dlzka_hrany = Math.sqrt(dx * dx + dy * dy);
    var pdx = polomer * dx / dlzka_hrany;
    var pdy = polomer * dy / dlzka_hrany;
    var tdx = 0;

    if (dx * dx >= dy * dy) tdx = velkost / 2;
    else tdx = (velkost / 2) * (dx / dy);

    var tdy = 0;
    if (dx * dx >= dy * dy) tdy = (velkost / 2) * (dy / dx);
    else tdy = velkost / 2;

    if (startElement.type === "place") {

        var snovex = startPoint_x + pdx;
        var snovey = startPoint_y + pdy;
        return new Point(snovex, snovey);
    }

    if (startElement.type === "transition") {
        if ((dx * dx >= dy * dy && dx >= 0) || (dx * dx < dy * dy && dy >= 0)) {
            var snovex = startPoint_x + tdx;
            var snovey = startPoint_y + tdy;
        }
        else {
            var snovex = startPoint_x - tdx;
            var snovey = startPoint_y - tdy;
        }
        return new Point(snovex, snovey);
    }
}

function koniec_hrany(startElement, endElement) {

    var startPoint_x = startElement.x;
    var startPoint_y = startElement.y;
    var endPoint_x = endElement.x;
    var endPoint_y = endElement.y;
    var dx = endPoint_x - startPoint_x;
    var dy = endPoint_y - startPoint_y;

    var dlzka_hrany = Math.sqrt(dx * dx + dy * dy);
    var pdx = polomer * dx / dlzka_hrany;
    var pdy = polomer * dy / dlzka_hrany;
    var tdx = 0;

    if (dx * dx >= dy * dy) tdx = velkost / 2;
    else tdx = (velkost / 2) * (dx / dy);

    var tdy = 0;
    if (dx * dx >= dy * dy) tdy = (velkost / 2) * (dy / dx);
    else tdy = velkost / 2;

    if (endElement.type === "transition") {
        if ((dx * dx >= dy * dy && dx >= 0) || (dx * dx < dy * dy && dy >= 0)) {
            var tnovex = endPoint_x - tdx;
            var tnovey = endPoint_y - tdy;
        }
        else {
            var tnovex = endPoint_x + tdx;
            var tnovey = endPoint_y + tdy;
        }
        return new Point(tnovex, tnovey);
    }

    if (endElement.type === "place") {
        var tnovex = endPoint_x - pdx;
        var tnovey = endPoint_y - pdy;
        return new Point(tnovex, tnovey);
    }
}

function reset() {
    reset_hranu();

    if (document.getElementById("fire").checked) {
        for (let i = 0; i < transitions.length; i++) {
            if (enabled(transitions[i])) {
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

function labelypredhranyprve(canvas) {
    for (let i = 0; i < places.length; i++) {
        canvas.add(places[i].objektymiesta.zamenom);
        canvas.add(places[i].objektymiesta.menoelem);

        sirkatextu = places[i].objektymiesta.menoelem.getComputedTextLength();
        places[i].objektymiesta.zamenom.setAttributeNS(null, "x", places[i].x - sirkatextu / 2);
        places[i].objektymiesta.zamenom.setAttributeNS(null, "width", sirkatextu);
        places[i].objektymiesta.menoelem.setAttributeNS(null, "x", places[i].x - sirkatextu / 2);

    }
    for (let i = 0; i < transitions.length; i++) {
        canvas.add(transitions[i].objektyelementu.zamenom);
        canvas.add(transitions[i].objektyelementu.menoelem);

        sirkatextu = transitions[i].objektyelementu.menoelem.getComputedTextLength();

        transitions[i].objektyelementu.zamenom.setAttributeNS(null, "x", transitions[i].x - sirkatextu / 2);
        transitions[i].objektyelementu.zamenom.setAttributeNS(null, "width", sirkatextu);
        transitions[i].objektyelementu.menoelem.setAttributeNS(null, "x", transitions[i].x - sirkatextu / 2);
    }
}