import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors, Radius, Shadow, Spacing, Typography } from "../../constants/Theme";

type FlowConfig = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
  cta: string;
};

const FLOWS: Record<string, FlowConfig> = {
  "profile-photo": {
    icon: "image-outline",
    title: "Profile Photo",
    description: "Upload, crop, and sync your traveler profile image across the app.",
    cta: "Open Media Picker",
  },
  "personal-info": {
    icon: "person-outline",
    title: "Personal Information",
    description: "Review and update your traveler details, contact info, and public profile fields.",
    cta: "Save Changes",
  },
  "payments-payouts": {
    icon: "card-outline",
    title: "Payments & Payouts",
    description: "Connect your payment method and configure payout preferences for bookings.",
    cta: "Set Up Payments",
  },
  verification: {
    icon: "shield-checkmark-outline",
    title: "Identity Verification",
    description: "Complete identity checks to unlock trusted matching and verified features.",
    cta: "Start Verification",
  },
  "privacy-policy": {
    icon: "document-text-outline",
    title: "Privacy Policy",
    description: "Review how your data is processed, stored, and protected within SAFAR.",
    cta: "View Full Policy",
  },
  "manage-docs": {
    icon: "folder-outline",
    title: "Trip Documents",
    description: "Organize permits, tickets, and IDs so your journey paperwork stays in one place.",
    cta: "Add Document",
  },
  "gear-list": {
    icon: "bag-outline",
    title: "Gear Checklist",
    description: "Track your expedition essentials and mark all items before departure.",
    cta: "Start Checklist",
  },
  wishlist: {
    icon: "heart-outline",
    title: "Wishlist",
    description: "Save this destination to your personal collection and revisit it anytime.",
    cta: "Save Destination",
  },
  "travel-tips": {
    icon: "bulb-outline",
    title: "Travel Tips",
    description: "Get practical route advice, local etiquette notes, and timing recommendations.",
    cta: "Read Tips",
  },
  "winter-guide": {
    icon: "snow-outline",
    title: "Winter Guide",
    description: "Explore cold-weather safety practices and route preparation essentials.",
    cta: "Open Guide",
  },
  "activity-history": {
    icon: "time-outline",
    title: "Activity History",
    description: "See your complete expense and settlement timeline with details per transaction.",
    cta: "Load Full Activity",
  },
  "vibe-map": {
    icon: "map-outline",
    title: "Shared Route Map",
    description: "View your group’s pinned route and navigation markers in one live map.",
    cta: "Open Map",
  },
  "attach-media": {
    icon: "attach-outline",
    title: "Attach Media",
    description: "Upload photos, clips, and notes directly into the current vibe conversation.",
    cta: "Choose File",
  },
  "emoji-reactions": {
    icon: "happy-outline",
    title: "Quick Reactions",
    description: "Pick emoji reactions for faster group responses without sending full messages.",
    cta: "Pick Reaction",
  },
  "community-filters": {
    icon: "options-outline",
    title: "Match Filters",
    description: "Tune your matching preferences to discover travelers aligned with your goals.",
    cta: "Apply Filters",
  },
  "community-persona": {
    icon: "person-circle-outline",
    title: "Persona Preferences",
    description: "Adjust the travel persona focus used by the matching engine.",
    cta: "Update Persona",
  },
  "agency-booking": {
    icon: "calendar-outline",
    title: "Booking Request",
    description: "Confirm your dates and traveler count to send a booking inquiry to the agency.",
    cta: "Send Booking Request",
  },
  "agency-contact": {
    icon: "chatbubble-outline",
    title: "Contact Agency",
    description: "Open direct messaging with this agency and discuss itinerary options.",
    cta: "Start Conversation",
  },
  "agency-call": {
    icon: "call-outline",
    title: "Call Agency",
    description: "Request a direct callback or connect to the agency hotline.",
    cta: "Request Callback",
  },
  "safety-checkin": {
    icon: "shield-outline",
    title: "Safety Check-in",
    description: "Set your expected return time and trigger auto-alerts if you miss check-in.",
    cta: "Configure Timer",
  },
  "safety-local-services": {
    icon: "medkit-outline",
    title: "Local Services",
    description: "Access nearby police, hospitals, and emergency response contacts.",
    cta: "View Nearby Services",
  },
  "safety-legal-help": {
    icon: "briefcase-outline",
    title: "Legal Support",
    description: "Reach legal and consular support resources for urgent situations.",
    cta: "Request Legal Help",
  },
  "safety-report": {
    icon: "warning-outline",
    title: "Report a Concern",
    description: "Submit a location concern report to help improve community safety.",
    cta: "Submit Report",
  },
  "logout-confirm": {
    icon: "log-out-outline",
    title: "Log Out",
    description: "You are about to end your SAFAR session and return to the login screen.",
    cta: "Log Out",
  },
  "sos-activated": {
    icon: "alert-circle-outline",
    title: "SOS Activated",
    description: "Emergency contacts and local authorities have been notified with your live location.",
    cta: "Return to Safety Center",
  },
  notifications: {
    icon: "notifications-outline",
    title: "Notifications",
    description: "Manage your alerts, journey reminders, and community update preferences.",
    cta: "Save Preferences",
  },
  settings: {
    icon: "settings-outline",
    title: "Settings",
    description: "Adjust app language, display options, and connected account integrations.",
    cta: "Save Settings",
  },
  "share-profile": {
    icon: "share-social-outline",
    title: "Share Profile",
    description: "Generate a shareable link to your traveler profile and curated collection.",
    cta: "Copy Link",
  },
  followers: {
    icon: "people-outline",
    title: "Followers",
    description: "Browse the travelers who follow your journeys and curations.",
    cta: "View All",
  },
  feedback: {
    icon: "chatbox-ellipses-outline",
    title: "Send Feedback",
    description: "Share suggestions, report issues, or tell us what you love about SAFAR.",
    cta: "Submit Feedback",
  },
  updates: {
    icon: "newspaper-outline",
    title: "All Updates",
    description: "View the full timeline of visa, route, and logistic updates for your active trips.",
    cta: "Mark All as Read",
  },
  "share-location": {
    icon: "location-outline",
    title: "Share Location",
    description: "Drop your current position as a pin into the group conversation.",
    cta: "Share Now",
  },
  "create-poll": {
    icon: "stats-chart-outline",
    title: "Create Poll",
    description: "Ask your vibe room a question and collect votes in real time.",
    cta: "Publish Poll",
  },
  "create-event": {
    icon: "calendar-outline",
    title: "Create Event",
    description: "Schedule a group activity and notify all vibe room members.",
    cta: "Create Event",
  },
  "trip-docs": {
    icon: "document-text-outline",
    title: "Trip Documents",
    description: "Access shared permits, tickets, and itinerary files for this journey.",
    cta: "Open Documents",
  },
};

