export type ReportStatus = 'verified' | 'pending' | 'flagged'
export type Language = 'EN' | 'HA'

export interface VoiceReport {
  id: string
  timestamp: string
  state: string
  lga: string
  pollingUnit: string
  lat: number
  lng: number
  language: Language
  transcriptHa: string
  transcriptEn: string
  status: ReportStatus
  reporter: string
  verifiedBy?: string
  notes?: string
  audioUrl?: string
  audioDuration: string
}

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

export interface Fellow {
  id: string
  name: string
  lga: string
  reportsVerified: number
  trainingComplete: boolean
  avatarInitials: string
  phone: string
  email: string
  joinedDate: string
}

export interface Manifesto {
  id: string
  party: string
  candidate: string
  color: string
  summaryEn: string
  summaryHa: string
  audioDuration: string
}

export const stats = {
  reportsCollected: 4821,
  lgasCovered: 23,
  fellowsTrained: 142,
  verificationRate: 91,
  reportsToday: 63,
  activeAlerts: 4,
}

export const reports: VoiceReport[] = [
  {
    id: 'RPT-1042',
    timestamp: '2026-08-23T09:14:00',
    state: 'Kaduna',
    lga: 'Kaduna North',
    pollingUnit: 'PU 004 - Unguwar Rimi Primary School',
    lat: 10.5372,
    lng: 7.4382,
    language: 'HA',
    transcriptHa: 'An samu jinkirin bude rumfar kada kuri\'a da sa\'a daya, babu wani hari.',
    transcriptEn: 'Polling unit opening was delayed by one hour, no incident reported.',
    status: 'verified',
    reporter: 'Anonymous',
    verifiedBy: 'Amina Yusuf',
    notes: 'Confirmed with INEC officer on-site.',
    audioDuration: '0:47',
  },
  {
    id: 'RPT-1043',
    timestamp: '2026-08-23T09:02:00',
    state: 'Kaduna',
    lga: 'Zaria',
    pollingUnit: 'PU 011 - Kofar Doka',
    lat: 11.0855,
    lng: 7.7199,
    language: 'EN',
    transcriptHa: '',
    transcriptEn: 'Agents from one party are seen distributing money near the polling unit fence.',
    status: 'flagged',
    reporter: 'Anonymous',
    audioDuration: '1:12',
  },
  {
    id: 'RPT-1044',
    timestamp: '2026-08-23T08:51:00',
    state: 'Kaduna',
    lga: 'Chikun',
    pollingUnit: 'PU 002 - Sabon Tasha Market',
    lat: 10.4536,
    lng: 7.3608,
    language: 'HA',
    transcriptHa: 'Injin karanta katin zabe (BVAS) ya lalace, ana jiran na biyu.',
    transcriptEn: 'The card reader (BVAS) machine malfunctioned, second unit awaited.',
    status: 'pending',
    reporter: 'Musa Bello',
    audioDuration: '0:33',
  },
  {
    id: 'RPT-1045',
    timestamp: '2026-08-23T08:40:00',
    state: 'Kaduna',
    lga: 'Kagarko',
    pollingUnit: 'PU 007 - Kagarko Central',
    lat: 9.6337,
    lng: 7.8032,
    language: 'EN',
    transcriptHa: '',
    transcriptEn: 'Voting is proceeding peacefully, long queue but orderly.',
    status: 'verified',
    reporter: 'Grace Danladi',
    verifiedBy: 'Emeka Obi',
    audioDuration: '0:22',
  },
  {
    id: 'RPT-1046',
    timestamp: '2026-08-23T08:22:00',
    state: 'Kaduna',
    lga: 'Sabon Gari',
    pollingUnit: 'PU 019 - Samaru',
    lat: 11.1594,
    lng: 7.6482,
    language: 'HA',
    transcriptHa: 'An ga wasu mutane suna kokarin toshe hanyar zuwa rumfar zabe.',
    transcriptEn: 'Some individuals were seen attempting to block the access road to the polling unit.',
    status: 'flagged',
    reporter: 'Anonymous',
    audioDuration: '0:58',
  },
  {
    id: 'RPT-1047',
    timestamp: '2026-08-23T08:10:00',
    state: 'Kaduna',
    lga: 'Igabi',
    pollingUnit: 'PU 003 - Rigachikun',
    lat: 10.6822,
    lng: 7.4193,
    language: 'EN',
    transcriptHa: '',
    transcriptEn: 'Ballot papers arrived on time, accreditation ongoing smoothly.',
    status: 'pending',
    reporter: 'Anonymous',
    audioDuration: '0:19',
  },
  {
    id: 'RPT-1048',
    timestamp: '2026-08-23T07:55:00',
    state: 'Kaduna',
    lga: 'Giwa',
    pollingUnit: 'PU 015 - Yakawada',
    lat: 11.3961,
    lng: 7.6132,
    language: 'HA',
    transcriptHa: 'An tabbatar an bude rumfar zabe daidai lokaci, komai lafiya.',
    transcriptEn: 'Confirmed the polling unit opened on schedule, all is well.',
    status: 'verified',
    reporter: 'Hauwa Ibrahim',
    verifiedBy: 'Amina Yusuf',
    audioDuration: '0:29',
  },
  {
    id: 'RPT-1049',
    timestamp: '2026-08-23T07:41:00',
    state: 'Kaduna',
    lga: 'Kajuru',
    pollingUnit: 'PU 006 - Kajuru Central',
    lat: 10.3167,
    lng: 7.6833,
    language: 'EN',
    transcriptHa: '',
    transcriptEn: 'Security personnel presence is low, community requesting reinforcement.',
    status: 'pending',
    reporter: 'Anonymous',
    audioDuration: '0:41',
  },
  {
    id: 'RPT-1050',
    timestamp: '2026-08-23T07:30:00',
    state: 'Kaduna',
    lga: 'Soba',
    pollingUnit: 'PU 009 - Maigana',
    lat: 11.15,
    lng: 8.05,
    language: 'HA',
    transcriptHa: 'An kammala zabe lafiya, babu matsala.',
    transcriptEn: 'Voting concluded peacefully, no issues reported.',
    status: 'verified',
    reporter: 'Anonymous',
    verifiedBy: 'Emeka Obi',
    audioDuration: '0:15',
  },
  {
    id: 'RPT-1051',
    timestamp: '2026-08-23T07:18:00',
    state: 'Kaduna',
    lga: 'Jaba',
    pollingUnit: 'PU 001 - Kwoi',
    lat: 9.4167,
    lng: 8.0667,
    language: 'EN',
    transcriptHa: '',
    transcriptEn: 'Underage individuals attempted to vote, turned away by officials.',
    status: 'flagged',
    reporter: 'Anonymous',
    audioDuration: '0:36',
  },
]

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

