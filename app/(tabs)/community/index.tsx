import { StyleSheet, Text, View } from "react-native";

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community</Text>
      <Text style={styles.body}>Match discovery will be built in the next step.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F5F0E8" },
  title: { fontSize: 28, fontWeight: "700", color: "#1A3A6E" },
  body: { marginTop: 8, color: "#8E8E93" },
});