# SAFAR Implementation Checklist (Step-by-Step)

## Working Mode

Any AI agent that changes code must update all Markdown files in the repo to keep documentation current.

All markdown updates must include reasoning, verification, and core idea—not only a list of edits.

Primary active testing mode: web variant with `npx expo start --web --clear`.

Latest completed UI milestone: Entry 018 in `Build_Progress.md`.

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

- [x] Implement `supabase/schema.sql` from PRD entities
- [ ] Implement `supabase/seed.sql` with demo-safe seed data
- [x] Implement `lib/supabase.ts` client with env validation
- [ ] Implement `lib/matchEngine.ts` using weighted scoring spec
- [ ] Implement `lib/expenseCalc.ts` with split/balance settlement logic
- [ ] Implement `lib/offlineStore.ts` cache wrappers with safe fallbacks
- [ ] Unit test pure logic modules (`matchEngine`, `expenseCalc`)

## Phase 2 — Stores (State Layer)

- [x] `stores/authStore.ts` (session, login/logout, loading/error)
- [x] `stores/tripStore.ts` (newTrips + wishlist; addTrip, addToWishlist, removeFromWishlist, isWishlisted)
- [ ] `stores/chatStore.ts` (room messages, queue, poll state, reconnect)
- [ ] `stores/safetyStore.ts` (SOS state, contacts, location flags)
- [x] `stores/profileStore.ts` (name, bio, travelStyles, languages; setProfile)
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
- [x] Email/password login (F04 — login.tsx with inline validation + loading state)
- [x] Login CTA disabled until both fields non-empty (`canSubmit` flag + opacity 0.45)
- [x] Login uses only `Colors.*` / `Typography.*` tokens — no raw hex or fontSize
- [x] Root index redirects to `/(auth)/login` directly (not ambiguous group root `/(auth)`) — Entry 016 fix
- [x] Multi-role registration (F01/F41 — register.tsx with traveler/agency toggle)
- [x] Forgot password flow (F03 — forgot-password.tsx with email→loading→success)
- [x] Session persistence and logout (F46 — clearAuthState + Alert confirmation)
- [x] Login error state UI (inline field-level errors)

### 5B Explore + Destination Detail
- [x] Destination list cards with category filters/search (CATEGORY_DATA drives content per pill) (F05)
- [x] Featured escape hero card with working image display (F06)
- [x] Destination detail: hero image, region/duration/difficulty chips, highlights, best months, cost estimate, agency cards, Save to Wishlist (F06)
- [x] `MOCK_DESTINATIONS` with 3 Pakistan entries (hunza-valley, swat-valley, fairy-meadows)
- [x] Save to wishlist from explore (F07 — tripStore.addToWishlist)

### 5C AI Match Discovery
- [x] Candidate card + compatibility percentage
- [x] Radar comparison chart (visual placeholder layout)
- [x] Connect/Skip actions (UI buttons)
- [ ] Traveler public profile navigation

### 5D Journeys + Itinerary
- [x] Journeys feed hero + status cards (F15)
- [x] Tabs show distinct content: Upcoming (newTrips from store + mock), Past Trips, Wishlist (F15/F17)
- [x] New Journey form writes to tripStore (F14)
- [x] New Journey back button uses `canGoBack()` guard with `router.replace('/(tabs)/journeys')` fallback; hitSlop 12 on all sides — Entry 016 fix
- [x] Wishlist tab empty state with icon + message (F17)
- [x] Latest Update card: overlapping avatar stack + Notify All / View All action buttons
- [x] Trips collection with cached labels
- [x] Itinerary timeline view with links to Expense + Vibe Room (F16)
- [ ] Itinerary builder: add/edit stops (F13 — currently read-only)

