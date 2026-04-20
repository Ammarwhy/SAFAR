# SAFAR — Product Requirements Document (PRD)
**Version:** 2.0 | **Date:** April 2026 | **Phase:** 5 — Implementation  
**Team:** Rafay Ather Khan (23L-0987) · Abu Bakar Amir (23L-0548) · Soban Ali (23L-0507) · Muhammad Ammar Hussain (23L-0780)  
**Course:** CS3009 Software Engineering, FAST-NU Lahore · Spring 2026

Any AI agent that changes code must update all Markdown files in the repo to keep documentation current.

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

| ID | Screen Name | Description |
|---|---|---|
| GUI-01 | Splash / Onboarding | App logo, "Begin Exploration" CTA, offline mode indicator |
| GUI-02 | Sign In | Email/password login, Google OAuth, "Enter Archive", "Request Invitation", login error state |
| GUI-03 | Explore (Home) | Featured destination cards with hero imagery, category filters, search |
| GUI-04 | Journeys / Trips Feed | Current expedition hero card, journey timeline, Offline Safety Kit banner |
| GUI-05 | Trips Collection | Grid list of cached itineraries, "New Journey" CTA |
| GUI-06 | Explore Detail / Silk Road | Featured destination with sub-destination cards, Heritage Archives |
| GUI-07 | AI Match Discovery | Swipe-style traveler card with Journey Alignment radar chart, % score |
| GUI-08 | Traveler Public Profile | Persona DNA radar chart, achievements, curation score, curated collections |
| GUI-09 | Agency Directory | Grid of DTS-Verified agencies, establishment year, specialty |
| GUI-10 | Agency Profile | Featured itineraries, philosophy, UNESCO partners, Contact CTAs |
| GUI-11 | Vibe Room (Chat) | Pinned itinerary card, real-time chat, image sharing, poll UI, error state |
| GUI-12 | Expense Ledger | Total spend, individual share, transactions, "Settle Up Now" |
| GUI-13 | Safety Center | SOS button, live location, emergency contacts, local authority directory, map |
| GUI-14 | User Profile & Settings | Stats, DNA chart, account settings, privacy toggles |
| GUI-15 | Connection Error | "Sync Interrupted" modal with retry and Safety Kit link |

---

## 4. Functional Requirements

### 4.1 Authentication Module
- **FR-01** Email/password registration with hashed credential storage (bcrypt)
- **FR-02** Google OAuth 2.0 login ("Enter Archive" via Google)
- **FR-03** JWT-based session management with token refresh
- **FR-04** Password reset via email verification link
- **FR-05** Two-factor authentication (2FA) toggle in settings
- **FR-06** Biometric / Passkey login option
- **FR-07** Multi-role registration: Traveler vs. Verified Agency

### 4.2 Explore & Discovery
- **FR-08** Browse featured destination cards with arched hero images
- **FR-09** Filter destinations by category: Mountains, Trekking, Lakes, Heritage
- **FR-10** Full-text search across destinations and agency itineraries
- **FR-11** View destination detail with sub-destination breakdown and Heritage Archives

### 4.3 AI Travel Matching
- **FR-12** Collect 50+ travel preference signals: pace, style, budget, interests, regions, and 6 Travel DNA axes (Heritage, Culinary, Urban, Nature, Adventure, Relaxation)
- **FR-13** Compute Match Percentage Score (0–100%) using weighted preference analysis via MatchEngine
- **FR-14** Display Journey Alignment radar/spider chart comparing two users across 6 DNA axes
- **FR-15** Swipe-style card-based discovery: "Connect" or "Skip" action per candidate
- **FR-16** Push notification when a high-score match (above configurable threshold) is found
- **FR-17** View other traveler's public profile, Curator's Note (self-written travel manifesto), and interest tags
- **FR-18** Display Curation Score (composite travel credibility metric, e.g., 94.8)
- **FR-19** Show ranked list of potential travel companions

