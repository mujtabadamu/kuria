import { useState } from 'react'
import {
  useListUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useResetUserPasswordMutation,
  type CreateUserArg,
  type UpdateUserArg,
} from '../api/kuria'

export const USERS_PAGE_SIZE = 20

export function useUsers() {
  const [skip, setSkip] = useState(0)
  const { data, isLoading, isFetching, isError, refetch } = useListUsersQuery({
    skip,
    limit: USERS_PAGE_SIZE,
  })
  const [createUserMutation, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUserMutation, { isLoading: isUpdating }] = useUpdateUserMutation()
  const [resetPasswordMutation, { isLoading: isResettingPassword }] = useResetUserPasswordMutation()

  const users = data?.items ?? []

  function setPage(page: number) {
    setSkip(page * USERS_PAGE_SIZE)
  }

  async function createUser(userCreate: CreateUserArg['userCreate']) {
    await createUserMutation({ userCreate }).unwrap()
  }

  async function updateUser(userId: number, userUpdate: UpdateUserArg['userUpdate']) {
    await updateUserMutation({ userId, userUpdate }).unwrap()
  }

  // Revokes the user's existing tokens and starts a new 72-hour
  // temporary-password window (backend/new.md §3).
  async function resetPassword(userId: number, temporaryPassword: string) {
    await resetPasswordMutation({ userId, adminPasswordReset: { temporary_password: temporaryPassword } }).unwrap()
  }

  return {
    users,
    total: data?.total ?? 0,
    page: Math.floor(skip / USERS_PAGE_SIZE),
    pageSize: USERS_PAGE_SIZE,
    setPage,
    isLoading,
    isFetching,
    isError,
    refetch,
    createUser,
    isCreating,
    updateUser,
    isUpdating,
    resetPassword,
    isResettingPassword,
  }
}
