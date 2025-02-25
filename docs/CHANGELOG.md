# Changelog

## [2.0.0] - 2024-02-25

### Added
- TypeScript로 전체 프로젝트 마이그레이션
- 모든 코어 기능에 타입 정의 추가
- ESM, CommonJS, UMD 번들 지원 추가
- GitHub Actions를 통한 자동 배포 설정
- 배포 및 마이그레이션 가이드 문서 추가

### Changed
- 프로젝트 구조를 TypeScript 지원을 위해 재구성
- 빌드 시스템을 TypeScript 처리를 위해 업데이트
- package.json 스크립트 개선 및 정리
- README 파일 개선 및 한국어 번역 추가

### No Breaking Changes
- 기존 JavaScript 사용자를 위한 하위 호환성 유지
- v1.1.0 사용자를 위한 기능 호환성 보장
- JavaScript 사용자는 변경 필요 없음

## [1.1.0] - 2024-02-16

### Added
- 기본 TypeScript 지원 추가
- 제네릭 타입 지원
- 다중 번들 형식 지원

### Changed
- 프로젝트 구조 개선
- 빌드 시스템 업데이트

## [1.0.1] - 2024-02-01

### Initial Release
- 기본 상태 관리 기능
- 이벤트 기반 반응형
- 프록시 기반 상태 업데이트
- JavaScript 구현