function exportasXML(format) {
    var textnazapis = generujXML(format);
    if (format == 1)
        var menosuboru = prompt("Please enter the file name", menofilu);
    if (format == 2)
        var menosuboru = prompt("Please enter the file name", menofilu + ".pflow");

    if (menosuboru != null) {
        menofilu = menosuboru;
        var xmlakoBlob = null;
        if (window.Blob) {
            xmlakoBlob = new Blob([textnazapis], {type: 'text/plain;charset=utf-8'});
        }

        if (xmlakoBlob != null) {
            if (window.navigator.msSaveBlob !== undefined) {
                window.navigator.msSaveBlob(xmlakoBlob, menofilu);
            } else {
                downloadLink = document.createElement("a");
                downloadLink.download = menofilu;
                downloadLink.innerHTML = "Download Model" + menofilu;
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
            document.getElementById('menofilu').innerHTML = menofilu;
        }
    }
}

function exportasSVG() {
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

function generujXML(format) {
    var xmltext = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<document xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"https://modeler.netgrif.com/petriflow_schema.xsd\">\n";
    if (format == 2)
        xmltext = xmltext + "<subnet>\n";

    xmltext = xmltext + "\t<!-- TRANSITIONS -->\n";
    for (var i = 0; i < transitions.length; i++) {
        xmltext = xmltext + "\t<transition>\n";
        xmltext = xmltext + "\t\t<id>" + transitions[i].id + "</id>\n";
        xmltext = xmltext + "\t\t<x>" + transitions[i].x + "</x>\n";
        xmltext = xmltext + "\t\t<y>" + transitions[i].y + "</y>\n";
        xmltext = xmltext + "\t\t<label>" + transitions[i].label + "</label>\n";
        xmltext = xmltext + "\t</transition>\n";
    }

    xmltext = xmltext + "\t<!-- PLACES -->\n";
    for (var i = 0; i < places.length; i++) {
        xmltext = xmltext + "\t<place>\n";
        xmltext = xmltext + "\t\t<id>" + places[i].id + "</id>\n";
        xmltext = xmltext + "\t\t<x>" + places[i].x + "</x>\n";
        xmltext = xmltext + "\t\t<y>" + places[i].y + "</y>\n";
        xmltext = xmltext + "\t\t<label>" + places[i].label + "</label>\n";
        xmltext = xmltext + "\t\t<tokens>" + places[i].marking + "</tokens>\n";
        if (format == 1)
            xmltext = xmltext + "\t\t<static>" + places[i].static + "</static>\n";
        if (format == 2)
            xmltext = xmltext + "\t\t<isStatic>" + places[i].static + "</isStatic>\n";

        xmltext = xmltext + "\t</place>\n";
    }

    xmltext = xmltext + "\t<!-- ARCS -->\n";
    for (var i = 0; i < arcs.length; i++) {
        xmltext = xmltext + "\t<arc>\n";
        xmltext = xmltext + "\t\t<id>" + arcs[i].id + "</id>\n";
        xmltext = xmltext + "\t\t<type>" + arcs[i].arctype + "</type>\n";
        xmltext = xmltext + "\t\t<sourceId>" + arcs[i].source.id + "</sourceId>\n";
        xmltext = xmltext + "\t\t<destinationId>" + arcs[i].target.id + "</destinationId>\n";
        xmltext = xmltext + "\t\t<multiplicity>" + arcs[i].vaha + "</multiplicity>\n";
        for (var j = 1; j < arcs[i].bodyhrany.length - 1; j++) {
            xmltext = xmltext + "\t\t<breakPoint><x>" + arcs[i].bodyhrany[j].x + "</x><y>" + arcs[i].bodyhrany[j].y + "</y></breakPoint>\n";
        }
        xmltext = xmltext + "\t</arc>\n";
    }
    if (format == 2)
        xmltext = xmltext + "</subnet>\n";

    xmltext = xmltext + "</document>";
    return xmltext;
}