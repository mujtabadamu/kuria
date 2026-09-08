// The disinformation-alerts feature has no backing endpoint anywhere in the
// real API (confirmed against the live OpenAPI spec) — it's intentionally
// left on mock data for now, out of scope for the real-API migration.
// Reports/fellows/stats mock data has been removed; those are wired to the
// real API in src/api, src/hooks, and the pages that consume them.
export interface DisinfoAlert {
  id: string
  title: string
  contentPreview: string
  source: string
  pattern: string
  flaggedBy: string
  severity: 'low' | 'medium' | 'high'
  status: 'under_review' | 'confirmed' | 'dismissed'
  timestamp: string
}

export const alerts: DisinfoAlert[] = [
  {
    id: 'ALT-201',
    title: 'AI-generated audio impersonating INEC spokesperson',
    contentPreview: 'Circulating voice note claims election has been postponed to next month.',
    source: 'WhatsApp status broadcast',
    pattern: 'AI-generated audio',
    flaggedBy: 'Amina Yusuf',
    severity: 'high',
    status: 'confirmed',
    timestamp: '2026-08-23T08:05:00',
  },
  {
    id: 'ALT-202',
    title: 'False polling date graphic',
    contentPreview: 'Image flyer states voting day moved to August 30th.',
    source: 'Facebook group "Kaduna Voters Forum"',
    pattern: 'False polling date',
    flaggedBy: 'Emeka Obi',
    severity: 'high',
    status: 'confirmed',
    timestamp: '2026-08-23T07:48:00',
  },
  {
    id: 'ALT-203',
    title: 'Manipulated video of candidate speech',
    contentPreview: 'Clip edited to show candidate making inflammatory remarks.',
    source: 'TikTok',
    pattern: 'Deepfake video',
    flaggedBy: 'Grace Danladi',
    severity: 'medium',
    status: 'under_review',
    timestamp: '2026-08-23T07:20:00',
  },
  {
    id: 'ALT-204',
    title: 'Rumor of ballot box shortage',
    contentPreview: 'Text chain claims ballot boxes are being diverted in Zaria.',
    source: 'SMS forward',
    pattern: 'Unverified claim',
    flaggedBy: 'Musa Bello',
    severity: 'low',
    status: 'under_review',
    timestamp: '2026-08-23T06:55:00',
  },
  {
    id: 'ALT-205',
    title: 'Recycled 2023 protest photo reused as "today"',
    contentPreview: 'Old photo captioned as violence happening at a polling unit this morning.',
    source: 'X (Twitter)',
    pattern: 'Miscontextualized image',
    flaggedBy: 'Amina Yusuf',
    severity: 'medium',
    status: 'dismissed',
    timestamp: '2026-08-22T19:30:00',
  },
]
