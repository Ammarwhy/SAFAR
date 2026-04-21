import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import ArchCard from "@/components/ui/ArchCard";
import { colors, spacing } from "@/constants/colors";
import { Link } from "expo-router";

const trips = [
	{
		id: "rajasthan",
		title: "The Royal Rajasthan Route",
		subtitle: "12 Days · Jaipur, Jodhpur, Udaipur",
		image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "kerala",
		title: "Kerala Backwaters",
		subtitle: "7 Days · Alleppey, Kumarakom",
		image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "varanasi",
		title: "Varanasi: The Eternal City",
		subtitle: "5 Days · Spiritual Heartland",
		image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "himalayan",
		title: "Himalayan Heights",
		subtitle: "14 Days · Leh, Ladakh, Spiti",
		image: "https://images.unsplash.com/photo-1615897577435-47d898f65f97?auto=format&fit=crop&w=900&q=80",
	},
];

export default function TripsCollectionScreen() {
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<HeritageHeader title="CURATED JOURNEYS" subtitle="Collection" />
			<Text style={styles.title}>Trips Collection</Text>
			{trips.map((trip) => (
				<View key={trip.id} style={styles.cardWrap}>
					<ArchCard
						imageUri={trip.image}
						title={trip.title}
						subtitle={trip.subtitle}
						badge="CACHED"
					/>
				</View>
			))}

			<View style={styles.ctaCard}>
				<Text style={styles.ctaTitle}>Expanding your horizon?</Text>
				<Link href="/(tabs)/journeys/new-journey" asChild>
					<Pressable style={styles.ctaButton}>
						<Text style={styles.ctaButtonText}>New Journey</Text>
					</Pressable>
				</Link>
			</View>

			<FrameBottomNav
				items={[
					{ label: "Explore", active: true },
					{ label: "Community" },
					{ label: "People" },
					{ label: "Messages" },
					{ label: "Profile" },
				]}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.backgroundCream },
	content: { padding: spacing.md, paddingBottom: spacing.xl },
	title: { marginTop: spacing.md, fontSize: 28, fontWeight: "700", color: colors.primaryBlue },
	cardWrap: { marginBottom: spacing.md },
	ctaCard: {
		backgroundColor: "#EFE4D1",
		borderRadius: 16,
		padding: spacing.md,
		marginTop: spacing.sm,
	},
	ctaTitle: {
		color: colors.primaryBlue,
		fontSize: 18,
		fontWeight: "700",
		marginBottom: spacing.sm,
	},
	ctaButton: {
		backgroundColor: colors.primaryBlue,
		paddingVertical: 11,
		borderRadius: 999,
		alignItems: "center",
	},
	ctaButtonText: {
		color: colors.cardWhite,
		fontWeight: "700",
	},
});
