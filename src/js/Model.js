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
