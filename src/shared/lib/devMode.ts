/**
 * `pnpm dev`로 실행할 때만 true. 프로덕션 빌드(`vite build`)에서는 항상 false.
 * true일 때는 로그인 없이도 모든 페이지에 접근할 수 있다(UI 확인용, API 연동 X).
 */
export const IS_DEV_BYPASS_AUTH = import.meta.env.DEV;
