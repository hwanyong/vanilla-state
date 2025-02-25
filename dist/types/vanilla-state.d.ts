type Listener<T> = (value: T) => void;
declare class VnlState {
    private _state;
    private _listeners;
    [key: string]: any;
    constructor();
    addEventListener<T>(prop: string, callback: Listener<T>): void;
    removeEventListener<T>(prop: string, callback: Listener<T>): void;
    private _notify;
    private _setState;
    setWithoutNotify<T>(prop: string, value: T): void;
}
export default VnlState;
