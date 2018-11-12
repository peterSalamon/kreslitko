



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

