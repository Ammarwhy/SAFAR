# SAFAR Project Explanation

Any AI agent that changes code must update all Markdown files in the repo to keep documentation current.

Every change explanation must clearly include: what was changed, why it was changed, how it was verified, and the core idea behind it.

Current primary testing mode is the web variant: `npx expo start --web --clear`.

Latest update reference: Entry 011 in `Build_Progress.md`.

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
- **Featured Escape hardening (2026-04-25):** Added fallback image handling plus duration and highlight chips to keep the hero card reliable and more informative.

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

- What changed: Featured Escape now uses fallback image handling and includes duration + highlight chips; mock data updated accordingly; docs synced to Entry 011.
- Why it changed: The hero card must never render blank; adding resilience and richer context improves trust and scanability.
- How it was verified: Not run in this session (visual check pending).
- Core idea: Make key visual surfaces robust and information-rich so failures do not break the experience.