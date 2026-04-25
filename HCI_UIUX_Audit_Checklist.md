# SAFAR HCI + UI/UX Comprehensive Audit Checklist

## Execution Rule
- Make smallest targeted change per issue.
- Use tokens from `constants/Theme.ts` and `constants/colors.ts` only.
- No raw hex values in screens/components.

## Principle Coverage

### 1) Visibility of System Status
- [ ] Add centered mahogany `ActivityIndicator` to every async-loading screen.
- [ ] Add simulated 300ms list loading where real APIs are not wired.
- [ ] Add loading+disabled state for async action buttons.
- [ ] Add visible success confirmation before navigation.

### 2) Match System to Real World
- [ ] Replace technical/system copy with plain travel language.
- [ ] Rewrite error copy to human-readable actions.
- [ ] Add natural-language empty states.
- [ ] Use action-oriented button labels.

### 3) User Control and Freedom
- [ ] Ensure close/cancel action on every modal/overlay.
- [ ] Add SOS confirm alert with destructive action.
- [ ] Confirm destructive actions (sign out/delete/clear).
- [ ] Ensure back navigation on all deep screens.

### 4) Consistency and Standards
- [ ] Enforce radius tokens: cards 16, buttons 12, inputs 10, pills 999.
- [ ] Enforce 8pt grid / spacing multiples of 4.
- [ ] Ensure text uses Typography tokens (no inline fontSize/fontWeight).
- [ ] Enforce mahogany shadow token and divider token.
- [ ] Ensure BottomTabBar active/inactive/background colors match spec.

### 5) Error Prevention
- [ ] Disable login submit until required fields filled.
- [ ] Numeric fields use `keyboardType="numeric"` and non-negative validation.
- [ ] Add double-tap prevention (1s) to action buttons.
- [ ] Add `maxLength` on appropriate form fields.

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
- [ ] 44x44pt minimum tappable areas.
- [ ] Add `hitSlop` for icon-only buttons smaller than 44.
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
- [ ] Validate every route target exists.
- [ ] Remove dead buttons (or add `Coming Soon` alert fallback).
- [ ] Correct BottomTabBar active tab logic.
- [ ] Back nav on deep screens.
- [ ] Sign out clears auth and routes to `/(auth)`.
- [ ] Match connect/skip advances to next candidate card.

### Empty/Error States
- [ ] Loading state on each list screen.
- [ ] Empty state icon+message(+CTA optional).
- [ ] Error state icon+message+`Try Again`.

### Microcopy
- [ ] Action-oriented CTA labels.
- [ ] Helpful, specific, plain-language errors.
- [ ] Warm empty-state language.
- [ ] Friendly confirmations.
- [ ] Remove lorem/dev placeholders.

### Cleanup + Verification
- [ ] Remove `console.log|warn|error`.
- [ ] Remove commented-out code.
- [ ] Remove unused imports.
- [ ] Replace all raw hex outside token files.
- [ ] Remove never-imported components.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npx expo start --web --clear` boots.
