import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.brand}>SAFAR</Text>
      <Text style={styles.subtitle}>Curated Journeys • Timeless Routes</Text>
      <Link href="/(auth)/login" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Begin Exploration</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A3A6E",
    padding: 24,
  },
  brand: {
    color: "#F5F0E8",
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: 4,
  },
  subtitle: {
    color: "#F5F0E8",
    marginTop: 12,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#C8A96E",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
  },
  buttonText: {
    color: "#1C1C1E",
    fontWeight: "700",
  },
});