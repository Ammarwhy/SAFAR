# SAFAR — Product Requirements Document (PRD)
**Version:** 2.3 | **Date:** April 2026 | **Phase:** 5 — Implementation  
**Team:** Rafay Ather Khan (23L-0987) · Abu Bakar Amir (23L-0548) · Soban Ali (23L-0507) · Muhammad Ammar Hussain (23L-0780)  
**Course:** CS3009 Software Engineering, FAST-NU Lahore · Spring 2026

> **Agent instruction — Code changes:** Any AI agent that changes code must update all Markdown files in the repo to keep documentation current.
>
> **Agent instruction — Doc changes:** Any AI agent updating documentation must explain what changed, why it changed, how it was verified, and the core idea behind the decision.
>
> **Current implementation status:** Featured Escape card hardening complete (Entry 011, 2026-04-25). The hero now includes fallback image handling plus duration/highlight metadata. Backend / Supabase wiring remains the next implementation phase. See `Build_Progress.md` Entry 011 for full change log.

---

## Revision History

| Version | Date | Changes | Author |
|---|---|---|---|
| 2.0 | Apr 21 2026 | Initial implementation PRD | Claude (generated) |
| 2.1 | Apr 21 2026 | Full alignment with Figma prototype frames: corrected screen names, copy, nav bar labels per screen, dual radar chart axes, split method labels, agency nav context, journey timeline structure | Claude (prototype diff) |
| 2.2 | Apr 21 2026 | Added implementation status checkpoint for prototype-first UI alignment progress (Entry 008 reference) | Copilot |
| 2.3 | Apr 21 2026 | Updated implementation status to Entry 009: added latest screen rewrites, tokenized parchment + rich mahogany color system, and documentation synchronization notes | Copilot |
| 2.4 | Apr 25 2026 | Updated to Entry 010: category-reactive Explore, tab-distinct Journeys, enriched Vibe Room, full Profile overhaul, stale component list corrected | Claude |
| 2.5 | Apr 25 2026 | Updated to Entry 011: Featured Escape image fallback handling and metadata chips | Copilot |

---

## 1. Product Overview

### 1.1 What is SAFAR?
SAFAR ("journey" in Urdu) is a mobile travel-companion application targeting Pakistani adventure travelers aged 18–35. It combines AI-powered travel-partner matching, group trip coordination, shared expense tracking, a safety center, and a verified travel agency directory into a single mobile-first platform. The primary geography is northern Pakistan — Gilgit-Baltistan, Khyber Pakhtunkhwa, and Azad Kashmir.

### 1.2 Problem Statement
Pakistani travelers currently juggle WhatsApp groups (planning), Excel/Splitwise (expenses), Google Maps (navigation), and word-of-mouth (agency discovery). There is no single, trust-verified platform that handles the full journey lifecycle — from finding a compatible travel companion to settling expenses after the trip.

### 1.3 Core Value Propositions
1. **Trust** — Only DTS-verified agencies appear in the directory; AI matching uses 50+ preference signals.
2. **Transparency** — Solo vs. Agency cost comparison shows users exactly what they save or spend.
3. **Coordination** — Vibe Rooms integrate itinerary pinning, group polls, and real-time chat.
4. **Safety** — Emergency SOS, live GPS sharing, and local authority lookup in one screen.
5. **Offline-First** — Itineraries, expense ledger, and emergency contacts all work without connectivity.

---

## 2. Target Users

| Segment | Description | Key Need |
|---|---|---|
| Solo Young Traveler | University student / young professional, 18–28 | Find a compatible travel buddy, split costs |
| Group Trip Organizer | 1 person coordinating 4–10 friends | Itinerary management, expense ledger, group chat |
| Independent Family | Budget-conscious family, avoids agencies | DIY cost planning, route safety info |
| Overseas Pakistani | Diaspora exploring Pakistan | Verified agencies, English-first UI, safety assurance |
| Verified Agency | DTS-licensed travel operator | Digital storefront, lead capture, trip management tools |

---

## 3. Screens Inventory (15 GUI Screens)

This table uses the **exact copy and terminology** visible in the Figma prototype frames.

