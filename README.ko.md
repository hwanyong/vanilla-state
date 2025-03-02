# Vanilla State

🚀 순수 자바스크립트로 구현된 경량 상태 관리 솔루션입니다. 의존성 없이 프록시 기반의 반응형 상태 관리를 구현했습니다. 모던 웹 애플리케이션을 위한 간단하면서도 강력한 상태 관리 도구입니다.

[English](README.md) | 한국어

[![npm version](https://badge.fury.io/js/@uhd_kr/vanilla-state.svg)](https://badge.fury.io/js/@uhd_kr/vanilla-state)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚨 중요: v3.0.0 주요 변경사항

버전 3.0.0은 다음과 같은 주요 API 개선사항을 포함하고 있으며, 마이그레이션이 필요합니다:

- **새로운 이벤트 리스너 API**: `(e) => e.detail` 형식에서 직접적인 `(value, originalEvent)` 형식으로 변경
- **향상된 프리미티브 값 지원**: 직접 초기화 및 산술 연산 지원
- **커스텀 이벤트 시스템**: 사용자 정의 이벤트를 위한 새로운 `emit()` 메서드

v2.x에서 v3.0.0으로 업데이트하는 자세한 방법은 [마이그레이션 가이드](docs/MIGRATION.md)를 참조하세요.

## 주요 기능

- 🚀 가벼운 크기와 제로 의존성
- 🔄 프록시 기반 반응형 상태 관리
- 📦 TypeScript 지원
- 🎯 이벤트 기반 상태 업데이트
- 💡 간단하고 직관적인 API
- 📱 브라우저와 Node.js 지원

## 설치 방법

### 1. NPM 사용
```bash
npm install @uhd_kr/vanilla-state
# 또는
yarn add @uhd_kr/vanilla-state
# 또는
pnpm add @uhd_kr/vanilla-state
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

### JavaScript

```javascript
import VnlState from '@uhd_kr/vanilla-state';

// 객체 상태 관리
const state = new VnlState({
  name: 'Vanilla State',
  version: '3.0.0'
});

// 상태 리스너 추가 - v3.0.0 새로운 API
state.addEventListener('change', (changeInfo) => {
  console.log(`${changeInfo.property} 값이 ${changeInfo.value}로 변경되었습니다`);
});

// 상태 업데이트
state.name = '업데이트된 이름'; // 변경 이벤트 발생

// 프리미티브 상태 관리 - v3.0.0 신규 기능
const count = new VnlState(0);

count.addEventListener('change', (value) => {
  console.log('카운트 변경:', value);
});

// 프리미티브 상태 업데이트
count.set(count + 1); // 변경 이벤트 발생
```

### TypeScript

```typescript
import VnlState from '@uhd_kr/vanilla-state';

// 타입 안전한 이벤트 리스너 (v3.0.0 API)
const count = new VnlState(0);

count.addEventListener<number>('change', (value) => {
  console.log('카운트 변경:', value.toFixed(0));
});

count.set(count + 1); // 숫자 값으로 이벤트 발생
```

### 고급 사용법

#### 무음 업데이트
리스너를 실행하지 않고 상태 업데이트:
```javascript
state.setWithoutNotify('count', 2);
```

#### 일괄 업데이트
여러 상태 업데이트를 그룹화하고 마지막에 리스너를 한 번만 실행:
```javascript
state.batch((s) => {
  s.count = 1;
  s.loading = true;
  s.user.name = "홍길동";
  s.user.role = "관리자";
});
// 모든 업데이트가 완료된 후 리스너가 한 번만 실행됨
```

#### 커스텀 이벤트 (v3.0.0 신규)
```javascript
// 커스텀 이벤트 발생
state.emit('save-completed', { success: true, timestamp: Date.now() });

// 커스텀 이벤트 리스너 등록
state.addEventListener('save-completed', (result) => {
  if (result.success) {
    showNotification('저장이 성공적으로 완료되었습니다!');
  }
});
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

## 개발

### 필수 요구사항
- Node.js >= 14
- pnpm (권장) 또는 npm

### 설치
```bash
# 저장소 복제
git clone https://github.com/hwanyong/vanilla-state.git

# 의존성 설치
pnpm install

# 패키지 빌드
pnpm build
```

### 스크립트
- `pnpm build`: 패키지 빌드
- `pnpm typecheck`: TypeScript 타입 체크 실행
- `pnpm format`: Prettier로 코드 포맷팅
- `pnpm changeset`: 새 changeset 생성
- `pnpm release`: npm에 배포

자세한 개발 가이드는 [기여 가이드](CONTRIBUTING.md)를 참조하세요.

## 문서

- [마이그레이션 가이드](docs/MIGRATION.md)
- [배포 가이드](docs/DEPLOYMENT.md)
- [변경 이력](docs/CHANGELOG.md)

## 브라우저 지원

- Chrome/Edge (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Node.js 14+

## 기여하기

기여는 언제나 환영합니다! 자세한 내용은 [기여 가이드](CONTRIBUTING.md)를 참조하세요.

### 개발 프로세스
1. 저장소 포크
2. 새 브랜치 생성
3. 변경사항 작업
4. 필요한 경우 테스트 추가
5. changeset 생성 (`pnpm changeset`)
6. 풀 리퀘스트 제출

새 버전 배포에 대한 자세한 내용은 [배포 가이드](docs/DEPLOYMENT.md)를 참조하세요.

## 라이선스

MIT © [Hwanyong Yoo(UHD)](https://github.com/hwanyong)