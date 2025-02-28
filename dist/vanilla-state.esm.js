class VnlState {
    constructor() {
        this._state = {};
        this._listeners = {};
        return new Proxy(this, {
            get: (target, prop) => {
                if (prop in target)
                    return target[prop];
                return target._state[prop];
            },
            set: (target, prop, value) => {
                if (prop in target) {
                    target[prop] = value;
                }
                else {
                    target._setState(prop, value, true);
                }
                return true;
            },
        });
    }
    addEventListener(prop, callback) {
        if (!this._listeners[prop]) {
            this._listeners[prop] = new Set();
        }
        this._listeners[prop].add(callback);
    }
    removeEventListener(prop, callback) {
        if (this._listeners[prop]) {
            this._listeners[prop].delete(callback);
            if (this._listeners[prop].size === 0) {
                delete this._listeners[prop];
            }
        }
    }
    _notify(prop) {
        if (this._listeners[prop]) {
            this._listeners[prop].forEach((callback) => callback(this._state[prop]));
        }
    }
    _setState(prop, value, notify = true) {
        this._state[prop] = value;
        if (notify) {
            this._notify(prop);
        }
    }
    setWithoutNotify(prop, value) {
        this._setState(prop, value, false);
    }
    batch(callback) {
        // Create a temporary proxy that doesn't notify on changes
        const batchProxy = new Proxy(this, {
            set: (target, prop, value) => {
                if (prop in target && typeof target[prop] !== 'function') {
                    target[prop] = value;
                }
                else {
                    target.setWithoutNotify(prop, value);
                }
                return true;
            }
        });
        // Apply all changes without notifications
        callback(batchProxy);
        // Collect all changed properties to notify after batch
        const changedProps = new Set(Object.keys(this._state));
        // Notify all listeners for changed properties
        changedProps.forEach(prop => {
            this._notify(prop);
        });
    }
}

export { VnlState as default };