### 4.4 Vibe Room (Group Chat)
- **FR-20** Auto-create a Vibe Room when a Trip is created
- **FR-21** Real-time text messaging via WebSocket (< 1 second delivery)
- **FR-22** Image and media sharing within the room
- **FR-23** Create a group poll with multiple-choice options
- **FR-24** Vote on active polls; view live aggregated results
- **FR-25** Pin an itinerary card to top of chat ("Pinned Priority" gold card)
- **FR-26** Display active member count and avatar strip
- **FR-27** "Sync Interrupted" error state with retry button and "Check Safety Kit" link
- **FR-28** Offline message queue — unsent messages send when connectivity restores

### 4.5 Trip Management
- **FR-29** Create a new trip: title, destination, start/end dates, hero image
- **FR-30** View trips by tab: Upcoming, Preparing, Booking Stage, Completed, Wishlist
- **FR-31** Build itinerary with ordered stops (name, coordinates, description, arrival date)
- **FR-32** Reorder stops via drag-and-drop
- **FR-33** View itinerary on embedded map
- **FR-34** Display gear advisory and visa/logistics update on itinerary screen
- **FR-35** Add/remove participants from trip
- **FR-36** Cache all trip data locally (SQLite / AsyncStorage) for offline access
- **FR-37** Trip status transitions: Upcoming → Preparing → BookingStage → Completed

### 4.6 Expense Ledger
- **FR-38** Add expense entry: amount (PKR), payer (select from participants), category, split method
- **FR-39** Categories: Dining, Transport, Stay, Activity
- **FR-40** Split methods: Equal, Custom, Payer-only
- **FR-41** View total group spend and user's individual share in stat cards
- **FR-42** Transaction list: category icon, name, date, payer name, VERIFIED badge, amount, split label
- **FR-43** Auto-calculate individual balances (who owes whom, exact PKR amount)
- **FR-44** "Settle Up Now" flow — mark balance as settled
- **FR-45** View full historical expense list
- **FR-46** Offline sync queue — ledger changes sync when online; "Offline Sync Active" indicator shown

### 4.7 Safety Center
- **FR-47** Large "SOS / TAP FOR HELP" button — activates distress signal on single tap
- **FR-48** SOS event fan-out: notifies saved emergency contacts + local authorities
- **FR-49** Live GPS coordinate sharing with trusted contacts ("Location: Live coordinate broadcast active")
- **FR-50** Safety check-in timer — configurable interval; alerts contacts if not checked in
- **FR-51** Guide credential verification — verify local guide/expert badge
- **FR-52** Local authority directory with: Tourist Police (name, division, distance km), Hospital (name, status, Open 24h), each with a CALL button
- **FR-53** Current location display: "YOU ARE HERE: [location name]"
- **FR-54** Dark-themed map view showing user position
- **FR-55** Offline Safety Kit: pre-downloaded contacts and local services accessible in Airplane Mode
- **FR-56** Report a concern anonymously
- **FR-57** City safety rating displayed as float (e.g., 4.2/5)

### 4.8 Agency Directory
- **FR-58** Grid list of DTS-Verified agencies: name, est. year, specialty description, star rating, "DTS Verified" gold badge, "View Details" button
- **FR-59** Filter agencies by region and price range
- **FR-60** Agency profile page: philosophy quote, description paragraphs, UNESCO partner count badge, featured itinerary cards (duration, location, title, teaser)
- **FR-61** View agency office location on embedded map
- **FR-62** Book an agency itinerary (initiates booking workflow)
- **FR-63** Contact agency: "Contact Agent" (message) and "Schedule a Call" buttons
- **FR-64** "Apply for Certification" link for new agencies

### 4.9 User Profile & Settings
- **FR-65** View/edit personal profile: name, bio, profile photo, travel manifesto
- **FR-66** Display stats: Expeditions count, Heritage Points
- **FR-67** Travel Persona DNA radar chart across 6 axes
- **FR-68** Achievements list with icon, title, description (e.g., Heritage Seeker, Gourmand, Explorer)
- **FR-69** Curation Score numeric display with trend indicator
- **FR-70** Curated Collections photo grid with "View Archive" link
- **FR-71** Edit email address
- **FR-72** Toggle: Offline Safety Kit (auto-cache maps) — default ON
- **FR-73** Toggle: Curated Theme (dark/light) — default OFF
- **FR-74** Passkey / biometric security toggle
- **FR-75** Privacy Mode (incognito exploration) toggle
- **FR-76** Sign out action with confirmation

