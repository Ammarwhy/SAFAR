# SAFAR Project Explanation

Any AI agent that changes code must update all Markdown files in the repo to keep documentation current.

Every change explanation must clearly include: what was changed, why it was changed, how it was verified, and the core idea behind it.

Current primary testing mode is the web variant: `npx expo start --web --clear`.

Latest update reference: Entry 010 in `Build_Progress.md`.

## Simple Summary

SAFAR is a mobile app for travel in Pakistan.

It helps with:
- finding travel partners,
- chatting in a group trip room,
- splitting trip expenses,
- using a safety screen for emergencies,
- and browsing verified travel agencies.

## What Changed So Far

- Fixed the Expo config so the app can start.
- Set up the app navigation structure.
- Added starter screens for the main tabs.
- Added the first version of the development checklist.
- Added a change log so every update is recorded.
- Fixed web preview dependencies (`react-dom` + `react-native-web`) and confirmed `expo start --web` works.
- Implemented reusable UI components and applied them across key screens for frame-aligned visuals and cleaner, production-style structure.
- Added a mobile-like centered viewport for web and completed a larger frame-parity UI pass across core screens using updated PRD copy.
- Implemented additional production-style screen rewrites for Splash, Login, Explore, Match Discovery, and Profile.
- Added shared `SafarHeader` and route-aware `BottomTabBar` for consistent screen scaffolding.
- Completed palette migration to parchment background + rich mahogany primary across major components and updated project docs accordingly.
- Completed a thorough audit-and-polish pass: removed dead component files, fixed token gaps, redesigned splash, added scroll padding, fixed back button hit areas, and corrected keyboard behaviour.
- **UI quality pass (2026-04-25):** Made Explore category pills drive real content via a `CATEGORY_DATA` map; fixed Hunza Valley image display bug; made Journeys tabs (Upcoming / Past Trips / Wishlist) render distinct content; fixed Latest Update card avatar stack and action buttons; enriched Vibe Room with a group brief card, quick actions strip, and emoji reactions; completely overhauled the Profile page with a hero cover photo, achievement badges, followers preview, and recent journeys scroll.

## Why These Changes Matter

- The app now has a real starting point.
- The project can be opened on Android with Expo Go.
- Future features can be added one by one without losing track.
- Web preview provides a stable and fast way to validate UI while mobile version/tooling issues are being resolved.
- A reusable component system keeps the app visually consistent and makes future feature development much faster.

## Current UI Direction (Reasoning + Core Idea)

- Reasoning: We focused on design tokens and reusable components first so every screen uses the same visual language (heritage header, arched cards, banners, radar-style profile view).
- What was done: Implemented all core UI primitives and integrated them into auth, explore, journeys, community, profile, safety, agencies, and messages screens.
- Verification: The app compiles and web bundling succeeds with no current diagnostics in changed UI files.
- Core idea: Build a strong foundation layer once, then compose features from it instead of rewriting styles screen-by-screen.

## Explanation Rule for Future Changes

For every new code change, documentation must answer four things in simple words:

1. What changed?
2. Why was this approach chosen?
3. How was it verified?
4. What core engineering idea does it follow?

## What Comes Next

- Final visual parity pass against each updated prototype frame.
- Add real data and state management.
- Connect the app to Supabase.
- Make Explore, Journeys, Chat, Expense, Safety, and Profile fully functional.

## Latest Change Summary (2026-04-25)

- What changed: Explore category pills now filter content; Hunza Valley card shows its image; Journeys tabs show three distinct views (Upcoming / Past Trips / Wishlist); the Latest Update card has a properly layered avatar stack and two action buttons; the Vibe Room has a collapsible group brief, quick media/poll/event actions, and emoji reaction chips; the Profile page has a full hero cover, achievement badges, follower preview, and recent journeys horizontal scroll.
- Why it changed: The app needed to feel like a real, polished product — every interactive element must visibly respond and every screen must match what users expect from a well-designed travel app.
- How it was verified: TypeScript compilation passed with zero errors; all changed files were reviewed for import consistency and missing style references.
- Core idea: Functional polish = data wiring (state changes drive visible output) + visual credibility (patterns familiar from apps users already trust — hero covers, stat cards, badge rows, avatar stacks).