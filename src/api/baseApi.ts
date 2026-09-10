import { createApi, fetchBaseQuery, type BaseQueryFn } from '@reduxjs/toolkit/query/react'
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

const TOKEN_STORAGE_KEY = 'kuria-auth-token'

const authTokenListeners = new Set<() => void>()

export function getAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function setAuthToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token)
  else localStorage.removeItem(TOKEN_STORAGE_KEY)
  authTokenListeners.forEach((listener) => listener())
}

// Lets `useAuth` (via useSyncExternalStore) react to login/logout everywhere
// it's called, since the token itself lives in localStorage, not Redux state.
export function subscribeAuthToken(listener: () => void) {
  authTokenListeners.add(listener)
  return () => authTokenListeners.delete(listener)
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAuthToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

// Per frontend-api handoff: a 401 means the token is missing/expired/invalid/
// revoked — clear it globally so every `useAuth()` call site (route guards,
// topbar, etc.) reactively falls back to the logged-out state, rather than
// leaving each page to notice and handle it individually.
const baseQueryWithAuthHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions)
  if (result.error?.status === 401 && getAuthToken()) {
    setAuthToken(null)
  }
  return result
}

// Bare API slice with no endpoints — `yarn api:codegen` injects the real
// endpoints (typed from the live OpenAPI spec) into `src/api/generated/kuriaApi.ts`.
// Don't add endpoints here directly; they'd be overwritten on the next codegen run.
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: [
    'Report',
    'ReportList',
    'Evidence',
    'Clarifications',
    'User',
    'Analytics',
    'Alert',
    'AlertList',
    'AiJobList',
  ],
  endpoints: () => ({}),
})
