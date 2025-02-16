# Vanilla State

🚀 순수 자바스크립트로 구현된 경량 상태 관리 솔루션입니다. 의존성 없이 프록시 기반의 반응형 상태 관리를 구현했습니다. 모던 웹 애플리케이션을 위한 간단하면서도 강력한 상태 관리 도구입니다.

[English](README.md) | 한국어

[![npm version](https://badge.fury.io/js/@uhd_kr/vanilla-state.svg)](https://badge.fury.io/js/@uhd_kr/vanilla-state)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 설치 방법

### 1. NPM 사용
```bash
npm install @uhd_kr/vanilla-state
```

```javascript
import VnlState from '@uhd_kr/vanilla-state';
```

### 2. CDN 사용
```html
<!-- 모던 브라우저 (권장) -->
<script type="module">
  import VnlState from 'https://unpkg.com/@uhd_kr/vanilla-state/dist/vanilla-state.esm.js';
</script>

<!-- 전통적인 스크립트 태그 -->
<script src="https://unpkg.com/@uhd_kr/vanilla-state"></script>
```

### 3. 직접 다운로드
`dist` 폴더에서 다운로드:
- `vanilla-state.min.js` - 압축된 UMD 빌드 (브라우저용)
- `vanilla-state.esm.js` - ES 모듈 빌드
- `vanilla-state.cjs.js` - CommonJS 빌드

## 사용 방법

### 기본 사용법
```javascript
const state = new VnlState();

// 초기 상태 설정
state.count = 0;

// 리스너 추가
state.addEventListener('count', (newValue) => {
  console.log('카운트가 변경됨:', newValue);
});

// 상태 업데이트 (리스너 실행)
state.count = 1; // 콘솔: "카운트가 변경됨: 1"
```

### 고급 사용법

#### 무음 업데이트
리스너를 실행하지 않고 상태 업데이트:
```javascript
state.setWithoutNotify('count', 2);
```

#### 다중 리스너
```javascript
// 여러 리스너 추가
state.addEventListener('count', value => console.log('리스너 1:', value));
state.addEventListener('count', value => console.log('리스너 2:', value));

// 특정 리스너 제거
const listener = value => console.log('제거 가능한 리스너:', value);
state.addEventListener('count', listener);
state.removeEventListener('count', listener);
```

#### 객체 속성 사용
```javascript
// 객체도 지원
state.user = { name: '홍길동', age: 25 };
state.addEventListener('user', user => {
  console.log('사용자 정보 업데이트:', user);
});

// 객체 업데이트
state.user = { ...state.user, age: 26 };
```

## 모범 사례

1. **리스너 정리**: 메모리 누수를 방지하기 위해 더 이상 필요하지 않은 리스너는 반드시 제거하세요.

2. **불변 업데이트**: 객체나 배열을 업데이트할 때는 새로운 참조를 생성하세요:
```javascript
// 좋은 예
state.items = [...state.items, newItem];

// 나쁜 예
state.items.push(newItem); // 리스너가 실행되지 않음
```

3. **무음 업데이트**: 여러 업데이트를 일괄 처리할 때는 `setWithoutNotify`를 사용하세요:
```javascript
state.setWithoutNotify('loading', true);
state.setWithoutNotify('data', newData);
state.loading = false; // 이 업데이트만 리스너 실행
```

## 브라우저 지원

- Chrome/Edge (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Node.js 14+

## 기여하기

기여는 언제나 환영합니다! Pull Request를 자유롭게 제출해 주세요.

## 라이선스

MIT © [Hwanyong Yoo(UHD)](https://github.com/hwanyong)