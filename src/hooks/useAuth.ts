import { useCallback, useSyncExternalStore } from 'react'
import { useDispatch } from 'react-redux'
import {
  useLoginMutation,
  useGetMeQuery,
  setAuthToken,
  getAuthToken,
  subscribeAuthToken,
  baseApi,
} from '../api/kuria'
import type { AppDispatch } from '../api/store'

export interface LoginCredentials {
  email: string
  password: string
}

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSyncExternalStore(subscribeAuthToken, getAuthToken)
  const hasToken = Boolean(token)

  const [loginMutation, { isLoading: isLoggingIn, error: loginError }] = useLoginMutation()
  const {
    data: currentUser,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
    isError: isUserError,
  } = useGetMeQuery(undefined, { skip: !hasToken })

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const token = await loginMutation({ body: credentials }).unwrap()
      setAuthToken(token.access_token)
      return token
    },
    [loginMutation],
  )

  const logout = useCallback(() => {
    setAuthToken(null)
    dispatch(baseApi.util.resetApiState())
  }, [dispatch])

  return {
    login,
    logout,
    isLoggingIn,
    loginError,
    currentUser,
    isAuthenticated: hasToken && !isUserError,
    isLoadingUser: hasToken && (isLoadingUser || isFetchingUser),
  }
}
