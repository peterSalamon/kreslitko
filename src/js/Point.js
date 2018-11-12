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