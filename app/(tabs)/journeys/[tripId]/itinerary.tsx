import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ItineraryScreen() {
	const { tripId } = useLocalSearchParams<{ tripId: string }>();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Itinerary</Text>
			<Text style={styles.body}>Trip: {tripId ?? "unknown"}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#EEEDE9", padding: 24 },
	title: { fontSize: 28, fontWeight: "700", color: "#371B17" },
	body: { marginTop: 8, color: "#7B716D" },
});