---

## 5. Non-Functional Requirements

| ID | Attribute | Requirement |
|---|---|---|
| NFR-01 | Performance | Auth + dashboard loads within 3 seconds on 4G/LTE |
| NFR-02 | Offline Availability | 100% availability of cached itineraries in Airplane Mode |
| NFR-03 | Real-Time Latency | Vibe Room message delivery < 1 second under normal connectivity |
| NFR-04 | Security | All passwords hashed (bcrypt/argon2); data encrypted in transit (TLS 1.2+) |
| NFR-05 | Data Integrity | Expense ledger rejects null, negative, or non-numeric values |
| NFR-06 | Accuracy | Cost estimates within 10% margin of actual PKR market rates |
| NFR-07 | Usability | New user completes first match action within 60 seconds of launch |
| NFR-08 | Scalability | AI Matching and Chat services independently deployable/scalable |
| NFR-09 | Testability | MatchEngine, ExpenseCalculator, SafetyOrchestrator unit-testable in isolation |
| NFR-10 | Reliability | SOS fan-out must not drop alerts even if Notification Service is temporarily down |

---

## 6. Data Model — Full Class Reference

### User
```
userId: String (PK)
email: String
passwordHash: String
name: String
profilePhotoURL: String
bio: String
createdAt: Date
is2FAEnabled: Boolean
isFaceIDEnabled: Boolean
membershipTier: String
```
Methods: login(), logout(), updateProfile(), toggle2FA(), getPublicProfile()

### TravelerProfile (extends User)
```
destinationsVisited: int
travelStyle: String
travelPace: String
passportAge: String
interestTags: String[]
nomadsManifesto: String
currentLocation: GeoPoint
personaDNA: Map<String, Float>   // keys: Heritage, Culinary, Urban, Nature, Adventure, Relaxation
curationType: String
```
Methods: getPersonaDNA(), getInterestTags(), updateLocation()

### Match
```
matchId: String (PK)
requesterId: String (FK→User)
targetId: String (FK→User)
matchPercentage: Float
status: String  // Pending | Connected | Skipped
matchedAt: Date
```
Methods: connect(), skip(), getScore()

### MatchEngine (service)
```
preferenceWeightCount: int = 50
matchThreshold: Float
pendingSuggestions: List<Match>
```
Methods: analyzePreferences(userId), computeScore(u1, u2), rankMatches(userId), applyFilters(criteria)

### Trip
```
tripId: String (PK)
title: String
destination: String
startDate: Date
endDate: Date
status: String  // Upcoming | Preparing | BookingStage | Completed
heroImageURL: String
distanceKM: Float
ownerId: String (FK→User)
```
Methods: addParticipant(), removeParticipant(), getItinerary(), getExpenseLedger(), getVibeRoom()

### Itinerary (composed in Trip 1:1)
```
itineraryId: String (PK)
tripId: String (FK→Trip)
stops: List<Stop>
durationDays: int
totalKM: Float
gearAdvisory: String
visaUpdate: String
```
Methods: addStop(), reorderStops(), getMap()

### Stop (value object)
```
name: String
coordinates: GeoPoint
description: String
arrivalDate: Date
```

### VibeRoom (aggregate, composed in Trip 1:1)
```
roomId: String (PK)
tripId: String (FK→Trip)
members: List<User>
activeMemberCount: int
sessionStatus: String
```
Methods: sendMessage(msg), createPoll(poll), votePoll(pollId, option), pinItinerary(id)

### Message (owned by VibeRoom)
```
messageId: String (PK)
roomId: String (FK→VibeRoom)
senderId: String (FK→User)
content: String
type: String  // Text | Image | Poll
sentAt: Timestamp
delivered: Boolean
```
Methods: retry(), markDelivered()

