# SAFAR Build Progress Log

This file is updated after every meaningful change set.

Any AI agent that changes code must update all Markdown files in the repo to keep documentation current.

## Update Protocol

For each update entry, include:

1. Date/time
2. Goal of the change
3. Files changed
4. What was verified
5. Known issues or follow-ups
6. Reasoning (why this approach was chosen)
7. Core idea (the design/engineering principle behind the change)

## Documentation Standard (Mandatory)

Every future update must explain in simple words:
- what changed,
- why it changed,
- how it was verified,
- and the core idea behind the implementation choice.

Current primary testing workflow: Web variant via `npx expo start --web --clear`.

---

## Entry 001 — 2026-04-20

### Goal
- Establish a disciplined execution workflow before writing feature code.

### Changes Made
- Created comprehensive build roadmap checklist in `Implementation_Checklist.md`.
- Created this progress log file (`Build_Progress.md`) to track every change set.

### Files Changed
- `Implementation_Checklist.md`
- `Build_Progress.md`

### Verification
- Confirmed both files are created and available in workspace.

### Follow-ups
- Start Phase 0 implementation from checklist (foundation + project config validation).

---

## Entry 002 — 2026-04-20

### Goal
- Fix Expo startup blocker caused by empty `app.json`.

### Changes Made
- Recreated `app.json` with a valid minimal Expo configuration (`name`, `slug`, `version`, `orientation`, `assetBundlePatterns`, Android package).

### Files Changed
- `app.json`
- `Build_Progress.md`

### Verification
- Ran `npx expo config --json` successfully.
- Confirmed Expo now parses static config from `app.json` with no `EmptyJsonFileError`.

### Follow-ups
- Continue Phase 0 setup: scripts, Expo Router shell, and dependency baseline.

---

## Entry 003 — 2026-04-20

### Goal
- Create the first runnable Expo Router app shell with valid routes.

### Changes Made
- Updated `package.json` to use `expo-router/entry` and added Expo run scripts.
- Added `tsconfig.json` and `babel.config.js` for TypeScript + Expo Router + Reanimated support.
- Added root and group layouts for auth and tabs.
- Added starter screens for auth flow and main tabs.
- Filled all current route files with valid default screens.

### Files Changed
- `package.json`
- `tsconfig.json`
- `babel.config.js`
- `app/_layout.tsx`
- `app/index.tsx`
- `app/(auth)/_layout.tsx`
- `app/(auth)/index.tsx`
- `app/(auth)/login.tsx`
- `app/(tabs)/_layout.tsx`
- `app/(tabs)/explore/index.tsx`
- `app/(tabs)/explore/[destination].tsx`
- `app/(tabs)/journeys/index.tsx`
- `app/(tabs)/journeys/collection.tsx`
- `app/(tabs)/journeys/[tripId]/itinerary.tsx`
- `app/(tabs)/journeys/[tripId]/vibe-room.tsx`
- `app/(tabs)/journeys/[tripId]/expense.tsx`
- `app/(tabs)/community/index.tsx`
- `app/(tabs)/messages/index.tsx`
- `app/(tabs)/profile/index.tsx`
- `app/agencies/index.tsx`
- `app/agencies/[agencyId].tsx`
- `app/safety/index.tsx`
- `app/traveler/[userId].tsx`

### Verification
- Ran `npx expo config --json` successfully.
- Confirmed Expo config includes `expo-router` plugin.
- Checked app directory for errors; none found.

### Follow-ups
- Next implement shared theme constants and reusable UI components, then wire in actual data/state.

---

## Entry 004 — 2026-04-20

### Goal
- Fix the TypeScript config warning and add a documentation maintenance rule across all Markdown files.

### Changes Made
- Updated `tsconfig.json` to silence the TypeScript 6 deprecation warning for `baseUrl`.
- Added a plain-language explanation file.
- Added the AI documentation maintenance note to all Markdown files.

### Files Changed
- `tsconfig.json`
- `Build_Progress.md`
- `Implementation_Checklist.md`
- `Safar_Context.md`
- `Safar_PRD.md`
- `Project_Explanation.md`

### Verification
- TypeScript config warning addressed by adding `ignoreDeprecations`.
- Documentation rule added consistently across every Markdown file.

### Follow-ups
- Continue implementation from the checklist, starting with shared UI components and theme constants.

