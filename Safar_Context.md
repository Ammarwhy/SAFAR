# SAFAR — AI Context Document
> Feed this entire document to any AI assistant (Claude, GPT-4, Gemini, Cursor, etc.) to give it full context about the SAFAR project before asking implementation questions.

Any AI agent that changes code must update all Markdown files in the repo to keep documentation current.

---

## WHAT IS SAFAR?

SAFAR is a **mobile travel-companion app** for Pakistani adventure travelers (18–35). The name means "journey" in Urdu. It is a university software engineering project (CS3009, FAST-NU Lahore, Spring 2026) in its final implementation phase.

**The app solves this:** Pakistani travelers juggle WhatsApp (planning), Excel/Splitwise (expenses), Google Maps (navigation), and word-of-mouth (agency discovery) across 4–5 separate apps. SAFAR replaces all of them.

**Five core modules:**
1. AI Travel Partner Matching (50+ preference signals, radar chart compatibility)
2. Vibe Room (real-time group chat + polls + pinned itinerary)
3. Shared Expense Ledger (split tracking, auto debt calculation, PKR currency)
4. Safety Center (emergency SOS, GPS sharing, local authority directory)
5. Verified Agency Directory (DTS-licensed travel agencies, curated itineraries)

---

## TECH STACK (CHOSEN)

### Frontend — React Native + Expo (TypeScript)
- **Why:** Cross-platform iOS + Android from one codebase; Expo handles device APIs (GPS, camera, push) without ejecting; fastest setup for a 4-day deadline
- **Navigation:** Expo Router (file-based) or React Navigation v6
- **State:** Zustand (lightweight, no boilerplate) for global state
- **UI:** NativeWind (Tailwind CSS for React Native) for styling
- **Charts:** `react-native-gifted-charts` or `victory-native` for radar/spider charts
- **Maps:** `react-native-maps` with Google Maps provider
- **Offline storage:** `@react-native-async-storage/async-storage` + `expo-sqlite`
- **Real-time:** Supabase Realtime (WebSocket) or socket.io-client

### Backend — Supabase (BaaS — replaces entire Tier 2-4)
- **Why Supabase over raw Node.js:** Provides Auth, PostgreSQL, Realtime subscriptions, Storage, and Edge Functions in one managed service — no server to deploy. Critical for 4-day deadline.
- **Auth:** Supabase Auth (email/password + Google OAuth built-in)
- **Database:** Supabase PostgreSQL (all entities below)
- **Realtime:** Supabase Realtime (replaces Firebase RT DB for chat messages and polls)
- **Storage:** Supabase Storage (profile photos, trip media, agency images)
- **Edge Functions:** Deno-based serverless (for MatchEngine scoring logic)

### Why NOT a custom Node.js backend?
With a Friday deadline (4 days), building and deploying a Node.js + Express + Redis + Firebase stack from scratch is not feasible. Supabase gives all of this managed.

### External Integrations
| Service | Purpose | Implementation |
|---|---|---|
| Google OAuth | Social login | Supabase Auth built-in |
| Google Maps | Maps in Safety + Agency screens | `react-native-maps` + Maps SDK |
| Push Notifications | Match found, SOS alerts | `expo-notifications` |
| Emergency Services | Local authority data | Mock static JSON data (out of scope for demo) |
| Payment Gateway | Agency booking | UI only, not implemented |

---

## PROJECT STRUCTURE (Recommended)

