import { StyleSheet, Text, View } from "react-native";
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
    <View style={styles.wrap}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {showAvatar ? (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>◉</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: Spacing.screen,
    marginTop: Spacing.md,
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  subtitle: {
    color: Colors.textPrimary,
    marginTop: 3,
    opacity: 0.75,
    fontSize: 11,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontWeight: "700",
    color: Colors.brand,
    fontSize: 10,
  },
});
