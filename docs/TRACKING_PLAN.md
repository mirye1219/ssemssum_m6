# Tracking Plan — 쌤씀 메모

도구: Amplitude(행동), Google Analytics 4(유입). 개인정보·실명 원아 데이터는 이벤트로 보내지 않습니다.

## User Property

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `utm_source` | string | 유입 채널 |
| `utm_medium` | string | 매체 |
| `utm_campaign` | string | 캠페인 |
| `landing_path` | string | 처음 연 경로 |

## 이벤트

| 이벤트 | 언제 | 속성 |
| --- | --- | --- |
| `page_viewed` | 화면이 바뀔 때 | `path` |
| `cta_new_memo_clicked` | 헤더/빈 목록의 새 메모 | `from` |
| `memo_create_started` | `/memos/new` | — |
| `memo_created` | 등록 후 상세로 이동 | `has_image` |
| `memo_detail_viewed` | 상세 | `has_image` |
| `memo_edit_started` | 수정 화면 | — |
| `memo_updated` | 수정 저장 | `has_image` |
| `memo_deleted` | 삭제 확인 후 | — |
| `memo_list_item_clicked` | 목록 카드 클릭 | — |

최소 요구 5개를 넘깁니다. 위 9개가 Amplitude와 동일 이름으로 전송됩니다.

## 로그 QA

1. 배포 URL을 UTM 붙여 연다.
2. 새 메모 → 등록 → 상세 → 수정 → 삭제.
3. Amplitude Live events에서 위 이름이 순서대로 보이는지 확인.
4. GA4 실시간에서 같은 세션의 페이지 조회가 보이는지 확인.

QA 결과(2026-11-19): Amplitude에서 `page_viewed` → `cta_new_memo_clicked` → `memo_create_started` → `memo_created` → `memo_detail_viewed` 수신. GA4 실시간에서 `/`, `/memos/new`, `/memos/[id]` 수신. 증적은 `docs/deliverables`에 있습니다.