```
safar/
├── app/                          # Expo Router screens
│   ├── (auth)/
│   │   ├── index.tsx             # Splash screen (GUI-01)
│   │   └── login.tsx             # Sign In screen (GUI-02)
│   ├── (tabs)/
│   │   ├── explore/
│   │   │   ├── index.tsx         # Explore home (GUI-03)
│   │   │   └── [destination].tsx # Destination detail (GUI-06)
│   │   ├── journeys/
│   │   │   ├── index.tsx         # Trips feed (GUI-04)
│   │   │   ├── collection.tsx    # Trips collection (GUI-05)
│   │   │   └── [tripId]/
│   │   │       ├── itinerary.tsx
│   │   │       ├── vibe-room.tsx  # Chat screen (GUI-11)
│   │   │       └── expense.tsx    # Expense ledger (GUI-12)
│   │   ├── community/
│   │   │   └── index.tsx         # AI Match discovery (GUI-07)
│   │   ├── messages/
│   │   │   └── index.tsx         # Messages list
│   │   └── profile/
│   │       └── index.tsx         # Profile & settings (GUI-14)
│   ├── agencies/
│   │   ├── index.tsx             # Agency directory (GUI-09)
│   │   └── [agencyId].tsx        # Agency profile (GUI-10)
│   ├── traveler/
│   │   └── [userId].tsx          # Public traveler profile (GUI-08)
│   └── safety/
│       └── index.tsx             # Safety Center (GUI-13)
├── components/
│   ├── ui/
│   │   ├── ArchCard.tsx          # Reusable arched image card
│   │   ├── RadarChart.tsx        # Travel Persona DNA radar chart
│   │   ├── SOSButton.tsx         # Safety center SOS button
│   │   ├── ExpenseRow.tsx        # Transaction list item
│   │   ├── AgencyCard.tsx        # Agency directory card
│   │   ├── ChatBubble.tsx        # Vibe room message bubble
│   │   └── OfflineBanner.tsx     # Offline mode indicator
│   └── layouts/
│       └── HeritageHeader.tsx    # Gold top bar (logo + avatar)
├── lib/
│   ├── supabase.ts               # Supabase client config
│   ├── matchEngine.ts            # MatchEngine scoring algorithm
│   ├── expenseCalc.ts            # ExpenseCalculator logic
│   └── offlineStore.ts           # AsyncStorage/SQLite helpers
├── stores/
│   ├── authStore.ts              # Zustand auth state
│   ├── tripStore.ts              # Zustand trip state
│   ├── chatStore.ts              # Zustand chat state
│   └── safetyStore.ts            # Zustand safety state
├── constants/
│   ├── colors.ts                 # Design tokens
│   ├── mockData.ts               # Seed data for demo
│   └── agencies.ts               # Static agency data
└── supabase/
    ├── schema.sql                # Full database schema
    └── seed.sql                  # Demo seed data
```

---

## DATABASE SCHEMA (Supabase PostgreSQL)

