# 쌤씀 메모

선생님이 오늘 본 장면을 짧게 남기는 원아 메모 MVP입니다.  
미션 5 랜딩에서 말한 “짧은 메모로 시작”을 **등록 → 목록 → 상세 → 수정 → 삭제** 한 사이클로 검증합니다.

데모 데이터만 사용합니다. 실제 원아 개인정보는 넣지 마세요. 로그인과 사용자별 권한은 미션 7에서 적용합니다.

## 핵심 기능

| 화면 | 경로 | 하는 일 |
| --- | --- | --- |
| 목록 | `/` | 최신 메모를 카드로 보고 페이지를 넘김 |
| 등록 | `/memos/new` | 이름, 날짜, 내용, 선택 사진을 저장 |
| 상세 | `/memos/[id]` | 저장된 메모와 사진을 확인 |
| 수정 | `/memos/[id]/edit` | 기존 값을 불러와 다시 저장 |
| 삭제 | 상세 화면 | 확인 후 메모와 사진을 삭제 |

## 테이블 구조 (`memos`)

| 컬럼 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `id` | uuid | O | 고유 식별자 |
| `child_name` | text | O | 원아 이름 (1~20자, 데모용) |
| `memo_date` | date | O | 관찰 날짜 |
| `content` | text | O | 메모 본문 (5~1000자) |
| `image_path` | text | X | Storage 경로 |
| `created_at` | timestamptz | O | 생성 시각 |
| `updated_at` | timestamptz | O | 수정 시각 |

이미지 버킷: `memo-images` (공개 읽기)

## 실행 방법

1. Supabase SQL Editor에서 `supabase/schema.sql`을 실행합니다.
2. 환경 변수를 로컬에만 넣습니다.

```bash
cp .env.example .env.local
```

`.env.local` 이름만 맞추면 됩니다. 실제 값과 키는 이 문서에 적지 않습니다.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_AMPLITUDE_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

지표·트래킹 플랜·수신 스크린샷은 [docs/deliverables](docs/deliverables/README.md)에 모아 두었습니다.

UTM 예시 (배포 URL 기준):

- 카카오톡: https://ssemssum-m6.vercel.app/?utm_source=kakao&utm_medium=social&utm_campaign=memo_mvp
- 네이버 블로그: https://ssemssum-m6.vercel.app/?utm_source=naver_blog&utm_medium=referral&utm_campaign=memo_mvp
- 인스타그램: https://ssemssum-m6.vercel.app/?utm_source=instagram&utm_medium=social&utm_campaign=memo_mvp

3. 앱을 켭니다.

```bash
npm install
npm run dev
```

## 배포

- GitHub 저장소: https://github.com/mirye1219/ssemssum_m6
- Vercel 배포 URL: https://ssemssum-m6.vercel.app

Vercel에도 같은 환경 변수 이름을 넣습니다. `.env.local`은 GitHub에 올리지 않습니다.

## QA 체크리스트

| 시나리오 | 결과 | 점검 |
| --- | --- | --- |
| 빈 값 제출 | 필드별 한글 에러 | [ ] |
| 잘못된 파일 형식/크기 | 이미지 에러 | [ ] |
| 등록 후 목록·상세 반영 | 새 카드와 상세 내용 보임 | [x] |
| 새로고침 후 데이터 유지 | 그대로 유지 | [x] |
| 수정 후 화면 반영 | 상세에 새 값 | [ ] |
| 삭제 후 화면 반영 | 목록에서 사라짐 | [ ] |
| 없는 상세 주소 | 없는 메모 안내 | [ ] |
| 사진 없이 등록 | “사진 없음” 처리 | [x] |
| 업로드 실패 | 저장 실패 안내 | [ ] |
