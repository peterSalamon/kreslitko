class Point {

    /**
     * Some point in 2D space.
     * @param {number} x - Coordinate on X axis of 2D space.
     * @param {number} y - Coordinate on Y axis of 2D space.
     * @param {boolean} [immutable = false] - If set to true coordinates of the point cannot be changed furthermore.
     */
    constructor(x, y, immutable = false) {
        this._x = x;
        this._y = y;
        this._immutable = immutable;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }


    set x(value) {
        if (!this._immutable)
            this._x = value;
        else
            throw new Error("x coordinate of immutable point cannot be set");
    }

    set y(value) {
        if (!this._immutable)
            this._y = value;
        else
            throw new Error("y coordinate of immutable point cannot be set");
    }

    /**
     * Create immutable point.
     * @param {number} x
     * @param {number} y
     * @returns {Point}
     */
    static immutable(x, y) {
        return new Point(x, y, true);
    }
}


class Canvas {

    /**
     * Canvas object to draw the model's components.
     * @param {string} id - Id of the svg element in the html file.
     */
    constructor(id) {
        this._jqueryCanvas = $("#" + id);
        this._svg = this._jqueryCanvas.get(0);
        this._svg.onselectstart = () => false;


        const offset = this._jqueryCanvas.offset();
        this.VERTICAL_OFFSET = offset ? offset.top : 0;
        this.HORIZONTAL_OFFSET = offset ? offset.left : 0;

        $("#align").on("click", this.alignElements);
        $("#dimension").on("click", this.resize.bind(this));
    }

    /**
     * Add element to be drawn in the canvas.
     * @param element - Element to add.
     */
    add(element) {
        this._svg.appendChild(element);
    }

    /**
     * Remove element from the canvas.
     * Removed element will no longer be visible in the canvas.
     * @param element - Element to remove.
     */
    remove(element) {
        this._svg.removeChild(element);
    }

    /**
     * Register callback to the event type (i.e. click, mouseover etc.).
     * @param {string} event - Name of the event to be handled.
     * @param {Function} callback - Callback function that will be call when specified event of the canvas occurs.
     */
    on(event, callback) {
        this._svg.addEventListener(event, callback, false);
    }

    /**
     * Change dimensions of the canvas.
     * @param {number} width
     * @param {number} height
     */
    resize(width =0, height=0) {
        if(width!==0 && height!==0){
            this._svg.setAttribute("style", `width:${width}px;height:${height}px;`);
        } else{
            var doit = false;
            var a = prompt("Please enter width (min width is " + minwidth + ", max width is " + maxwidth + "):", appwidth);
            if (a != null) {
                var x = parseInt(a);
                if (isNaN(x)) {
                    alert("x is not a number");
                } else {
                    if (x < minwidth || maxwidth < x) //|| y < minheight || maxheight < y
                        alert("x is out of dimension");
                    else {
                        appwidth = x;
                        doit = true;
                    }
                }
            }
            var b = prompt("Please enter height (min height is " + minheight + ", max height is " + maxheight + ":", appheight);
            if (b != null) {
                var y = parseInt(b);
                if (isNaN(y)) {
                    alert("y is not a number");
                } else {
                    if (y < minheight || maxheight < y)
                        alert("y is out of dimension");
                    else {
                        appheight = y;
                        doit = true;
                    }
                }
            }
            if (doit)
                this.resize(appwidth, appheight);
        }
    }



    get svg() {
        return this._svg;
    }

    alignElements() {
        for (var i = 0; i < transitions.length; i++) {
            var x = transitions[i].x;
            x = korekcia_x((parseInt(x / gridstep)) * gridstep + gridstep / 2);
            var y = transitions[i].y;
            y = korekcia_y((parseInt(y / gridstep)) * gridstep + gridstep / 2);
            Transition.moveprechod(transitions[i], x, y);
            transitions[i].objektyelementu.element.setAttributeNS(null, "stroke", "black");
        }

        for (var i = 0; i < places.length; i++) {
            var x = places[i].x;
            x = korekcia_x((parseInt(x / gridstep)) * gridstep + gridstep / 2);
            var y = places[i].y;
            y = korekcia_y((parseInt(y / gridstep)) * gridstep + gridstep / 2);
            Place.movemiesto(places[i], x, y);
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

        reset();
    }

}

class Model {

    constructor(id = 0) {
        this._id = id;
        this._transitions = [];
        this._places = [];
        this._arcs = [];
    }

    get id() {
        return this._id;
    }
}

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
}
