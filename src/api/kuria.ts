// Thin, hand-written wrapper around the generated API (`./generated/kuriaApi.ts`).
// Components should import from here, never from the generated file directly —
// that keeps every consumer insulated from FastAPI's verbose auto operationIds,
// and safe across `yarn api:codegen` re-runs.
import {
  useMeApiV1AuthMeGetQuery as useGetMeQuery,
  useCreateUserApiV1AuthUsersPostMutation as useCreateUserMutation,
  useListUsersApiV1AuthUsersGetQuery as useListUsersQuery,
  useUpdateUserApiV1AuthUsersUserIdPatchMutation as useUpdateUserMutation,
  useListReportsApiV1ReportsGetQuery as useListReportsQuery,
  useCreateReportApiApiV1ReportsPostMutation as useCreateReportMutation,
  useSearchPusApiV1ReportsPollingUnitsSearchGetQuery as useSearchPollingUnitsQuery,
  useGetReportApiV1ReportsPublicRefGetQuery as useGetReportQuery,
  useGetReportAnonymizedApiV1ReportsPublicRefAnonymizedGetQuery as useGetReportAnonymizedQuery,
  useGetReportHistoryApiV1ReportsPublicRefHistoryGetQuery as useGetReportHistoryQuery,
  useAssignApiApiV1ReportsPublicRefAssignPatchMutation as useAssignReportMutation,
  useAddEvidenceApiApiV1ReportsPublicRefEvidencePostMutation as useAddReportEvidenceMutation,
  useCorrectTranscriptApiV1ReportsPublicRefCorrectTranscriptPatchMutation as useCorrectReportTranscriptMutation,
  useRequestClarificationApiV1ReportsPublicRefClarificationPostMutation as useRequestReportClarificationMutation,
  useRecommendApiApiV1ReportsPublicRefRecommendPostMutation as useRecommendReportDecisionMutation,
  useDecideApiApiV1ReportsPublicRefDecidePostMutation as useDecideReportMutation,
  useEscalateApiApiV1ReportsPublicRefEscalatePostMutation as useEscalateReportMutation,
  useGetMediaUrlApiV1ReportsPublicRefMediaWamMediaIdUrlGetQuery as useGetReportMediaUrlQuery,
  useStreamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGetQuery as useStreamReportMediaQuery,
  useMetricsApiV1AnalyticsMetricsGetQuery as useGetAnalyticsMetricsQuery,
  useExportDataApiV1AnalyticsExportGetQuery as useExportAnalyticsDataQuery,
  useHealthCheckApiV1HealthGetQuery as useHealthCheckQuery,
} from './generated/kuriaApi'

export { useLoginMutation } from './authOverrides'
export type { LoginCredentials } from './authOverrides'

export {
  useGetMeQuery,
  useCreateUserMutation,
  useListUsersQuery,
  useUpdateUserMutation,
  useListReportsQuery,
  useCreateReportMutation,
  useSearchPollingUnitsQuery,
  useGetReportQuery,
  useGetReportAnonymizedQuery,
  useGetReportHistoryQuery,
  useAssignReportMutation,
  useAddReportEvidenceMutation,
  useCorrectReportTranscriptMutation,
  useRequestReportClarificationMutation,
  useRecommendReportDecisionMutation,
  useDecideReportMutation,
  useEscalateReportMutation,
  useGetReportMediaUrlQuery,
  useStreamReportMediaQuery,
  useGetAnalyticsMetricsQuery,
  useExportAnalyticsDataQuery,
  useHealthCheckQuery,
}

// Domain types — already clean (named from the spec's `components.schemas`, not per-operation).
export type {
  Token,
  UserRole,
  UserRead,
  UserCreate,
  UserUpdate,
  ReportStatus,
  ReportRead,
  ReportListResponse,
  ReportCreate,
  ReportAnonymized,
  PollingUnitRead,
  StatusHistoryRead,
  EvidenceRead,
  EvidenceCreate,
  ClarificationRead,
  ClarificationCreate,
  StatusTransition,
  ValidationError,
  HttpValidationError,
} from './generated/kuriaApi'

// Per-operation request/response arg types, re-exported under matching clean names.
export type {
  LoginApiV1AuthLoginPostApiResponse as LoginResponse,
  CreateUserApiV1AuthUsersPostApiArg as CreateUserArg,
  ListUsersApiV1AuthUsersGetApiArg as ListUsersArg,
  UpdateUserApiV1AuthUsersUserIdPatchApiArg as UpdateUserArg,
  ListReportsApiV1ReportsGetApiArg as ListReportsArg,
  CreateReportApiApiV1ReportsPostApiArg as CreateReportArg,
  SearchPusApiV1ReportsPollingUnitsSearchGetApiArg as SearchPollingUnitsArg,
  AssignApiApiV1ReportsPublicRefAssignPatchApiArg as AssignReportArg,
  AddEvidenceApiApiV1ReportsPublicRefEvidencePostApiArg as AddReportEvidenceArg,
  CorrectTranscriptApiV1ReportsPublicRefCorrectTranscriptPatchApiArg as CorrectReportTranscriptArg,
  RequestClarificationApiV1ReportsPublicRefClarificationPostApiArg as RequestReportClarificationArg,
  RecommendApiApiV1ReportsPublicRefRecommendPostApiArg as RecommendReportDecisionArg,
  DecideApiApiV1ReportsPublicRefDecidePostApiArg as DecideReportArg,
  EscalateApiApiV1ReportsPublicRefEscalatePostApiArg as EscalateReportArg,
  ExportDataApiV1AnalyticsExportGetApiArg as ExportAnalyticsDataArg,
} from './generated/kuriaApi'

export { getAuthToken, setAuthToken, subscribeAuthToken, baseApi } from './baseApi'