| ID | Screen Title (exact) | Prototype Description |
|---|---|---|
| GUI-01 | SAFAR — Splash | Full-screen arch hero (landscape), "SAFAR" serif title, "CURATED JOURNEYS • TIMELESS ROUTES" subtitle, "Begin Exploration" rich mahogany CTA, "● OFFLINE MODE ACTIVE ⬇" pill when offline |
| GUI-02 | SAFAR — The Digital Curator (Sign In) | Arch hero with "DTS VERIFIED" rich mahogany badge overlay, "SAFAR / THE DIGITAL CURATOR" titles, email + password underline fields, red italic login error, "Enter Archive" rich mahogany button, "Forgot Access?" + "Request Invitation" links, greyed destination thumbnails below fold |
| GUI-03 | Explore — The Eternal Silk Road | Section label "CURATED JOURNEYS", serif title "The Eternal Silk Road" (italic "Silk Road"), large arch hero (Varanasi sunset), sub-destination grid (Petra + Bukhara), "Heritage Archives" horizontal scroll (VOL. 04, VOL. 09), "The Digital Curator" CTA section with "Access Archives" button |
| GUI-04 | Journeys — Nomad's Journey | Section label "CURRENT EXPEDITION", hero arch card "Samarkand: The Blue City" with "Offline Access Available" cloud badge, "Nomad's Journey" title, vertical timeline of journey cards with connecting dot indicators: Active/CACHED card, Completed card with Archive Logs count, locked "Unlocking" card; "Offline Safety Kit · N Destinations Downloaded · Update" banner |
| GUI-05 | Trips Collection | Section label "CURATED JOURNEYS", "Trips Collection" title, stacked trip arch cards each with "CACHED" cloud badge, trip name, duration + cities, "Expanding your horizon?" CTA card with "New Journey" rich mahogany button |
| GUI-06 | Agency Directory — Master Curators | Section label "THE CURATED SELECTION", "Master Curators of the Silk Road" title, partner intro text, agency cards (arch image, DTS Verified badge, name, est. year, specialty, "View Details" button), "Are you a custodian of history?" CTA with "APPLY FOR CERTIFICATION" button |
| GUI-07 | Agency Profile — [Agency Name] | Section label "THE PREMIER COLLECTION", agency name in large serif, italic philosophy quote, "Our Philosophy" heading + description, blue stat badge "N UNESCO PARTNERS", "Curated Itineraries" section with trip cards (duration · region, title, teaser), "Begin Your Personal Monograph" card with "Contact Agent" (envelope icon) + "Schedule a Call" buttons |
| GUI-08 | AI Match Discovery | Arch profile image with DTS-style verified badge, name in rich mahogany serif, "LOCATION · ROLE" subtitle, "Journey Alignment" card with % COMPATIBLE badge and 5-axis radar chart, "Curator's Note" quote block, interest tag pills, "Send Message" rich mahogany button + "View Profile" outline button |
| GUI-09 | Traveler Public Profile | Circular profile photo with edit overlay, name + tagline, bio text, location + countries badges, "Travel Persona DNA" 6-axis radar chart, "Achievements" rich mahogany card (3 rows: icon + title + description), "Curation Score" card with numeric display + trend icon, "Curated Collections" photo grid + "View Archive" link |
| GUI-10 | Vibe Room | "VIBE ROOM" centred label + "N Active Explorers" subtitle in header, trip member avatar top-right, rich mahogany "PINNED PRIORITY" card (itinerary day + activities + map icon), left/right chat bubbles with sender name labels above left bubbles, image-in-bubble support, "Sync Interrupted" error card (cloud-x icon, message, "TRY AGAIN" + "CHECK SAFETY KIT"), "Share a vibe..." input with "+" and send button |
| GUI-11 | Expense Ledger | "Expense Ledger" title, trip subtitle, two stat cards (TOTAL EXPENSES light / YOUR SHARE blue), "Recent Transactions" + "Filter" header, transaction rows (category icon, name, date, payer label, VERIFIED badge when confirmed, amount, split label), "Ready to Settle?" card with owed amount + "Settle Up Now" button, "OFFLINE SYNC ACTIVE" footer banner |
| GUI-12 | Safety Center | "OFFLINE SAFETY KIT: ACTIVE" top banner, "Safety Center" title, large SOS card (red "SOS" + "TAP FOR HELP"), two 2-up feature cards (Location / Guide), "Emergency Contacts" rich mahogany card with contact count, "Local Authorities" section (Tourist Police + Heritage Hospital rows each with CALL button), dark map card with "YOU ARE HERE: [LOCATION]" white pill |
| GUI-13 | User Profile & Settings | Profile card (photo, name, "VERIFIED ACCOUNT" rich mahogany badge, role, stats: Expeditions + Heritage Points), "Account" section (Personal Information / Email Address / Expense Ledger), "Preferences" section (Offline Safety Kit toggle / Curated Theme toggle), "Privacy & Security" section (Passkey Access / Privacy Mode), "SIGN OUT OF HERITAGE" red text button |
| GUI-14 | Connection Error (Sync Interrupted) | Cloud-offline icon, "Sync Interrupted" heading, "Heritage sites often have weak signals. Your messages will be sent once we're back online.", "TRY AGAIN" rich mahogany button, "CHECK SAFETY KIT" text link |
| GUI-15 | (Derived) New Journey / Onboarding | Accessed via "New Journey" CTA on Trips Collection; form to create a new trip with title, destination, date range |

---

## 4. Per-Screen Specifications

### GUI-01 — Splash
- Background: parchment `#EEEDE9`
- Heritage header (rich mahogany bar) at top
- Arched hero image (green landscape, centred)
- "**SAFAR**" in large rich mahogany serif (`#371B17`), `font-size: ~48px`
- "CURATED JOURNEYS • TIMELESS ROUTES" in spaced uppercase sans-serif, muted
- "**Begin Exploration**" — full-width rich mahogany rounded button
- "● OFFLINE MODE ACTIVE ⬇" — small pill badge, only when `NetInfo.isConnected === false`

### GUI-02 — Sign In
- Heritage header with profile avatar icon (right)
- Arched hero image; "**DTS VERIFIED**" rich mahogany seal badge overlaid bottom-centre of image
- "**SAFAR**" rich mahogany serif title; "THE DIGITAL CURATOR" spaced caps subtitle
- "Email Address" — underline text field (no border box)
- "Password" — underline field with eye-toggle icon (right)
- **Error state:** red italic text "Login Error: Invalid credentials, please try again." inside a light red card, shown on failed login
- "**Enter Archive**" — full-width rich mahogany rounded CTA button
- "Forgot Access?" (left, muted) + "**Request Invitation**" (right, rich mahogany link)
- Divider line
- Row of 3 greyed-out destination thumbnails (decorative, below fold)
- **Bottom nav (4 tabs):** Explore (active compass) · Search · Community · Messages · Profile

### GUI-03 — The Eternal Silk Road (Explore Detail)
- Heritage header with search icon + profile avatar
- "CURATED JOURNEYS" spaced-caps section label
- "**The Eternal** *Silk Road*" — mixed roman + italic serif title
- Subtitle: "Discover ancient architectural marvels preserved through centuries of history."
- Large arched hero: Varanasi sunset/Ganges; "INDIA" micro label + "**Varanasi**" location label overlaid bottom-left
- 2-column grid of smaller arch cards: **Petra** ("THE ROSE CITY") · **Bukhara** ("SILK ROAD GEM")
- "**Heritage Archives**" horizontal scroll section; cards labelled "VOL. 04 — Agra: Beyond the Marble", "VOL. 09 — Forgotten Kingdom[s]"
- "**The Digital Curator**" section: rich mahogany verified icon, description text, "**Access Archives**" rich mahogany button
- **Bottom nav (5 tabs):** Explore (active, filled rich mahogany circle) · community · people · messages · profile

### GUI-04 — Nomad's Journey (Journeys)
- Heritage header with profile avatar (right)
- **Current Expedition hero card** (arched image, Samarkand): section micro-label "CURRENT EXPEDITION", title "**Samarkand: The Blue City**", "☁ Offline Access Available" cloud badge bottom-left
- "**Nomad's Journey**" title, subtitle: "Tracing the ancient routes of the Silk Road through curated modern expeditions."
- Horizontal dot pagination (1 dot active)
- **Vertical journey timeline** — cards connected by dot indicators:
  1. **The Turquoise Gates** — "Active" green pill badge (left) + "✓ CACHED" text badge (right)
  2. **Varanasi: Eternal City** — "COMPLETED SEPT 2023" date + "8 Archive Logs" count (with history icon)
  3. **The High Pamir Pass** — greyed-out, lock icon, "Unlocking Spring 2024"
