# skku-club

## 로컬 개발 환경 구성

1. node.js 설치
2. `corepack` 활성화

```bash

corepack enable

```

3. 의존성 설치

```bash
pnpm i
```

4. podman 설치
5. podman-compose 설치
6. DB 실행

```bash
pnpm start:db
```

7. Vercel CLI 설치

```bash
pnpm i -g vercel
```

8. Vercel 프로젝트 링크

```bash
vc link
```

8. 개발 서버 실행

```bash
pnpm dev
```

## 텍스트 관리

[`./app/(app)/(mdx)`]에 동아리 연합회 소개, FAQ, 회칙이 저장되어 있고, 파일은 MDX로 작성되어 있음.

기존 텍스트 보면서 마크대운 문법으로 적당히 작성하면 됨.
