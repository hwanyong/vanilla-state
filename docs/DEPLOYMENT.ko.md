# 배포 가이드

이 문서는 `@uhd_kr/vanilla-state` 패키지의 배포 프로세스를 설명합니다.

## 배포 방법

### 1. 수동 배포

수동으로 패키지를 배포하려면 다음 단계를 따르세요:

// ...existing code...

## 필요한 환경 변수

### NPM 토큰 설정

1. NPM 액세스 토큰 생성:
   - npmjs.com에서 Access Tokens 메뉴로 이동
   - "Generate New Token" 클릭
   - "Automation" 토큰 유형 선택
   - 토큰 생성 및 복사

2. GitHub 시크릿 설정:
   - GitHub의 vanilla-state 저장소로 이동
   - Settings > Secrets and variables > Actions로 이동
   - "New repository secret" 클릭
   - 이름: `NPM_TOKEN`
   - 값: 복사한 NPM 토큰 붙여넣기
   - "Add secret" 클릭

이 설정을 통해 GitHub Actions가 배포 과정에서 NPM 인증을 수행할 수 있습니다.

### GitHub 토큰
`GITHUB_TOKEN`은 GitHub Actions가 자동으로 제공하는 토큰이므로 별도로 생성하거나 설정할 필요가 없습니다. 이 토큰은 GitHub Actions가 실행될 때 자동으로 생성되며, 워크플로우의 권한 설정에 따라 필요한 권한을 가지게 됩니다.

토큰 권한은 워크플로우 파일의 `permissions` 섹션에서 구성됩니다:
```yaml
permissions:
  contents: write
  pull-requests: write
  packages: write
  issues: write
  actions: write
  statuses: write
  checks: write
  deployments: write
  id-token: write
  discussions: write
```

워크플로우에서는 `${{ secrets.GITHUB_TOKEN }}`로 이 토큰을 사용할 수 있습니다.

### 환경 변수 목록
- `NPM_TOKEN`: NPM 배포를 위한 액세스 토큰 (수동 설정 필요)
- `GITHUB_TOKEN`: GitHub Actions에서 자동 제공 (설정 불필요)

// ...existing code...