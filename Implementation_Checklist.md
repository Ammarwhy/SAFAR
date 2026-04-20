# SAFAR Implementation Checklist (Step-by-Step)

## Working Mode

- Build in small, testable slices.
- Never move to the next slice until the current slice runs without runtime/type errors.
- After every change set, update `Build_Progress.md` with:
  - What changed
  - Files touched
  - Verification done
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

- [ ] `components/layouts/HeritageHeader.tsx`
- [ ] `components/ui/ArchCard.tsx`
- [ ] `components/ui/RadarChart.tsx`
- [ ] `components/ui/ChatBubble.tsx`
- [ ] `components/ui/ExpenseRow.tsx`
- [ ] `components/ui/SOSButton.tsx`
- [ ] `components/ui/AgencyCard.tsx`
- [ ] `components/ui/OfflineBanner.tsx`

## Phase 4 — Navigation + Screen Scaffolds

- [ ] Auth screens: splash/login
- [ ] Tabs scaffold: explore, journeys, community, messages, profile
- [ ] Deep screens: traveler profile, agency profile, safety center
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
- [ ] Candidate card + compatibility percentage
- [ ] Radar comparison chart
- [ ] Connect/Skip actions
- [ ] Traveler public profile navigation

### 5D Journeys + Itinerary
- [ ] Journeys feed hero + status cards
- [ ] Trips collection with cached labels
- [ ] Trip itinerary details and structure

### 5E Vibe Room (Realtime)
- [ ] Room message fetch/send via Supabase
- [ ] Realtime subscription + cleanup
- [ ] Pinned itinerary card
- [ ] Poll create/vote
- [ ] Sync interrupted error state + retry

### 5F Expense Ledger
- [ ] Expense list row rendering
- [ ] Add expense flow
- [ ] Total + user share cards
- [ ] Balance/settle up summary
- [ ] Offline sync indicator

### 5G Safety Center
- [ ] SOS button with confirmation
- [ ] Emergency contact list
- [ ] Local authority list + call actions
- [ ] Location state text + map section
- [ ] Offline safety kit behavior

### 5H Agency Directory
- [ ] Agency list with verified badges
- [ ] Agency details with itinerary cards
- [ ] Contact CTAs and map section

### 5I Profile & Settings
- [ ] Stats + persona chart
- [ ] Preferences toggles
- [ ] Privacy/security section
- [ ] Sign-out flow

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