### Poll (owned by VibeRoom)
```
pollId: String (PK)
roomId: String (FK→VibeRoom)
question: String
options: List<PollOption>
isClosed: Boolean
```
Methods: castVote(userId, option), close(), getResults()

### ExpenseLedger (aggregate, composed in Trip 1:1)
```
ledgerId: String (PK)
tripId: String (FK→Trip)
totalGroupSpend: Float
userBalances: Map<String, Float>
expenses: List<Expense>
```
Methods: addExpense(e), markSettled(userId), calculateBalance(userId), getFullHistory()

### Expense (owned by ExpenseLedger)
```
expenseId: String (PK)
ledgerId: String (FK)
paidByUserId: String (FK→User)
amountPKR: Float
category: String  // Dining | Transport | Stay | Activity
splitMethod: String  // Equal | Custom | Payer-only
date: Date
```
Methods: getSplitAmounts(), getCategoryIcon()

### SafetyCenter (service)
```
userId: String (FK→User)
sosContacts: List<Contact>
isLiveShareActive: Boolean
checkInDeadline: Date
cityRating: Float
cityRatingLabel: String
```
Methods: activateSOS(), configureCheckIn(duration), startLiveShare(), stopLiveShare(), reportConcern(report), getLocalServices(city)

### Agency
```
agencyId: String (PK)
name: String
region: String
starRating: Float
reviewCount: int
philosophy: String
certificationBadges: List<String>
officeLocation: GeoPoint
contactPhone: String
```
Methods: getFeaturedItineraries(), getReviews(), contact(channel)

### AgencyItinerary (offered by Agency 1..*)
```
itineraryId: String (PK)
agencyId: String (FK→Agency)
title: String
pricePerPersonPKR: Float
departureDate: Date
destinationTags: List<String>
duration: String
```
Methods: book(userId), getDetails()

### Notification
```
notifId: String (PK)
recipientId: String (FK→User)
type: String  // MatchFound | TripReminder | ExpenseAlert | SOSAlert
content: String
sentAt: Timestamp
read: Boolean
```
Methods: send(channel), markRead()

---

## 7. API Contracts (Key Interfaces)

### IAuthService
- `login(email, password) → AuthToken`
- `loginWithGoogle(idToken) → AuthToken`
- `logout(token) → void`
- `refreshToken(refreshToken) → AuthToken`
- `resetPassword(email) → void`

### IMatchService
- `getMatches(userId, filters) → List<Match>`
- `connect(matchId) → void`
- `skip(matchId) → void`
- `getProfile(userId) → TravelerProfile`
- `computeScore(userId1, userId2) → Float`

### IChatService (WebSocket)
- `joinRoom(roomId) → void`
- `sendMessage(roomId, content) → Message`
- `createPoll(roomId, poll) → Poll`
- `castVote(pollId, option, userId) → void`
- `pinItinerary(roomId, itineraryId) → void`

### ITripService
- `createTrip(data) → Trip`
- `getTrips(userId, tab) → List<Trip>`
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
- `getCitySafetyRating(city) → SafetyRating`
- `getLocalServices(city) → List<LocalService>`

### IAgencyService
- `listAgencies(region, maxPrice) → List<Agency>`
- `getAgency(agencyId) → Agency`
- `bookItinerary(itineraryId, userId) → Booking`
- `contactAgency(agencyId, channel) → void`

---

## 8. EDA Event Flows

### Vibe Room Message Flow
1. User sends message → ChatComponent sends via WebSocket
2. ChatService receives → writes to Firebase/Supabase Realtime DB
3. ChatService publishes `MessageSent` event to Redis Event Bus
4. All room member WebSocket connections receive the update
5. UI renders new bubble instantly
6. If disconnected → message queued → "Sync Interrupted" shown → retry on reconnect

### SOS Activation Flow
1. User taps SOS → SafetyComponent sends `activateSOS(userId, GeoPoint)`
2. SafetyService receives → publishes `SOSActivated` event to Redis Event Bus
3. NotificationService subscribes → pushes FCM/APNs to emergency contacts
4. EmergencyServicesAPI is pinged with coordinates
5. Confirmation shown on screen

