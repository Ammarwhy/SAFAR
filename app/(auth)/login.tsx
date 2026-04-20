import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.body}>Authentication will be built in the next step.</Text>
      <Link href="/(tabs)" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue to App</Text>
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
    padding: 24,
    backgroundColor: "#F5F0E8",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A3A6E",
  },
  body: {
    marginTop: 12,
    marginBottom: 24,
    color: "#8E8E93",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1A3A6E",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
});