export const fellows: Fellow[] = [
  {
    id: 'FEL-01',
    name: 'Amina Yusuf',
    lga: 'Kaduna North',
    reportsVerified: 214,
    trainingComplete: true,
    avatarInitials: 'AY',
    phone: '+234 803 555 0142',
    email: 'amina.yusuf@yapd4africa.org',
    joinedDate: '2025-11-03',
  },
  {
    id: 'FEL-02',
    name: 'Emeka Obi',
    lga: 'Kagarko',
    reportsVerified: 176,
    trainingComplete: true,
    avatarInitials: 'EO',
    phone: '+234 806 555 0198',
    email: 'emeka.obi@yapd4africa.org',
    joinedDate: '2025-11-10',
  },
  {
    id: 'FEL-03',
    name: 'Grace Danladi',
    lga: 'Zaria',
    reportsVerified: 132,
    trainingComplete: true,
    avatarInitials: 'GD',
    phone: '+234 810 555 0223',
    email: 'grace.danladi@yapd4africa.org',
    joinedDate: '2025-12-01',
  },
  {
    id: 'FEL-04',
    name: 'Musa Bello',
    lga: 'Chikun',
    reportsVerified: 98,
    trainingComplete: false,
    avatarInitials: 'MB',
    phone: '+234 813 555 0271',
    email: 'musa.bello@yapd4africa.org',
    joinedDate: '2026-01-15',
  },
  {
    id: 'FEL-05',
    name: 'Hauwa Ibrahim',
    lga: 'Giwa',
    reportsVerified: 87,
    trainingComplete: true,
    avatarInitials: 'HI',
    phone: '+234 815 555 0309',
    email: 'hauwa.ibrahim@yapd4africa.org',
    joinedDate: '2026-01-22',
  },
  {
    id: 'FEL-06',
    name: 'Ibrahim Sani',
    lga: 'Sabon Gari',
    reportsVerified: 64,
    trainingComplete: false,
    avatarInitials: 'IS',
    phone: '+234 816 555 0355',
    email: 'ibrahim.sani@yapd4africa.org',
    joinedDate: '2026-02-04',
  },
]

export const manifestos: Manifesto[] = [
  {
    id: 'MAN-01',
    party: 'PDP',
    candidate: 'Sen. Yakubu Danja',
    color: '#D64545',
    summaryEn: 'Focus on youth employment, road infrastructure, and healthcare access across all 23 LGAs.',
    summaryHa: 'Mayar da hankali kan aikin yi ga matasa, hanyoyi, da samun kiwon lafiya a duk kananan hukumomi 23.',
    audioDuration: '2:14',
  },
  {
    id: 'MAN-02',
    party: 'APC',
    candidate: 'Hon. Zainab Kabir',
    color: '#0F7A4E',
    summaryEn: 'Continuation of the water and electrification projects, plus agricultural subsidies for smallholder farmers.',
    summaryHa: 'Ci gaba da ayyukan ruwa da wutar lantarki, da tallafin noma ga manoma.',
    audioDuration: '1:58',
  },
  {
    id: 'MAN-03',
    party: 'LP',
    candidate: 'Dr. Chidi Eze',
    color: '#2E7DD1',
    summaryEn: 'Anti-corruption reforms, transparent budgeting, and investment in digital literacy programs.',
    summaryHa: 'Gyara yaki da cin hanci, tsarin kasafin kudi mai gaskiya, da zuba jari a fasahar dijital.',
    audioDuration: '2:31',
  },
]

export const pollingUnitFinder = [
  { lga: 'Kaduna North', units: 84 },
  { lga: 'Kaduna South', units: 76 },
  { lga: 'Zaria', units: 112 },
  { lga: 'Chikun', units: 68 },
  { lga: 'Kagarko', units: 41 },
  { lga: 'Igabi', units: 95 },
]

export const faqs = [
  {
    q: 'How do I find my polling unit?',
    a: 'Use the Polling Unit Finder on this page, or send your address via WhatsApp to receive your nearest unit.',
  },
  {
    q: 'What do I do if I witness an electoral issue?',
    a: 'Send a WhatsApp voice note describing what you saw. You can remain anonymous. Our team verifies and routes reports to the right authority.',
  },
  {
    q: 'What identification do I need to vote?',
    a: 'Bring your Permanent Voter Card (PVC). No other ID is accepted at the polling unit.',
  },
  {
    q: 'How can I tell if information I received is false?',
    a: 'Check the Alerts page for confirmed disinformation, or forward the message to our WhatsApp line for a fellow to verify.',
  },
]