- "**Offline Safety Kit** · 3 Destinations Downloaded" banner at bottom with "**Update**" button
- **Bottom nav (5 tabs):** Explore · **Journeys** (active) · Guild · Messages · Profile

### GUI-05 — Trips Collection
- Heritage header with search + profile icons
- "CURATED JOURNEYS" section label; "**Trips Collection**" serif title
- Stacked trip cards (full-width, arched image, "CACHED ☁" badge top-right of image):
  1. **The Royal Rajasthan Route** — 12 Days · Jaipur, Jodhpur, Udaipur
  2. **Kerala Backwaters** — 7 Days · Alleppey, Kumarakom
  3. **Varanasi: The Eternal City** — 5 Days · Spiritual Heartland
  4. **Himalayan Heights** — 14 Days · Leh, Ladakh, Spiti
- "Expanding your horizon?" CTA card (location-pin-plus icon) → "**New Journey**" rich mahogany button
- **Bottom nav (5 tabs):** Explore (active) · community · people · messages · profile

### GUI-06 — Master Curators (Agency Directory)
- Heritage header with search + bag/cart icon (right)
- "THE CURATED SELECTION" section label
- "**Master Curators of the Silk Road**" serif title
- Intro text: "We have partnered with the world's most distinguished travel agencies to provide unparalleled access to historical landmarks and hidden cultural gems. Each partner is rigorously vetted for authenticity and heritage preservation."
- **Agency cards** (full-width, arched image, rich mahogany "DTS Verified" badge top-right of image):
  1. **Kashi Journeys** — est. 1984 — "Specializing in spiritual architecture and river-based expeditions through the ancient heart of Varanasi." — "View Details ›" button
  2. **Nomad Silk Road** — est. 1992 — "The premier gateway to Central Asian heritage, from the Registan to the forgotten caravanserais of the Kyzylkum." — "View Details ›" button
  3. **The Nabataean Guild** — est. 2005 — "Archaeological-led tours focusing on the desert kingdoms and the spice trade routes of the Middle East." — "View Details ›" button
  4. **Abyssinian Heritage** — est. 2011 — "Dedicated to the preservation of Ethiopian Orthodox history and the exploration of the Simien Highlands." — "View Details ›" button
- "Are you a custodian of history?" CTA section: "Join our exclusive network of certified travel agencies and showcase your expertise to a global audience of elite explorers." → "**APPLY FOR CERTIFICATION**" outline button
- **Bottom nav (4 tabs — agency context):** Explore Routes · **Agencies** (active) · Concierge · Profile

### GUI-07 — Agency Profile (e.g., The Royal Curator)
- Heritage header with profile icon (right)
- Large arched hero image (Mughal palace dusk scene)
- "THE PREMIER COLLECTION" section label
- "**The Royal Curator**" large serif agency name
- Italic quote block: *"We do not merely plan journeys; we orchestrate temporal transitions into the heart of history."*
- "**Our Philosophy**" heading with 2 description paragraphs
- Rich mahogany stat badge: compass icon + "**12**" large + "UNESCO PARTNERS" label
- "**Curated Itineraries**" section + "View All Collections" text link (right):
  - Card 1: arch image (Mughal corridor), "14 DAYS · NORTH INDIA" micro-label, "**The Mughal Legacy**", teaser text
  - Card 2: arch image (monks corridor), "10 DAYS · VARANASI" micro-label, "**Vessels of Faith**", teaser text
- "**Begin Your Personal Monograph**" CTA card (cream background):
  - "☐ **Contact Agent**" rich mahogany button (envelope icon prefix)
  - "**Schedule a Call**" outline button
- **Bottom nav (5 tabs):** compass · people · **person** (active) · chat · profile

### GUI-08 — AI Match Discovery
- Heritage header with dark square icon (top-right, context menu)
- **Profile card** (arched frame — abstract/avatar style art acceptable):
  - Rich mahogany verified badge overlay (bottom-right of image)
  - "**Amina Al-Farsi**" rich mahogany serif name
  - "MUSCAT, OMAN · PROFESSIONAL CURATOR" spaced caps subtitle
- **Journey Alignment card** (white, rounded):
  - "Journey Alignment" heading; "Based on your travel DNA and heritage interests" subtext
  - "**94%**" large rich mahogany number + "COMPATIBLE" label (top-right of card)
  - 5-axis radar/spider chart — axes: **CULTURE** (top) · **RELAXATION** (upper-right) · **FOOD** (lower-right) · **NATURE** (bottom) · **ADVENTURE** (lower-left); filled rich mahogany polygon with point markers
- **Curator's Note card** (cream, slightly inset):
  - Label "Curator's Note"
  - Quote: *"Seeking a fellow traveler for a deep-dive into the Silk Road's architectural evolution. I prioritize historical context over standard tourist traps. Let's find the hidden courtyards of Samarkand together."*
- Interest tag pills: "🏛 History Buff" · "🎨 Visual Arts"
- "**Send Message**" full-width rich mahogany button
- "**View Profile**" full-width outline button
- **Bottom nav (5 tabs):** compass · search · **people** (active) · messages · profile

### GUI-09 — Traveler Public Profile (e.g., Julian Thorne)
- Heritage header with search + profile icons
- Circular profile photo with camera/edit icon overlay (bottom-right)
- "**Julian Thorne**" bold serif name
- "*The Global Archivist*" italic tagline
- Bio: "Curating memories through the lens of ancient geometry and silent landscapes. Julian seeks the intersection of forgotten silk routes and contemporary minimalist architecture."
- Pill badges: "📍 Based in London" · "🌍 42 Countries"
- "**Travel Persona DNA**" section heading:
  - 6-axis radar chart — axes: **HERITAGE** (top) · **CULINARY** (left) · **URBAN** (right) · **NATURE** (bottom) + 2 more (exact labels: see Figma); filled rich mahogany shape with dashed outer reference octagon
