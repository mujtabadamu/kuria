// The generated `loginApiV1AuthLoginPost` mutation is unusable: the backend's
// OpenAPI spec documents POST /api/v1/auth/login with no request body, so
// codegen produced a `void` arg and a query function that sends nothing.
// Live-testing the real endpoint confirms it does expect a JSON body —
// `{}` → 422 "email/username and password are required"; a real
// `{ email, password }` → 401 "Invalid credentials". This injects a corrected
// endpoint by hand since codegen can't derive a body the spec doesn't document.
import { baseApi } from './baseApi'
import type { Token } from './generated/kuriaApi'

export interface LoginCredentials {
  email: string
  password: string
}

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Token, LoginCredentials>({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
