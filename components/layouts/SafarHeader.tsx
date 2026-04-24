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
    <Animated.View entering={FadeInDown.duration(280)} style={styles.wrap}>
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
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: Colors.bg,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