- "**Achievements**" rich mahogany card:
  - 🏛 **Heritage Seeker** — "Explored 50+ UNESCO sites"
  - 🍽 **Gourmand** — "Documented 120 local cuisines"
  - 🏕 **Explorer** — "Off-grid specialist"
- "**Curation Score**" card (light background): "**94.8**" large display number + trend graph icon (right)
- "**Curated Collections**" heading + "VIEW ARCHIVE" link (right):
  - 2-column photo grid: **Agra Silhouettes** (Oct 2023) · **Marrakech Rhythms** (Jan 2024) · **Bagan Whispers** (Mar 2024, full width)
- **Bottom nav (5 tabs):** compass · search · people · chat · **profile** (active)

### GUI-10 — Vibe Room
- Heritage header (rich mahogany bar):
  - "VIBE ROOM" centred bold label (rich mahogany)
  - "4 Active Explorers" centred subtitle (muted)
  - Trip group avatar (top-right)
- **Pinned Priority card** (rich mahogany background, full-width):
  - "📌 PINNED PRIORITY" micro-label
  - "**Kashi Trip Itinerary — Day 3**" bold title
  - "Sunrise Aarti at Dashashwamedh Ghat & Silk Weaving Workshop" subtitle
  - Map icon button (top-right of card)
- **Chat messages** (vertically scrollable):
  - Left bubble (other user): sender name label above ("AMARA"), white bubble, black text
  - Right bubble (self): no name, rich mahogany (`#371B17`) bubble, white text
  - Image bubble: rounded image card with caption text below, sender avatar bottom-left
  - System sender label example: "JULIAN" above image bubble
- **Sync Interrupted error card** (when WebSocket disconnected):
  - Cloud-X icon (light red/pink tint)
  - "**Sync Interrupted**" heading
  - "Heritage sites often have weak signals. Your messages will be sent once we're back online."
  - "**TRY AGAIN**" rich mahogany button
  - "CHECK SAFETY KIT" muted text link
- **Input bar** (bottom, above nav):
  - "**＋**" circular button (left) — attachments/media
  - "Share a vibe..." placeholder text
  - "**➤**" send button (right, blue circle)
- **Bottom nav (5 tabs):** Explore · Journey · **Peers** · **Chat** (active) · Profile

### GUI-11 — Expense Ledger
- Heritage header with search + avatar icons
- "**Expense Ledger**" serif title
- Subtitle: "Silk Road Expedition · Samarkand to Bukhara"
- Two stat cards (side by side):
  - Left (light): "TOTAL EXPENSES" label · "**$1,245.50**" large number
  - Right (rich mahogany `#371B17`): "YOUR SHARE" label · "**$622.75**" large white number
- "**Recent Transactions**" heading + "⚙ Filter" link (right)
- **Transaction table** (card container), columns: DETAIL · AMOUNT:
  | # | Icon | Name | Date | Payer | Badge | Amount | Split |
  |---|---|---|---|---|---|---|---|
  | 1 | 🍽 | Dinner at Old City | Oct 14 | Paid by David | — | $84.20 | Split equally |
  | 2 | 🎟 | Registan Tour Tickets | Oct 14 | Paid by You | **VERIFIED** | $120.00 | Split equally |
  | 3 | 🚗 | Private Transfer | Oct 13 | Paid by David | — | $450.00 | Split equally |
  | 4 | 🏛 | Museum Entry Fee | Oct 13 | Paid by You | — | $15.00 | Individual |
- **Ready to Settle? card** (cream, centred):
  - Handshake icon
  - "You currently owe David **$180.35** for the shared expenses of the last 3 days."
  - "**Settle Up Now**" full-width rich mahogany button
- "☁ **OFFLINE SYNC ACTIVE** · Data will sync when network is restored" footer banner (dot + cloud icon)
- **Bottom nav (5 tabs):** Explore · Journey · Connect · **Ledger** (active) · Profile

### GUI-12 — Safety Center
- "● **OFFLINE SAFETY KIT: ACTIVE**" top banner with cloud-sync icon (right)
- "**Safety Center**" large serif title
- **SOS card** (white, heavy shadow, full-width):
  - "**SOS**" in large bold red (`#D32F2F`) serif
  - "TAP FOR HELP" spaced-caps caption
  - Subtle red glow/shadow around card
- **2-column feature cards:**
  - Left: 📍 Location icon · "**Location**" · "Live coordinate broadcast active"
  - Right: 🛡 Guide icon · "**Guide**" · "Verify local heritage expert credentials"
- **Emergency Contacts card** (rich mahogany `#371B17`, full-width):
  - "**Emergency Contacts**" heading (white)
  - Avatar placeholder with asterisk
  - "3 active contacts notified of your current status." (white)
- "**Local Authorities**" section heading:
  - Row: 🛡 icon · "**Tourist Police**" bold · "Varanasi Division · 2.4km away" muted · "**CALL**" rich mahogany pill button
  - Row: 🏥 icon · "**Heritage Hospital**" bold · "Emergency Ward · Open 24h" muted · "**CALL**" rich mahogany pill button
- **Dark map card** (charcoal `#2C2C2C` background, arch-top shape):
  - White pill overlay: "● YOU ARE HERE: DASHASHWAMEDH GHAT"
- **Bottom nav (5 tabs — safety context):** Explore · Search · Community · Messages · **Safety** (active, rich mahogany)

### GUI-13 — User Profile & Settings
- Heritage header with search icon + dark circular avatar (top-right)
- **Profile card** (white, rounded):
  - Profile photo (can be avatar/illustration style)
  - "**Elias Thorne**" bold serif name
  - "✓ **VERIFIED ACCOUNT**" rich mahogany badge
  - "Curator & Heritage Explorer" role subtitle
  - Stats row: "**14**" · "EXPEDITIONS" | "**8.2k**" · "HERITAGE POINTS"
- "— **Account**" section label with hairline rule:
  - "👤 **Personal Information**" → arrow · "Manage your identity and bio"
  - "✉ **Email Address**" → arrow · "e.thorne@archive.org"
  - "💳 **Expense Ledger**" → arrow · "Manage budgets and heritage passes"