### Match Found Flow
1. MatchingService computes score for user pair
2. Score > matchThreshold → publishes `MatchFound` event
3. NotificationService subscribes → FCM/APNs push sent to user
4. User receives: "New 94% match found — Amina Al-Farsi"

---

## 9. Offline-First Behavior

| Feature | Online Behavior | Offline Behavior |
|---|---|---|
| Trip Itinerary | Fetch from server | Serve from SQLite/AsyncStorage cache |
| Expense Ledger | Sync with server | Read from cache; new entries queued |
| Vibe Room | WebSocket real-time | Show "Sync Interrupted"; queue outgoing |
| Safety Center | Live GPS + API data | Pre-cached contacts and services |
| Maps | Live tiles | Cached tiles for downloaded trips |
| Agency Directory | Live API | Unavailable (shows stale or loading) |
| AI Matching | Server-computed | Unavailable |
| Profile | Serve from server | Serve from local cache |

---

## 10. Design System

### Colors
| Token | Hex | Usage |
|---|---|---|
| primary-blue | `#1A3A6E` | Headings, CTAs, active tabs, chat bubbles (own) |
| accent-gold | `#C8A96E` | Header bar background, gold badges, heritage accents |
| background-cream | `#F5F0E8` | Screen backgrounds |
| card-white | `#FFFFFF` | Card surfaces |
| error-red | `#D32F2F` | Error states, SOS button text |
| success-green | `#4CAF50` | Verified badges, online status |
| text-dark | `#1C1C1E` | Primary text |
| text-muted | `#8E8E93` | Secondary labels, captions |
| overlay-dark | `#2C2C2C` | Map background, dark cards |

### Typography
- **Display (serif):** Playfair Display — hero titles, app name "SAFAR", section headings
- **Body (sans-serif):** Inter — descriptions, labels, body text
- **Caps label:** Inter letter-spaced uppercase — "CURATED JOURNEYS", "DTS VERIFIED"

### Key UI Motifs
- **Arched image frames** — destination photos in pointed arch shape (signature visual)
- **Gold banner header** with "Heritage" / temple icon + profile avatar
- **Blue rounded pill buttons** — primary CTAs, full-width
- **Radar / Spider charts** — Travel Persona DNA
- **"DTS Verified" gold seal badge**
- **"Active" green pill** / "CACHED" cloud+text badge
- **Offline banner** — pill at bottom of screen when offline mode active
- **Dark card (navy)** — Emergency Contacts, Achievements sections

### Navigation
Bottom navigation bar appears on all main screens:
- Explore (compass) | Journeys (map) | Guild/Community (people) | Messages (chat) | Profile (person)
- Safety screen has its own bar: Explore | Search | Community | Messages | Safety

---

## 11. Phase 5 Acceptance Criteria

| Module | Minimum Functionality |
|---|---|
| Authentication | Email/password login + logout working; Google OAuth working |
| Explore | Destination cards render with images and filters |
| AI Matching | Candidate card displays, radar chart renders, Connect/Skip works, % shows |
| Vibe Room | Real-time messages exchange between 2 sessions; polls functional |
| Expense Ledger | Add expense, auto-calculate balance, settle up works |
| Safety Center | SOS confirmation shown, local authority list renders with Call button |
| Agency Directory | Agency list and profile views render correctly |
| Profile & Settings | Stats display, DNA chart renders, toggles work, sign-out works |
| Offline Mode | Itinerary and safety info accessible without network |
| Navigation | All 5 bottom tabs navigate correctly |

---

## 12. Explicitly Out of Scope (Phase 5)
- Live payment processing (Stripe/JazzCash) — UI mockup only
- Real Emergency Services API integration — use mock/static data
- Production-grade ML model — weighted scoring algorithm acceptable
- DTS agency onboarding portal — static directory acceptable
- Push notifications on physical devices — in-app notifications sufficient for demo

---

*SAFAR PRD v2.0 — CS3009 Software Engineering Phase 5 — FAST-NU Lahore Spring 2026*
