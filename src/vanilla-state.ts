type Listener<T> = (value: T) => void;
type ListenerMap = {
	[key: string]: Set<Listener<any>>;
};

type StateObject = {
	[key: string]: any;
};

class VnlState {
	private _state: StateObject;
	private _listeners: ListenerMap;

	// 인덱스 시그니처 추가
	[key: string]: any;

	constructor() {
		this._state = {};
		this._listeners = {};
		return new Proxy(this, {
			get: (target: VnlState, prop: string) => {
				if (prop in target) return target[prop];
				return target._state[prop];
			},
			set: (target: VnlState, prop: string, value: any) => {
				if (prop in target) {
					target[prop] = value;
				} else {
					target._setState(prop, value, true);
				}
				return true;
			},
		});
	}

	addEventListener<T>(prop: string, callback: Listener<T>): void {
		if (!this._listeners[prop]) {
			this._listeners[prop] = new Set();
		}
		this._listeners[prop].add(callback);
	}

	removeEventListener<T>(prop: string, callback: Listener<T>): void {
		if (this._listeners[prop]) {
			this._listeners[prop].delete(callback);
			if (this._listeners[prop].size === 0) {
				delete this._listeners[prop];
			}
		}
	}

	private _notify<T>(prop: string): void {
		if (this._listeners[prop]) {
			this._listeners[prop].forEach((callback) => callback(this._state[prop]));
		}
	}

	private _setState<T>(prop: string, value: T, notify = true): void {
		this._state[prop] = value;
		if (notify) {
			this._notify(prop);
		}
	}

	setWithoutNotify<T>(prop: string, value: T): void {
		this._setState(prop, value, false);
	}
}

export default VnlState;
