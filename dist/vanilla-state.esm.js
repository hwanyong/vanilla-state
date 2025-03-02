// 전역 카운터 (모듈 레벨) - 각 인스턴스에 고유 ID 부여
let instanceCounter = 0;
class VnlState {
    /**
     * VnlState constructor
     * @param initialState Initial state values (optional) or primitive value
     * @param options Additional options like namespace
     */
    constructor(initialState, options) {
        this._state = {};
        this._listeners = {};
        this._isPrimitive = false;
        this._instanceId = ++instanceCounter;
        this._debug = options?.debug || false;
        // Auto-generate namespace if not provided
        this._namespace = options?.namespace || `vnl_${this._instanceId}`;
        if (this._debug) {
            console.log(`[VnlState] Created instance with namespace: ${this._namespace}`);
        }
        // Handle primitive value initialization
        if (initialState !== undefined && initialState !== null &&
            (typeof initialState !== 'object' || initialState instanceof Date)) {
            this._value = initialState;
            this._isPrimitive = true;
        }
        // Handle object initialization
        else if (typeof initialState === 'object' && initialState !== null) {
            Object.keys(initialState).forEach(key => {
                this._state[key] = initialState[key];
            });
        }
        return new Proxy(this, {
            get: (target, prop) => {
                // Handle special methods for primitive operations
                if (prop === 'valueOf') {
                    return function () {
                        return target._isPrimitive ? target._value : target;
                    };
                }
                if (prop === 'toString') {
                    return function () {
                        return target._isPrimitive ? String(target._value) : '[object VnlState]';
                    };
                }
                if (prop in target)
                    return target[prop];
                if (target._isPrimitive && prop === 'value') {
                    return target._value;
                }
                return target._state[prop];
            },
            set: (target, prop, value) => {
                // Handle primitive value assignment
                if (target._isPrimitive && prop === 'value') {
                    const oldValue = target._value;
                    target._value = value;
                    if (oldValue !== value) {
                        target.dispatchEvent('change', value);
                    }
                    return true;
                }
                // Direct assignment to primitive state
                if (target._isPrimitive && prop === '') {
                    const oldValue = target._value;
                    target._value = value;
                    if (oldValue !== value) {
                        target.dispatchEvent('change', value);
                    }
                    return true;
                }
                if (prop in target && typeof target[prop] !== 'function') {
                    target[prop] = value;
                }
                else {
                    target._setState(prop, value, true);
                }
                return true;
            }
        });
    }
    /**
     * Get namespaced event name
     * @param eventName Original event name
     * @returns Namespaced event name
     */
    _getNamespacedEventName(eventName) {
        return this._namespace ? `${this._namespace}:${eventName}` : eventName;
    }
    /**
     * Register state change event listener
     * @param eventName 'change' or specific property name or custom event
     * @param callback Function to be called when the event occurs
     */
    addEventListener(eventName, callback) {
        const namespacedEvent = this._getNamespacedEventName(eventName);
        if (!this._listeners[namespacedEvent]) {
            this._listeners[namespacedEvent] = new Set();
        }
        this._listeners[namespacedEvent].add(callback);
        if (this._debug) {
            console.log(`[VnlState:${this._namespace}] Added listener for event: ${eventName} (namespace: ${namespacedEvent})`);
        }
    }
    /**
     * Remove state change event listener
     * @param eventName 'change' or specific property name or custom event
     * @param callback Function to be removed
     */
    removeEventListener(eventName, callback) {
        const namespacedEvent = this._getNamespacedEventName(eventName);
        if (this._listeners[namespacedEvent]) {
            this._listeners[namespacedEvent].delete(callback);
            if (this._listeners[namespacedEvent].size === 0) {
                delete this._listeners[namespacedEvent];
                if (this._debug) {
                    console.log(`[VnlState:${this._namespace}] Removed listener for event: ${eventName}`);
                }
            }
        }
    }
    /**
     * Dispatch a custom event with the given name and detail
     * @param eventName The name of the event to dispatch
     * @param value The data to include in the event
     * @param options Optional event configuration
     */
    dispatchEvent(eventName, value, options) {
        const namespacedEvent = this._getNamespacedEventName(eventName);
        if (!this._listeners[namespacedEvent]) {
            return true; // No listeners, event not cancelled
        }
        const eventOptions = {
            bubbles: options?.bubbles || false,
            cancelable: options?.cancelable || false,
            composed: options?.composed || false,
            detail: value // 여전히 내부적으로는 CustomEvent의 detail 속성 사용
        };
        const event = new CustomEvent(namespacedEvent, eventOptions);
        let cancelled = false;
        if (this._debug) {
            console.log(`[VnlState:${this._namespace}] Dispatching event: ${eventName} with value:`, value);
        }
        this._listeners[namespacedEvent].forEach(callback => {
            try {
                // 콜백에 값과 이벤트 객체 모두 전달
                callback(value, event);
                if (event.cancelable && event.defaultPrevented) {
                    cancelled = true;
                }
            }
            catch (error) {
                console.error(`Error in event listener for ${namespacedEvent}:`, error);
            }
        });
        return !cancelled;
    }
    /**
     * Send event notification for property changes
     * @param prop Changed property name
     */
    _notify(prop) {
        const value = this._state[prop];
        // Notify listeners registered for specific property
        this.dispatchEvent(prop, value);
        // Notify 'change' event listeners with appropriate value structure
        if (this._isPrimitive) {
            this.dispatchEvent('change', this._value);
        }
        else {
            // 객체 상태일 때는 { property, value } 형태로 전달
            this.dispatchEvent('change', { property: prop, value: value });
        }
    }
    /**
     * Set namespace for this state instance
     * @param namespace Namespace string
     */
    setNamespace(namespace) {
        if (this._debug) {
            console.log(`[VnlState] Changing namespace from "${this._namespace}" to "${namespace}"`);
        }
        this._namespace = namespace;
    }
    /**
     * Get current namespace
     * @returns Current namespace
     */
    getNamespace() {
        return this._namespace;
    }
    /**
     * Get instance ID
     * @returns Unique instance ID
     */
    getInstanceId() {
        return this._instanceId;
    }
    /**
     * Enable or disable debug mode
     * @param enabled Whether debug mode should be enabled
     */
    setDebug(enabled) {
        this._debug = enabled;
    }
    /**
     * Set state (internal use)
     * @param prop Property name
     * @param value Value to set
     * @param notify Whether to trigger event
     */
    _setState(prop, value, notify = true) {
        if (this._isPrimitive) {
            const oldValue = this._value;
            this._value = value;
            if (notify && oldValue !== value) {
                this.dispatchEvent('change', value);
            }
            return;
        }
        const oldValue = this._state[prop];
        this._state[prop] = value;
        if (notify && oldValue !== value) {
            this._notify(prop);
        }
    }
    /**
     * Set state without notification
     * @param prop Property name
     * @param value Value to set
     */
    setWithoutNotify(prop, value) {
        this._setState(prop, value, false);
    }
    /**
     * Set the value directly for primitive states
     * @param value New value
     */
    set(value) {
        if (this._isPrimitive) {
            const oldValue = this._value;
            this._value = value;
            if (oldValue !== value) {
                this.dispatchEvent('change', value);
            }
        }
        else {
            console.warn('set() method should only be called on primitive VnlState instances');
        }
    }
    /**
     * Gets the current state value.
     * - For primitive states: returns the primitive value
     * - For object states: returns a copy of the state object
     */
    get() {
        if (this._isPrimitive) {
            return this._value;
        }
        return { ...this._state };
    }
    /**
     * Batch process multiple state changes
     * @param callback State change callback function
     */
    batch(callback) {
        if (this._isPrimitive) {
            console.warn('batch() method cannot be used with primitive VnlState instances');
            return;
        }
        // Copy state before changes
        const oldState = { ...this._state };
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
        // Identify changed properties
        const changedProps = Object.keys(this._state).filter(prop => oldState[prop] !== this._state[prop] || !(prop in oldState));
        // Notify all listeners for changed properties
        changedProps.forEach(prop => {
            this._notify(prop);
        });
        // Dispatch a batch-completed event if there were changes
        if (changedProps.length > 0) {
            this.dispatchEvent('batch-completed', {
                changedProperties: changedProps,
                oldState,
                newState: { ...this._state }
            });
        }
    }
    /**
     * Create and dispatch a custom event not tied to state changes
     * @param eventName Name of the custom event
     * @param value Data to include with the event
     * @param options Optional event configuration
     */
    emit(eventName, value, options) {
        return this.dispatchEvent(eventName, value, options);
    }
    // Override toString for primitive values
    toString() {
        if (this._isPrimitive) {
            return String(this._value);
        }
        return '[object VnlState]';
    }
    // Override valueOf for primitive values
    // This enables basic arithmetic operations
    valueOf() {
        if (this._isPrimitive) {
            return this._value;
        }
        return NaN;
    }
}

export { VnlState as default };
