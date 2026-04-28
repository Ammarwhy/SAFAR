# SAFAR Supabase Database Documentation

This document outlines the database tables required for the SAFAR backend, their purpose, and the data they store. It also provides a step-by-step guide to implement them in your Supabase project.

## Core Database Tables

The database schema is divided into logical domains: User Management, Trips & Itineraries, Social & Communication, Finances, Agencies, and Safety.

### 1. User Management & Profiles
Stores fundamental user account details and their travel-specific profiles.

*   **`users`**
    *   **Purpose**: The central entity for all accounts. Contains basic auth-linked data.
    *   **Stores**: `id` (UUID), `email`, `name`, `profile_photo_url`, `bio`, `membership_tier` (e.g., 'free', 'premium'), `is_2fa_enabled`.
*   **`traveler_profiles`**
    *   **Purpose**: An extension of the `users` table holding complex travel preferences and matching data.
    *   **Stores**: `user_id` (foreign key to `users`), `travel_style` (Luxury, Backpacker, etc.), `travel_pace`, `interest_tags`, `persona_dna` (JSON containing compatibility sliders for heritage, culinary, etc.), and `curation_score`.
*   **`matches`**
    *   **Purpose**: Tracks travel partner compatibility matches between users.
    *   **Stores**: `requester_id`, `target_id`, `match_percentage`, `status` (Pending, Connected, Skipped), and timestamp.

### 2. Trips & Itineraries
Manages the journeys users create and the specific stops along the way.

*   **`trips`**
    *   **Purpose**: The core journey entity that users create or join.
    *   **Stores**: `title`, `destination`, `start_date`, `end_date`, `status` (Upcoming, Preparing, Completed), and `owner_id`.
*   **`trip_participants`**
    *   **Purpose**: A junction table linking multiple users to a single trip.
    *   **Stores**: `trip_id`, `user_id` (enables many-to-many relationship).
*   **`itineraries`**
    *   **Purpose**: Holds overarching details for the schedule of a specific trip.
    *   **Stores**: `trip_id` (1-to-1 relationship), `duration_days`, `total_km`, `gear_advisory`.
*   **`itinerary_stops`**
    *   **Purpose**: Individual locations/events on an itinerary.
    *   **Stores**: `itinerary_id`, `name`, coordinates (`lat`, `lng`), `arrival_date`, and `sort_order`.

### 3. Vibe Room (Social & Communication)
Manages real-time group chats and interactive elements for a trip.

*   **`vibe_rooms`**
    *   **Purpose**: The chat environment for a specific trip.
    *   **Stores**: `trip_id`, `pinned_itinerary_id`, `session_status`.
*   **`messages`**
    *   **Purpose**: Real-time chat messages sent within a vibe room.
    *   **Stores**: `room_id`, `sender_id`, `content`, `type` (Text, Image, Poll), and `sent_at`.
*   **`polls` & `poll_votes`**
    *   **Purpose**: Allows trip participants to vote on decisions.
    *   **Stores**: The poll question, JSON options, and junction data for which user voted for which option.

### 4. Expense Ledger
Handles financial tracking and split calculations during a trip.

*   **`expense_ledgers`**
    *   **Purpose**: The master financial record for a trip.
    *   **Stores**: `trip_id`, `total_group_spend`, and `user_balances` (a JSON map of who owes what).
*   **`expenses`**
    *   **Purpose**: Individual transactions logged during the trip.
    *   **Stores**: `ledger_id`, `paid_by_user_id`, `amount_pkr`, `category` (Dining, Transport, etc.), `split_method` (Equal, Custom), and `split_data`.

### 5. Agencies Directory
Stores verified travel agencies and the packages they offer.

*   **`agencies`**
    *   **Purpose**: Verified DTS-licensed travel agencies on the platform.
    *   **Stores**: `name`, `region`, `star_rating`, `philosophy`, `certification_badges`, and `is_dts_verified`.
*   **`agency_itineraries`**
    *   **Purpose**: Specific pre-planned packages offered by agencies.
    *   **Stores**: `agency_id`, `title`, `price_per_person_pkr`, `duration`, `destination_tags`.

### 6. Notifications & Safety
System alerts and emergency functionality.

*   **`notifications`**: Stores alerts (MatchFound, ExpenseAlert, SOSAlert) for users.
*   **`safety_contacts`**: Stores emergency contact names and phone numbers linked to a user.

---

## Step-by-Step Implementation Guide

Follow these instructions to implement the database schema into your Supabase project.

### Step 1: Access the SQL Editor in Supabase
1. Go to your [Supabase Dashboard](https://app.supabase.com/) and open your project.
2. In the left-hand sidebar, click on **SQL Editor** (the icon looks like a terminal/code window with `>_`).
3. Click on **New Query**.

### Step 2: Run the Complete Schema Script
1. The codebase includes a full SQL script for all these tables. We have saved it locally at `supabase/schema.sql` in your project folder.
2. Open `supabase/schema.sql` in your VS Code/editor, copy all the contents, and paste them into the Supabase SQL Editor.
3. Click the **Run** button (usually at the bottom right) to execute the script.
4. *Verification:* Once finished, click on the **Table Editor** icon in the left sidebar to ensure all 17 tables have been created successfully.

### Step 3: Setup Environment Variables in the App
Now that your database is ready, you need to connect your frontend app to it using the keys you provided.

1. Open your project folder in VS Code.
2. Create a new file named `.env` in the root directory (at the same level as `package.json`).
3. Add the following lines to it, using your specific keys (note: we use `EXPO_PUBLIC_` so Expo knows to bundle them):

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_REF].supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ZT8H1Tv_HiXCjCN8jQh9Og_osWLDEY2

# You mentioned a secret key as well. The frontend ONLY uses the anon/publishable key.
# Keep the secret key (sb_secret_...) completely safe. If you have a Node backend later, it goes there.
```
*(Note: Ensure you replace `[YOUR_PROJECT_REF]` in the URL with your actual Supabase project reference ID, which you can find in your Supabase dashboard under Settings > API).*

### Step 4: Configure the Supabase Client in Code
1. Open `lib/supabase.ts`.
2. Ensure it is configured to use the environment variables. Replace its contents with:

```typescript
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key is missing. Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Step 5: (Optional) Enable Realtime for Chat
Since you are building a "Vibe Room" (chat feature):
1. In the Supabase Dashboard, go to **Database** > **Replication**.
2. Under "Source", click on "0 tables" (or the numbers of tables) next to `supabase_realtime`.
3. Toggle the switch ON for the `messages` and `polls` tables to allow your app to listen to live updates.