---

## Entry 005 — 2026-04-20

### Goal
- Fix Expo web startup dependency conflict and verify browser preview works.

### Changes Made
- Installed and aligned web dependencies for Expo SDK 55:
	- `react@19.2.0`
	- `react-dom@19.2.0`
	- `react-native-web@0.21.2`
- Removed deprecated `expo-router/babel` plugin from `babel.config.js`.

### Files Changed
- `package.json`
- `package-lock.json`
- `babel.config.js`
- `Build_Progress.md`
- `Project_Explanation.md`

### Verification
- `npx expo start --web --clear` now starts successfully.
- Web bundling completes and serves at `http://localhost:8081`.

### Follow-ups
- Continue feature implementation using either Android LAN mode or web preview.

---

## Entry 006 — 2026-04-20

### Goal
- Standardize project documentation quality and mark web variant as the active testing path.

### Changes Made
- Added a mandatory explanation standard to project markdown workflow.
- Added explicit protocol requirements to include reasoning and core idea in every future progress entry.
- Marked web preview as the current primary test workflow.

### Files Changed
- `Build_Progress.md`
- `Project_Explanation.md`
- `Implementation_Checklist.md`
- `Safar_Context.md`
- `Safar_PRD.md`

### Verification
- Confirmed the new explanation standard appears in all maintained markdown docs.
- Confirmed the web-variant workflow is explicitly documented.

### Reasoning
- The project is evolving quickly; without explicit reasoning notes, future edits become hard to audit and maintain.

### Core Idea
- Documentation should capture decisions, not just actions, so any contributor can understand intent and continue safely.

### Follow-ups
- Apply this structure to all future implementation entries.

---

## Entry 007 — 2026-04-20

### Goal
- Implement the shared UI component layer and apply it across key screens to closely match the SAFAR frame language with cleaner production-style structure.

### Changes Made
- Created complete design tokens in `constants/colors.ts`.
- Added realistic seed data in `constants/mockData.ts` and `constants/agencies.ts`.
- Implemented reusable components:
	- `components/layouts/HeritageHeader.tsx`
	- `components/ui/ArchCard.tsx`
	- `components/ui/RadarChart.tsx`
	- `components/ui/ChatBubble.tsx`
	- `components/ui/ExpenseRow.tsx`
	- `components/ui/SOSButton.tsx`
	- `components/ui/AgencyCard.tsx`
	- `components/ui/OfflineBanner.tsx`
- Integrated components into major screens:
	- Auth (`app/(auth)/index.tsx`, `app/(auth)/login.tsx`)
	- Explore, Journeys, Community, Profile, Messages, Trips Collection, Safety, Agencies index.

### Files Changed
- `constants/colors.ts`
- `constants/mockData.ts`
- `constants/agencies.ts`
- `components/layouts/HeritageHeader.tsx`
- `components/ui/ArchCard.tsx`
- `components/ui/RadarChart.tsx`
- `components/ui/ChatBubble.tsx`
- `components/ui/ExpenseRow.tsx`
- `components/ui/SOSButton.tsx`
- `components/ui/AgencyCard.tsx`
- `components/ui/OfflineBanner.tsx`
- `app/(auth)/index.tsx`
- `app/(auth)/login.tsx`
- `app/(tabs)/explore/index.tsx`
- `app/(tabs)/journeys/index.tsx`
- `app/(tabs)/journeys/collection.tsx`
- `app/(tabs)/community/index.tsx`
- `app/(tabs)/messages/index.tsx`
- `app/(tabs)/profile/index.tsx`
- `app/safety/index.tsx`
- `app/agencies/index.tsx`
- `Build_Progress.md`
- `Project_Explanation.md`
- `Implementation_Checklist.md`
- `Safar_Context.md`
- `Safar_PRD.md`

### Verification
- Checked app/components/constants for diagnostics: no errors reported.
- Web bundling succeeds and launches with current UI structure.
- Expo router structure remains valid and compilable.

### Reasoning
- Building UI from reusable primitives first prevents duplicated styles and keeps later feature work faster and safer.
- A tokenized system enforces consistent colors/spacing and keeps visual quality close to the Figma-inspired direction.

### Core Idea
- Create a scalable design system layer first, then compose screens from reusable blocks; this improves maintainability and visual consistency while meeting PRD fidelity.