- "— **Preferences**" section label:
  - "☁ **Offline Safety Kit**" toggle (**ON**, rich mahogany) · "Auto-cache maps for heritage sites"
  - "🌙 **Curated Theme**" toggle (**OFF**, grey) · "Adaptive light/dark heritage palette"
- "— **Privacy & Security**" section label:
  - "🔒 **Passkey Access**" · "Biometric security enabled"
  - "📍 **Privacy Mode**" · "Incognito exploration active"
- "**SIGN OUT OF HERITAGE**" full-width outlined button with red text
- **Bottom nav (5 tabs — profile context):** Explore · **Paths** · Community · Archive · **Profile** (active)

### GUI-14 — Sync Interrupted (Connection Error)
- Displayed as an **inline card** within the Vibe Room screen (GUI-10) when WebSocket is lost — not a separate full screen
- Also reachable as a standalone modal from any screen losing connectivity
- Elements: cloud-offline icon (light red tint), "**Sync Interrupted**" heading, descriptive text, "**TRY AGAIN**" button, "CHECK SAFETY KIT" link

---

## 5. Functional Requirements

### 5.1 Authentication
- **FR-01** Email/password registration with bcrypt-hashed credential storage
- **FR-02** Google OAuth 2.0 login (button labelled "Enter Archive via Google")
- **FR-03** JWT-based session management with silent token refresh
- **FR-04** Password reset via verified email link; UI labels it "Forgot Access?"
- **FR-05** 2FA toggle in Settings
- **FR-06** Biometric/Passkey login (Passkey Access in Settings)
- **FR-07** Multi-role registration: Traveler vs. Verified Agency

### 5.2 Explore & Discovery
- **FR-08** Explore Detail screen (GUI-03) shows large arch hero, sub-destination grid, Heritage Archives horizontal scroll, and Digital Curator section
- **FR-09** Heritage Archives items carry volume labels (e.g., "VOL. 04")
- **FR-10** "Access Archives" navigates to editorial content list
- **FR-11** Sub-destination cards (Petra, Bukhara, Varanasi) are tappable and navigate to destination detail

### 5.3 AI Travel Matching
- **FR-12** Collect 50+ travel preference signals during onboarding: pace, style, budget, interest tags, preferred regions, and **5 Journey Alignment axes** (Culture, Relaxation, Food, Nature, Adventure) used for the match compatibility chart
- **FR-13** Separately collect **6 Travel Persona DNA axes** (Heritage, Culinary, Urban, Nature + 2 more per Figma) used for the user's own profile radar chart — these are distinct from the Journey Alignment axes
- **FR-14** Compute Match Percentage Score (0–100%) displayed as "N% COMPATIBLE" on the match card
- **FR-15** Journey Alignment radar chart: 5-axis spider chart comparing current user vs. candidate across Culture, Relaxation, Food, Nature, Adventure
- **FR-16** Travel Persona DNA radar chart: 6-axis spider chart on the user's own profile (GUI-09) across Heritage, Culinary, Urban, Nature axes (see Figma for exact all 6 labels)
- **FR-17** Swipe-style candidate discovery: "Send Message" (connect) and "View Profile" actions
- **FR-18** Push notification when match score exceeds threshold: "New N% match found — [Name]"
- **FR-19** Curator's Note — user-authored travel manifesto shown on match card and public profile
- **FR-20** Interest tag pills displayed on both match card and public profile (e.g., "History Buff", "Visual Arts")
- **FR-21** Curation Score displayed as float (e.g., 94.8) with trend icon on public profile

### 5.4 Vibe Room (Group Chat)
- **FR-22** Vibe Room header shows: "VIBE ROOM" centred label, "N Active Explorers" count, trip group avatar
- **FR-23** Real-time text messaging via WebSocket/Supabase Realtime (< 1 second delivery)
- **FR-24** Image and media sharing displayed as rounded image bubble with caption
- **FR-25** Group poll creation (question + options) and voting with live result aggregation
- **FR-26** "Pinned Priority" rich mahogany card at top of chat: shows itinerary day number, activity names, and map icon; set by pinning an itinerary
- **FR-27** Left chat bubbles show sender name label above; right bubbles (own) have no label
- **FR-28** "Sync Interrupted" inline error card when WebSocket disconnects, with "TRY AGAIN" and "CHECK SAFETY KIT"
- **FR-29** Offline message queue — messages queued locally and sent on reconnect
- **FR-30** Input bar: "Share a vibe..." placeholder, "+" media button, send arrow button

### 5.5 Trip Management
- **FR-31** Journeys screen (GUI-04) shows: current expedition hero card, vertical timeline of past/active/future journeys with status indicators
- **FR-32** Journey status indicators:
  - **Active** — green pill badge + "✓ CACHED" badge
  - **Completed** — "COMPLETED [MONTH YEAR]" + "N Archive Logs" count with history icon
  - **Locked/Upcoming** — greyed-out card, lock icon, "Unlocking [Season Year]"
- **FR-33** Offline Safety Kit banner on Journeys screen: "N Destinations Downloaded" + "Update" button
- **FR-34** Trips Collection (GUI-05): stacked trip cards with "CACHED" badge; "New Journey" CTA
- **FR-35** Build itinerary with ordered stops (name, coordinates, description, arrival date)
- **FR-36** Gear advisory and visa/logistics update fields on itinerary
- **FR-37** Add/remove participants from trip
- **FR-38** Cache all trip data locally for offline access

### 5.6 Expense Ledger
- **FR-39** Add expense entry: amount, payer (from participant list), category, split method
- **FR-40** Categories: Dining · Transport · Stay · Activity (each has a distinct icon)
- **FR-41** Split method labels exactly as shown in prototype: **"Split equally"** and **"Individual"** (not "Equal" or "Payer-only")
- **FR-42** "VERIFIED" green badge displayed on expense rows where payment has been confirmed
- **FR-43** Stat cards: "TOTAL EXPENSES" (light card) and "YOUR SHARE" (rich mahogany card) side-by-side
- **FR-44** Auto-calculate balances; "Ready to Settle?" card shows exact owed amount and counterparty name
- **FR-45** "Settle Up Now" marks the balance as settled
- **FR-46** "OFFLINE SYNC ACTIVE" footer banner when offline; changes queued for sync

