import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginApiV1AuthLoginPost: build.mutation<
      LoginApiV1AuthLoginPostApiResponse,
      LoginApiV1AuthLoginPostApiArg
    >({
      query: () => ({ url: `/api/v1/auth/login`, method: "POST" }),
    }),
    meApiV1AuthMeGet: build.query<
      MeApiV1AuthMeGetApiResponse,
      MeApiV1AuthMeGetApiArg
    >({
      query: () => ({ url: `/api/v1/auth/me` }),
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
    addEvidenceApiApiV1ReportsPublicRefEvidencePost: build.mutation<
      AddEvidenceApiApiV1ReportsPublicRefEvidencePostApiResponse,
      AddEvidenceApiApiV1ReportsPublicRefEvidencePostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reports/${queryArg.publicRef}/evidence`,
        method: "POST",
        body: queryArg.evidenceCreate,
      }),
      invalidatesTags: ["Report"],
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
      invalidatesTags: ["Report"],
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
export type LoginApiV1AuthLoginPostApiArg = void;
export type MeApiV1AuthMeGetApiResponse =
  /** status 200 Successful Response */ UserRead;
export type MeApiV1AuthMeGetApiArg = void;
export type CreateUserApiV1AuthUsersPostApiResponse =
  /** status 201 Successful Response */ UserRead;
export type CreateUserApiV1AuthUsersPostApiArg = {
  userCreate: UserCreate;
};
export type ListUsersApiV1AuthUsersGetApiResponse =
  /** status 200 Successful Response */ UserRead[];
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
export type AddEvidenceApiApiV1ReportsPublicRefEvidencePostApiResponse =
  /** status 200 Successful Response */ EvidenceRead;
export type AddEvidenceApiApiV1ReportsPublicRefEvidencePostApiArg = {
  publicRef: string;
  evidenceCreate: EvidenceCreate;
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
  /** status 200 Successful Response */ any;
export type GetMediaUrlApiV1ReportsPublicRefMediaWamMediaIdUrlGetApiArg = {
  publicRef: string;
  wamMediaId: string;
};
export type StreamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGetApiResponse =
  /** status 200 Successful Response */ any;
export type StreamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGetApiArg = {
  publicRef: string;
  wamMediaId: string;
};
export type MetricsApiV1AnalyticsMetricsGetApiResponse =
  /** status 200 Successful Response */ any;
export type MetricsApiV1AnalyticsMetricsGetApiArg = void;
export type ExportDataApiV1AnalyticsExportGetApiResponse =
  /** status 200 Successful Response */ any;
export type ExportDataApiV1AnalyticsExportGetApiArg = {
  format?: string;
};
export type HealthCheckApiV1HealthGetApiResponse =
  /** status 200 Successful Response */ any;
export type HealthCheckApiV1HealthGetApiArg = void;
export type Token = {
  access_token: string;
  token_type?: string;
  expires_in: number;
};
export type UserRole =
  "admin" | "verification_lead" | "fellow" | "stakeholder_reader";
export type UserRead = {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  password: string;
  full_name: string;
  role?: UserRole;
};
export type UserUpdate = {
  full_name?: string | null;
  role?: UserRole | null;
  is_active?: boolean | null;
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
  reporter_hash: string;
  transcript?: string | null;
  incident_type?: string | null;
  location_text?: string | null;
  pu_reference?: string | null;
  lat?: number | null;
  lng?: number | null;
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
};
export type ClarificationCreate = {
  message: string;
};
export type StatusTransition = {
  to_status: ReportStatus;
  reason: string;
};
export const {
  useLoginApiV1AuthLoginPostMutation,
  useMeApiV1AuthMeGetQuery,
  useCreateUserApiV1AuthUsersPostMutation,
  useListUsersApiV1AuthUsersGetQuery,
  useUpdateUserApiV1AuthUsersUserIdPatchMutation,
  useListReportsApiV1ReportsGetQuery,
  useCreateReportApiApiV1ReportsPostMutation,
  useSearchPusApiV1ReportsPollingUnitsSearchGetQuery,
  useGetReportApiV1ReportsPublicRefGetQuery,
  useGetReportAnonymizedApiV1ReportsPublicRefAnonymizedGetQuery,
  useGetReportHistoryApiV1ReportsPublicRefHistoryGetQuery,
  useAssignApiApiV1ReportsPublicRefAssignPatchMutation,
  useAddEvidenceApiApiV1ReportsPublicRefEvidencePostMutation,
  useCorrectTranscriptApiV1ReportsPublicRefCorrectTranscriptPatchMutation,
  useRequestClarificationApiV1ReportsPublicRefClarificationPostMutation,
  useRecommendApiApiV1ReportsPublicRefRecommendPostMutation,
  useDecideApiApiV1ReportsPublicRefDecidePostMutation,
  useEscalateApiApiV1ReportsPublicRefEscalatePostMutation,
  useGetMediaUrlApiV1ReportsPublicRefMediaWamMediaIdUrlGetQuery,
  useStreamMediaApiV1ReportsPublicRefMediaWamMediaIdStreamGetQuery,
  useMetricsApiV1AnalyticsMetricsGetQuery,
  useExportDataApiV1AnalyticsExportGetQuery,
  useHealthCheckApiV1HealthGetQuery,
} = injectedRtkApi;
