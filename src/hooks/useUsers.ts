import { useState } from 'react'
import {
  useListUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  type CreateUserArg,
  type UpdateUserArg,
} from '../api/kuria'

export const USERS_PAGE_SIZE = 20

// `ListUsersApiV1AuthUsersGetApiResponse` is a bare array, not a paginated
// wrapper — there's no total count from the API, so pagination here can only
// tell whether the current page was full, not how many pages exist.
export function useUsers() {
  const [skip, setSkip] = useState(0)
  const { data, isLoading, isFetching, isError, refetch } = useListUsersQuery({
    skip,
    limit: USERS_PAGE_SIZE,
  })
  const [createUserMutation, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUserMutation, { isLoading: isUpdating }] = useUpdateUserMutation()

  const users = data ?? []

  function setPage(page: number) {
    setSkip(page * USERS_PAGE_SIZE)
  }

  async function createUser(userCreate: CreateUserArg['userCreate']) {
    await createUserMutation({ userCreate }).unwrap()
  }

  async function updateUser(userId: number, userUpdate: UpdateUserArg['userUpdate']) {
    await updateUserMutation({ userId, userUpdate }).unwrap()
  }

  return {
    users,
    page: Math.floor(skip / USERS_PAGE_SIZE),
    pageSize: USERS_PAGE_SIZE,
    hasMore: users.length === USERS_PAGE_SIZE,
    setPage,
    isLoading,
    isFetching,
    isError,
    refetch,
    createUser,
    isCreating,
    updateUser,
    isUpdating,
  }
}
