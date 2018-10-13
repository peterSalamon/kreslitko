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
}

class ModelStore {

    constructor() {
        this._models = {};
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

}
