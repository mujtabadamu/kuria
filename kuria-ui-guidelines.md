# Kuri'a AI-Monitor — UI Design Guidelines

A reference guide for building the Kuri'a Electoral Integrity Dashboard on top of your existing React + Vite app. This covers brand colors, typography, the route map, and what each page should contain and look like. No code — just the blueprint.

This system follows **design.md ("Architect Blueprint")**: a flat, single-accent design language. It supersedes the previous "official but human" civic-tech guidelines — notably the 18px low-literacy body-text minimum and the multi-color (green/amber/red) status system have both been replaced per that spec.

---

## 1. Brand direction

**Architect Blueprint** — drafting-table blue, tracing paper, pencil-line grid. High-contrast neutrals, flat surfaces (no gradients), sharp-to-barely-rounded corners, and exactly one accent color that drives all interaction.

Design principles:
- **One accent, reserved.** Tertiary blue (`#2E8FC4`) is used for the page's primary call-to-action, active nav/filter state, and focus rings — never decoratively, never doubled up with another hue.
- **Status is conveyed by icon + weight, and Danger red for the flagged/confirmed tier.** Verified/Pending badges use the primary/secondary/surface palette, differentiated by icon (CheckCircle2 / Clock) and fill weight; Flagged/Confirmed uses Danger red, since that severity tier is a deliberate exception (see §2).
- **Flat on purpose.** No gradients, no drop shadows beyond subtle card elevation, corners are 0–2px.
- **Bilingual by design** — voice reports and content are auto-translated/transcribed server-side (Hausa & English shown side by side where relevant); the app itself has no manual language switcher.

---

## 2. Color palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Primary Ink | `#0D2234` | Headlines, body text, dark surfaces (sidebar, footer), logos, low-emphasis links/icons |
| Secondary | Secondary Slate | `#5A7589` | Borders, captions, metadata, muted/administrative actions |
| Tertiary | Tertiary Blue | `#2E8FC4` | The sole interaction accent — primary CTA buttons, active nav/filter state, focus rings |
| Tertiary Dark | — | `#226F9C` | Hover state for tertiary buttons |
| Danger | Signal Red | `#D64545` | Flagged reports, confirmed disinformation, high-severity alerts — the one deliberate exception to the single-accent rule |
| Neutral | Neutral | `#E8EDF2` | Page background |
| Surface | Surface | `#F6F9FC` | Cards, panels |
| On-Primary | On-Primary | `#F6F9FC` | Text on dark (primary) surfaces |

