class StoreProvider {

    constructor() {
        this._stores = {};

        this._stores.model = new ModelStore();
    }

    /**
     *
     * @param {String} key
     * @returns {Object}
     */
    getStore(key) {
        if (this._stores[key])
            return this._stores[key];
        return null;
    }

    removeModel(app, key){
        this.getStore(key).clearmodel(app);
    }
}

class ModelStore {

    constructor() {
        this._models = {};
        this.save(new Model());
    }

    /**
     *
     * @param {Model | Number | String} key
     */
    delete(key) {
        if (key instanceof Model) {
            if (this._models[key.id])
                delete this._models[key.id];
        } else {
            if (this._models[id])
                delete this._models[id];
        }
    }

    /**
     *
     * @param {Number | String} id
     * @returns {Model}
     */
    get(id) {
        if (this._models[id])
            return this._models[id];
        return null;
    }

    /**
     *
     * @param {Model} model
     */
    save(model){
        if(model && model instanceof Model){
            this._models[model.id] = model;
            return model;
        }
        return null;
    }

    clearmodel(app) {
        let objectStore = app.$store("model").get(0);     //TODO: ok ?

        if (objectStore._places.length > 0 || objectStore._transitions.length > 0) {
            var c = confirm("Are you sure to clear? Any unsaved changes will be lost.");
            if (c) {
                deleteall(app);
                menofilu = "newmodel.xml";
                document.getElementById('menofilu').innerHTML = menofilu;
            }
        }
        else {
            deleteall(app);
            menofilu = "newmodel.xml";
            document.getElementById('menofilu').innerHTML = menofilu;
        }
        this._models = {};
        this.save(new Model());
    }

}
