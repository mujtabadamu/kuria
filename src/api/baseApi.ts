import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

// Bare API slice with no endpoints — `yarn api:codegen` injects the real
// endpoints (typed from the live OpenAPI spec) into `src/api/generated/kuriaApi.ts`.
// Don't add endpoints here directly; they'd be overwritten on the next codegen run.
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAuthToken()
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['Report', 'ReportList', 'Evidence', 'User', 'Analytics', 'Alert', 'AlertList'],
  endpoints: () => ({}),
})
