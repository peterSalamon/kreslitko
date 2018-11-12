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



    }

    /**
     * Register callback to the event type (i.e. click, mouseover etc.).
     * @param {string} event - Name of the event to be handled.
     * @param {Function} callback - Callback function that will be call when specified event of the canvas occurs.
     */
    on(event, callback) {
        this._svg.addEventListener(event, callback, false);
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

    alignElements(app) {
        let objectStore = app.$store("model").get(0);
        let places = objectStore._places;
        let transitions = objectStore._transitions;
        let arcs = objectStore._arcs;

        for (var i = 0; i < transitions.length; i++) {
            var x = transitions[i].x;
            x = korekcia_x((parseInt(x / gridstep)) * gridstep + gridstep / 2);
            var y = transitions[i].y;
            y = korekcia_y((parseInt(y / gridstep)) * gridstep + gridstep / 2);
            Transition.movePrechod(transitions[i], x, y, objectStore);
            transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "black");
        }

        for (var i = 0; i < places.length; i++) {
            var x = places[i].x;
            x = korekcia_x((parseInt(x / gridstep)) * gridstep + gridstep / 2);
            var y = places[i].y;
            y = korekcia_y((parseInt(y / gridstep)) * gridstep + gridstep / 2);
            Place.movemiesto(places[i], x, y, objectStore);
            places[i].objektymiesta.element.setAttributeNS(null, "stroke", "black");
        }

        for (var i = 0; i < arcs.length; i++) {
            for (var j = 1; j < arcs[i].bodyhrany.length - 1; j++) {
                var x = arcs[i].bodyhrany[j].x;
                arcs[i].bodyhrany[j].x = korekcia_x((parseInt(x / gridstep)) * gridstep + gridstep / 2);
                var y = arcs[i].bodyhrany[j].y;
                arcs[i].bodyhrany[j].y = korekcia_y((parseInt(y / gridstep)) * gridstep + gridstep / 2);
            }
            Arc.updatehranusvg(arcs[i]);
        }

        reset(this);
    }

    undo(app) {
        if (previousStatus != null) {
            nacitajxml(mojparser(previousStatus), app);
            previousStatus = null;
        }
    }

    otvorFile(event, app) {
        var subor = event.target.files[0];
        menofilu = subor.name;
        document.title = menofilu;

        var citac = new FileReader();
        citac.onload = function () {
            text = citac.result;
            originFile = text;
            nacitajxml(mojparser(text), app);
            document.getElementById('otvorSubor').value = "";
        };

        citac.readAsText(subor);
    };


    reloadModel(app) {
        if (originFile != null) {
            nacitajxml(mojparser(originFile), app);
        }
    }

    datavariables() {
        datadiv.style.display = shade.style.display = 'block';

        var no;
        for (var i = 0; i < processdata.length; i++) {
            no = processdata[i].id;
            document.getElementById("label_edit" + no).style.display = "inline-block";
            document.getElementById("label_save" + no).style.display = "none";
            document.getElementById("label_delete" + no).style.display = "inline-block";
            document.getElementById("label_attach" + no).style.display = "none";
        }

        document.getElementById("last_row").style.display = "table-row";
    }

    propertiesM(app) {
        let objectStore = app.$store("model").get(0);
        let places = objectStore._places;
        let transitions = objectStore._transitions;
        let arcs = objectStore._arcs;
        var spolu = places.length + transitions.length + arcs.length;
        alert("Number of places: " + places.length + "\nNumber of transitions: " + transitions.length + "\nNumber of arcs: " + arcs.length + "\nNumber of elements: " + spolu);
    }

    about() {
        alert("PETRIFLOW is a light online Petri net editor on cloud operated by BIREGAL.\nPETRIFLOW was implemented by Gabriel Juhas and Ana Juhasova.");
    }


}