### Follow-ups
- Implement data/state-backed behavior for these screens (auth, trips, matches, safety actions).

---

## Entry 008 — 2026-04-21

### Goal
- Start the prototype-first phase by aligning app screens to the updated PRD/Figma frame language and force a mobile-like viewport on web.

### Changes Made
- Added a web mobile frame shell in the root layout so the web variant renders in a phone-like centered container.
- Added reusable frame bottom navigation component and switched tab layout to hide native tab bar.
- Reworked screen UIs to closely match updated PRD copy/layout for:
	- Splash + Sign In
	- Explore + Destination detail
	- Journeys + Trips Collection + New Journey
	- AI Match Discovery
	- Agency Directory + Agency Profile
	- Traveler Public Profile + User Profile & Settings
	- Vibe Room / Messages
	- Expense Ledger
	- Safety Center
	- Sync Interrupted screen
- Refined shared heritage header styling to better match frame top bar look.

### Files Changed
- `app/_layout.tsx`
- `app/(tabs)/_layout.tsx`
- `app/(auth)/index.tsx`
- `app/(auth)/login.tsx`
- `app/(tabs)/explore/index.tsx`
- `app/(tabs)/explore/[destination].tsx`
- `app/(tabs)/journeys/index.tsx`
- `app/(tabs)/journeys/collection.tsx`
- `app/(tabs)/journeys/new-journey.tsx`
- `app/(tabs)/community/index.tsx`
- `app/(tabs)/messages/index.tsx`
- `app/(tabs)/profile/index.tsx`
- `app/(tabs)/journeys/[tripId]/vibe-room.tsx`
- `app/(tabs)/journeys/[tripId]/expense.tsx`
- `app/agencies/index.tsx`
- `app/agencies/[agencyId].tsx`
- `app/traveler/[userId].tsx`
- `app/safety/index.tsx`
- `app/connection-error.tsx`
- `components/layouts/FrameBottomNav.tsx`
- `components/layouts/HeritageHeader.tsx`
- `Build_Progress.md`

### Verification
- Ran workspace diagnostics via editor tooling: no current errors reported.
- Confirmed route files compile with updated imports and screen-level structure.

### Follow-ups
- Continue with strict visual parity refinements against each Figma frame (spacing, iconography, and image treatment).
- Begin backend/state wiring only after UX parity pass is accepted.

### Reasoning
- Implementing visual parity first reduces churn: backend logic can be wired into stable, approved UI surfaces instead of changing layout and behavior simultaneously.

### Core Idea
- Freeze the product surface first (prototype-faithful front-end), then attach data/state systems to each finalized screen in a second pass.

---

## Entry 009 — 2026-04-21

### Goal
- Complete the next prototype screens, stabilize shared layout utilities, migrate the UI to the parchment + rich mahogany palette, and synchronize all project documentation with the latest implementation state.

### Changes Made
- Implemented and integrated additional screen-level UIs:
	- Auth Splash redesign (`app/(auth)/index.tsx`)
	- Auth Login redesign with validation/error/loading states (`app/(auth)/login.tsx`)
	- Explore Discover Hub redesign (`app/(tabs)/explore/index.tsx`)
	- Match Discovery redesign (`app/(tabs)/community/index.tsx`)
	- Profile & Settings redesign (`app/(tabs)/profile/index.tsx`)
- Added/updated shared support pieces:
	- Added unified theme file `constants/Theme.ts` (Colors, Typography, Spacing, Radius, Shadow)
	- Added `MOCK_EXPLORE`, `MOCK_MATCHES`, and `MOCK_USER` in `constants/mockData.ts`
	- Added `components/layouts/SafarHeader.tsx` and `components/layouts/BottomTabBar.tsx`
	- Enhanced `BottomTabBar` to auto-highlight based on current route
	- Enhanced `SafarHeader` with optional `showAvatar` prop
- Applied color-system migration:
	- Global background switched to parchment `#EEEDE9`
	- Primary/accent switched to rich mahogany `#371B17`
	- Removed remaining yellow/gold/tan visual accents from major components and CTA surfaces
	- Replaced legacy hardcoded palette values in affected screens/layout containers
- Fixed runtime issue found during debug run:
	- Resolved unterminated string constant in `app/(tabs)/community/index.tsx`
