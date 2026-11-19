# 제출 결과물

서비스: [쌤씀 메모](https://ssemssum-m6.vercel.app)  
저장소: https://github.com/mirye1219/ssemssum_m6

이 폴더가 미션 결과물입니다.

## 1. 지표 설계 문서

[docs/METRICS.md](../METRICS.md)

- 방문자 수
- 작성 시작률
- 메모 등록 전환율
- 퍼널: 방문 → 새 메모 클릭 → 작성 화면 → 등록 성공

## 2. Tracking Plan

[docs/TRACKING_PLAN.md](../TRACKING_PLAN.md)

이벤트 9개. 최소 요구(5개)를 넘깁니다.

## 3. 로깅 구현

GTM 컨테이너는 쓰지 않았습니다. GA4는 **gtag.js** 로 심었습니다. Amplitude는 브라우저 SDK입니다.

| 파일 | 역할 |
| --- | --- |
| [src/lib/analytics.ts](../../src/lib/analytics.ts) | Amplitude init, `track`, UTM user property |
| [src/components/analytics-provider.tsx](../../src/components/analytics-provider.tsx) | gtag.js 로드, 페이지뷰, 작성/수정 시작 |
| [src/components/track-link.tsx](../../src/components/track-link.tsx) | CTA·카드 클릭 |
| [src/components/memo-detail-tracker.tsx](../../src/components/memo-detail-tracker.tsx) | 상세, 등록 성공, 수정 성공 |
| [src/components/delete-button.tsx](../../src/components/delete-button.tsx) | 삭제 |

GA4 웹 스트림 화면: [ga4-web-stream.png](./ga4-web-stream.png)

## 4. Amplitude 수신 확인

- 스크린샷: [amplitude-live-events.png](./amplitude-live-events.png)
- 샘플 CSV: [amplitude-events-sample.csv](./amplitude-events-sample.csv)

확인된 이벤트: `page_viewed`, `cta_new_memo_clicked`, `memo_create_started`, `memo_created`, `memo_detail_viewed`

## 5. Google Analytics 4 수신 확인

- 스크린샷: [ga4-realtime.png](./ga4-realtime.png)

실시간 30분: 활성 사용자 1, 조회 9  
경로: `/`, `/memos/new`, `/memos/[id]`

## UTM (유입 구분)

- kakao: https://ssemssum-m6.vercel.app/?utm_source=kakao&utm_medium=social&utm_campaign=memo_mvp
- naver_blog: https://ssemssum-m6.vercel.app/?utm_source=naver_blog&utm_medium=referral&utm_campaign=memo_mvp
- instagram: https://ssemssum-m6.vercel.app/?utm_source=instagram&utm_medium=social&utm_campaign=memo_mvp