### 5.7 Safety Center
- **FR-47** "OFFLINE SAFETY KIT: ACTIVE" top banner when offline kit is loaded
- **FR-48** Large SOS card (full-width, white with red glow): "SOS" red serif + "TAP FOR HELP" — tap triggers confirmation modal then distress event
- **FR-49** 2-up feature cards: **Location** ("Live coordinate broadcast active") and **Guide** ("Verify local heritage expert credentials")
- **FR-50** Emergency Contacts rich mahogany card: shows active contact count, "N active contacts notified of your current status."
- **FR-51** Local Authorities list: Tourist Police row (division name, distance in km, CALL button) and Heritage Hospital row (ward name, Open 24h status, CALL button)
- **FR-52** "YOU ARE HERE: [LOCATION NAME]" white pill overlaid on dark map card
- **FR-53** Safety check-in timer — configurable; alerts contacts if not checked in
- **FR-54** Pre-cached local services data accessible without network

### 5.8 Agency Directory & Profile
- **FR-55** Agency Directory (GUI-06) header copy: "THE CURATED SELECTION" / "Master Curators of the Silk Road"
- **FR-56** Agency cards: arched image, "DTS Verified" rich mahogany badge, name, establishment year, specialty description, "View Details ›" button
- **FR-57** "Are you a custodian of history?" CTA section with "APPLY FOR CERTIFICATION" button
- **FR-58** Agency Directory uses a **4-tab bottom nav**: Explore Routes · Agencies · Concierge · Profile
- **FR-59** Agency Profile (GUI-07) shows: "THE PREMIER COLLECTION" label, agency name, italic philosophy quote, "Our Philosophy" text, UNESCO Partners rich mahogany badge, curated itinerary cards
- **FR-60** Agency itinerary cards: duration + region micro-label, title, teaser text, arch image
- **FR-61** "Begin Your Personal Monograph" CTA card with "Contact Agent" (envelope icon) and "Schedule a Call" buttons

### 5.9 User Profile & Settings
- **FR-62** Profile card shows: photo, "VERIFIED ACCOUNT" rich mahogany badge, role title, Expeditions count, Heritage Points count
- **FR-63** Account section: Personal Information, Email Address, Expense Ledger shortcut (opens Expense Ledger settings)
- **FR-64** Preferences toggles: Offline Safety Kit (default ON) and Curated Theme / dark-light (default OFF)
- **FR-65** Privacy & Security section: Passkey Access (biometric) and Privacy Mode (incognito) — display-only status labels (not toggles) for these two
- **FR-66** "SIGN OUT OF HERITAGE" outlined button with red text — triggers sign-out with confirmation
- **FR-67** Profile context uses its own bottom nav: Explore · Paths · Community · Archive · Profile

---

## 6. Non-Functional Requirements

| ID | Attribute | Requirement |
|---|---|---|
| NFR-01 | Performance | Auth + dashboard load within 3 seconds on 4G/LTE |
| NFR-02 | Offline Availability | 100% availability of cached itineraries in Airplane Mode |
| NFR-03 | Real-Time Latency | Vibe Room message delivery < 1 second under normal connectivity |
| NFR-04 | Security | Passwords hashed (bcrypt/argon2); data encrypted in transit (TLS 1.2+) |
| NFR-05 | Data Integrity | Expense ledger rejects null, negative, or non-numeric values |
| NFR-06 | Accuracy | Cost estimates within 10% margin of actual market rates |
| NFR-07 | Usability | New user completes first match action within 60 seconds of launch |
| NFR-08 | Scalability | AI Matching and Chat services independently deployable/scalable |
| NFR-09 | Testability | MatchEngine, ExpenseCalculator, SafetyOrchestrator unit-testable in isolation |
| NFR-10 | Reliability | SOS fan-out must not drop alerts even if Notification Service is temporarily down |

---

## 7. Data Model

### Core Entities

**User**
```
id: uuid (PK)
email: String
passwordHash: String
name: String
profilePhotoURL: String
bio: String
is2FAEnabled: Boolean
membershipTier: String  // "free" | "verified" | "agency"
createdAt: Timestamp
```

**TravelerProfile** (extends User 1:1)
```
userId: uuid (FK → User)
destinationsVisited: int
travelStyle: String        // "Luxury" | "Budget" | "Backpacker" | "Comfort"
travelPace: String         // "Slow" | "Moderate" | "Fast"
interestTags: String[]     // ["History Buff", "Visual Arts", "Food", ...]
nomadsManifesto: String    // the "Curator's Note" self-description
currentLocation: GeoPoint
personaDNA: JSON           // { heritage, culinary, urban, nature, ... }  — 6 axes for Profile radar
journeyAlignment: JSON     // { culture, relaxation, food, nature, adventure } — 5 axes for Match radar
curationScore: Float       // e.g. 94.8
expeditionsCount: int
heritagePoints: int
```

**Match**
```
id: uuid (PK)
requesterId: uuid (FK → User)
targetId: uuid (FK → User)
matchPercentage: Float     // 0–100
status: String             // "Pending" | "Connected" | "Skipped"
matchedAt: Timestamp
```

**Trip**
```
id: uuid (PK)
ownerId: uuid (FK → User)
title: String
destination: String
startDate: Date
endDate: Date
status: String             // "Active" | "Completed" | "Upcoming" | "Locked"
heroImageURL: String
archiveLogsCount: int      // shown on Completed trips
completedDate: Date        // displayed as "COMPLETED [MONTH YEAR]"
unlockDate: Date           // displayed as "Unlocking [Season Year]" when Locked
```

**Itinerary** (1:1 with Trip)
```
id: uuid (PK)
tripId: uuid (FK → Trip)
stops: Stop[]
durationDays: int
gearAdvisory: String
visaUpdate: String
```

**Stop** (value object)
```
name: String
lat: Float
lng: Float
description: String
arrivalDate: Date
sortOrder: int
```

**VibeRoom** (1:1 with Trip)
```
id: uuid (PK)
tripId: uuid (FK → Trip)
pinnedItineraryId: uuid (FK → Itinerary, nullable)
activeMemberCount: int
sessionStatus: String
```

**Message**
```
id: uuid (PK)
roomId: uuid (FK → VibeRoom)
senderId: uuid (FK → User)
content: String
type: String               // "Text" | "Image" | "Poll"
sentAt: Timestamp
delivered: Boolean
```