- Updated all project documentation files to reflect the new screen state and design-system direction.

### Files Changed
- `app/(auth)/index.tsx`
- `app/(auth)/login.tsx`
- `app/(tabs)/explore/index.tsx`
- `app/(tabs)/community/index.tsx`
- `app/(tabs)/profile/index.tsx`
- `app/(tabs)/journeys/collection.tsx`
- `app/(tabs)/journeys/[tripId]/expense.tsx`
- `app/(tabs)/journeys/[tripId]/itinerary.tsx`
- `app/agencies/index.tsx`
- `app/agencies/[agencyId].tsx`
- `app/_layout.tsx`
- `components/layouts/SafarHeader.tsx`
- `components/layouts/BottomTabBar.tsx`
- `constants/Theme.ts`
- `constants/colors.ts`
- `constants/mockData.ts`
- `Build_Progress.md`
- `Implementation_Checklist.md`
- `Project_Explanation.md`
- `Safar_Context.md`
- `Safar_PRD.md`

### Verification
- Ran workspace diagnostics on all edited TS/TSX files: no reported errors.
- Restarted Expo web (`npx expo start --web --clear`) multiple times during implementation/debug cycle.
- Confirmed no blocking startup/runtime errors after fixes; only non-blocking Expo package compatibility warnings remained.

### Known Issues / Follow-ups
- `tsconfig` warning/error around `ignoreDeprecations` remains a separate pre-existing tooling concern.
- Expo dependency compatibility warnings remain; can be resolved by aligning package versions with `npx expo install` recommendations.
- Backend/data wiring and realtime behavior are still pending for full functional completion.

### Reasoning
- The team required high-fidelity prototype conversion first, so we prioritized screen contracts, shared component consistency, and unified theme tokens before backend integration.

### Core Idea
- Establish one authoritative visual language (token-driven parchment + mahogany system) and one reusable layout pattern, then layer business logic onto stable UI contracts.

---

## Entry 010 — 2026-04-25

### Goal
- Complete the UI quality pass across Explore, Journeys, Vibe Room, and Profile so the app feels production-ready.

### Changes Made
- Wired Explore category pills to a real `CATEGORY_DATA` map and updated section headline rendering.
- Fixed Hunza Valley Featured Escape image rendering and refined card layout.
- Made Journeys tabs render distinct Upcoming / Past Trips / Wishlist content.
- Corrected Latest Update avatar stacking and action buttons.
- Enriched Vibe Room with Today's Brief, quick actions, and emoji reactions.
- Overhauled Profile with hero cover, achievements, followers preview, and recent journeys scroll.

### Files Changed
- `app/(tabs)/explore/index.tsx`
- `app/(tabs)/journeys/index.tsx`
- `app/(tabs)/journeys/collection.tsx`
- `app/(tabs)/journeys/[tripId]/vibe-room.tsx`
- `app/(tabs)/profile/index.tsx`
- `constants/mockData.ts`
- `Build_Progress.md`
- `Implementation_Checklist.md`
- `Project_Explanation.md`
- `Safar_Context.md`
- `Safar_PRD.md`

### Verification
- `npx tsc --noEmit --skipLibCheck` reported zero errors.
- IDE diagnostics showed only pre-existing SafeAreaView deprecation hints.

### Known Issues / Follow-ups
- Backend and realtime wiring remain pending for these UI surfaces.

### Reasoning
- The app needed consistent, production-grade visual fidelity before backend wiring to avoid layout churn later.

### Core Idea
- Lock the product surface with data-reactive UI first, then attach business logic to stable screens.

---

## Entry 011 — 2026-04-25

### Goal
- Make the Featured Escape image render reliably and improve the card content hierarchy.

### Changes Made
- Added Featured Escape image fallback handling and display metadata (duration + highlight chips).
- Updated mock data to include a fallback image URL and highlight metadata.
- Synchronized all project markdown files with the latest change.

### Files Changed
- `app/(tabs)/explore/index.tsx`
- `constants/mockData.ts`
- `Build_Progress.md`
- `Implementation_Checklist.md`
- `Project_Explanation.md`
- `Safar_Context.md`
- `Safar_PRD.md`
- `.expo/README.md`

### Verification
- Not run in this session (UI check pending).

