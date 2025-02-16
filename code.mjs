class VnlState {
	constructor() {
		this._state = {};
		this._listeners = {};
		return new Proxy(this, {
			get: (target, prop) => {
				if (prop in target) return target[prop];
				return target._state[prop];
			},
			set: (target, prop, value) => {
				if (prop in target) {
					target[prop] = value;
				} else {
					target._setState(prop, value, true);
				}
				return true;
			}
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
			this._listeners[prop].forEach(callback => callback(this._state[prop]));
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
}

// 사용 예시
const vnlState = new VnlState();

// 속성 추가 및 수정
vnlState.someprop = 42;
console.log(vnlState.someprop); // 42

// 이벤트 리스너 추가
const listener = (newValue) => console.log('Updated:', newValue);
vnlState.addEventListener('someprop', listener);

// 값 변경 시 이벤트 발생
vnlState.someprop = 100; // "Updated: 100"

// 값 변경하지만 이벤트 트리거 안 함
vnlState.setWithoutNotify('someprop', 200); // (이제 콜백이 실행되지 않음)
console.log(vnlState.someprop); // 200

// 이벤트 리스너 제거
vnlState.removeEventListener('someprop', listener);
vnlState.someprop = 300; // (이제 콜백이 실행되지 않음)