**Poll**
```
id: uuid (PK)
roomId: uuid (FK → VibeRoom)
question: String
options: JSON[]            // [{ id, text, votes }]
isClosed: Boolean
```

**ExpenseLedger** (1:1 with Trip)
```
id: uuid (PK)
tripId: uuid (FK → Trip)
totalGroupSpend: Float
userBalances: JSON         // { userId: netBalance }
```

**Expense**
```
id: uuid (PK)
ledgerId: uuid (FK → ExpenseLedger)
paidByUserId: uuid (FK → User)
amount: Float              // display currency; use PKR for Pakistani market
category: String           // "Dining" | "Transport" | "Stay" | "Activity"
splitMethod: String        // "Split equally" | "Individual"  ← exact UI labels
isVerified: Boolean        // shows "VERIFIED" badge in UI
expenseDate: Date
```

**Agency**
```
id: uuid (PK)
name: String
establishedYear: int
region: String
starRating: Float
reviewCount: int
philosophy: String
certificationBadges: String[]
officeLat: Float
officeLng: Float
contactPhone: String
heroImageURL: String
isDTSVerified: Boolean
unescoPartnersCount: int
```

**AgencyItinerary**
```
id: uuid (PK)
agencyId: uuid (FK → Agency)
title: String
durationLabel: String      // e.g. "14 Days"
regionLabel: String        // e.g. "North India"
pricePerPerson: Float
departureDate: Date
destinationTags: String[]
teaserText: String
imageURL: String
```

**Notification**
```
id: uuid (PK)
recipientId: uuid (FK → User)
type: String               // "MatchFound" | "TripReminder" | "ExpenseAlert" | "SOSAlert"
content: String
sentAt: Timestamp
isRead: Boolean
```

---

## 8. API Interface Contracts

### IAuthService
- `login(email, password) → AuthToken`
- `loginWithGoogle(idToken) → AuthToken`
- `logout(token) → void`
- `refreshToken(refreshToken) → AuthToken`
- `resetPassword(email) → void`  ← "Forgot Access?" flow

### IMatchService
- `getMatches(userId, filters) → List<Match>`
- `connect(matchId) → void`  ← "Send Message" action
- `skip(matchId) → void`
- `getProfile(userId) → TravelerProfile`
- `computeScore(userId1, userId2) → Float`

### IChatService (WebSocket / Supabase Realtime)
- `joinRoom(roomId) → void`
- `sendMessage(roomId, content, type) → Message`
- `createPoll(roomId, poll) → Poll`
- `castVote(pollId, option, userId) → void`
- `pinItinerary(roomId, itineraryId) → void`

### ITripService
- `createTrip(data) → Trip`
- `getTrips(userId) → List<Trip>`
- `getItinerary(tripId) → Itinerary`
- `addParticipant(tripId, userId) → void`
- `updateItinerary(tripId, data) → Itinerary`

### IExpenseService
- `addExpense(ledgerId, expense) → Expense`
- `getLedger(tripId) → ExpenseLedger`
- `markSettled(ledgerId, userId) → void`
- `getHistory(ledgerId) → List<Expense>`
- `calculateBalance(ledgerId, userId) → Float`

### ISafetyService
- `activateSOS(userId, location) → void`
- `configureCheckIn(userId, durationMin) → void`
- `startLiveShare(userId, contacts) → void`
- `getLocalServices(city) → List<LocalService>`

### IAgencyService
- `listAgencies(region?, maxPrice?) → List<Agency>`
- `getAgency(agencyId) → Agency`
- `bookItinerary(itineraryId, userId) → Booking`
- `contactAgency(agencyId, channel) → void`

---

## 9. EDA Event Flows

### Vibe Room Message Flow
1. User sends message → ChatComponent via WebSocket/Supabase channel
2. Message written to `messages` table → Supabase Realtime triggers INSERT event
3. All subscribed room members' clients receive the INSERT payload
4. UI appends new bubble
5. If disconnected → queued locally → "Sync Interrupted" shown → retry on reconnect

### SOS Activation Flow
1. User taps SOS card → confirmation modal → confirm
2. `activateSOS(userId, GeoPoint)` sent to SafetyService
3. SafetyService publishes `SOSActivated` event
4. NotificationService pushes FCM/APNs to emergency contacts
5. Local authorities API pinged with coordinates (mock for demo)
6. In-app confirmation displayed

### Match Found Flow
1. MatchingService runs `computeScore` for user pair
2. Score > threshold → publishes `MatchFound`
3. NotificationService → FCM/APNs push → "New 94% match found — Amina Al-Farsi"

---

## 10. Offline-First Behaviour

| Feature | Online | Offline |
|---|---|---|
| Trip Itinerary | Fetch from server | Serve from AsyncStorage/SQLite cache |
| Expense Ledger | Live sync | Read cache; new entries queued |
| Vibe Room | WebSocket real-time | "Sync Interrupted" card; messages queued |
| Safety Center | Live GPS + API | Pre-cached contacts + local services |
| Maps | Live tiles | Cached tiles for downloaded destinations |
| Agency Directory | Live API | Unavailable |
| AI Matching | Server-computed | Unavailable |
| Profile | Server | Local cache |

---

## 11. Design System

### Color Tokens
| Token | Hex | Usage |
|---|---|---|
| `primary-mahogany` | `#371B17` | Headings, CTAs, active tab, own chat bubbles, key component surfaces |
| `accent-mahogany` | `#371B17` | Heritage header bar, DTS Verified badge, Pinned Priority card |
| `background-parchment` | `#EEEDE9` | All screen backgrounds and base surfaces |
| `card-white` | `#FFFFFF` | Card surfaces, SOS card, feature cards |
| `error-red` | `#B44747` | SOS text, login error text |
| `success-green` | `#2F6F5E` | "Active" badge, VERIFIED badge, online dot |
| `text-dark` | `#251816` | Primary body text |
| `text-muted` | `#7B716D` | Subtitles, captions, locked content |
| `mahogany-card` | `#371B17` | Emergency Contacts card, Achievements card, CTA surfaces |
| `overlay-dark` | `#2C2C2C` | Map background |

