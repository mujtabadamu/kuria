# Kuri'a — conventions

## API integration (RTK Query)

The generated/wrapped API layer lives in `src/api/`:
- `baseApi.ts` — the bare `createApi` slice (base URL, auth header, `tagTypes`). No endpoints here; codegen injects them elsewhere.
- `generated/kuriaApi.ts` — fully generated from the live backend OpenAPI spec. Never edit by hand, never import from it outside `kuria.ts`.
- `kuria.ts` — the only file components/hooks may import from. Re-exports generated hooks and types under clean names (FastAPI's verbose auto operationIds stripped) so the rest of the app is insulated from codegen churn.

Endpoints already exist for the whole backend, but most pages still render from `src/data/mockData.ts` via `src/lib/useAppData.ts` (`AppDataContext`). Wiring a page to real data means replacing that mock dependency with the real one — do it in this order:

1. **Regenerate first, if the backend changed.** If the endpoint you need is new or its request/response shape changed, run `npm run api:codegen` *before* writing any other code. This regenerates `src/api/generated/kuriaApi.ts` from the live OpenAPI spec at `https://kuria-mglo.onrender.com/openapi.json`. Do this first, not last: `src/api/kuria.ts`'s re-exports and any `endpointOverrides` in `openapi-config.ts` reference generated hook/type names by name, so those names must exist before step 2 can use them. If the endpoint is already in `generated/kuriaApi.ts` and unchanged, skip straight to step 2.
2. **Re-export under a clean name.** In `src/api/kuria.ts`, import the generated hook and its `ApiArg`/`ApiResponse` types, and re-export them under names that match the existing convention (see the current exports — e.g. `useListReportsApiV1ReportsGetQuery` → `useListReportsQuery`). If the endpoint needs cache invalidation/providing, add a `pattern` entry to `endpointOverrides` in `openapi-config.ts` (tag names must exist in `tagTypes` in `baseApi.ts`) and rerun `npm run api:codegen` so the override takes effect.
3. **Wrap in a custom hook, not the page.** Put the RTK hook call(s) and business logic — data shaping, derived state, mutation handlers, error mapping — in a hook, not inline in the page/component. Pages/index files should only call that hook and render — no raw RTK hooks or query wiring inline in page components.
   - `src/hooks/` is for app-wide, cross-feature hooks only (mirror the shape of `src/hooks/useAuth.ts` once it exists).
   - Feature/page-specific hooks (anything only used within one `src/pages/<feature>/` tree) go in that feature's own `hooks/` folder, e.g. `src/pages/<feature>/hooks/useXyz.ts`. Do not add a feature-specific hook to `src/hooks/`.
4. **Retire the mock source, don't leave it alongside.** If the page currently reads from `src/data/mockData.ts` (directly, or via `useAppData()`), remove that dependency once the real hook is wired in — a migrated page should have zero references to `mockData.ts` or `AppDataContext` left. Before deleting an export from `mockData.ts`, grep for other pages still using it; only remove what's now fully unused.
5. **Render the hook's full state, not just the happy path.** The page must reflect the hook's `isLoading`/`isFetching` and `isError` states — no page should silently show stale, empty, or default data while a request is in flight or has failed. Loading and error UI belong in the page (it's presentation); deciding *what* the states mean belongs in the hook (it's logic).
