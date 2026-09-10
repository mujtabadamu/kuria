import type { ConfigFile } from '@rtk-query/codegen-openapi'

// @rtk-query/codegen-openapi has no operationId-renaming option — generated
// operation/hook names are derived straight from the backend's (verbose,
// FastAPI-default) operationIds. `src/api/kuria.ts` re-exports them under
// clean names, so components never import from `generated/kuriaApi.ts` directly.
const config: ConfigFile = {
  schemaFile: 'https://kuria-mglo.onrender.com/openapi.json',
  apiFile: './src/api/baseApi.ts',
  apiImport: 'baseApi',
  outputFile: './src/api/generated/kuriaApi.ts',
  exportName: 'kuriaApi',
  hooks: true,
  // WhatsApp/AI endpoints are server-to-server callbacks (Meta and the AI
  // worker call these, our React app never does) — the AI callback one also
  // has a nullable header param that doesn't type-check against fetchBaseQuery.
  filterEndpoints: (operationName) =>
    ![
      'webhookVerifyApiV1WhatsappWebhookGet',
      'webhookInboundApiV1WhatsappWebhookPost',
      'aiCallbackApiV1AiCallbackPost',
    ].includes(operationName),
  endpointOverrides: [
    { pattern: 'listReportsApiV1ReportsGet', providesTags: ['ReportList'] },
    { pattern: 'getReportApiV1ReportsPublicRefGet', providesTags: ['Report'] },
    { pattern: 'getReportAnonymizedApiV1ReportsPublicRefAnonymizedGet', providesTags: ['Report'] },
    { pattern: 'getReportHistoryApiV1ReportsPublicRefHistoryGet', providesTags: ['Report'] },
    { pattern: 'createReportApiApiV1ReportsPost', invalidatesTags: ['ReportList'] },
    { pattern: 'assignApiApiV1ReportsPublicRefAssignPatch', invalidatesTags: ['Report', 'ReportList'] },
    { pattern: 'startReviewApiV1ReportsPublicRefStartReviewPost', invalidatesTags: ['Report', 'ReportList'] },
    { pattern: 'addEvidenceApiApiV1ReportsPublicRefEvidencePost', invalidatesTags: ['Report', 'Evidence'] },
    { pattern: 'listEvidenceApiApiV1ReportsPublicRefEvidenceGet', providesTags: ['Evidence'] },
    {
      pattern: 'correctTranscriptApiV1ReportsPublicRefCorrectTranscriptPatch',
      invalidatesTags: ['Report'],
    },
    {
      pattern: 'requestClarificationApiV1ReportsPublicRefClarificationPost',
      invalidatesTags: ['Report', 'Clarifications'],
    },
    { pattern: 'listClarificationsApiV1ReportsPublicRefClarificationsGet', providesTags: ['Clarifications'] },
    { pattern: 'recommendApiApiV1ReportsPublicRefRecommendPost', invalidatesTags: ['Report'] },
    { pattern: 'decideApiApiV1ReportsPublicRefDecidePost', invalidatesTags: ['Report', 'ReportList'] },
    { pattern: 'escalateApiApiV1ReportsPublicRefEscalatePost', invalidatesTags: ['Report', 'ReportList'] },
    { pattern: 'listUsersApiV1AuthUsersGet', providesTags: ['User'] },
    { pattern: 'createUserApiV1AuthUsersPost', invalidatesTags: ['User'] },
    { pattern: 'updateUserApiV1AuthUsersUserIdPatch', invalidatesTags: ['User'] },
    { pattern: 'resetUserPasswordApiV1AuthUsersUserIdResetPasswordPost', invalidatesTags: ['User'] },
    { pattern: 'metricsApiV1AnalyticsMetricsGet', providesTags: ['Analytics'] },
    { pattern: 'listAlertsApiV1AlertsGet', providesTags: ['AlertList'] },
    { pattern: 'getAlertApiV1AlertsAlertIdGet', providesTags: ['Alert'] },
    { pattern: 'createAlertApiV1AlertsPost', invalidatesTags: ['AlertList'] },
    { pattern: 'updateAlertApiV1AlertsAlertIdPatch', invalidatesTags: ['Alert', 'AlertList'] },
    { pattern: 'listAiJobsApiV1AiJobsGet', providesTags: ['AiJobList'] },
    { pattern: 'assignAiJobApiV1AiJobsJobIdAssignPatch', invalidatesTags: ['AiJobList'] },
    { pattern: 'resolveAiJobApiV1AiJobsJobIdResolvePost', invalidatesTags: ['AiJobList'] },
  ],
}

export default config
