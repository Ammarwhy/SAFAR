import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "@/components/layouts/BottomTabBar";
import SafarHeader from "@/components/layouts/SafarHeader";
import ArchCard from "@/components/ui/ArchCard";
import { Colors, Spacing, Radius, Typography, Shadow } from "@/constants/Theme";

export default function DestinationDetailScreen() {
  const { destination } = useLocalSearchParams<{ destination: string }>();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.backRow}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <SafarHeader title="CURATED JOURNEYS" subtitle={destination?.toUpperCase() ?? "DESTINATION"} showAvatar={false} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>The Eternal <Text style={styles.italic}>Silk Road</Text></Text>
        <Text style={styles.body}>Discover ancient architectural marvels preserved through centuries of history.</Text>

        <ArchCard
          imageUri="https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80"
          title="Varanasi"
          subtitle="INDIA"
        />

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <ArchCard
              imageUri="https://images.unsplash.com/photo-1706980062378-ee1160f15195?auto=format&fit=crop&w=900&q=80"
              title="Petra"
              subtitle="THE ROSE CITY"
            />
          </View>
          <View style={styles.gridItem}>
            <ArchCard
              imageUri="https://images.unsplash.com/photo-1580654712603-eb43273aff33?auto=format&fit=crop&w=900&q=80"
              title="Bukhara"
              subtitle="SILK ROAD GEM"
            />
          </View>
        </View>

        <Text style={styles.archiveTitle}>Heritage Archives</Text>
        <View style={styles.archiveCard}>
          <Text style={styles.archiveVol}>VOL. 04</Text>
          <Text style={styles.archiveText}>Agra: Beyond the Marble</Text>
        </View>
        <View style={styles.archiveCard}>
          <Text style={styles.archiveVol}>VOL. 09</Text>
          <Text style={styles.archiveText}>Forgotten Kingdoms</Text>
        </View>
      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  backRow: {
    paddingHorizontal: Spacing.screen,
    paddingTop: 10,
    paddingBottom: 4,
  },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: 100 },
  title: { marginTop: Spacing.md, ...Typography.h1, color: Colors.brand },
  italic: { fontStyle: "italic" },
  body: { marginTop: 8, ...Typography.bodyMd, color: Colors.textMuted, marginBottom: Spacing.md, lineHeight: 22 },
  grid: { marginTop: Spacing.md, flexDirection: "row", gap: Spacing.sm },
  gridItem: { flex: 1 },
  archiveTitle: { marginTop: Spacing.md, ...Typography.h3, color: Colors.brand },
  archiveCard: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  archiveVol: { ...Typography.label, color: Colors.brand, marginBottom: 6 },
  archiveText: { ...Typography.bodyMd, color: Colors.textMuted, lineHeight: 19 },
});