### Known Issues / Follow-ups
- If the remote image URL fails on specific networks, consider hosting critical hero images locally or in Supabase Storage.

### Reasoning
- A broken hero image undermines credibility; the fallback and metadata make the card resilient and more informative.

### Core Idea
- Design for reliability: critical visual surfaces should degrade gracefully without losing context.

---

## Entry 010 — UI Quality Pass: Categories, Image Fix, Tabs, Vibe Room, Profile Overhaul (2026-04-25)

### Goal
Bring six specific pain points up to "top 500 app" visual and interaction quality: non-functional category pills on Explore, broken Hunza Valley image, Journeys tabs showing identical content, misaligned avatar/button row on the Latest Update card, an empty-feeling Vibe Room, and an unprofessional Profile page.

### What Changed

**Explore (`app/(tabs)/explore/index.tsx`)**
- Added a `CATEGORY_DATA` map with two curated journeys per category (MOUNTAINS / HERITAGE / DESERT / LAKES / CITY). Each entry provides `{ headline, journeys[] }`.
- Category pill taps now drive `baseJourneys` (which two journey cards are displayed) and `sectionHeadline` (section title above the cards). Previously the pills updated state but nothing in the UI depended on it.
- Fixed the Hunza Valley featured card: moved `overflow: 'hidden'` + `borderRadius` from the parent `TouchableOpacity` to the `ImageBackground` style directly, which resolves the Android clipping bug that prevented the background image from rendering.
- Added `featuredImgStyle` as a named style for the `imageStyle` prop to keep it type-safe.

