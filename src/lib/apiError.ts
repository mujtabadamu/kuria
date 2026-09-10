import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import type { SerializedError } from '@reduxjs/toolkit'

// Matches the error contract in the backend's frontend handoff docs:
// - Normal errors: { detail: "message" }
// - Password-state errors: { detail: { code: "PASSWORD_CHANGE_REQUIRED" | "TEMPORARY_PASSWORD_EXPIRED", message } }
// - 422s: detail may be a validation-error array ({ loc, msg, type }[])
type ApiErrorBody = {
  detail?:
    | string
    | { code?: string; message?: string }
    | { loc?: (string | number)[]; msg: string; type?: string }[]
}

function detailOf(error: FetchBaseQueryError): ApiErrorBody['detail'] {
  const data = error.data as ApiErrorBody | undefined
  return data?.detail
}

export function getErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== 'object' || !('status' in error)) return undefined
  const detail = detailOf(error as FetchBaseQueryError)
  if (detail && typeof detail === 'object' && !Array.isArray(detail)) return detail.code
  return undefined
}

/** Human-readable message for a toast, following the backend's global response contract. */
export function getErrorMessage(error: unknown, fallback = "Something went wrong — please try again."): string {
  if (!error || typeof error !== 'object') return fallback

  if ('status' in error) {
    const fetchError = error as FetchBaseQueryError
    const detail = detailOf(fetchError)

    if (fetchError.status === 401) return 'Your session has expired — please sign in again.'

    if (fetchError.status === 403) {
      if (detail && typeof detail === 'object' && !Array.isArray(detail)) {
        if (detail.code === 'PASSWORD_CHANGE_REQUIRED') {
          return detail.message ?? 'Change your temporary password before continuing.'
        }
        if (detail.code === 'TEMPORARY_PASSWORD_EXPIRED') {
          return detail.message ?? 'Your temporary password has expired — ask an admin to reset it.'
        }
      }
      return typeof detail === 'string' ? detail : "You don't have permission to do that."
    }

    if (fetchError.status === 409) {
      return typeof detail === 'string' ? detail : 'This conflicts with the current state — refreshing.'
    }

    if (fetchError.status === 422) {
      if (Array.isArray(detail) && detail.length > 0) {
        return detail.map((d) => d.msg).join(' ')
      }
      return typeof detail === 'string' ? detail : 'Please check the form and try again.'
    }

    if (fetchError.status === 429) return 'Too many attempts — please wait a moment and try again.'

    if (typeof detail === 'string') return detail
    return fallback
  }

  const serialized = error as SerializedError
  return serialized.message ?? fallback
}

export function isConflict(error: unknown): boolean {
  return Boolean(error && typeof error === 'object' && 'status' in error && (error as FetchBaseQueryError).status === 409)
}
