import { useCallback, useSyncExternalStore } from 'react'
import { useDispatch } from 'react-redux'
import {
  useLoginMutation,
  useGetMeQuery,
  useChangePasswordMutation,
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
  const [changePasswordMutation, { isLoading: isChangingPassword, error: changePasswordError }] =
    useChangePasswordMutation()
  const {
    data: currentUser,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
    isError: isUserError,
  } = useGetMeQuery(undefined, { skip: !hasToken })

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await loginMutation({ body: credentials }).unwrap()
      setAuthToken(result.access_token)
      return result
    },
    [loginMutation],
  )

  // A temporary-password token can only call /auth/me and /auth/change-password
  // — swapping in the new token must also drop any cached /auth/me response
  // (still showing the stale must_change_password: true) so the app re-fetches
  // and unlocks the rest of the routes immediately.
  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      const result = await changePasswordMutation({
        passwordChange: { current_password: currentPassword, new_password: newPassword },
      }).unwrap()
      setAuthToken(result.access_token)
      dispatch(baseApi.util.resetApiState())
      return result
    },
    [changePasswordMutation, dispatch],
  )

  const logout = useCallback(() => {
    setAuthToken(null)
    dispatch(baseApi.util.resetApiState())
  }, [dispatch])

  return {
    login,
    logout,
    changePassword,
    isChangingPassword,
    changePasswordError,
    isLoggingIn,
    loginError,
    currentUser,
    isAuthenticated: hasToken && !isUserError,
    isLoadingUser: hasToken && (isLoadingUser || isFetchingUser),
    mustChangePassword: Boolean(currentUser?.must_change_password),
  }
}
