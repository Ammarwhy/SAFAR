# SAFAR Implementation Checklist (Step-by-Step)

## Working Mode

Any AI agent that changes code must update all Markdown files in the repo to keep documentation current.

All markdown updates must include reasoning, verification, and core idea—not only a list of edits.

Primary active testing mode: web variant with `npx expo start --web --clear`.

Latest completed UI milestone: Entry 009 in `Build_Progress.md`.

- Build in small, testable slices.
- Never move to the next slice until the current slice runs without runtime/type errors.
- After every change set, update `Build_Progress.md` with:
  - What changed
  - Why this approach was chosen
  - Files touched
  - Verification done
  - Core idea behind the change
  - Open issues/blockers

## Phase 0 — Project Foundation (Start Here)

- [ ] Initialize/verify Expo app config and scripts
- [ ] Add TypeScript, Expo Router, Zustand, Supabase, AsyncStorage, NetInfo, Maps deps
- [ ] Add environment variable template (`.env.example`)
- [ ] Configure app shell layout and route groups
- [ ] Set up design tokens in `constants/colors.ts`
- [ ] Add global reusable layout/header scaffolding
- [ ] Add strict lint/typecheck scripts
- [ ] Smoke test app boot on simulator + Expo Go

## Phase 1 — Data & Core Logic

- [ ] Implement `supabase/schema.sql` from PRD entities
- [ ] Implement `supabase/seed.sql` with demo-safe seed data
- [ ] Implement `lib/supabase.ts` client with env validation
- [ ] Implement `lib/matchEngine.ts` using weighted scoring spec
- [ ] Implement `lib/expenseCalc.ts` with split/balance settlement logic
- [ ] Implement `lib/offlineStore.ts` cache wrappers with safe fallbacks
- [ ] Unit test pure logic modules (`matchEngine`, `expenseCalc`)

## Phase 2 — Stores (State Layer)

- [ ] `stores/authStore.ts` (session, login/logout, loading/error)
- [ ] `stores/tripStore.ts` (trip list, active trip, itinerary cache)
- [ ] `stores/chatStore.ts` (room messages, queue, poll state, reconnect)
- [ ] `stores/safetyStore.ts` (SOS state, contacts, location flags)
- [ ] Add persist strategy for offline-safe state where needed

## Phase 3 — Shared UI Components

- [x] `components/layouts/HeritageHeader.tsx`
- [x] `components/ui/ArchCard.tsx`
- [x] `components/ui/RadarChart.tsx`
- [x] `components/ui/ChatBubble.tsx`
- [x] `components/ui/ExpenseRow.tsx`
- [x] `components/ui/SOSButton.tsx`
- [x] `components/ui/AgencyCard.tsx`
- [x] `components/ui/OfflineBanner.tsx`

## Phase 4 — Navigation + Screen Scaffolds

- [x] Auth screens: splash/login
- [x] Tabs scaffold: explore, journeys, community, messages, profile
- [x] Deep screens: traveler profile, agency profile, safety center
- [ ] Route params and fallback handling for dynamic routes

## Phase 5 — Feature Delivery (PRD Critical Path)

### 5A Authentication
- [ ] Email/password login
- [ ] Session persistence and logout
- [ ] Login error state UI

### 5B Explore + Destination Detail
- [ ] Destination list cards with filters/search
- [ ] Destination detail with archives section

### 5C AI Match Discovery
- [x] Candidate card + compatibility percentage
- [x] Radar comparison chart (visual placeholder layout)
- [x] Connect/Skip actions (UI buttons)
- [ ] Traveler public profile navigation

### 5D Journeys + Itinerary
- [x] Journeys feed hero + status cards
- [x] Trips collection with cached labels
- [ ] Trip itinerary details and structure

### 5E Vibe Room (Realtime)
- [ ] Room message fetch/send via Supabase
- [ ] Realtime subscription + cleanup
- [x] Pinned itinerary card
- [ ] Poll create/vote
- [x] Sync interrupted error state + retry (UI)

### 5F Expense Ledger
- [x] Expense list row rendering
- [ ] Add expense flow
- [x] Total + user share cards
- [x] Balance/settle up summary
- [x] Offline sync indicator

### 5G Safety Center
- [x] SOS button with confirmation (UI)
- [x] Emergency contact list (UI)
- [x] Local authority list + call actions (UI)
- [x] Location state text + map section (UI)
- [x] Offline safety kit behavior (UI)

### 5H Agency Directory
- [x] Agency list with verified badges
- [x] Agency details with itinerary cards
- [x] Contact CTAs and map section (profile CTA area)

### 5I Profile & Settings
- [x] Stats + persona chart (visual section)
- [x] Preferences toggles (visual section)
- [x] Privacy/security section
- [x] Sign-out flow (UI action)

## Latest Notes (2026-04-21)

- What changed: Implemented additional core screens (Splash, Login, Explore, Matches, Profile), added shared `SafarHeader` + `BottomTabBar`, expanded mock data, and migrated major UI surfaces to parchment (`#EEEDE9`) + rich mahogany (`#371B17`).
- Why it changed: We needed prototype-faithful visuals and one unified palette system before wiring backend state.
- How verified: Diagnostics were run on edited files with no reported errors; Expo web startup was tested after fixes with no blocking runtime issues.
- Core idea: Keep the interface token-driven and component-first so future backend/realtime work plugs into a stable, consistent visual contract.

## Phase 6 — Offline & Reliability Hardening

- [ ] NetInfo-driven online/offline transitions
- [ ] Queue unsent chat and ledger writes
- [ ] Re-sync logic on reconnect
- [ ] Guard against null/invalid values (especially expenses)
- [ ] Add empty/error/loading states on all major screens

## Phase 7 — QA & Demo Readiness

- [ ] Test script: login → match → chat → expense → SOS
- [ ] Verify all target screens render without crash
- [ ] Run typecheck/lint and fix blocking issues
- [ ] Verify iOS + Android behavior (navigation, fonts, map)
- [ ] Freeze scope to PRD Phase 5 acceptance criteria

## Definition of Done Per Change

- [ ] Feature works in app without crash
- [ ] No new type/lint errors introduced
- [ ] `Build_Progress.md` updated
- [ ] Any known limitation explicitly logged
