import { StyleSheet, Text, View } from "react-native";

export default function SafetyCenterScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Safety Center</Text>
			<Text style={styles.body}>SOS and local authority tools will live here.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F5F0E8", padding: 24 },
	title: { fontSize: 28, fontWeight: "700", color: "#1A3A6E" },
	body: { marginTop: 8, color: "#8E8E93", textAlign: "center" },
});