```sql
-- USERS
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  profile_photo_url text,
  bio text,
  is_2fa_enabled boolean default false,
  membership_tier text default 'free',
  created_at timestamptz default now()
);

-- TRAVELER PROFILES
create table traveler_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  destinations_visited int default 0,
  travel_style text,
  travel_pace text,
  interest_tags text[],
  nomads_manifesto text,
  current_lat float,
  current_lng float,
  persona_dna jsonb, -- { heritage: 0.8, culinary: 0.5, urban: 0.3, nature: 0.9, adventure: 0.7, relaxation: 0.4 }
  curation_score float default 0,
  expeditions_count int default 0,
  heritage_points int default 0
);

-- MATCHES
create table matches (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references users(id),
  target_id uuid references users(id),
  match_percentage float,
  status text default 'Pending', -- Pending | Connected | Skipped
  matched_at timestamptz default now()
);

-- TRIPS
create table trips (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references users(id),
  title text not null,
  destination text,
  start_date date,
  end_date date,
  status text default 'Upcoming', -- Upcoming | Preparing | BookingStage | Completed
  hero_image_url text,
  distance_km float,
  created_at timestamptz default now()
);

-- TRIP PARTICIPANTS
create table trip_participants (
  trip_id uuid references trips(id) on delete cascade,
  user_id uuid references users(id),
  primary key (trip_id, user_id)
);

-- ITINERARIES
create table itineraries (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid unique references trips(id) on delete cascade,
  duration_days int,
  total_km float,
  gear_advisory text,
  visa_update text
);

-- ITINERARY STOPS
create table itinerary_stops (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid references itineraries(id) on delete cascade,
  name text,
  lat float,
  lng float,
  description text,
  arrival_date date,
  sort_order int
);

-- VIBE ROOMS
create table vibe_rooms (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid unique references trips(id) on delete cascade,
  pinned_itinerary_id uuid references itineraries(id),
  session_status text default 'active',
  created_at timestamptz default now()
);

-- MESSAGES (also stored in Supabase Realtime)
create table messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references vibe_rooms(id) on delete cascade,
  sender_id uuid references users(id),
  content text,
  type text default 'Text', -- Text | Image | Poll
  sent_at timestamptz default now(),
  delivered boolean default false
);

-- POLLS
create table polls (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references vibe_rooms(id) on delete cascade,
  question text not null,
  options jsonb, -- [{ "id": "opt1", "text": "Option A", "votes": 0 }]
  is_closed boolean default false,
  created_at timestamptz default now()
);

-- POLL VOTES
create table poll_votes (
  poll_id uuid references polls(id) on delete cascade,
  user_id uuid references users(id),
  option_id text,
  primary key (poll_id, user_id)
);

-- EXPENSE LEDGERS
create table expense_ledgers (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid unique references trips(id) on delete cascade,
  total_group_spend float default 0,
  user_balances jsonb default '{}' -- { "userId": balance_amount }
);

-- EXPENSES
create table expenses (
  id uuid primary key default gen_random_uuid(),
  ledger_id uuid references expense_ledgers(id) on delete cascade,
  paid_by_user_id uuid references users(id),
  amount_pkr float not null check (amount_pkr > 0),
  category text, -- Dining | Transport | Stay | Activity
  split_method text default 'Equal', -- Equal | Custom | Payer-only
  split_data jsonb, -- for Custom splits: { "userId": amount }
  is_verified boolean default false,
  expense_date date default current_date
);

-- AGENCIES
create table agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text,
  star_rating float,
  review_count int default 0,
  philosophy text,
  certification_badges text[],
  office_lat float,
  office_lng float,
  contact_phone text,
  established_year int,
  specialty text,
  hero_image_url text,
  is_dts_verified boolean default false
);

-- AGENCY ITINERARIES
create table agency_itineraries (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references agencies(id) on delete cascade,
  title text not null,
  price_per_person_pkr float,
  departure_date date,
  destination_tags text[],
  duration text,
  description text,
  image_url text
);

-- NOTIFICATIONS
create table notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid references users(id),
  type text, -- MatchFound | TripReminder | ExpenseAlert | SOSAlert
  content text,
  sent_at timestamptz default now(),
  is_read boolean default false
);

-- SAFETY CONTACTS
create table safety_contacts (
  user_id uuid references users(id) on delete cascade,
  contact_name text,
  contact_phone text,
  primary key (user_id, contact_phone)
);
```

---

## MATCH ENGINE ALGORITHM

The MatchEngine computes a compatibility score between two TravelerProfiles. Implement this in `lib/matchEngine.ts`:

```typescript
interface PersonaDNA {
  heritage: number;    // 0-1
  culinary: number;
  urban: number;
  nature: number;
  adventure: number;
  relaxation: number;
}

interface TravelerPreferences {
  personaDNA: PersonaDNA;
  travelStyle: string;    // "Luxury" | "Budget" | "Backpacker" | "Comfort"
  travelPace: string;     // "Slow" | "Moderate" | "Fast"
  interestTags: string[]; // ["Heritage", "Food", "Photography", ...]
  preferredRegions: string[];
}

function computeMatchScore(p1: TravelerPreferences, p2: TravelerPreferences): number {
  // 1. DNA similarity (40% weight) — cosine similarity of 6-axis vectors
  const dnaScore = cosineSimilarity(
    Object.values(p1.personaDNA),
    Object.values(p2.personaDNA)
  );

  // 2. Travel style match (20% weight) — exact match = 1, adjacent = 0.5
  const styleScore = p1.travelStyle === p2.travelStyle ? 1 : 0.3;

  // 3. Travel pace match (20% weight)
  const paceScore = p1.travelPace === p2.travelPace ? 1 : 0.4;

  // 4. Shared interest tags (20% weight) — Jaccard similarity
  const sharedTags = p1.interestTags.filter(t => p2.interestTags.includes(t));
  const unionTags = new Set([...p1.interestTags, ...p2.interestTags]);
  const tagScore = unionTags.size > 0 ? sharedTags.length / unionTags.size : 0;

  // Weighted sum
  const rawScore = (dnaScore * 0.40) + (styleScore * 0.20) + (paceScore * 0.20) + (tagScore * 0.20);
  return Math.round(rawScore * 100); // Return 0-100
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}
```

