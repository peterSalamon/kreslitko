

$(document).ready(() => {
    var app = new Application("canvas");



    app.canvas.on("mousedown", function(){
        doMouseDown(event, app);
    });

    app.canvas.on("mousemove", function(){
        doMouseMove(event, app);
    });

    $('#align').on('click', (event) => {  app.alignElements(app);  });
    $('#clear').on('click', (event) => {
        app._storeProvider.removeModel(app, "model");
    });//TODO: set proper key
    $('#reload').on('click', (event) => {  app.reloadModel(app);  });
    $('#undo').on('click', (event) => {  app.undo(app);  });
    $('#otvorSubor').on('change', (event) => {  app.otvorFile(event,app);  });
    $('#saveasXML').on('click', (event) => {  app.exportasXML(1, app);  });
    $('#saveasPFLOW').on('click', (event) => {  app.exportasXML(2, app);  });
    $('#saveasSVG').on('click', (event) => {  exportasSVG(app.canvas);  });
    $('#datavariables').on('click', (event) => {  app.datavariables();  });
    $('#propertiesM').on('click', (event) => {  app.propertiesM(app);  });
    $('#about').on('click', (event) => {  app.about();  });

    $(".button--reset").on('click', function () {
        reset(app);
    });

    app.canvas.resize(appwidth, appheight);

    app.$service().register("id", IdentificationService);
    app.$service().register("log", LogService);
    app.$service().register("shortcut", ShortcutService);

    app.$service("shortcut").registerShortcut("z", {ctrlKey: true}, undo);

    // LEGACY PART
    modal = document.getElementById("modal");

    shade = document.getElementById("shade");
    insidemodal = document.getElementById("insidemodal");
    helptext = document.createTextNode("");
});