### Typography
- **Display serif:** Playfair Display (or Georgia fallback) — "SAFAR" hero, screen headings, agency names
- **Body sans-serif:** Inter (or SF Pro / Roboto system fallback) — descriptions, labels, chat text
- **Caps label:** Inter, letter-spacing `0.1em`, uppercase — "CURATED JOURNEYS", "DTS VERIFIED", "THE PREMIER COLLECTION"
- **Italic accent:** Playfair Display Italic — philosophy quotes, "The Global Archivist" taglines

### Signature UI Motifs
- **Arched image frame** — pointed arch at top, flat bottom; implemented via `borderTopLeftRadius` + `borderTopRightRadius` with large values + `overflow: hidden`, OR SVG `clipPath`. Used on all destination, agency, and profile images.
- **Heritage header bar** — rich mahogany (`#371B17`) background, `font-style: italic` "Heritage" text with temple (🏛) icon, profile avatar circle right
- **Rich mahogany rounded pill CTA** — `borderRadius: 999`, `backgroundColor: #371B17`, white text, full-width
- **Radar/spider chart** — two distinct instances: 5-axis Journey Alignment (match screen) + 6-axis Persona DNA (profile screen)
- **DTS Verified mahogany badge** — rich mahogany seal with checkmark, overlaid bottom-centre or top-right of arched images
- **Status badges** — "Active" green pill · "CACHED" cloud+text muted · "VERIFIED" green text badge on expense rows
- **Offline pill** — "● OFFLINE MODE ACTIVE ⬇" small pill, cream background, shown at bottom of splash or top of any screen when disconnected

### Navigation — Per-Context Bottom Bars

The bottom navigation bar labels change depending on the active section. Implement as a context-aware component:

| Screen context | Tab 1 | Tab 2 | Tab 3 | Tab 4 | Tab 5 |
|---|---|---|---|---|---|
| Main (Journeys, Explore, Profile) | Explore | Journeys | Guild | Messages | Profile |
| Agency Directory | Explore Routes | **Agencies** | Concierge | Profile | — (4 tabs) |
| Vibe Room / Chat | Explore | Journey | Peers | **Chat** | Profile |
| Expense Ledger | Explore | Journey | Connect | **Ledger** | Profile |
| Safety Center | Explore | Search | Community | Messages | **Safety** |
| Profile & Settings | Explore | Paths | Community | Archive | **Profile** |

Active tab is always indicated by filled rich mahogany icon + label.

---

## 12. Demo Seed Data

### Users
| Name | Role | Location | Score |
|---|---|---|---|
| Elias Thorne | Curator & Heritage Explorer | — | 14 expeditions, 8.2k pts |
| Julian Thorne | The Global Archivist | London, UK | 94.8 curation score, 42 countries |
| Amina Al-Farsi | Professional Curator | Muscat, Oman | 94% match with Julian |

### Active Trip (Demo)
**Silk Road Expedition · Samarkand to Bukhara**
- Expense entries:
  - Dinner at Old City — Oct 14 — David — $84.20 — Split equally
  - Registan Tour Tickets — Oct 14 — You — $120.00 — Split equally — VERIFIED
  - Private Transfer — Oct 13 — David — $450.00 — Split equally
  - Museum Entry Fee — Oct 13 — You — $15.00 — Individual
- Totals: $1,245.50 group | $622.75 your share | Owe David $180.35

### Journeys Timeline (Nomad's Journey)
1. **Samarkand: The Blue City** — Current Expedition, Offline Access Available
2. **The Turquoise Gates** — Active + CACHED
3. **Varanasi: Eternal City** — Completed Sept 2023, 8 Archive Logs
4. **The High Pamir Pass** — Unlocking Spring 2024 (locked)

### Trips Collection
1. The Royal Rajasthan Route — 12 Days, Jaipur / Jodhpur / Udaipur
2. Kerala Backwaters — 7 Days, Alleppey / Kumarakom
3. Varanasi: The Eternal City — 5 Days, Spiritual Heartland
4. Himalayan Heights — 14 Days, Leh / Ladakh / Spiti

### Agencies
1. **Kashi Journeys** (1984) — Spiritual architecture, Varanasi river expeditions
2. **Nomad Silk Road** (1992) — Central Asian heritage, Registan, Kyzylkum
3. **The Nabataean Guild** (2005) — Desert kingdoms, Middle East spice routes
4. **Abyssinian Heritage** (2011) — Ethiopian Orthodox history, Simien Highlands
5. **The Royal Curator** — 12 UNESCO Partners, North India + Varanasi itineraries

### Safety Center (Demo — Varanasi context)
- Current location: DASHASHWAMEDH GHAT
- Tourist Police: Varanasi Division · 2.4km away
- Heritage Hospital: Emergency Ward · Open 24h
- Emergency contacts: 3 active

---

## 13. Phase 5 Acceptance Criteria

| Module | Minimum for Demo |
|---|---|
| Auth | Email login + logout; error state shown on wrong credentials |
| Splash | Offline pill visible when no connection |
| Explore | Silk Road detail screen renders with sub-destination grid + Heritage Archives |
| Journeys | Timeline with 3 journey cards (Active, Completed, Locked) renders correctly |
| AI Matching | Amina Al-Farsi card renders with 5-axis radar chart + 94% badge |
| Public Profile | Julian Thorne profile with 6-axis DNA radar, achievements, curation score |
| Vibe Room | Real-time messages between 2 sessions; Pinned Priority card visible; Sync Interrupted state works |
| Expense Ledger | 4 demo transactions render; balance card shows owed amount; Settle Up tappable |
| Safety Center | SOS card renders with red text; CALL buttons present; location pill shows |
| Agency Directory | 4 agencies render with DTS badges; The Royal Curator profile opens |
| Profile & Settings | Elias Thorne card; both toggles functional; Sign Out works |
| Navigation | Context-specific bottom nav renders correctly per screen |
| Offline | Journeys and Safety Center accessible in Airplane Mode |

---

## 14. Out of Scope (Phase 5)
- Live payment processing — UI elements only
- Real Emergency Services API — static JSON mock
- Production ML model — weighted cosine-similarity algorithm acceptable
- Agency certification onboarding portal — read-only directory
- Physical-device push notifications — in-app notification banner acceptable

---