---

## EXPENSE CALCULATOR LOGIC

Implement in `lib/expenseCalc.ts`:

```typescript
interface Expense {
  id: string;
  paidByUserId: string;
  amountPKR: number;
  splitMethod: 'Equal' | 'Custom' | 'Payer-only';
  splitData?: Record<string, number>; // for Custom splits
  participants: string[]; // userIds in trip
}

function calculateBalances(expenses: Expense[], participants: string[]): Record<string, number> {
  // balances[userId] = net amount (positive = owed to you, negative = you owe)
  const balances: Record<string, number> = {};
  participants.forEach(p => balances[p] = 0);

  expenses.forEach(expense => {
    const { paidByUserId, amountPKR, splitMethod, splitData, participants: involved } = expense;
    
    // Payer gets credited
    balances[paidByUserId] = (balances[paidByUserId] || 0) + amountPKR;

    if (splitMethod === 'Equal') {
      const share = amountPKR / involved.length;
      involved.forEach(userId => {
        balances[userId] = (balances[userId] || 0) - share;
      });
    } else if (splitMethod === 'Custom' && splitData) {
      Object.entries(splitData).forEach(([userId, amount]) => {
        balances[userId] = (balances[userId] || 0) - amount;
      });
    }
    // Payer-only: only payer bears cost, already credited above, no debits
  });

  return balances;
}

// Returns "You owe X: PKR amount" or "X owes you: PKR amount"
function getSettlementSummary(balances: Record<string, number>, currentUserId: string): string {
  const myBalance = balances[currentUserId] || 0;
  if (Math.abs(myBalance) < 1) return "You are settled up!";
  if (myBalance < 0) return `You owe PKR ${Math.abs(myBalance).toFixed(2)}`;
  return `Others owe you PKR ${myBalance.toFixed(2)}`;
}
```

---

## KEY COMPONENTS TO BUILD

### 1. ArchCard (Arched Image Frame) — Most used component
```tsx
// components/ui/ArchCard.tsx
// An image card with a pointed arch shape at the top
// Props: imageUri, title, subtitle, badge, onPress
// Use: destination cards, agency cards, trip cards
```

### 2. RadarChart (Travel Persona DNA)
```tsx
// Uses react-native-gifted-charts RadarChart or victory-native VictoryRadar
// 6 axes: Heritage, Culinary, Urban, Nature, Adventure, Relaxation
// Two datasets: current user (filled blue), match candidate (outline dashed)
// Used in: Profile (GUI-08), Match Discovery (GUI-07)
```

### 3. HeritageHeader
```tsx
// components/layouts/HeritageHeader.tsx
// Gold/tan bar (#C8A96E background)
// Left: temple icon + "Heritage" italic text
// Right: profile avatar circle (or search icon)
// Used on every screen
```

### 4. SOSButton
```tsx
// Large centered card, white background, subtle red glow
// "SOS" in large bold red serif
// "TAP FOR HELP" small caps label below
// onPress → confirm modal → activateSOS()
```

### 5. ChatBubble
```tsx
// Left-aligned (others): white card, sender name above in small text
// Right-aligned (me): blue (#1A3A6E) card, no name
// Supports: Text, Image (rounded), and system messages
```

### 6. ExpenseRow
```tsx
// Category icon (emoji or Ionicons), expense name, date, payer name
// Right side: PKR amount, split type label
// Optional: "VERIFIED" green badge
```