**Rule of thumb:** Tertiary is spent on exactly one action per screen (the page's main CTA, or the single active nav/filter item — which is naturally always "one" at a time). Everything else — logos, repeated "View" links, decorative icons, static numbers — uses Primary or Secondary. Status badges are differentiated by icon and fill weight, **except** the "flagged"/"confirmed disinformation" state, which uses Danger red — real-world safety signal (electoral disinformation) overrides the flat single-accent rule here by design. Danger never appears for anything else; it's reserved exclusively for that one severity tier, so it keeps its urgency.

---

## 3. Typography

- **Display:** Unica One, 4rem, weight 400, letter-spacing 0.04em — reserved for the landing hero headline only.
- **H1–H4:** Archivo, weight 500.
- **Body:** Inter, 0.95rem, line-height 1.6. Root font-size is 16px.
- **Label:** IBM Plex Mono, 0.7rem, letter-spacing 0.12em, uppercase — section labels, captions, stat-card labels.

---

## 4. Shape & spacing

- **Radius:** sm/md = 0px, lg/xl/2xl = 2px (flat, drafting-table aesthetic). Circular elements (avatars, pills, icon badges) remain fully rounded.
- **Spacing:** Tailwind's default 4px-based scale already aligns with the spec's sm(8px)/md(16px)/lg(32px).

---

## 5. Route map (10 routes)

Since the WhatsApp bot handles the actual voice interaction, this React app is the **Electoral Integrity Dashboard + admin/fellowship console** — used by YAPD4Africa staff, Digital Integrity Fellows, and stakeholder partners (electoral bodies, CSOs).

| # | Route | Purpose | Access |
|---|---|---|---|
| 1 | `/` | Public landing page | Public |
| 2 | `/login` | Fellow/admin sign-in | Public |
| 3 | `/dashboard` | Electoral Integrity Dashboard (home after login) | Fellow/Admin |
| 4 | `/reports` | List of all voice reports (transcribed, geolocated) | Fellow/Admin |
| 5 | `/reports/:id` | Single report detail + verification workflow | Fellow/Admin |
| 6 | `/map` | Live map view of reports by polling unit/LGA | Fellow/Admin/Public (view-only) |
| 7 | `/alerts` | Disinformation & deepfake alert feed | Fellow/Admin |
| 8 | `/fellows` | Digital Integrity Fellows directory | Admin |
| 9 | `/voter-education` | Voter education hub (audio manifestos, polling info) | Public |
| 10 | `/about` | About YAPD4Africa, project history, contact | Public |

Optional 11th route if you want account management: `/settings` (profile, notification settings).

---

## 6. Page-by-page breakdown

### 1. `/` — Landing page
**Layout:** Full-width hero, centered content, generous white space.
- **Header:** Logo (left, tertiary "K" mark), nav links (About, Voter Education, Login), on a surface header bar.
- **Hero section:** Display-style headline ("Verified voices for the 2027 election"), two CTA buttons — "Report an issue via WhatsApp" (tertiary, the page's one reserved action) and "View the Dashboard" (primary outline).
- **Stats strip:** 3–4 stat cards in a row — reports collected, LGAs covered, fellows trained, verification rate. Primary-colored numbers on surface cards.
- **How it works:** 3-step horizontal illustration (Speak → Verify → Act) with icons, mono-label step numbers.
- **Footer:** Primary (dark) background, YAPD4Africa branding, mono-label section headers, contact.

### 2. `/login` — Sign in
**Layout:** Centered card (max-width ~420px) on Neutral background.
- Kuri'a logo top-center (tertiary "K" mark).
- Email/phone + password fields, "Sign in" button (tertiary, full width — the page's one reserved action).
- Link: "Are you a Digital Integrity Fellow? Sign in here" (tertiary text link).

### 3. `/dashboard` — Electoral Integrity Dashboard (home)
**Layout:** Sidebar (Primary/dark, icons + labels: Dashboard, Reports, Map, Alerts, Fellows, Voter Ed, Settings) + main content area.
- **Top bar:** Notification indicator, user avatar/name (no global search — search lives on the pages that need it: Reports, Alerts, Fellows).
- **Metric row:** 4 cards — Total reports today, Verified %, Active fellows, Open disinformation alerts (solid danger-red card when count > 0).
- **Map preview widget:** Small embedded map (Kaduna focus) with status-coded pins (secondary = verified, primary = pending, danger red = flagged) — click-through to `/map`.
- **Recent reports table:** Last 6 incoming voice reports — columns: time, LGA, language (EN/HA badge), status badge, "View" link.
- **Recent alerts panel:** List of latest alerts, left-border weight/color signals severity (danger red = high, secondary = normal).

### 4. `/reports` — Reports list
**Layout:** Full-width table view with filter bar above.
- **Filters:** Free-text search (report ID, LGA, polling unit, reporter, transcript), LGA dropdown, status (All/Verified/Pending/Flagged) as pill-style filter chips — active chip is the one tertiary element on this screen.
- **Table:** Columns — Report ID, Timestamp, Location (LGA + polling unit), Language, Transcribed summary (truncated), Status badge (icon + weight, no color-coding), Actions ("View").
- Empty state if no reports match filters.

### 5. `/reports/:id` — Report detail
**Layout:** Two-column. Left = report content, right = metadata/verification panel.
- **Left column:** Full transcript (Hausa + auto-translated English side by side), embedded audio player, mono-label field headers.
- **Right column (sticky card):** Status badge, reporter info, GPS/LGA/polling unit, timestamp, verification notes field, three-tier action buttons — "Mark verified" (tertiary, filled — the one reserved action), "Flag as disinformation" (danger-red outline — the next most consequential action), "Escalate to electoral body" (secondary outline — administrative, lowest emphasis).

### 6. `/map` — Live map view
**Layout:** Full-bleed map (Kaduna State default, zoomable to Northern Nigeria) with a collapsible left panel.
- **Map pins:** Status-coded (secondary = verified, primary = pending, danger red = flagged), clustered at high zoom. Style switcher (top-right: Standard/Light/Dark tiles) on this full map view — not on the dashboard preview.
- **Left panel:** Legend (StatusBadge components), filters (same as reports page), live counter.
- **Pin click:** Opens a small popup card with report summary + "View full report" link to `/reports/:id`.

### 7. `/alerts` — Disinformation & deepfake alerts
**Layout:** Card-feed layout (like a moderation queue), Neutral background.
- Each alert = card with left-border weight/color signaling status: confirmed = thick danger-red border + solid danger-red badge; under review/dismissed = secondary border + muted secondary badge.
- Top bar: free-text search (title, source, pattern, flagged by) + status filter chips (active chip = tertiary).

### 8. `/fellows` — Digital Integrity Fellows directory
**Layout:** Grid of profile cards (3–4 per row on desktop).
- Each card: avatar (primary circle), name, LGA assigned, # of reports verified, training status (primary text + BadgeCheck icon if trained, muted secondary text if in training), "View profile" link (primary outline — repeated per card, so it deliberately isn't tertiary).
- Top bar: search + "Add fellow" button (tertiary — the page's one reserved action, admin only).

### 9. `/voter-education` — Voter education hub
**Layout:** Public-facing hub for low-literacy citizens.
- **Hero:** "Everything you need to vote in 2027" with big icon buttons: Polling Unit Finder, Election Dates, Candidate Manifestos (Audio), How to Report an Issue — border brightens to tertiary only on hover.
- **Audio manifesto cards:** Party/candidate name, real party color chip (unrelated to brand palette — these are actual party colors), embedded audio player, short text summary.
- **FAQ accordion** at the bottom: common voting questions, expandable, large tap targets.

### 10. `/about` — About YAPD4Africa
**Layout:** Editorial/long-form page, simple single column, max-width ~720px for readability.
- Organization mission statement, project history, team/partners section, DDISA/funder acknowledgment, tertiary-colored contact email link at the bottom.

---

## 7. Shared components

- **Status badge** (Verified / Pending / Flagged) — icon + weight variants (outline primary / outline secondary / solid danger red for flagged), reused across dashboard, reports, map, alerts.
- **Metric card / Stat card** — number + label, used on landing and dashboard; `accent` variant flips to a solid primary card instead of a color swap.
- **Report card / row** — reused between dashboard "recent reports" and the full `/reports` table.
- **Audio player** — reused in report detail and voter education pages, play control and progress fill use tertiary.

---

## 8. Accessibility notes

- Status is never conveyed by color alone — every badge pairs an icon with its label (CheckCircle2/Clock/Flag).
- All interactive elements need visible focus states (tertiary outline) and touch targets of at least 44x44px.
- Audio content should always have a text transcript alongside it.