export default function FlowScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ flow: string; name?: string }>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const flowKey = params.flow ?? "";
  const config = useMemo(
    () =>
      FLOWS[flowKey] ?? {
        icon: "construct-outline",
        title: "Flow Coming Soon",
        description: "This action is being finalized and will be available shortly.",
        cta: "Go Back",
      },
    [flowKey],
  );

  const itineraryName = typeof params.name === "string" ? params.name : "Selected Itinerary";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flow</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Ionicons name={config.icon} size={32} color={Colors.brand} style={styles.icon} />
          <Text style={styles.title}>{config.title}</Text>
          <Text style={styles.desc}>{config.description}</Text>
        </View>

        {flowKey === "personal-info" && (
          <View style={styles.formCard}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Traveler name" placeholderTextColor={Colors.textMuted} />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="you@safar.com" placeholderTextColor={Colors.textMuted} />
          </View>
        )}

        {flowKey === "agency-booking" && (
          <View style={styles.formCard}>
            <Text style={styles.label}>Selected Itinerary</Text>
            <Text style={styles.infoText}>{itineraryName}</Text>
            <Text style={styles.label}>Preferred Dates</Text>
            <TextInput style={styles.input} placeholder="e.g. 12 Aug – 20 Aug" placeholderTextColor={Colors.textMuted} />
            <Text style={styles.label}>Travelers</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 2" placeholderTextColor={Colors.textMuted} />
          </View>
        )}

        {flowKey === "attach-media" && (
          <View style={styles.formCard}>
            <Text style={styles.infoText}>Attach up to 10 images or short clips. Draft uploads are saved offline.</Text>
          </View>
        )}

        {flowKey === "emoji-reactions" && (
          <View style={styles.formCard}>
            <Text style={styles.infoText}>Tap a reaction to send it to the group instantly.</Text>
          </View>
        )}

        {flowKey === "safety-report" && (
          <View style={styles.formCard}>
            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} placeholder="Where did this happen?" placeholderTextColor={Colors.textMuted} />
            <Text style={styles.label}>Details</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Describe what happened"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        )}

        {flowKey === "forgot-password" && (
          <View style={styles.formCard}>
            <Text style={styles.label}>Account Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="traveler@safar.com" placeholderTextColor={Colors.textMuted} />
          </View>
        )}

        {flowKey === "create-account" && (
          <View style={styles.formCard}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor={Colors.textMuted} />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="you@safar.com" placeholderTextColor={Colors.textMuted} />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="••••••••" placeholderTextColor={Colors.textMuted} secureTextEntry />
          </View>
        )}

        {flowKey === "logout-confirm" && (
          <View style={styles.formCard}>
            <Text style={styles.infoText}>Your current session will be closed. You can sign back in anytime.</Text>
          </View>
        )}

        {flowKey === "sos-activated" && (
          <View style={styles.formCard}>
            <Text style={styles.infoText}>Stay calm and keep location services enabled while help is on the way.</Text>
          </View>
        )}

        <TouchableOpacity style={styles.cta} onPress={() => router.back()}>
          <Text style={styles.ctaText}>{config.cta}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.screen,
    paddingTop: 10,
    paddingBottom: 8,
  },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  content: { padding: Spacing.screen, gap: 12 },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.xl,
    padding: 20,
    ...Shadow.sm,
  },
  icon: { marginBottom: 10 },
  title: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 8 },
  desc: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22 },
  formCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    padding: 16,
    ...Shadow.sm,
  },
  label: { ...Typography.label, color: Colors.textSecondary, marginBottom: 6 },
  input: {
    backgroundColor: Colors.bgMuted,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  textArea: { minHeight: 96, textAlignVertical: "top" },
  infoText: { ...Typography.bodyMd, color: Colors.textSecondary, lineHeight: 20 },
  cta: {
    backgroundColor: Colors.brand,
    borderRadius: Radius.full,
    paddingVertical: 14,
    alignItems: "center",
  },
  ctaText: { ...Typography.h4, color: Colors.textOnDark },
});
