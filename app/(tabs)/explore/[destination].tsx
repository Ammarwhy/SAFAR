import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomTabBar from "@/components/layouts/BottomTabBar";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import ArchCard from "@/components/ui/ArchCard";
import { colors, spacing } from "@/constants/colors";

export default function DestinationDetailScreen() {
	const { destination } = useLocalSearchParams<{ destination: string }>();

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<HeritageHeader title="CURATED JOURNEYS" subtitle={destination?.toUpperCase() ?? "DESTINATION"} />
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

			<BottomTabBar />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.backgroundCream },
	content: { padding: spacing.md, paddingBottom: spacing.xl },
	title: { marginTop: spacing.md, color: colors.primaryBlue, fontSize: 30, fontWeight: "700" },
	italic: { fontStyle: "italic" },
	body: { marginTop: 8, color: colors.textMuted, marginBottom: spacing.md, lineHeight: 22 },
	grid: { marginTop: spacing.md, flexDirection: "row", gap: spacing.sm },
	gridItem: { flex: 1 },
	archiveTitle: { marginTop: spacing.md, color: colors.primaryBlue, fontSize: 18, fontWeight: "700" },
	archiveCard: {
		marginTop: spacing.sm,
		backgroundColor: colors.cardWhite,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.borderSoft,
		padding: spacing.md,
	},
	archiveVol: { color: colors.primaryBlue, fontWeight: "700", marginBottom: 6 },
	archiveText: { color: colors.textMuted, lineHeight: 19 },
});