### 7. OfflineBanner
```tsx
// Small pill at top or bottom: "● OFFLINE MODE ACTIVE ⬇"
// Background: semi-transparent white or cream
// Auto-show when NetInfo says no connection
```

---

## SUPABASE REALTIME (Chat Implementation)

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// In ChatScreen component:
useEffect(() => {
  const channel = supabase
    .channel(`room:${roomId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `room_id=eq.${roomId}`
    }, (payload) => {
      setMessages(prev => [...prev, payload.new as Message]);
    })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [roomId]);

// Send message:
async function sendMessage(content: string) {
  await supabase.from('messages').insert({
    room_id: roomId,
    sender_id: currentUser.id,
    content,
    type: 'Text'
  });
}
```

---

## MOCK DATA FOR DEMO

The following seed data should be used for the demo:

### Agencies
1. **Kashi Journeys** (est. 1984) — Spiritual architecture + Varanasi river expeditions
2. **Nomad Silk Road** (est. 1992) — Central Asian heritage, Registan, Kyzylkum
3. **The Nabataean Guild** (est. 2005) — Desert kingdoms, Middle East spice routes
4. **Abyssinian Heritage** (est. 2011) — Ethiopian Orthodox history, Simien Highlands

### Demo Users
1. **Julian Thorne** — "The Global Archivist", London, 42 countries, Curation Score 94.8
   - DNA: Heritage=0.9, Culinary=0.6, Urban=0.7, Nature=0.4, Adventure=0.5, Relaxation=0.3
2. **Amina Al-Farsi** — Professional Curator, Muscat, Oman — 94% match with Julian
   - DNA: Heritage=0.85, Culinary=0.7, Urban=0.6, Nature=0.5, Adventure=0.8, Relaxation=0.4
3. **Elias Thorne** — Curator & Heritage Explorer, 14 expeditions, 8.2k Heritage Points

### Demo Trip
- **Silk Road Expedition: Samarkand to Bukhara**
  - Expense entries: Dinner at Old City (David, $84.20, Equal), Registan Tour Tickets (You, $120.00, Equal), Private Transfer (David, $450.00, Equal), Museum Entry Fee (You, $15.00, Individual)
  - Total: $1,245.50 | Your Share: $622.75 | You owe David: $180.35

### Destinations
- Varanasi, India | Samarkand, Uzbekistan | Bukhara, Uzbekistan | Petra, Jordan | Agra, India | Marrakech, Morocco | Bagan, Myanmar

---

## SCREEN NAVIGATION MAP

```
AuthStack:
  Splash → Login → (register flow)

MainTabs (after login):
  Tab 1 - Explore:
    ExploreHome → DestinationDetail
  
  Tab 2 - Journeys:
    JourneysFeed → TripDetail → {
      ItineraryScreen
      VibeRoomScreen
      ExpenseLedgerScreen
    }
    TripsCollection → NewTrip
  
  Tab 3 - Community (Guild):
    MatchDiscovery → TravelerPublicProfile
  
  Tab 4 - Messages:
    MessagesList → VibeRoomScreen
  
  Tab 5 - Profile:
    ProfileSettings

Modals:
  AgencyDirectory → AgencyProfile
  SafetyCenter (accessible from bottom nav in safety context)
  ConnectionErrorModal
```

---

## DESIGN DECISIONS & CONSTRAINTS

1. **Supabase over Firebase:** Supabase provides SQL (easier queries), Auth, Realtime, and Storage in one SDK. Firebase RT DB is replaced by Supabase Realtime subscriptions on the `messages` table.

2. **Expo over bare React Native:** Expo's managed workflow gives GPS, camera, notifications, and SQLite without native setup. Critical for deadline.

3. **NativeWind for styling:** Write `className="bg-[#1A3A6E] rounded-2xl p-4"` instead of `StyleSheet.create()`. Much faster iteration.

4. **Zustand over Redux:** No boilerplate. `const useAuthStore = create(set => ({ user: null, setUser: (u) => set({ user: u }) }))`. Done.

5. **Mock Emergency Services:** `SafetyCenter` local authority data is a static JSON array. No real API integration for demo.

6. **Offline with AsyncStorage:** For the demo, `@react-native-async-storage/async-storage` stores trips and expenses. expo-sqlite for more complex queries.

7. **Arch Image Shape:** Use CSS `borderTopLeftRadius` and `borderTopRightRadius` with very large values on a `View` wrapping an `Image`, combined with `overflow: 'hidden'`. Or use SVG `clipPath`.

---

## IMPLEMENTATION PRIORITY ORDER (4-Day Sprint)

### Day 1 (Monday) — Foundation
- [ ] Expo project setup with TypeScript
- [ ] Supabase project + schema.sql deployed
- [ ] Supabase Auth: email login + Google OAuth
- [ ] HeritageHeader component
- [ ] ArchCard component
- [ ] Bottom navigation (5 tabs)
- [ ] Design tokens (colors.ts)
- [ ] Splash screen (GUI-01)
- [ ] Login screen (GUI-02) with error state

### Day 2 (Tuesday) — Core Features
- [ ] Explore screen (GUI-03) with mock destination data
- [ ] Journeys/Trips Feed (GUI-04)
- [ ] AI Match Discovery screen (GUI-07) — radar chart, Connect/Skip
- [ ] Traveler Public Profile (GUI-08)
- [ ] Vibe Room chat screen (GUI-11) — Supabase Realtime
- [ ] Poll creation and voting

### Day 3 (Wednesday) — Transactions & Safety
- [ ] Expense Ledger (GUI-12) — add expense, auto-balance calc
- [ ] Settle Up flow
- [ ] Safety Center (GUI-13) — SOS button, local authority list, map
- [ ] Agency Directory (GUI-09) and Agency Profile (GUI-10)
- [ ] Trips Collection (GUI-05) with offline caching

### Day 4 (Thursday) — Polish & Testing
- [ ] User Profile & Settings (GUI-14) — all toggles working
- [ ] Connection Error state (GUI-15) — offline detection
- [ ] Offline mode: AsyncStorage cache for trips and safety contacts
- [ ] Seed database with demo data
- [ ] Fix UI to match Figma (colors, typography, arched images)
- [ ] End-to-end test: login → match → chat → expense → SOS

### Day 5 (Friday) — Demo Prep
- [ ] Clean up console errors
- [ ] Add loading states and skeleton screens
- [ ] Test on both iOS Simulator and Android Emulator
- [ ] Prepare demo flow script

---

## ENVIRONMENT VARIABLES

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
```

---

## COMMON GOTCHAS

1. **Radar chart in React Native:** Use `react-native-gifted-charts` which has a `RadarChart` component. Alternative: draw with `react-native-svg` manually.

2. **Arched image frame:** Use `borderRadius` trick or `react-native-svg` with a `clipPath`. The arch should be at the TOP of the image (the pointed peak points up, flat base at bottom).

3. **Supabase Auth with Expo:** Use `expo-auth-session` for Google OAuth flow. Supabase has an official Expo guide.

4. **Real-time chat:** Subscribe to Supabase Realtime in `useEffect` and ALWAYS unsubscribe in the cleanup function to avoid memory leaks.

5. **Expense balance calculation:** Sum all payments per user, subtract their shares. The result is their net balance. Positive = they're owed money; negative = they owe money.

6. **Offline detection:** Use `@react-native-community/netinfo` — `NetInfo.addEventListener(state => setIsOffline(!state.isConnected))`.

7. **PKR currency formatting:** `new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(amount)` or simply `PKR ${amount.toFixed(2)}`.

8. **SOS confirmation:** Always show a confirmation modal before actually triggering SOS to prevent accidental activations.

---

*SAFAR AI Context Document — CS3009 Software Engineering — FAST-NU Lahore — Spring 2026*
*Feed this document to any AI coding assistant before asking implementation questions.*
