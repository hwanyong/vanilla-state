// Modified listener type: Changed to receive value and original event instead of event object
type Listener<T> = (value: T, originalEvent?: CustomEvent<T>) => void;
type ListenerMap = {
	[key: string]: Set<Listener<any>>;
};
type StateObject = {
	[key: string]: any;
};

interface VnlStateInit {
  [key: string]: any;
}

// Event options interface
interface EventOptions {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

interface VnlStateOptions {
  namespace?: string; // Add namespace option
  debug?: boolean;    // Add debug option for logging namespace information
}

// Global counter (module level) - Assigns unique ID to each instance
let instanceCounter = 0;

class VnlState {
	private _state: StateObject;
	private _listeners: ListenerMap;
	private _value: any;
	private _isPrimitive: boolean;
	private _namespace: string;
	private _instanceId: number;
	private _debug: boolean;
	// Add index signature
	[key: string]: any;

	/**
	 * VnlState constructor
	 * @param initialState Initial state values (optional) or primitive value
	 * @param options Additional options like namespace
	 */
	constructor(initialState?: any, options?: VnlStateOptions) {
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
			get: (target: VnlState, prop: string) => {
				// Handle special methods for primitive operations
				if (prop === 'valueOf') {
					return function() {
						return target._isPrimitive ? target._value : target;
					};
				}
				if (prop === 'toString') {
					return function() {
						return target._isPrimitive ? String(target._value) : '[object VnlState]';
					};
				}

				if (prop in target) return target[prop];

				if (target._isPrimitive && prop === 'value') {
					return target._value;
				}

				return target._state[prop];
			},
			set: (target: VnlState, prop: string, value: any) => {
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
				} else {
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
	private _getNamespacedEventName(eventName: string): string {
		return this._namespace ? `${this._namespace}:${eventName}` : eventName;
	}

	/**
	 * Register state change event listener
	 * @param eventName 'change' or specific property name or custom event
	 * @param callback Function to be called when the event occurs
	 */
	addEventListener<T>(eventName: string, callback: Listener<T>): void {
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
	removeEventListener<T>(eventName: string, callback: Listener<T>): void {
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
	dispatchEvent<T>(eventName: string, value?: T, options?: EventOptions): boolean {
		const namespacedEvent = this._getNamespacedEventName(eventName);
		if (!this._listeners[namespacedEvent]) {
			return true; // No listeners, event not cancelled
		}

		const eventOptions = {
			bubbles: options?.bubbles || false,
			cancelable: options?.cancelable || false,
			composed: options?.composed || false,
			detail: value // Still using the detail property of CustomEvent internally
		};

		const event = new CustomEvent(namespacedEvent, eventOptions);
		let cancelled = false;

		if (this._debug) {
			console.log(`[VnlState:${this._namespace}] Dispatching event: ${eventName} with value:`, value);
		}

		this._listeners[namespacedEvent].forEach(callback => {
			try {
				 // Pass both value and event object to callback
				callback(value as T, event);
				if (event.cancelable && event.defaultPrevented) {
					cancelled = true;
				}
			} catch (error) {
				console.error(`Error in event listener for ${namespacedEvent}:`, error);
			}
		});

		return !cancelled;
	}

	/**
	 * Send event notification for property changes
	 * @param prop Changed property name
	 */
	private _notify<T>(prop: string): void {
		const value = this._state[prop];

		// Notify listeners registered for specific property
		this.dispatchEvent(prop, value);

		// Notify 'change' event listeners with appropriate value structure
		if (this._isPrimitive) {
			this.dispatchEvent('change', this._value);
		} else {
			 // For object state, pass { property, value } structure
			this.dispatchEvent('change', { property: prop, value: value });
		}
	}

	/**
	 * Set namespace for this state instance
	 * @param namespace Namespace string
	 */
	setNamespace(namespace: string): void {
		if (this._debug) {
			console.log(`[VnlState] Changing namespace from "${this._namespace}" to "${namespace}"`);
		}
		this._namespace = namespace;
	}

	/**
	 * Get current namespace
	 * @returns Current namespace
	 */
	getNamespace(): string {
		return this._namespace;
	}

	/**
	 * Get instance ID
	 * @returns Unique instance ID
	 */
	getInstanceId(): number {
		return this._instanceId;
	}

	/**
	 * Enable or disable debug mode
	 * @param enabled Whether debug mode should be enabled
	 */
	setDebug(enabled: boolean): void {
		this._debug = enabled;
	}

	/**
	 * Set state (internal use)
	 * @param prop Property name
	 * @param value Value to set
	 * @param notify Whether to trigger event
	 */
	private _setState<T>(prop: string, value: T, notify = true): void {
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
	setWithoutNotify<T>(prop: string, value: T): void {
		this._setState(prop, value, false);
	}

	/**
	 * Set the value directly for primitive states
	 * @param value New value
	 */
	set(value: any): void {
		if (this._isPrimitive) {
			const oldValue = this._value;
			this._value = value;

			if (oldValue !== value) {
				this.dispatchEvent('change', value);
			}
		} else {
			console.warn('set() method should only be called on primitive VnlState instances');
		}
	}

	/**
	 * Gets the current state value.
	 * - For primitive states: returns the primitive value
	 * - For object states: returns a copy of the state object
	 */
	get(): any {
		if (this._isPrimitive) {
			return this._value;
		}
		return { ...this._state };
	}

	/**
	 * Batch process multiple state changes
	 * @param callback State change callback function
	 */
	batch(callback: (state: VnlState) => void): void {
		if (this._isPrimitive) {
			console.warn('batch() method cannot be used with primitive VnlState instances');
			return;
		}

		// Copy state before changes
		const oldState = { ...this._state };

		// Create a temporary proxy that doesn't notify on changes
		const batchProxy = new Proxy(this, {
			set: (target: VnlState, prop: string, value: any) => {
				if (prop in target && typeof target[prop] !== 'function') {
					target[prop] = value;
				} else {
					target.setWithoutNotify(prop, value);
				}
				return true;
			}
		});

		// Apply all changes without notifications
		callback(batchProxy);

		// Identify changed properties
		const changedProps = Object.keys(this._state).filter(prop =>
			oldState[prop] !== this._state[prop] || !(prop in oldState)
		);

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
	emit<T>(eventName: string, value?: T, options?: EventOptions): boolean {
		return this.dispatchEvent(eventName, value, options);
	}

	// Override toString for primitive values
	toString(): string {
		if (this._isPrimitive) {
			return String(this._value);
		}
		return '[object VnlState]';
	}

	// Override valueOf for primitive values
	// This enables basic arithmetic operations
	valueOf(): any {
		if (this._isPrimitive) {
			return this._value;
		}
		return NaN;
	}
}

export default VnlState;