### 5E Vibe Room (Realtime)
- [ ] Room message fetch/send via Supabase
- [ ] Realtime subscription + cleanup
- [x] Pinned itinerary card
- [x] Today's Brief collapsible card (temperature, sunset, next stop, days left)
- [x] Quick Actions strip (Photo, Location, Poll, Event, Docs)
- [x] Emoji reaction strip above input
- [x] Poll UI (vote UI rendered from mock message data)
- [x] Sync interrupted error state + retry (UI)
- [x] Back button 44×44 with `hitSlop` (Issue 4 fix)

### 5F Expense Ledger
- [x] Expense list row rendering (F28)
- [x] Add expense modal (F27 — title/amount/category/paidBy/splitType; loading+disabled; validation)
- [x] Total + user share cards (F28)
- [x] Balance/settle up summary with Who Owes Whom section (F30)
- [x] Settle Up confirmation alert (destructive action pattern) (F30)
- [x] Offline banner placement (F32)

### 5G Safety Center
- [x] SOS button with confirmation (UI)
- [x] Emergency contact list (UI)
- [x] Local authority list + call actions (UI)
- [x] Location state text + map section (UI)
- [x] Offline safety kit behavior (UI)
- [x] Back button with `hitSlop` — replaced `SafarHeader` with custom header row (Issue 4 fix)

### 5H Agency Directory
- [x] Agency list with verified badges (F22, F42)
- [x] Agency details with itinerary cards (F23)
- [x] Real email + call via Linking.openURL (F33)
- [x] Cost comparison table — Agency vs DIY (F40)
- [x] Agency booking flow stub (F24 — flows/agency-booking with date/traveler fields)

### 5I Profile & Settings
- [x] Hero section: cover photo, large avatar with ring, name from profileStore, bio from profileStore (F43)
- [x] Edit Profile button routes to /(tabs)/profile/edit (F44)
- [x] Edit profile form: name/bio/travel styles/languages with profileStore (F44)
- [x] Settings gear routes to /settings (F45)
- [x] Settings screen: language selector, display switches, connected accounts (F45)
- [x] Settings all buttons fully wired: Personal Info → profile/edit, Notifications → /notifications-settings, Feedback → /feedback, Privacy → Linking.openURL, 2FA/FaceID toggles with Alert confirm (Issue 2/3 fix)
- [x] `/notifications-settings` screen with 5 toggle rows (F45 sub-feature)
- [x] `/feedback` screen with multiline input, char count, loading state (F45 sub-feature)
- [x] Stats card with icons (countries, expeditions, followers)
- [x] Achievement badges horizontal scroll
- [x] Followers preview with avatar stack
- [x] Recent Journeys horizontal card scroll (from MOCK_TRIPS)
- [x] Membership / verification CTA card
- [x] Account preferences, security toggles, support sections — all with icon backgrounds + descriptions
- [x] Sign-out with confirmation alert → clearAuthState → /(auth)/login (F46)

### 5J Community + Swipe
- [x] Swipe deck with gesture detection and card animation (F08)
- [x] Match overlay with dismiss + keep exploring (F08)
- [x] X = `triggerSwipeLeft()` (no alert), checkmark = Alert "Connected!" + swipeRight, star = Alert "Super Liked!" + swipeRight (Issue 6 fix)
- [x] All `fontSize: scale(N)` replaced with `Typography.*` tokens in community/index.tsx and SwipeCard.tsx (Issue 6 fix)
- [x] Raw hex colors in SwipeCard.tsx replaced with `Colors.*` tokens

## Latest Notes (2026-04-27)

- What changed: Full Pass 1–7 feature sweep + 6-issue bug-fix pass + 2 navigation regressions fixed (Entry 016). Root redirect now goes to `/(auth)/login` explicitly; New Journey back button uses `canGoBack()` guard.
- Why it changed: Auth gate must always be the entry point; every screen must have a working escape route regardless of navigation history.
- How verified: `npx tsc --noEmit` passes with only the pre-existing tsconfig ignoreDeprecations error (intentionally kept).
- Core idea: Every feature that touches cross-screen state belongs in a Zustand store; everything else stays in component `useState`. Stubs must always be reachable and respond — never silently missing.

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
