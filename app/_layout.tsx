import { Stack } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.webBg}>
        <View style={styles.mobileFrame}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  webBg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6E4DF",
  },
  mobileFrame: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? 420 : undefined,
    height: "100%",
    backgroundColor: "#EEEDE9",
    borderRadius: Platform.OS === "web" ? 24 : 0,
    overflow: "hidden",
    borderWidth: Platform.OS === "web" ? 1 : 0,
    borderColor: "#D6D2CC",
  },
});