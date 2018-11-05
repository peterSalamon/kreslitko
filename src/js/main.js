

$(document).ready(() => {
    app = new Application("canvas");

    app.canvas.on("mousedown", function(){
        doMouseDown(event, app.canvas);
    });

    app.canvas.on("mousemove", doMouseMove);

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