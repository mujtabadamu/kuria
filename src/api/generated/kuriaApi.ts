import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginApiV1AuthLoginPost: build.mutation<
      LoginApiV1AuthLoginPostApiResponse,
      LoginApiV1AuthLoginPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    meApiV1AuthMeGet: build.query<
      MeApiV1AuthMeGetApiResponse,
      MeApiV1AuthMeGetApiArg
    >({
      query: () => ({ url: `/api/v1/auth/me` }),
    }),
    changeOwnPasswordApiV1AuthChangePasswordPost: build.mutation<
      ChangeOwnPasswordApiV1AuthChangePasswordPostApiResponse,
      ChangeOwnPasswordApiV1AuthChangePasswordPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/change-password`,
        method: "POST",
        body: queryArg.passwordChange,
      }),
    }),
    createUserApiV1AuthUsersPost: build.mutation<
      CreateUserApiV1AuthUsersPostApiResponse,
      CreateUserApiV1AuthUsersPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/users`,
        method: "POST",
        body: queryArg.userCreate,
      }),
      invalidatesTags: ["User"],
    }),
    listUsersApiV1AuthUsersGet: build.query<
      ListUsersApiV1AuthUsersGetApiResponse,
      ListUsersApiV1AuthUsersGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/users`,
        params: {
          skip: queryArg.skip,
          limit: queryArg.limit,
        },
      }),
      providesTags: ["User"],
    }),
    updateUserApiV1AuthUsersUserIdPatch: build.mutation<
      UpdateUserApiV1AuthUsersUserIdPatchApiResponse,
      UpdateUserApiV1AuthUsersUserIdPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/users/${queryArg.userId}`,
        method: "PATCH",
        body: queryArg.userUpdate,
      }),
      invalidatesTags: ["User"],
    }),
    resetUserPasswordApiV1AuthUsersUserIdResetPasswordPost: build.mutation<
      ResetUserPasswordApiV1AuthUsersUserIdResetPasswordPostApiResponse,
      ResetUserPasswordApiV1AuthUsersUserIdResetPasswordPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/users/${queryArg.userId}/reset-password`,
        method: "POST",
        body: queryArg.adminPasswordReset,
      }),
      invalidatesTags: ["User"],
    }),
    listAiJobsApiV1AiJobsGet: build.query<
      ListAiJobsApiV1AiJobsGetApiResponse,
      ListAiJobsApiV1AiJobsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ai/jobs`,
        params: {
          status: queryArg.status,
          skip: queryArg.skip,
          limit: queryArg.limit,
        },
      }),
      providesTags: ["AiJobList"],
    }),
    assignAiJobApiV1AiJobsJobIdAssignPatch: build.mutation<
      AssignAiJobApiV1AiJobsJobIdAssignPatchApiResponse,
      AssignAiJobApiV1AiJobsJobIdAssignPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ai/jobs/${queryArg.jobId}/assign`,
        method: "PATCH",
        params: {
          assignee_id: queryArg.assigneeId,
        },
      }),
      invalidatesTags: ["AiJobList"],
    }),
    resolveAiJobApiV1AiJobsJobIdResolvePost: build.mutation<
      ResolveAiJobApiV1AiJobsJobIdResolvePostApiResponse,
      ResolveAiJobApiV1AiJobsJobIdResolvePostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ai/jobs/${queryArg.jobId}/resolve`,
        method: "POST",
        body: queryArg.aiJobResolve,
      }),
      invalidatesTags: ["AiJobList"],
    }),
    getAiJobMediaApiV1AiJobsJobIdMediaGet: build.query<
      GetAiJobMediaApiV1AiJobsJobIdMediaGetApiResponse,
      GetAiJobMediaApiV1AiJobsJobIdMediaGetApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/ai/jobs/${queryArg.jobId}/media` }),
    }),
    listReportsApiV1ReportsGet: build.query<
      ListReportsApiV1ReportsGetApiResponse,
      ListReportsApiV1ReportsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports`,
        params: {
          status: queryArg.status,
          assigned_to: queryArg.assignedTo,
          skip: queryArg.skip,
          limit: queryArg.limit,
        },
      }),
      providesTags: ["ReportList"],
    }),
    createReportApiApiV1ReportsPost: build.mutation<
      CreateReportApiApiV1ReportsPostApiResponse,
      CreateReportApiApiV1ReportsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports`,
        method: "POST",
        body: queryArg.reportCreate,
      }),
      invalidatesTags: ["ReportList"],
    }),
    searchPusApiV1ReportsPollingUnitsSearchGet: build.query<
      SearchPusApiV1ReportsPollingUnitsSearchGetApiResponse,
      SearchPusApiV1ReportsPollingUnitsSearchGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/polling-units/search`,
        params: {
          q: queryArg.q,
          state: queryArg.state,
          limit: queryArg.limit,
        },
      }),
    }),
    getReportApiV1ReportsPublicRefGet: build.query<
      GetReportApiV1ReportsPublicRefGetApiResponse,
      GetReportApiV1ReportsPublicRefGetApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/reports/${queryArg.publicRef}` }),
      providesTags: ["Report"],
    }),
    getReportAnonymizedApiV1ReportsPublicRefAnonymizedGet: build.query<
      GetReportAnonymizedApiV1ReportsPublicRefAnonymizedGetApiResponse,
      GetReportAnonymizedApiV1ReportsPublicRefAnonymizedGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/anonymized`,
      }),
      providesTags: ["Report"],
    }),
    getReportHistoryApiV1ReportsPublicRefHistoryGet: build.query<
      GetReportHistoryApiV1ReportsPublicRefHistoryGetApiResponse,
      GetReportHistoryApiV1ReportsPublicRefHistoryGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/history`,
      }),
      providesTags: ["Report"],
    }),
    assignApiApiV1ReportsPublicRefAssignPatch: build.mutation<
      AssignApiApiV1ReportsPublicRefAssignPatchApiResponse,
      AssignApiApiV1ReportsPublicRefAssignPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/assign`,
        method: "PATCH",
        params: {
          assignee_id: queryArg.assigneeId,
        },
      }),
      invalidatesTags: ["Report", "ReportList"],
    }),
    startReviewApiV1ReportsPublicRefStartReviewPost: build.mutation<
      StartReviewApiV1ReportsPublicRefStartReviewPostApiResponse,
      StartReviewApiV1ReportsPublicRefStartReviewPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/start-review`,
        method: "POST",
      }),
      invalidatesTags: ["Report", "ReportList"],
    }),
    addEvidenceApiApiV1ReportsPublicRefEvidencePost: build.mutation<
      AddEvidenceApiApiV1ReportsPublicRefEvidencePostApiResponse,
      AddEvidenceApiApiV1ReportsPublicRefEvidencePostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/evidence`,
        method: "POST",
        body: queryArg.evidenceCreate,
      }),
      invalidatesTags: ["Report", "Evidence"],
    }),
    listEvidenceApiApiV1ReportsPublicRefEvidenceGet: build.query<
      ListEvidenceApiApiV1ReportsPublicRefEvidenceGetApiResponse,
      ListEvidenceApiApiV1ReportsPublicRefEvidenceGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/evidence`,
      }),
      providesTags: ["Evidence"],
    }),
    correctTranscriptApiV1ReportsPublicRefCorrectTranscriptPatch:
      build.mutation<
        CorrectTranscriptApiV1ReportsPublicRefCorrectTranscriptPatchApiResponse,
        CorrectTranscriptApiV1ReportsPublicRefCorrectTranscriptPatchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/${queryArg.publicRef}/correct-transcript`,
          method: "PATCH",
          params: {
            transcript_corrected: queryArg.transcriptCorrected,
          },
        }),
        invalidatesTags: ["Report"],
      }),
    requestClarificationApiV1ReportsPublicRefClarificationPost: build.mutation<
      RequestClarificationApiV1ReportsPublicRefClarificationPostApiResponse,
      RequestClarificationApiV1ReportsPublicRefClarificationPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/clarification`,
        method: "POST",
        body: queryArg.clarificationCreate,
      }),
      invalidatesTags: ["Report", "Clarifications"],
    }),
    listClarificationsApiV1ReportsPublicRefClarificationsGet: build.query<
      ListClarificationsApiV1ReportsPublicRefClarificationsGetApiResponse,
      ListClarificationsApiV1ReportsPublicRefClarificationsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/clarifications`,
      }),
      providesTags: ["Clarifications"],
    }),
    recommendApiApiV1ReportsPublicRefRecommendPost: build.mutation<
      RecommendApiApiV1ReportsPublicRefRecommendPostApiResponse,
      RecommendApiApiV1ReportsPublicRefRecommendPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/recommend`,
        method: "POST",
        body: queryArg.statusTransition,
      }),
      invalidatesTags: ["Report"],
    }),
    decideApiApiV1ReportsPublicRefDecidePost: build.mutation<
      DecideApiApiV1ReportsPublicRefDecidePostApiResponse,
      DecideApiApiV1ReportsPublicRefDecidePostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/decide`,
        method: "POST",
        body: queryArg.statusTransition,
      }),
      invalidatesTags: ["Report", "ReportList"],
    }),
    escalateApiApiV1ReportsPublicRefEscalatePost: build.mutation<
      EscalateApiApiV1ReportsPublicRefEscalatePostApiResponse,
      EscalateApiApiV1ReportsPublicRefEscalatePostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/escalate`,
        method: "POST",
        body: queryArg.statusTransition,
      }),
      invalidatesTags: ["Report", "ReportList"],
    }),
    getMediaUrlApiV1ReportsPublicRefMediaWamMediaIdUrlGet: build.query<
      GetMediaUrlApiV1ReportsPublicRefMediaWamMediaIdUrlGetApiResponse,
      GetMediaUrlApiV1ReportsPublicRefMediaWamMediaIdUrlGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/media/${queryArg.wamMediaId}/url`,
      }),
    }),
    streamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGet: build.query<
      StreamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGetApiResponse,
      StreamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/media/${queryArg.wamMediaId}/stream`,
      }),
    }),
    metricsApiV1AnalyticsMetricsGet: build.query<
      MetricsApiV1AnalyticsMetricsGetApiResponse,
      MetricsApiV1AnalyticsMetricsGetApiArg
    >({
      query: () => ({ url: `/api/v1/analytics/metrics` }),
      providesTags: ["Analytics"],
    }),
    exportDataApiV1AnalyticsExportGet: build.query<
      ExportDataApiV1AnalyticsExportGetApiResponse,
      ExportDataApiV1AnalyticsExportGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/analytics/export`,
        params: {
          format: queryArg.format,
        },
      }),
    }),
    listAlertsApiV1AlertsGet: build.query<
      ListAlertsApiV1AlertsGetApiResponse,
      ListAlertsApiV1AlertsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/alerts`,
        params: {
          status: queryArg.status,
          severity: queryArg.severity,
          skip: queryArg.skip,
          limit: queryArg.limit,
        },
      }),
      providesTags: ["AlertList"],
    }),
    createAlertApiV1AlertsPost: build.mutation<
      CreateAlertApiV1AlertsPostApiResponse,
      CreateAlertApiV1AlertsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/alerts`,
        method: "POST",
        body: queryArg.alertCreate,
      }),
      invalidatesTags: ["AlertList"],
    }),
    getAlertApiV1AlertsAlertIdGet: build.query<
      GetAlertApiV1AlertsAlertIdGetApiResponse,
      GetAlertApiV1AlertsAlertIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/alerts/${queryArg.alertId}` }),
      providesTags: ["Alert"],
    }),
    updateAlertApiV1AlertsAlertIdPatch: build.mutation<
      UpdateAlertApiV1AlertsAlertIdPatchApiResponse,
      UpdateAlertApiV1AlertsAlertIdPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/alerts/${queryArg.alertId}`,
        method: "PATCH",
        body: queryArg.alertUpdate,
      }),
      invalidatesTags: ["Alert", "AlertList"],
    }),
    healthCheckApiV1HealthGet: build.query<
      HealthCheckApiV1HealthGetApiResponse,
      HealthCheckApiV1HealthGetApiArg
    >({
      query: () => ({ url: `/api/v1/health` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as kuriaApi };
export type LoginApiV1AuthLoginPostApiResponse =
  /** status 200 Successful Response */ Token;
export type LoginApiV1AuthLoginPostApiArg = {
  body: {
    email: string;
    password: string;
  };
};
export type MeApiV1AuthMeGetApiResponse =
  /** status 200 Successful Response */ UserRead;
export type MeApiV1AuthMeGetApiArg = void;
export type ChangeOwnPasswordApiV1AuthChangePasswordPostApiResponse =
  /** status 200 Successful Response */ Token;
export type ChangeOwnPasswordApiV1AuthChangePasswordPostApiArg = {
  passwordChange: PasswordChange;
};
export type CreateUserApiV1AuthUsersPostApiResponse =
  /** status 201 Successful Response */ UserRead;
export type CreateUserApiV1AuthUsersPostApiArg = {
  userCreate: UserCreate;
};
export type ListUsersApiV1AuthUsersGetApiResponse =
  /** status 200 Successful Response */ UserListResponse;
export type ListUsersApiV1AuthUsersGetApiArg = {
  skip?: number;
  limit?: number;
};
export type UpdateUserApiV1AuthUsersUserIdPatchApiResponse =
  /** status 200 Successful Response */ UserRead;
export type UpdateUserApiV1AuthUsersUserIdPatchApiArg = {
  userId: number;
  userUpdate: UserUpdate;
};
export type ResetUserPasswordApiV1AuthUsersUserIdResetPasswordPostApiResponse =
  /** status 200 Successful Response */ UserRead;
export type ResetUserPasswordApiV1AuthUsersUserIdResetPasswordPostApiArg = {
  userId: number;
  adminPasswordReset: AdminPasswordReset;
};
export type ListAiJobsApiV1AiJobsGetApiResponse =
  /** status 200 Successful Response */ AiJobListResponse;
export type ListAiJobsApiV1AiJobsGetApiArg = {
  status?: AiJobStatus | null;
  skip?: number;
  limit?: number;
};
export type AssignAiJobApiV1AiJobsJobIdAssignPatchApiResponse =
  /** status 200 Successful Response */ AiJobRead;
export type AssignAiJobApiV1AiJobsJobIdAssignPatchApiArg = {
  jobId: number;
  assigneeId: number;
};
export type ResolveAiJobApiV1AiJobsJobIdResolvePostApiResponse =
  /** status 200 Successful Response */ AiJobRead;
export type ResolveAiJobApiV1AiJobsJobIdResolvePostApiArg = {
  jobId: number;
  aiJobResolve: AiJobResolve;
};
export type GetAiJobMediaApiV1AiJobsJobIdMediaGetApiResponse =
  /** status 200 Successful Response */ any;
export type GetAiJobMediaApiV1AiJobsJobIdMediaGetApiArg = {
  jobId: number;
};
export type ListReportsApiV1ReportsGetApiResponse =
  /** status 200 Successful Response */ ReportListResponse;
export type ListReportsApiV1ReportsGetApiArg = {
  status?: ReportStatus | null;
  assignedTo?: number | null;
  skip?: number;
  limit?: number;
};
export type CreateReportApiApiV1ReportsPostApiResponse =
  /** status 201 Successful Response */ ReportRead;
export type CreateReportApiApiV1ReportsPostApiArg = {
  reportCreate: ReportCreate;
};
export type SearchPusApiV1ReportsPollingUnitsSearchGetApiResponse =
  /** status 200 Successful Response */ PollingUnitRead[];
export type SearchPusApiV1ReportsPollingUnitsSearchGetApiArg = {
  q: string;
  state?: string | null;
  limit?: number;
};
export type GetReportApiV1ReportsPublicRefGetApiResponse =
  /** status 200 Successful Response */ ReportRead;
export type GetReportApiV1ReportsPublicRefGetApiArg = {
  publicRef: string;
};
export type GetReportAnonymizedApiV1ReportsPublicRefAnonymizedGetApiResponse =
  /** status 200 Successful Response */ ReportAnonymized;
export type GetReportAnonymizedApiV1ReportsPublicRefAnonymizedGetApiArg = {
  publicRef: string;
};
export type GetReportHistoryApiV1ReportsPublicRefHistoryGetApiResponse =
  /** status 200 Successful Response */ StatusHistoryRead[];
export type GetReportHistoryApiV1ReportsPublicRefHistoryGetApiArg = {
  publicRef: string;
};
export type AssignApiApiV1ReportsPublicRefAssignPatchApiResponse =
  /** status 200 Successful Response */ ReportRead;
export type AssignApiApiV1ReportsPublicRefAssignPatchApiArg = {
  publicRef: string;
  assigneeId: number;
};
export type StartReviewApiV1ReportsPublicRefStartReviewPostApiResponse =
  /** status 200 Successful Response */ ReportRead;
export type StartReviewApiV1ReportsPublicRefStartReviewPostApiArg = {
  publicRef: string;
};
export type AddEvidenceApiApiV1ReportsPublicRefEvidencePostApiResponse =
  /** status 200 Successful Response */ EvidenceRead;
export type AddEvidenceApiApiV1ReportsPublicRefEvidencePostApiArg = {
  publicRef: string;
  evidenceCreate: EvidenceCreate;
};
export type ListEvidenceApiApiV1ReportsPublicRefEvidenceGetApiResponse =
  /** status 200 Successful Response */ EvidenceRead[];
export type ListEvidenceApiApiV1ReportsPublicRefEvidenceGetApiArg = {
  publicRef: string;
};
export type CorrectTranscriptApiV1ReportsPublicRefCorrectTranscriptPatchApiResponse =
  /** status 200 Successful Response */ ReportRead;
export type CorrectTranscriptApiV1ReportsPublicRefCorrectTranscriptPatchApiArg =
  {
    publicRef: string;
    transcriptCorrected: string;
  };
export type RequestClarificationApiV1ReportsPublicRefClarificationPostApiResponse =
  /** status 200 Successful Response */ ClarificationRead;
export type RequestClarificationApiV1ReportsPublicRefClarificationPostApiArg = {
  publicRef: string;
  clarificationCreate: ClarificationCreate;
};
export type ListClarificationsApiV1ReportsPublicRefClarificationsGetApiResponse =
  /** status 200 Successful Response */ ClarificationRead[];
export type ListClarificationsApiV1ReportsPublicRefClarificationsGetApiArg = {
  publicRef: string;
};
export type RecommendApiApiV1ReportsPublicRefRecommendPostApiResponse =
  /** status 200 Successful Response */ ReportRead;
export type RecommendApiApiV1ReportsPublicRefRecommendPostApiArg = {
  publicRef: string;
  statusTransition: StatusTransition;
};
export type DecideApiApiV1ReportsPublicRefDecidePostApiResponse =
  /** status 200 Successful Response */ ReportRead;
export type DecideApiApiV1ReportsPublicRefDecidePostApiArg = {
  publicRef: string;
  statusTransition: StatusTransition;
};
export type EscalateApiApiV1ReportsPublicRefEscalatePostApiResponse =
  /** status 200 Successful Response */ ReportRead;
export type EscalateApiApiV1ReportsPublicRefEscalatePostApiArg = {
  publicRef: string;
  statusTransition: StatusTransition;
};
export type GetMediaUrlApiV1ReportsPublicRefMediaWamMediaIdUrlGetApiResponse =
  /** status 200 Successful Response */ MediaUrlResponse;
export type GetMediaUrlApiV1ReportsPublicRefMediaWamMediaIdUrlGetApiArg = {
  publicRef: string;
  wamMediaId: string;
};
export type StreamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGetApiResponse =
  /** status 200 Audio stream */ Blob;
export type StreamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGetApiArg = {
  publicRef: string;
  wamMediaId: string;
};
export type MetricsApiV1AnalyticsMetricsGetApiResponse =
  /** status 200 Successful Response */ MetricsResponse;
export type MetricsApiV1AnalyticsMetricsGetApiArg = void;
export type ExportDataApiV1AnalyticsExportGetApiResponse =
  /** status 200 An anonymized CSV attachment or JSON array, selected by the format query parameter. */ ExportRow[];
export type ExportDataApiV1AnalyticsExportGetApiArg = {
  format?: string;
};
export type ListAlertsApiV1AlertsGetApiResponse =
  /** status 200 Successful Response */ AlertListResponse;
export type ListAlertsApiV1AlertsGetApiArg = {
  status?: ("open" | "reviewing" | "resolved" | "dismissed") | null;
  severity?: ("low" | "medium" | "high") | null;
  skip?: number;
  limit?: number;
};
export type CreateAlertApiV1AlertsPostApiResponse =
  /** status 201 Successful Response */ AlertRead;
export type CreateAlertApiV1AlertsPostApiArg = {
  alertCreate: AlertCreate;
};
export type GetAlertApiV1AlertsAlertIdGetApiResponse =
  /** status 200 Successful Response */ AlertRead;
export type GetAlertApiV1AlertsAlertIdGetApiArg = {
  alertId: number;
};
export type UpdateAlertApiV1AlertsAlertIdPatchApiResponse =
  /** status 200 Successful Response */ AlertRead;
export type UpdateAlertApiV1AlertsAlertIdPatchApiArg = {
  alertId: number;
  alertUpdate: AlertUpdate;
};
export type HealthCheckApiV1HealthGetApiResponse =
  /** status 200 Successful Response */ HealthResponse;
export type HealthCheckApiV1HealthGetApiArg = void;
export type Token = {
  access_token: string;
  token_type?: string;
  /** Token lifetime in seconds; temporary-password tokens use 900 seconds */
  expires_in: number;
  /** Redirect to the password-change screen when true */
  must_change_password?: boolean;
};
export type UserRole =
  "admin" | "verification_lead" | "fellow" | "stakeholder_reader";
export type UserRead = {
  id: number;
  email: string;
  full_name: string;
  phone?: string | null;
  lga?: string | null;
  training_status?: ("not_started" | "in_progress" | "completed") | null;
  role: UserRole;
  is_active: boolean;
  /** Whether dashboard access is blocked until the password is changed */
  must_change_password: boolean;
  /** Expiry of the current temporary password */
  temporary_password_expires_at?: string | null;
  /** Time the user last chose a permanent password */
  password_changed_at?: string | null;
  /** Time of the latest successful login */
  last_login_at?: string | null;
  verified_count?: number;
  flagged_count?: number;
  created_at: string;
  updated_at: string;
};
export type PasswordChange = {
  current_password: string;
  new_password: string;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: any;
  ctx?: object;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type UserCreate = {
  email: string;
  /** Admin-selected temporary password; expires after 72 hours and must be changed on first login */
  password: string;
  full_name: string;
  phone?: string | null;
  lga?: string | null;
  training_status?: ("not_started" | "in_progress" | "completed") | null;
  role?: UserRole;
};
export type UserListResponse = {
  items: UserRead[];
  total: number;
  skip: number;
  limit: number;
};
export type UserUpdate = {
  full_name?: string | null;
  phone?: string | null;
  lga?: string | null;
  training_status?: ("not_started" | "in_progress" | "completed") | null;
  role?: UserRole | null;
  is_active?: boolean | null;
};
export type AdminPasswordReset = {
  /** New admin-selected temporary password; expires after 72 hours */
  temporary_password: string;
};
export type AiJobStatus =
  "queued" | "processing" | "succeeded" | "low_confidence" | "failed";
export type AiJobRead = {
  id: number;
  wam_media_id: string;
  reporter_hash?: string | null;
  status: AiJobStatus;
  attempts: number;
  last_error?: string | null;
  assigned_to?: number | null;
  reviewed_by?: number | null;
  corrected_transcript?: string | null;
  resolution?: string | null;
  reviewed_at?: string | null;
  created_at: string;
  updated_at: string;
};
export type AiJobListResponse = {
  items: AiJobRead[];
  total: number;
};
export type AiJobResolve = {
  resolution: "incident_report" | "voter_education" | "unusable";
  corrected_transcript?: string | null;
};
export type PollingUnitRead = {
  pu_code: string;
  pu_name: string;
  state: string;
  lga: string;
  ward: string;
  lat?: number | null;
  lng?: number | null;
};
export type ReportStatus =
  | "received_unverified"
  | "assigned"
  | "under_review"
  | "clarification_requested"
  | "awaiting_clarification"
  | "recommended"
  | "verified"
  | "rejected"
  | "escalated"
  | "archived";
export type ReportMediaRead = {
  wam_media_id: string;
  mime_type?: string | null;
  created_at: string;
};
export type ReportRead = {
  id: number;
  public_ref: string;
  reporter_hash: string;
  transcript?: string | null;
  transcript_corrected?: string | null;
  incident_type?: string | null;
  location_text?: string | null;
  pu_reference?: string | null;
  pu?: PollingUnitRead | null;
  lat?: number | null;
  lng?: number | null;
  confidence?: number | null;
  status: ReportStatus;
  urgency?: string | null;
  assigned_to?: number | null;
  media?: ReportMediaRead[];
  created_at: string;
  updated_at: string;
};
export type ReportListResponse = {
  items: ReportRead[];
  total: number;
  skip: number;
  limit: number;
};
export type ReportCreate = {
  /** Existing pseudonymous reporter reference; a unique value is generated when omitted. */
  reporter_hash?: string | null;
  /** Incident description for an admin-created fallback report. */
  transcript: string;
  incident_type?: string | null;
  location_text?: string | null;
  pu_reference?: string | null;
  lat?: number | null;
  lng?: number | null;
  /** AI confidence from 0 to 1. */
  confidence?: number | null;
  urgency?: string | null;
  intent?: string | null;
};
export type ReportAnonymized = {
  public_ref: string;
  incident_type?: string | null;
  location_text?: string | null;
  pu?: PollingUnitRead | null;
  status: ReportStatus;
  urgency?: string | null;
  created_at: string;
};
export type StatusHistoryRead = {
  id: number;
  report_id: number;
  from_status?: string | null;
  to_status: string;
  actor_user_id?: number | null;
  reason?: string | null;
  created_at: string;
};
export type EvidenceRead = {
  id: number;
  uploader_id?: number | null;
  kind: string;
  storage_key_or_text: string;
  created_at: string;
};
export type EvidenceCreate = {
  /** note|file|link */
  kind: string;
  storage_key_or_text: string;
};
export type ClarificationRead = {
  id: number;
  message: string;
  channel: string;
  created_at: string;
  replied_at?: string | null;
  reply_text?: string | null;
  cancelled_at?: string | null;
  delivery_status?: string | null;
  provider_message_id?: string | null;
  sent_at?: string | null;
  delivery_error?: string | null;
};
export type ClarificationCreate = {
  message: string;
};
export type StatusTransition = {
  to_status: ReportStatus;
  reason: string;
};
export type MediaUrlResponse = {
  url: string;
  expires_in: number;
  storage_key: string;
};
export type MetricsResponse = {
  total_reports: number;
  verified_reports: number;
  active_users: number;
  lgas_covered: number;
  by_status: {
    [key: string]: number;
  };
  by_incident_type: {
    [key: string]: number;
  };
  by_state: {
    [key: string]: number;
  };
  by_ward: {
    [key: string]: number;
  };
};
export type ExportRow = {
  public_ref: string;
  incident_type: string | null;
  status: string;
  urgency: string | null;
  location_text: string | null;
  pu_code: string | null;
  pu_name: string | null;
  state: string | null;
  created_at: string;
};
export type AlertRead = {
  id: number;
  title: string;
  description: string;
  source: string | null;
  severity: "low" | "medium" | "high";
  status: "open" | "reviewing" | "resolved" | "dismissed";
  report_ref: string | null;
  created_by: number | null;
  created_at: string;
  updated_at: string;
};
export type AlertListResponse = {
  items: AlertRead[];
  total: number;
  skip: number;
  limit: number;
};
export type AlertCreate = {
  title: string;
  description: string;
  source?: string | null;
  severity?: "low" | "medium" | "high";
  report_ref?: string | null;
};
export type AlertUpdate = {
  title?: string | null;
  description?: string | null;
  source?: string | null;
  severity?: ("low" | "medium" | "high") | null;
  status?: ("open" | "reviewing" | "resolved" | "dismissed") | null;
  report_ref?: string | null;
};
export type HealthResponse = {
  status: string;
  database: string;
  version: string;
  request_id: string | null;
};
export const {
  useLoginApiV1AuthLoginPostMutation,
  useMeApiV1AuthMeGetQuery,
  useChangeOwnPasswordApiV1AuthChangePasswordPostMutation,
  useCreateUserApiV1AuthUsersPostMutation,
  useListUsersApiV1AuthUsersGetQuery,
  useUpdateUserApiV1AuthUsersUserIdPatchMutation,
  useResetUserPasswordApiV1AuthUsersUserIdResetPasswordPostMutation,
  useListAiJobsApiV1AiJobsGetQuery,
  useAssignAiJobApiV1AiJobsJobIdAssignPatchMutation,
  useResolveAiJobApiV1AiJobsJobIdResolvePostMutation,
  useGetAiJobMediaApiV1AiJobsJobIdMediaGetQuery,
  useListReportsApiV1ReportsGetQuery,
  useCreateReportApiApiV1ReportsPostMutation,
  useSearchPusApiV1ReportsPollingUnitsSearchGetQuery,
  useGetReportApiV1ReportsPublicRefGetQuery,
  useGetReportAnonymizedApiV1ReportsPublicRefAnonymizedGetQuery,
  useGetReportHistoryApiV1ReportsPublicRefHistoryGetQuery,
  useAssignApiApiV1ReportsPublicRefAssignPatchMutation,
  useStartReviewApiV1ReportsPublicRefStartReviewPostMutation,
  useAddEvidenceApiApiV1ReportsPublicRefEvidencePostMutation,
  useListEvidenceApiApiV1ReportsPublicRefEvidenceGetQuery,
  useCorrectTranscriptApiV1ReportsPublicRefCorrectTranscriptPatchMutation,
  useRequestClarificationApiV1ReportsPublicRefClarificationPostMutation,
  useListClarificationsApiV1ReportsPublicRefClarificationsGetQuery,
  useRecommendApiApiV1ReportsPublicRefRecommendPostMutation,
  useDecideApiApiV1ReportsPublicRefDecidePostMutation,
  useEscalateApiApiV1ReportsPublicRefEscalatePostMutation,
  useGetMediaUrlApiV1ReportsPublicRefMediaWamMediaIdUrlGetQuery,
  useStreamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGetQuery,
  useMetricsApiV1AnalyticsMetricsGetQuery,
  useExportDataApiV1AnalyticsExportGetQuery,
  useListAlertsApiV1AlertsGetQuery,
  useCreateAlertApiV1AlertsPostMutation,
  useGetAlertApiV1AlertsAlertIdGetQuery,
  useUpdateAlertApiV1AlertsAlertIdPatchMutation,
  useHealthCheckApiV1HealthGetQuery,
} = injectedRtkApi;
