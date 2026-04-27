# SAFAR HCI + UI/UX Comprehensive Audit Checklist

## Execution Rule
- Make smallest targeted change per issue.
- Use tokens from `constants/Theme.ts` and `constants/colors.ts` only.
- No raw hex values in screens/components.

## Principle Coverage

### 1) Visibility of System Status
- [ ] Add centered mahogany `ActivityIndicator` to every async-loading screen.
- [x] Add simulated 300ms list loading where real APIs are not wired (messages screen, journeys screen).
- [x] Add loading+disabled state for async action buttons (register, forgot-password, edit-profile, new-journey, expense add modal).
- [x] Add visible success confirmation before navigation (forgot-password success card, edit-profile success banner).

### 2) Match System to Real World
- [ ] Replace technical/system copy with plain travel language.
- [ ] Rewrite error copy to human-readable actions.
- [ ] Add natural-language empty states.
- [ ] Use action-oriented button labels.

### 3) User Control and Freedom
- [x] Ensure close/cancel action on every modal/overlay (expense modal has X close button, forgot-password has Cancel).
- [x] Add SOS confirm alert with destructive action (safety/index.tsx).
- [x] Confirm destructive actions (sign out: Alert.alert; settle up: Alert.alert; SOS: Alert.alert).
- [x] Ensure back navigation on all deep screens (register, forgot-password, settings, profile/edit, safety, agencies, itinerary, expense, vibe-room, notifications-settings, feedback).
- [x] Back buttons 44×44 with `hitSlop={{ top:10, bottom:10, left:10, right:10 }}` on all deep screens (vibe-room and safety fixed in Issue 4).

### 4) Consistency and Standards
- [ ] Enforce radius tokens: cards 16, buttons 12, inputs 10, pills 999.
- [ ] Enforce 8pt grid / spacing multiples of 4.
- [x] Ensure text uses Typography tokens (no inline fontSize/fontWeight) — community/index.tsx and SwipeCard.tsx fully converted (Issue 6).
- [ ] Enforce mahogany shadow token and divider token.
- [ ] Ensure BottomTabBar active/inactive/background colors match spec.

### 5) Error Prevention
- [x] Disable login submit until required fields filled (`canSubmit` flag, opacity 0.45 disabled state — Issue 1).
- [x] Numeric fields use `keyboardType="numeric"` and non-negative validation (expense amount: > 0 check).
- [x] Add loading+disabled guard on async action buttons (isLoading state prevents double-submit).
- [x] Add `maxLength` on appropriate form fields (bio: 200, name: 60).

### 6) Recognition Over Recall
- [ ] Tabs include icon + label.
- [ ] Filter chips show names.
- [ ] Expense rows show payer and amount.
- [ ] Match cards show prominent compatibility percentage.

### 7) Flexibility and Efficiency
- [ ] Explore search filters in real time.
- [ ] Filter chips toggle and update immediately.
- [ ] Ensure large touch targets for frequently used list items.

### 8) Aesthetic and Minimalist
- [ ] Remove purely decorative non-functional UI.
- [ ] One primary CTA per screen.
- [ ] Simplify cards to essential info.
- [ ] Remove TODO/Coming Soon placeholders.

### 9) Error Recovery
- [ ] Error states include clear guidance + `Try Again` action.
- [ ] Inline field-level validation in warm error color.

### 10) Help and Documentation
- [ ] Input placeholders show valid example.
- [ ] Safety Center sections include one-line descriptions.
- [ ] Unclear icons get visible text labels.

## Laws and Motion

### Fitts's Law
- [x] 44x44pt minimum tappable areas — back buttons on all deep screens audited and fixed.
- [x] Add `hitSlop` for icon-only buttons smaller than 44 — all back buttons have at least `hitSlop={{ top:10, … }}`. New Journey raised to 12 on all sides (Entry 016).
- [x] Back buttons use `canGoBack()` guard with `router.replace()` fallback on New Journey (Entry 016).
- [ ] Bottom tab items span full width and >=44 height.
- [ ] List rows are full-width touchables.

### Hick's Law
- [ ] Keep bottom navigation <=5 items.
- [ ] Limit visible chips to 6 + overflow `More` if needed.
- [ ] Split long forms into sections.
- [ ] Match discovery shows one candidate at a time.

### Miller's Law
- [ ] Group expense lists by date/trip.
- [ ] Group profile stats into max 3 visible sections.
- [ ] Use collapsible sections in agency details if content is long.

### Thumb-Friendly Layout
- [ ] Place primary CTA in bottom 40% zone.
- [ ] Keep destructive/infrequent actions away from bottom-primary area.
- [ ] Bottom tab anchored with safe-area inset.

### Micro-interactions
- [ ] Screen mount fade+slide animation (350ms ease-out).
- [ ] Card stagger entrance (index*60, cap at 300ms from index 4+).
- [ ] Button press scale feedback (0.97 -> 1, 120ms).
- [ ] SOS pulse loop.
- [ ] `Animated.Value` uses `useRef`.

### Responsive Layout
- [ ] Ensure `scale()` utility exists and is used for font sizes.
- [ ] Avoid fixed-width containers.
- [ ] Images use `resizeMode="cover"` and responsive heights.
- [ ] Add `contentContainerStyle={{ paddingBottom: 100 }}` for long scrolls.
- [ ] Bottom tab height = 60 + inset.
- [ ] Login uses `KeyboardAvoidingView` with Platform-specific behavior.
- [ ] Validate at 360dp width mental check.

### Accessibility
- [ ] Add `accessibilityLabel` to all interactives.
- [ ] Add image `accessible` + descriptive labels.
- [ ] Avoid color-only state indicators.
- [ ] Ensure text contrast on parchment background.

### Navigation Audit
- [x] Validate every route target exists (all flows use catch-all; register, forgot-password, settings, profile/edit are real screens).
- [x] Remove dead buttons (all interactive elements navigate, trigger state change, or show Alert).
- [x] Correct BottomTabBar active tab logic (usePathname() highlight).
- [x] Back nav on deep screens (all screens have back button with hitSlop).
- [x] Sign out clears auth and routes to `/(auth)/login`.
- [x] Match connect/skip advances to next candidate card (SwipeCard deck).

### Empty/Error States
- [x] Loading state on each list screen (messages: ActivityIndicator 300ms; explore: ActivityIndicator).
- [x] Empty state icon+message: wishlist tab, explore search (no results), community deck exhausted.
- [x] Error state icon+message+Try Again: messages screen, explore screen.

### Microcopy
- [ ] Action-oriented CTA labels.
- [ ] Helpful, specific, plain-language errors.
- [ ] Warm empty-state language.
- [ ] Friendly confirmations.
- [ ] Remove lorem/dev placeholders.

### Cleanup + Verification
- [x] Remove `console.log|warn|error` (none in any new/modified file).
- [x] Remove commented-out code (none in any new/modified file).
- [x] Remove unused imports (verified on all touched files; vibe-room Alert import removed).
- [x] Replace all raw hex outside token files (all new code uses Colors.* only).
- [x] Remove never-imported components (N/A — all components are imported).
- [x] `npx tsc --noEmit` passes with zero new errors (only pre-existing tsconfig ignoreDeprecations).
- [ ] `npx expo start --web --clear` boots (not verified in this session — visual check pending).
