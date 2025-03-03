type Listener<T> = (value: T, originalEvent?: CustomEvent<T>) => void;
interface EventOptions {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}
interface SetOptions {
    notify?: boolean;
}
interface VnlStateOptions {
    namespace?: string;
    debug?: boolean;
}
declare class VnlState {
    private _state;
    private _listeners;
    private _value;
    private _isPrimitive;
    private _namespace;
    private _instanceId;
    private _debug;
    [key: string]: any;
    /**
     * VnlState constructor
     * @param initialState Initial state values (optional) or primitive value
     * @param options Additional options like namespace
     */
    constructor(initialState?: any, options?: VnlStateOptions);
    /**
     * Get namespaced event name
     * @param eventName Original event name
     * @returns Namespaced event name
     */
    private _getNamespacedEventName;
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
     * Set namespace for this state instance
     * @param namespace Namespace string
     */
    setNamespace(namespace: string): void;
    /**
     * Get current namespace
     * @returns Current namespace
     */
    getNamespace(): string;
    /**
     * Get instance ID
     * @returns Unique instance ID
     */
    getInstanceId(): number;
    /**
     * Enable or disable debug mode
     * @param enabled Whether debug mode should be enabled
     */
    setDebug(enabled: boolean): void;
    /**
     * Set state (internal use)
     * @param prop Property name
     * @param value Value to set
     * @param notify Whether to trigger event
     */
    private _setState;
    /**
     * Set state value with optional notification control.
     *
     * For primitive state:
     * - set(value) - 기본값 업데이트 (알림 있음)
     * - set(value, { notify: false }) - 기본값 업데이트 (알림 없음)
     *
     * For object state:
     * - set(prop, value) - 객체 속성 업데이트 (알림 있음)
     * - set(prop, value, { notify: false }) - 객체 속성 업데이트 (알림 없음)
     *
     * @param propOrValue Property name (for object state) or direct value (for primitive state)
     * @param valueOrOptions Value to set (for object state) or options (for primitive state)
     * @param options Options to control behavior
     */
    set<T>(propOrValue: string | any, valueOrOptions?: any | SetOptions, options?: SetOptions): void;
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
