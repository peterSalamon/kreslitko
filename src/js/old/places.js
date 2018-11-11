// function objektymiesta(a, b, c, d, e, f) {
//     this.element = a;
//     this.menoelem = b;
//     this.meno = c;
//     this.svgmarking = d;
//     this.markingnode = e;
//     this.zamenom = f;
// }
//
// function updatemarkings() {
//     for (let i = 0; i < places.length; i++) {
//         updatetokeny(places[i]);
//     }
// }
//
// function updatetokeny(place) {
//     if (place.marking >= 0 && place.marking <= 9)
//         place.markinglabel = "";
//     else
//         place.markinglabel = place.marking;
//
//     switch (place.marking) {
//         case 1:
//             place.markingtokens[0].setAttributeNS(null, "fill", "black");
//             place.markingtokens[1].setAttributeNS(null, "fill", "white");
//             place.markingtokens[2].setAttributeNS(null, "fill", "white");
//             place.markingtokens[3].setAttributeNS(null, "fill", "white");
//             place.markingtokens[4].setAttributeNS(null, "fill", "white");
//             place.markingtokens[5].setAttributeNS(null, "fill", "white");
//             place.markingtokens[6].setAttributeNS(null, "fill", "white");
//             place.markingtokens[7].setAttributeNS(null, "fill", "white");
//             place.markingtokens[8].setAttributeNS(null, "fill", "white");
//             break;
//         case 2:
//             place.markingtokens[0].setAttributeNS(null, "fill", "white");
//             place.markingtokens[1].setAttributeNS(null, "fill", "white");
//             place.markingtokens[2].setAttributeNS(null, "fill", "black");
//             place.markingtokens[3].setAttributeNS(null, "fill", "black");
//             place.markingtokens[4].setAttributeNS(null, "fill", "white");
//             place.markingtokens[5].setAttributeNS(null, "fill", "white");
//             place.markingtokens[6].setAttributeNS(null, "fill", "white");
//             place.markingtokens[7].setAttributeNS(null, "fill", "white");
//             place.markingtokens[8].setAttributeNS(null, "fill", "white");
//             break;
//         case 3:
//             place.markingtokens[0].setAttributeNS(null, "fill", "black");
//             place.markingtokens[1].setAttributeNS(null, "fill", "white");
//             place.markingtokens[2].setAttributeNS(null, "fill", "black");
//             place.markingtokens[3].setAttributeNS(null, "fill", "black");
//             place.markingtokens[4].setAttributeNS(null, "fill", "white");
//             place.markingtokens[5].setAttributeNS(null, "fill", "white");
//             place.markingtokens[6].setAttributeNS(null, "fill", "white");
//             place.markingtokens[7].setAttributeNS(null, "fill", "white");
//             place.markingtokens[8].setAttributeNS(null, "fill", "white");
//             break;
//         case 4:
//             place.markingtokens[0].setAttributeNS(null, "fill", "white");
//             place.markingtokens[1].setAttributeNS(null, "fill", "black");
//             place.markingtokens[2].setAttributeNS(null, "fill", "black");
//             place.markingtokens[3].setAttributeNS(null, "fill", "black");
//             place.markingtokens[4].setAttributeNS(null, "fill", "black");
//             place.markingtokens[5].setAttributeNS(null, "fill", "white");
//             place.markingtokens[6].setAttributeNS(null, "fill", "white");
//             place.markingtokens[7].setAttributeNS(null, "fill", "white");
//             place.markingtokens[8].setAttributeNS(null, "fill", "white");
//             break;
//         case 5:
//             place.markingtokens[0].setAttributeNS(null, "fill", "black");
//             place.markingtokens[1].setAttributeNS(null, "fill", "black");
//             place.markingtokens[2].setAttributeNS(null, "fill", "black");
//             place.markingtokens[3].setAttributeNS(null, "fill", "black");
//             place.markingtokens[4].setAttributeNS(null, "fill", "black");
//             place.markingtokens[5].setAttributeNS(null, "fill", "white");
//             place.markingtokens[6].setAttributeNS(null, "fill", "white");
//             place.markingtokens[7].setAttributeNS(null, "fill", "white");
//             place.markingtokens[8].setAttributeNS(null, "fill", "white");
//             break;
//         case 6:
//             place.markingtokens[0].setAttributeNS(null, "fill", "white");
//             place.markingtokens[1].setAttributeNS(null, "fill", "black");
//             place.markingtokens[2].setAttributeNS(null, "fill", "black");
//             place.markingtokens[3].setAttributeNS(null, "fill", "black");
//             place.markingtokens[4].setAttributeNS(null, "fill", "black");
//             place.markingtokens[5].setAttributeNS(null, "fill", "black");
//             place.markingtokens[6].setAttributeNS(null, "fill", "black");
//             place.markingtokens[7].setAttributeNS(null, "fill", "white");
//             place.markingtokens[8].setAttributeNS(null, "fill", "white");
//             break;
//         case 7:
//             place.markingtokens[0].setAttributeNS(null, "fill", "black");
//             place.markingtokens[1].setAttributeNS(null, "fill", "black");
//             place.markingtokens[2].setAttributeNS(null, "fill", "black");
//             place.markingtokens[3].setAttributeNS(null, "fill", "black");
//             place.markingtokens[4].setAttributeNS(null, "fill", "black");
//             place.markingtokens[5].setAttributeNS(null, "fill", "black");
//             place.markingtokens[6].setAttributeNS(null, "fill", "black");
//             place.markingtokens[7].setAttributeNS(null, "fill", "white");
//             place.markingtokens[8].setAttributeNS(null, "fill", "white");
//             break;
//         case 8:
//             place.markingtokens[0].setAttributeNS(null, "fill", "white");
//             place.markingtokens[1].setAttributeNS(null, "fill", "black");
//             place.markingtokens[2].setAttributeNS(null, "fill", "black");
//             place.markingtokens[3].setAttributeNS(null, "fill", "black");
//             place.markingtokens[4].setAttributeNS(null, "fill", "black");
//             place.markingtokens[5].setAttributeNS(null, "fill", "black");
//             place.markingtokens[6].setAttributeNS(null, "fill", "black");
//             place.markingtokens[7].setAttributeNS(null, "fill", "black");
//             place.markingtokens[8].setAttributeNS(null, "fill", "black");
//             break;
//         case 9:
//             place.markingtokens[0].setAttributeNS(null, "fill", "black");
//             place.markingtokens[1].setAttributeNS(null, "fill", "black");
//             place.markingtokens[2].setAttributeNS(null, "fill", "black");
//             place.markingtokens[3].setAttributeNS(null, "fill", "black");
//             place.markingtokens[4].setAttributeNS(null, "fill", "black");
//             place.markingtokens[5].setAttributeNS(null, "fill", "black");
//             place.markingtokens[6].setAttributeNS(null, "fill", "black");
//             place.markingtokens[7].setAttributeNS(null, "fill", "black");
//             place.markingtokens[8].setAttributeNS(null, "fill", "black");
//             break;
//         default:
//             place.markingtokens[0].setAttributeNS(null, "fill", "white");
//             place.markingtokens[1].setAttributeNS(null, "fill", "white");
//             place.markingtokens[2].setAttributeNS(null, "fill", "white");
//             place.markingtokens[3].setAttributeNS(null, "fill", "white");
//             place.markingtokens[4].setAttributeNS(null, "fill", "white");
//             place.markingtokens[5].setAttributeNS(null, "fill", "white");
//             place.markingtokens[6].setAttributeNS(null, "fill", "white");
//             place.markingtokens[7].setAttributeNS(null, "fill", "white");
//             place.markingtokens[8].setAttributeNS(null, "fill", "white");
//     }
//
//     place.objektymiesta.markingnode.nodeValue = place.markinglabel;
//     sirkatextu = place.objektymiesta.svgmarking.getComputedTextLength();
//     place.objektymiesta.svgmarking.setAttributeNS(null, "x", place.x - sirkatextu / 2);
// }
//
// function novy_svg_place(element, canvas, xmlns, x, y, polomer) {
//     var svgelement = document.createElementNS(xmlns, "circle");
//
//     svgelement.setAttributeNS(null, "cx", x);
//     svgelement.setAttributeNS(null, "cy", y);
//     svgelement.setAttributeNS(null, "r", polomer);
//     svgelement.setAttributeNS(null, "fill", "white");
//     svgelement.setAttributeNS(null, "stroke", "black");
//     if (element.static) {
//         svgelement.setAttributeNS(null, "stroke-dasharray", "14, 5");
//         svgelement.setAttributeNS(null, "stroke-width", "3");
//     }
//     else
//         svgelement.setAttributeNS(null, "stroke-width", "2");
//
//     canvas.add(svgelement);
//
//     tokeny(element, canvas);
//
//     var svgzamenom = document.createElementNS(xmlns, "rect");
//
//     svgzamenom.setAttributeNS(null, "x", x);
//     svgzamenom.setAttributeNS(null, "y", y + polomer + fontsizeoffset - korekcia);
//     svgzamenom.setAttributeNS(null, "width", 0);
//     svgzamenom.setAttributeNS(null, "height", fontsize);
//     svgzamenom.setAttributeNS(null, "fill-opacity", "0.7");
//     svgzamenom.setAttributeNS(null, "fill", "white");
//     canvas.add(svgzamenom);
//
//
//     var svgmeno = document.createElementNS(xmlns, "text");
//     svgmeno.setAttributeNS(null, "x", x);
//     svgmeno.setAttributeNS(null, "y", y + polomer + fontsizeoffset);
//     svgmeno.setAttributeNS(null, "font-size", fontsize);
//     svgmeno.setAttributeNS(null, "font-family", fontfamily);
//
//     var labelnode = document.createTextNode(!element.label ? "#"+element.id : element.label);
//     svgmeno.appendChild(labelnode);
//     canvas.add(svgmeno);
//     sirkatextu = svgmeno.getComputedTextLength();
//
//     svgzamenom.setAttributeNS(null, "x", x - sirkatextu / 2);
//     svgmeno.setAttributeNS(null, "x", x - sirkatextu / 2);
//
//     var svgmarking = document.createElementNS(xmlns, "text");
//     svgmarking.setAttributeNS(null, "x", x);
//     svgmarking.setAttributeNS(null, "y", y + fontsize / 2);
//     svgmarking.setAttributeNS(null, "font-size", fontsize);
//     svgmarking.setAttributeNS(null, "font-family", fontfamily);
//
//     var markingnode = document.createTextNode(element.markinglabel);
//     svgmarking.appendChild(markingnode);
//     canvas.add(svgmarking);
//     sirkatextu = svgmarking.getComputedTextLength();
//
//     svgmarking.setAttributeNS(null, "x", x - sirkatextu / 2);
//
//     svgelement.onmouseover = function () {
//         svgelement.setAttributeNS(null, "stroke", "blue");
//         element.over = 1;
//     };
//     svgelement.onmouseout = function () {
//         svgelement.setAttributeNS(null, "stroke", "black");
//         element.over = 0;
//     };
//     svgelement.onmousedown = function () {
//         onplacedown(element, canvas, svgelement, svgmeno, labelnode, svgmarking, markingnode, svgzamenom)
//     };
//
//     for (let i = 0; i < element.markingtokens.length; i++) {
//         element.markingtokens[i].onmouseover = function () {
//             svgelement.setAttributeNS(null, "stroke", "blue");
//             element.over = 1;
//         };
//         element.markingtokens[i].onmouseout = function () {
//             svgelement.setAttributeNS(null, "stroke", "black");
//             element.over = 0;
//         };
//         element.markingtokens[i].onmousedown = function () {
//             onplacedown(element,canvas,  svgelement, svgmeno, labelnode, svgmarking, markingnode, svgzamenom)
//         };
//     }
//
//     svgmarking.onmousedown = function () {
//         onplacedown(element, canvas, svgelement, svgmeno, labelnode, svgmarking, markingnode, svgzamenom)
//     };
//     svgmarking.onmouseover = function () {
//         svgelement.setAttributeNS(null, "stroke", "blue");
//         element.over = 1;
//     };
//     svgmarking.onmouseout = function () {
//         svgelement.setAttributeNS(null, "stroke", "black");
//         element.over = 0;
//     };
//
//     svgmeno.onmousedown = function () {
//         if (document.getElementById("label").checked) {
//             var label = prompt("Please enter place label", element.label);
//             if (label != null) {
//                 element.label = label;
//                 labelnode.nodeValue = element.label;
//                 sirkatextu = svgmeno.getComputedTextLength();
//                 svgzamenom.setAttributeNS(null, "x", element.x - sirkatextu / 2);
//                 svgzamenom.setAttributeNS(null, "width", sirkatextu);
//                 svgmeno.setAttributeNS(null, "x", element.x - sirkatextu / 2);
//             }
//         }
//     };
//     svgmeno.onmouseout = function () {
//         svgmeno.setAttributeNS(null, "fill", "black");
//     };
//     svgmeno.onmouseover = function () {
//         svgmeno.setAttributeNS(null, "fill", "blue");
//     };
//
//     return new objektymiesta(svgelement, svgmeno, labelnode, svgmarking, markingnode, svgzamenom);
// }
//
// function onplacedown(element,canvas, svgelement, svgmeno, labelnode, svgmarking, markingnode, svgzamenom) {
//     if (document.getElementById("delete").checked) {
//         previousStatus = generujXML(1);
//         for (let i = 0; i < arcs.length; i++) {
//             if (element === arcs[i].source || element === arcs[i].target) {
//                 canvas.remove(arcs[i].objektyhrany.polyciarapod);
//                 canvas.remove(arcs[i].objektyhrany.polyciara);
//                 canvas.remove(arcs[i].objektyhrany.sipka);
//                 arcs[i].objektyhrany.vahaelem.removeChild(arcs[i].objektyhrany.vaha);
//                 canvas.remove(arcs[i].objektyhrany.vahaelem);
//                 arcs.splice(i, 1);
//                 i--;
//             }
//         }
//
//         canvas.remove(svgelement);
//         canvas.remove(svgzamenom);
//         svgmeno.removeChild(labelnode);
//         canvas.remove(svgmeno);
//         for (let i = 0; i < element.markingtokens.length; i++) {
//             canvas.remove(element.markingtokens[i]);
//         }
//         svgmarking.removeChild(markingnode);
//         canvas.remove(svgmarking);
//
//         var j = places.indexOf(element);
//         places.splice(j, 1);
//     }
//
//     if (document.getElementById("arc").checked) {
//         if (kresli_sa_hrana === 0) {
//             source_hrany = element;
//             kresli_sa_hrana = 1;
//             bod.x = element.x + arrowHeadSize; //event.pageX - canvas.getBoundingClientRect().left;
//             bod.y = element.y; //event.pageY - canvas.getBoundingClientRect().top;
//             hranabymove = novy_svg_temp_arc(canvas, xmlns, element, bod, "regular");
//         }
//         else {
//             if (source_hrany.type !== element.type) {
//                 var actual = arcs.length;
//                 arcs[actual] = new Arc(source_hrany, element, "regular", canvas);
//                 var elem = arcs[actual].svgelement1;
//                 elementypredhrany(canvas);
//                 labelypredhranyprve(canvas);
//             }
//         }
//     }
//
//     if (document.getElementById("resetarc").checked) {
//         if (kresli_sa_hrana === 0) {
//             source_hrany = element;
//             kresli_sa_hrana = 1;
//             bod.x = element.x + arrowHeadSize; //event.pageX - canvas.getBoundingClientRect().left;
//             bod.y = element.y; //event.pageY - canvas.getBoundingClientRect().top;
//             hranabymove = novy_svg_temp_arc(canvas, xmlns, element, bod, "reset");
//         }
//     }
//
//     if (document.getElementById("inhibitorarc").checked) {
//         if (kresli_sa_hrana === 0) {
//             source_hrany = element;
//             kresli_sa_hrana = 1;
//             bod.x = element.x + arrowHeadSize; //event.pageX - canvas.getBoundingClientRect().left;
//             bod.y = element.y; //event.pageY - canvas.getBoundingClientRect().top;
//             hranabymove = novy_svg_temp_arc(canvas, xmlns, element, bod, "inhibitor");
//         }
//     }
//
//     if (document.getElementById("readarc").checked) {
//         if (kresli_sa_hrana === 0) {
//             source_hrany = element;
//             kresli_sa_hrana = 1;
//             bod.x = element.x + arrowHeadSize; //event.pageX - canvas.getBoundingClientRect().left;
//             bod.y = element.y; //event.pageY - canvas.getBoundingClientRect().top;
//             hranabymove = novy_svg_temp_arc(canvas, xmlns, element, bod, "read");
//         }
//     }
//
//     if (document.getElementById("label").checked) {
//         previousStatus = generujXML(1);
//         var label = prompt("Please enter place label", element.label);
//         if (label != null) {
//             element.label = label;
//             labelnode.nodeValue = element.label;
//             sirkatextu = svgmeno.getComputedTextLength();
//             svgzamenom.setAttributeNS(null, "x", element.x - sirkatextu / 2);
//             svgzamenom.setAttributeNS(null, "width", sirkatextu);
//             svgmeno.setAttributeNS(null, "x", element.x - sirkatextu / 2);
//         }
//     }
//
//     if (document.getElementById("marking").checked) {
//         previousStatus = generujXML(1);
//         updatemarkingsvg(element);
//     }
//
//     if (document.getElementById("addtoken").checked) {
//         previousStatus = generujXML(1);
//         element.marking++;
//         updatetokeny(element);
//     }
//
//     if (document.getElementById("removetoken").checked) {
//         previousStatus = generujXML(1);
//         if (element.marking > 0) {
//             element.marking--;
//             updatetokeny(element);
//         }
//     }
//
//     if (document.getElementById("position").checked) {
//         var doit = false;
//         var novex = element.x;
//         var novey = element.y;
//         var a = prompt("Please enter x-coordinate of the place (not smaller than " + posunutie_suradnic + " and not greater than " + maxx + " ):", element.x);
//         if (a != null) {
//             var x = parseInt(a);
//             if (isNaN(x)) {
//                 alert("x is not a number");
//             } else {
//                 if (x <= posunutie_suradnic || maxx <= x)
//                     alert("x is out of dimension");
//                 else {
//                     novex = x;
//                     doit = true;
//                 }
//             }
//         }
//
//         var b = prompt("Please enter y-coordinate of the place (not smaller than " + posunutie_suradnic + " and not greater than " + maxy + " ):", element.y);
//         if (b != null) {
//             var y = parseInt(b);
//             if (isNaN(y)) {
//                 alert("y is not a number");
//             } else {
//                 if (y <= posunutie_suradnic || maxy <= y)
//                     alert("y is out of dimension");
//                 else {
//                     novey = y;
//                     doit = true;
//                 }
//             }
//         }
//
//         if (doit)
//             movemiesto(element, novex, novey);
//     }
//
//     if (document.getElementById("move").checked) {
//         if (hybesamiesto === 0) {
//             hybesamiesto = 1;
//             movedmiesto = element;
//         }
//     }
// }
//
// function movemiesto(miesto, x, y) {
//     miesto.x = x;
//     miesto.y = y;
//
//     miesto.objektymiesta.element.setAttributeNS(null, "cx", x);
//     miesto.objektymiesta.element.setAttributeNS(null, "cy", y);
//     miesto.objektymiesta.element.setAttributeNS(null, "stroke", "red");
//
//     sirkatextu = miesto.objektymiesta.menoelem.getComputedTextLength();
//
//     miesto.objektymiesta.zamenom.setAttributeNS(null, "x", x - sirkatextu / 2);
//     miesto.objektymiesta.zamenom.setAttributeNS(null, "y", y + polomer + fontsizeoffset - korekcia);
//
//
//     miesto.objektymiesta.menoelem.setAttributeNS(null, "x", x - sirkatextu / 2);
//     miesto.objektymiesta.menoelem.setAttributeNS(null, "y", y + polomer + fontsizeoffset);
//
//     updatepositionmarking(miesto);
//
//     sirkatextu = miesto.objektymiesta.svgmarking.getComputedTextLength();
//     miesto.objektymiesta.svgmarking.setAttributeNS(null, "x", x - sirkatextu / 2);
//
//     miesto.objektymiesta.svgmarking.setAttributeNS(null, "y", y + fontsize / 2);
//
//     for (let i = 0; i < arcs.length; i++) {
//         if (miesto === arcs[i].source || miesto === arcs[i].target)
//             updatehranusvg(arcs[i]);
//     }
// }
//
// function Place(x, y, isStatic, canvas, id) {
//     this.type = "place";
//     this.static = isStatic;
//     this.id = !id ? attachid() : id;
//     this.index = 0;
//     this.x = x;
//     this.y = y;
//     this.polomer = polomer;
//     this.label = "";
//     this.over = 1;
//     this.marking = 0;
//     this.testmarking = 0;
//     this.markinglabel = "";
//     this.markingtokens = [];
//     this.objektymiesta = novy_svg_place(this, canvas, xmlns, x, y, this.polomer);
//
// }
//
// function updatepositionmarking(place) {
//     var x = place.x;
//     var y = place.y;
//
//     place.markingtokens[0].setAttributeNS(null, "cx", x);
//     place.markingtokens[0].setAttributeNS(null, "cy", y);
//
//     place.markingtokens[1].setAttributeNS(null, "cx", x + tokenposuv);
//     place.markingtokens[1].setAttributeNS(null, "cy", y + tokenposuv);
//
//     place.markingtokens[2].setAttributeNS(null, "cx", x - tokenposuv);
//     place.markingtokens[2].setAttributeNS(null, "cy", y + tokenposuv);
//
//     place.markingtokens[3].setAttributeNS(null, "cx", x + tokenposuv);
//     place.markingtokens[3].setAttributeNS(null, "cy", y - tokenposuv);
//
//     place.markingtokens[4].setAttributeNS(null, "cx", x - tokenposuv);
//     place.markingtokens[4].setAttributeNS(null, "cy", y - tokenposuv);
//
//     place.markingtokens[5].setAttributeNS(null, "cx", x - tokenposuv);
//     place.markingtokens[5].setAttributeNS(null, "cy", y);
//
//     place.markingtokens[6].setAttributeNS(null, "cx", x + tokenposuv);
//     place.markingtokens[6].setAttributeNS(null, "cy", y);
//
//     place.markingtokens[7].setAttributeNS(null, "cx", x);
//     place.markingtokens[7].setAttributeNS(null, "cy", y - tokenposuv);
//
//     place.markingtokens[8].setAttributeNS(null, "cx", x);
//     place.markingtokens[8].setAttributeNS(null, "cy", y + tokenposuv);
// }
//
// function tokeny(place, canvas) {
//     var x = place.x;
//     var y = place.y;
//
//     place.markingtokens[0] = document.createElementNS(xmlns, "circle");
//     place.markingtokens[0].setAttributeNS(null, "cx", x);
//     place.markingtokens[0].setAttributeNS(null, "cy", y);
//     place.markingtokens[0].setAttributeNS(null, "r", tokenpolomer);
//     place.markingtokens[0].setAttributeNS(null, "fill", "white");
//     canvas.add(place.markingtokens[0]);
//
//     place.markingtokens[1] = document.createElementNS(xmlns, "circle");
//     place.markingtokens[1].setAttributeNS(null, "cx", x + tokenposuv);
//     place.markingtokens[1].setAttributeNS(null, "cy", y + tokenposuv);
//     place.markingtokens[1].setAttributeNS(null, "r", tokenpolomer);
//     place.markingtokens[1].setAttributeNS(null, "fill", "white");
//     canvas.add(place.markingtokens[1]);
//
//     place.markingtokens[2] = document.createElementNS(xmlns, "circle");
//     place.markingtokens[2].setAttributeNS(null, "cx", x - tokenposuv);
//     place.markingtokens[2].setAttributeNS(null, "cy", y + tokenposuv);
//     place.markingtokens[2].setAttributeNS(null, "r", tokenpolomer);
//     place.markingtokens[2].setAttributeNS(null, "fill", "white");
//     canvas.add(place.markingtokens[2]);
//
//     place.markingtokens[3] = document.createElementNS(xmlns, "circle");
//     place.markingtokens[3].setAttributeNS(null, "cx", x + tokenposuv);
//     place.markingtokens[3].setAttributeNS(null, "cy", y - tokenposuv);
//     place.markingtokens[3].setAttributeNS(null, "r", tokenpolomer);
//     place.markingtokens[3].setAttributeNS(null, "fill", "white");
//     canvas.add(place.markingtokens[3]);
//
//     place.markingtokens[4] = document.createElementNS(xmlns, "circle");
//     place.markingtokens[4].setAttributeNS(null, "cx", x - tokenposuv);
//     place.markingtokens[4].setAttributeNS(null, "cy", y - tokenposuv);
//     place.markingtokens[4].setAttributeNS(null, "r", tokenpolomer);
//     place.markingtokens[4].setAttributeNS(null, "fill", "white");
//     canvas.add(place.markingtokens[4]);
//
//     place.markingtokens[5] = document.createElementNS(xmlns, "circle");
//     place.markingtokens[5].setAttributeNS(null, "cx", x - tokenposuv);
//     place.markingtokens[5].setAttributeNS(null, "cy", y);
//     place.markingtokens[5].setAttributeNS(null, "r", tokenpolomer);
//     place.markingtokens[5].setAttributeNS(null, "fill", "white");
//     canvas.add(place.markingtokens[5]);
//
//     place.markingtokens[6] = document.createElementNS(xmlns, "circle");
//     place.markingtokens[6].setAttributeNS(null, "cx", x + tokenposuv);
//     place.markingtokens[6].setAttributeNS(null, "cy", y);
//     place.markingtokens[6].setAttributeNS(null, "r", tokenpolomer);
//     place.markingtokens[6].setAttributeNS(null, "fill", "white");
//     canvas.add(place.markingtokens[6]);
//
//     place.markingtokens[7] = document.createElementNS(xmlns, "circle");
//     place.markingtokens[7].setAttributeNS(null, "cx", x);
//     place.markingtokens[7].setAttributeNS(null, "cy", y - tokenposuv);
//     place.markingtokens[7].setAttributeNS(null, "r", tokenpolomer);
//     place.markingtokens[7].setAttributeNS(null, "fill", "white");
//     canvas.add(place.markingtokens[7]);
//
//     place.markingtokens[8] = document.createElementNS(xmlns, "circle");
//     place.markingtokens[8].setAttributeNS(null, "cx", x);
//     place.markingtokens[8].setAttributeNS(null, "cy", y + tokenposuv);
//     place.markingtokens[8].setAttributeNS(null, "r", tokenpolomer);
//     place.markingtokens[8].setAttributeNS(null, "fill", "white");
//     canvas.add(place.markingtokens[8]);
// }
//
// function updatemarkingsvg(place) {
//     place.objektymiesta.markingnode.nodeValue = place.markinglabel;
//     var marking = place.marking;
//     var zadane = prompt("Please enter a nonnegative place marking", place.marking);
//
//     if (zadane != null) {
//         marking = parseInt(zadane);
//         if (isNaN(marking))
//             alert("Not a number");
//
//         if (marking < 0)
//             alert("Negative number");
//
//         if (!isNaN(marking) && marking >= 0) {
//             place.marking = marking;
//             updatetokeny(place);
//
//         }
//     }
// }