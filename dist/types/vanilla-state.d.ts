type Listener<T> = (value: T, originalEvent?: CustomEvent<T>) => void;
interface EventOptions {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}
declare class VnlState {
    private _state;
    private _listeners;
    private _value;
    private _isPrimitive;
    [key: string]: any;
    /**
     * VnlState constructor
     * @param initialState Initial state values (optional) or primitive value
     */
    constructor(initialState?: any);
    /**
     * Register state change event listener
     * @param eventName 'change' or specific property name or custom event
     * @param callback Function to be called when the event occurs
     */
    addEventListener<T>(eventName: string, callback: Listener<T>): void;
    /**
     * Remove state change event listener
     * @param eventName 'change' or specific property name or custom event
     * @param callback Function to be removed
     */
    removeEventListener<T>(eventName: string, callback: Listener<T>): void;
    /**
     * Dispatch a custom event with the given name and detail
     * @param eventName The name of the event to dispatch
     * @param value The data to include in the event
     * @param options Optional event configuration
     */
    dispatchEvent<T>(eventName: string, value?: T, options?: EventOptions): boolean;
    /**
     * Send event notification for property changes
     * @param prop Changed property name
     */
    private _notify;
    /**
     * Set state (internal use)
     * @param prop Property name
     * @param value Value to set
     * @param notify Whether to trigger event
     */
    private _setState;
    /**
     * Set state without notification
     * @param prop Property name
     * @param value Value to set
     */
    setWithoutNotify<T>(prop: string, value: T): void;
    /**
     * Set the value directly for primitive states
     * @param value New value
     */
    set(value: any): void;
    /**
     * Gets the current state value.
     * - For primitive states: returns the primitive value
     * - For object states: returns a copy of the state object
     */
    get(): any;
    /**
     * Batch process multiple state changes
     * @param callback State change callback function
     */
    batch(callback: (state: VnlState) => void): void;
    /**
     * Create and dispatch a custom event not tied to state changes
     * @param eventName Name of the custom event
     * @param value Data to include with the event
     * @param options Optional event configuration
     */
    emit<T>(eventName: string, value?: T, options?: EventOptions): boolean;
    toString(): string;
    valueOf(): any;
}
export default VnlState;