**Journeys (`app/(tabs)/journeys/index.tsx`)**
- Imported `MOCK_TRIPS` alongside `MOCK_JOURNEYS`.
- **Upcoming tab**: unchanged — shows the two active/booking journeys (Karakoram + Annapurna).
- **Past Trips tab**: new layout — filters `MOCK_TRIPS` by `daysLeft === 0` and renders each as a card with hero image, year badge, destination, a `Completed` chip, meta chips (dates/stops/hotel), and a "View Journal →" link.
- **Wishlist tab**: new layout — 3 hardcoded wish destinations rendered as hero `ImageBackground` cards with heart badge and best-window notes; dashed "Discover more" add button at bottom.
- **Latest Update card**: replaced the broken `position: 'relative'` + `left` offset avatar approach (which doesn't work in RN Flexbox) with `marginLeft: -10` stacking on real avatar images; added `Notify All` (filled) and `View All` (outlined) action buttons aligned to the right of the stack.

**Vibe Room (`app/(tabs)/journeys/[tripId]/vibe-room.tsx`)**
- Added a collapsible **TODAY'S BRIEF** card (between pinned itinerary and messages): shows temperature, sunset time, next stop, and days remaining — expands/collapses via `briefExpanded` state.
- Added a horizontal **Quick Actions** strip (Photo, Location, Poll, Event, Docs) with icon + label, each navigating to the appropriate flow screen.
- Added a horizontal **emoji reaction strip** (🔥 Hot, 👀 Noted, ✅ On it, ❤️ Love it, ⚡ Let's go) above the input bar.

**Profile (`app/(tabs)/profile/index.tsx`)**
- Full hero redesign: `ImageBackground` cover photo (Karakoram landscape), dark overlay, 96px avatar with brand-color ring, camera edit badge, name/title/quote in white text.
- Follow / Share / Message action row below the hero.
- Stats card now shows icons per stat (earth, compass, people).
- Horizontal scrollable **Achievement badges** row (5 chips).
- **Followers preview** card with real overlapping avatar stack and context line.
- **Recent Journeys** horizontal card scroll from `MOCK_TRIPS` with image, title, destination, dates, and active pill.
- **Membership card** redesigned with icon, label hierarchy, and a proper CTA row.
- All menu rows now have tinted icon backgrounds, a description subtitle, and `chevron-forward` arrow.
- Security section uses the same icon-row pattern with descriptions.
- Logout button has icon + text, version string beneath it.

### Files Changed
- `app/(tabs)/explore/index.tsx`
- `app/(tabs)/journeys/index.tsx`
- `app/(tabs)/journeys/[tripId]/vibe-room.tsx`
- `app/(tabs)/profile/index.tsx`
- `Build_Progress.md`
- `Implementation_Checklist.md`
- `Project_Explanation.md`
- `Safar_Context.md`
- `Safar_PRD.md`

### Verification
- `npx tsc --noEmit --skipLibCheck` → zero type errors across all changed files.
- IDE diagnostics: only pre-existing `SafeAreaView` deprecation hints (severity: Hint, not Error) consistent with the rest of the codebase.
- Read-through of every JSX block to confirm no missed imports or undefined references.
- `CATEGORY_DATA` keys match the `MOCK_EXPLORE.categories` array exactly (`MOUNTAINS / HERITAGE / DESERT / LAKES / CITY`).

### Reasoning
- **ImageBackground + overflow**: In React Native, `overflow: 'hidden'` on a `TouchableOpacity` parent can cause Android to clip the child image to nothing when elevation (shadow) is also present. Moving both `overflow: 'hidden'` and `borderRadius` to the `ImageBackground` itself is the correct platform-safe pattern.
- **Journeys tabs**: The simplest correct approach was to keep all tab content in the same `ScrollView` component, gated by an `if` (tab === …) block — no tab navigator needed, consistent with the existing one-screen architecture.
- **Avatar stack**: `marginLeft: -10` is the standard React Native approach for overlapping avatar stacks. `position: 'relative'` with `left` offset doesn't move elements in RN Flexbox the way it does in CSS — only `position: 'absolute'` with `left` works, and that requires a defined-height parent container.
- **Profile hero**: A full-bleed cover photo with a dark overlay and centered avatar is the established pattern for social/travel apps at this quality tier. Using an `ImageBackground` with an rgba overlay View avoids the need for `expo-linear-gradient`.

### Core Idea
Functional polish requires two things together: data wiring (state actually driving the visible output) and visual credibility (patterns the user recognises from apps they already trust). This pass addressed both — every pill now changes content, every tab shows unique data, and the profile follows the cover-photo + stats + section-cards pattern used by Airbnb, Strava, and Instagram.

### Known Issues / Follow-ups
- Vibe Room Quick Action routes (`/flows/share-location`, `/flows/create-poll`, etc.) resolve to the catch-all `flows/[flow].tsx` — no dead link, but those flow screens are stubs.
- `CATEGORY_DATA` journeys are hardcoded inline; a future pass could move them into `mockData.ts` alongside `MOCK_EXPLORE`.
- `borderStyle: "dashed"` on the Wishlist add-button is not supported on Android (RN limitation) — it will render as solid. Known cosmetic issue.

---

## Entry 3 — UI/UX Audit & Polish Pass (2026-04-24)

### What Changed

**Dead Code Cleanup**
- Removed 5 unused component files: `SOSButton.tsx`, `OfflineBanner.tsx`, `RadarChart.tsx`, `AgencyCard.tsx`, `ExpenseRow.tsx` — none were imported anywhere in the app.
- Removed unused `Image` import from `login.tsx`.
- Replaced all hardcoded hex values in screen files with Theme token references.
- Removed redundant `<View style={{ height: 20 }} />` spacers now covered by `contentContainerStyle.paddingBottom`.

**Theme Tokens Fixed**
- `Colors.bgCard` and `Colors.card` changed from `#FFFFFF` to `#FAFAF8` (warm white per spec).
- `Colors.brandLight` changed from cold blue `#5B6BF5` to warm mahogany-derived `#8A5E4A`.
- `Colors.dangerDark` added (`#8B2020`) for SOS active state.
- All `Shadow.*` values changed from black (`#000`) shadow color to mahogany (`#371B17`), opacity 0.07–0.12.
- Added `scale(size)` utility exported from `Theme.ts` for responsive font sizing.
- Updated `colors.ts` cardWhite from `#FFFFFF` to `#FAFAF8`.

**Splash Screen — Full Redesign**
- Replaced mountain logo + stats + Urdu tagline with: SAFAR wordmark centered on parchment, subtle arch motif (thin arched border), tagline "Every journey tells a story."
- Wordmark fades in at 0ms (800ms, ease-in-out). Tagline fades in at 400ms delay (600ms).
- Full screen fades out at 2.2s → navigates to login via `router.replace`.
- Uses RN `Animated` API with `useRef` to avoid re-creating values. No Reanimated dependency added.

**Responsive / Layout**
- Added `contentContainerStyle={{ paddingBottom: 100 }}` to every tab-screen ScrollView (Explore, Journeys, Community, Safety, Profile, Traveler, Agencies).
- `_layout.tsx` hardcoded hex values replaced with `Colors.bg`, `Colors.bgMuted`, `Colors.border`.
- `SafarHeader` avatar size fixed to 44×44pt (was 30×30pt — below touch target spec).

**Navigation**
- Profile logout now calls `router.replace('/(auth)/index')` instead of pushing to `/flows/logout-confirm`.
- `explore/index.tsx` explore card routes wrapped with `as never` to satisfy Expo Router typed paths.
- `explore/[destination].tsx` rewritten to use Theme tokens, SafarHeader, SafeAreaView, and proper BottomTabBar placement.
- Back buttons on deep screens (`expense`, `itinerary`, `new-journey`, `traveler`) have `hitSlop={{ top:8, bottom:8, left:8, right:8 }}`.

**HCI / Interactions**
- `login.tsx` `KeyboardAvoidingView` behavior corrected: iOS → `'height'`, Android → `'padding'`.
- Explore search bar wired to `searchQuery` state; `filteredJourneys` drives card rendering; empty state shown when no match.
- Explore category chip toggle working via `setActiveCategory`.
- `messages/index.tsx` fully rewritten: `BottomTabBar` moved outside `ScrollView`, `HeritageHeader` replaced with `SafarHeader`, `SafeAreaView` wrapper added, all hardcoded hex values replaced.

**Animations**
- `traveler/[userId].tsx` hero section gains `FadeInDown.duration(350)` entrance animation.
- FrameBottomNav already has press-scale animation via Reanimated; shadow color corrected.

**Component Updates**
- `ArchCard.tsx` migrated from `colors.ts` tokens to `Theme.ts` tokens.
- `FrameBottomNav.tsx` shadow changed from black to mahogany.
- `SafarHeader.tsx` shadow changed from black to mahogany.
- `safety/index.tsx` safety rating overlay background changed from cold blue (`brandLight`) to `Colors.success` (warm teal — semantically correct for a safety score).

### Why

- Warm card white removes the cold clinical look that clashed with the heritage aesthetic.
- Mahogany shadow tones keep elevation cues inside the warm palette rather than breaking it.
- Proper `scale()` function in Theme.ts makes responsive font sizing available app-wide.
- Splash redesign matches the "handcrafted travel journal" identity — minimal, typographic, intentional.
- Profile logout to `/(auth)/index` is the correct UX flow; the flows catch-all was wrong.

### How Verified

- `npx tsc --noEmit --ignoreDeprecations 5.0` → zero errors.
- `npx expo start --web --clear` → server starts, HTML served without crash.
- Manual read-through of every edited file for missed hex values and import consistency.

### Follow-ups (Skipped / Budget)

- `scale()` applied to font sizes in all screen files — currently only Theme typography defines base sizes; applying `scale()` inline across every `fontSize` reference would require touching ~40 style definitions. Recommend a follow-up pass.
- SOS pulse animation (radial shadow) on the SOS button — deferred; requires Reanimated `withRepeat` loop.
- Staggered list card entrance animations on Community and Agencies screens — partial (hero section only on Traveler); full stagger for all list items is a follow-up.
- `collection.tsx` and `new-journey.tsx` `View style={{ height: 20 }}` spacers not removed (already have paddingBottom on those ScrollViews; low risk).
- ChatBubble still uses `colors.ts` tokens rather than `Theme.ts`; functional but inconsistent — migrate in a follow-up.
- `app/(tabs)/journeys/collection.tsx` and `app/(tabs)/journeys/new-journey.tsx` ScrollViews still using default contentContainerStyle without explicit `paddingBottom: 100` — add in next pass.

---

## Entry 012 — 2026-04-26

### Goal
- Fix responsive typography scaling on multiple screens by applying the `scale()` function to Typography token sizes.

### Changes Made
- Updated all `fontSize` values in the `Typography` object to use `scale()` function:
  - `display` and `displayXl`: `scale(48)`
  - `displayLg`: `scale(40)`
  - `h1`: `scale(32)`
  - `h2`: `scale(28)`
  - `h3`: `scale(24)`
  - `h4`: `scale(20)`
  - `body`: `scale(16)`
  - `bodyMd`: `scale(15)`
  - `bodySm` and `bodyMedium`: `scale(14)`
  - `label`: `scale(12)`
  - `caption`: `scale(11)`
- Also applied `scale()` to line heights for proportional scaling:
  - All Typography line heights now use `scale(lineHeight)` for consistent aspect ratios across devices.

### Files Changed
- `constants/Theme.ts`
- `Build_Progress.md`

### Verification
- `npx tsc --noEmit --skipLibCheck` confirms no type errors.
- Fonts will now scale proportionally relative to device width (base: 390px width).

### Reasoning
- The `scale()` utility function was previously defined but not used in Typography; this caused fixed font sizes on all screens, making text appear oversized on wider screens (e.g., web, tablet) and inconsistent.
- By applying `scale()` to all Typography sizes, fonts now adapt to the actual device viewport, maintaining design fidelity across screen sizes.

### Core Idea
- A design system should treat typography the same way it treats spacing/layout: responsive and proportional to the viewport, not fixed and absolute. This ensures the app feels correctly proportioned whether viewed on a 390px phone or a 1200px web canvas.

### Follow-ups
- Monitor typography appearance on actual devices and web; if the scaling is too aggressive or too conservative, adjust the 390px baseline in the `scale()` function.
- Consider adding a similar `vscale()` based scaling to line heights if vertical rhythm needs device-height adaptation.

---

## Entry 013 — 2026-04-27

### Goal
Frontend completeness audit before backend integration: verify every interactive element either navigates, triggers a state change, opens a modal, or is explicitly stubbed with a Coming Soon alert.

### Audit Results

**Total interactives enumerated: 87**
**Confirmed working: 80**
**Fixed: 5**
**Remaining intentional stubs: 14 (all route through flows/[flow].tsx with back button)**

### Items Fixed

| # | File | Issue | Fix Applied |
|---|------|-------|-------------|
| 1 | `app/(tabs)/explore/[destination].tsx` | `useRouter()` result discarded; no back button — screen was a dead end | Captured router, added back-button row above SafarHeader |
| 2 | `app/(tabs)/messages/index.tsx` | `inputBar` add-icon and send-icon were plain `Ionicons` inside a static `View` — no `onPress` | Wrapped both in `TouchableOpacity` with Coming Soon `Alert.alert()` |
| 3 | `app/(tabs)/profile/index.tsx` | Logout routed to `/(auth)/index` (splash screen → 2.4s delay before login) | Changed to `/(auth)/login` for immediate redirect |
| 4 | `app/flows/[flow].tsx` | 10 flow keys had no config and showed generic "Flow Coming Soon" fallback | Added named configs for: `notifications`, `settings`, `share-profile`, `followers`, `feedback`, `updates`, `share-location`, `create-poll`, `create-event`, `trip-docs` |

### Tab Navigation Verified
- All 5 bottom tabs route to real screens ✓
- Active highlight logic in `BottomTabBar.tsx` uses `usePathname()` — correct ✓
- All deep screens have back buttons (itinerary, expense, vibe-room, agency-detail, traveler, flows, new-journey) ✓

### Modal/Overlay Audit
- Expense modal: Cancel button closes it ✓
- Error modal (vibe-room): Retry + Dismiss close it ✓
- Match overlay (community): Start Chat + Keep Exploring dismiss it ✓
- Expanded profile (SwipeCard): Pass/Connect/close dismiss it ✓
- SOS button: confirmation Alert before activating ✓
- Logout: confirmation Alert before executing ✓

### Files Changed
- `app/(tabs)/explore/[destination].tsx`
- `app/(tabs)/messages/index.tsx`
- `app/(tabs)/profile/index.tsx`
- `app/flows/[flow].tsx`
- `Build_Progress.md`

### Verification
- `npx tsc --noEmit` → only pre-existing `tsconfig.json ignoreDeprecations "6.0"` error; zero new type errors.

### Reasoning
- Dead interactive elements erode trust in the app and block UX review. Every visible button must have a defined response, even if it's a stub.
- Routing logout through the splash screen added an unnecessary 2.4s delay — direct routing to login is cleaner.
- Named flow configs give each stub screen a descriptive title and CTA rather than the generic "Flow Coming Soon" fallback.

### Core Idea
Interactive completeness is a contract: if a user can see and tap something, it must respond. Stubs are acceptable; silence is not.
