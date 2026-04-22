import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Colors, Radius, Spacing } from "@/constants/Theme";

type SafarHeaderProps = {
  title?: string;
  subtitle?: string;
  showAvatar?: boolean;
};

export default function SafarHeader({
  title = "SAFAR",
  subtitle = "Discovery",
  showAvatar = true,
}: SafarHeaderProps) {
  return (
    <Animated.View entering={FadeInDown.duration(400).springify()} style={styles.wrap}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {showAvatar ? (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
        </View>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: Spacing.screen,
    marginTop: Spacing.md,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
  },
  subtitle: {
    color: Colors.textPrimary,
    marginTop: 3,
    opacity: 0.75,
    fontSize: 10,
    letterSpacing: 0.4,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.bgMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontWeight: "700",
    color: Colors.brand,
    fontSize: 11,
  },
});
