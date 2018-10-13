class ServiceProvider {

    constructor() {
        this._services = {};
        this._cache = {};
    }

    register(key, service) {
        this._services[key] = service;
    }

    getService(key) {
        if (this._cache[key])
            return this._cache[key];
        if (this._services[key]) {
            this._cache[key] = new this._services[key];
            return this._cache[key];
        }
        throw new Error(`Requested service '${key}' was not found. It is not registered service or the requested object does not exist!`);
    }
}


class IdentificationService {

    constructor() {
        this._lastId = 0;
    }

    id() {
        this._lastId++;
        return this._lastId;
    }
}


class LogService {

    constructor() {
        this._debug = true;
    }


    get debugMode() {
        return this._debug;
    }

    /**
     * Turn on / off debug log in the console
     * @param {Boolean} value
     */
    set debugMode(value) {
        this._debug = value;
    }

    info(msg) {
        console.log(`[INFO] - ${msg}`)
    }

    error(msg, throwable = false) {
        if (throwable)
            throw new Error(msg);
        else
            console.log(`[ERROR] - ${msg}`);
    }

    debug(msg) {
        if (this._debug)
            console.log(`[DEBUG] - ${msg}`);
    }

    log(o) {
        console.log(o);
    }
}


class ShortcutService {

    constructor() {
        this._shortcuts = {};

        document.addEventListener("keypress", event => {
            if (!app.context.shortcuts || event.key === "Alt" || event.key === "Control" || event.key === "Shift")
                return;
            const key = this._buildKeyCombination(event);
            if (this._shortcuts[key]) {
                this._shortcuts[key].forEach(callback => callback(event)); //this should be async invocation
                event.preventDefault();
                event.stopPropagation();
            }
        }, false);
    }

    /**
     * Register keyboard shortcut for some functionality.
     * Shortcut is list of functions mapped to the provided combination od keys, which are executed when mapped combination of keys are pressed.
     * @param {string} key - Key on keyboard to map a shortcut. It can be any key with exception of CTRL, ALT, SHIFT keys.
     * @param {Object} modifierKeys - Shortcut is activate only if provided key is pressed together with specified modifiers keys.
     * @param {boolean} [modifierKeys.ctrlKey] - Enable combination with CTRL modifier key.
     * @param {boolean} [modifierKeys.altKey] - Enable combination with ALT modifier key.
     * @param {boolean} [modifierKeys.shiftKey] - Enable combination with SHIFT modifier key.
     * @param {Function} callback - Function to call when provided combination of keys is pressed.
     */
    registerShortcut(key, modifierKeys, callback) {
        const keyCombination = this._buildKeyCombination(Object.assign(modifierKeys, {key: key}));
        if (!this._shortcuts[keyCombination])
            this._shortcuts[keyCombination] = [];
        this._shortcuts[keyCombination].push(callback);
    }

    _buildKeyCombination(event) {
        let keyCombination = "";
        keyCombination += event.ctrlKey ? "ctrl" : "";
        keyCombination += event.altKey ? "alt" : "";
        keyCombination += event.shiftKey ? "shift" : "";
        keyCombination += keyCombination + event.key.toUpperCase();

        return keyCombination;
    }
}