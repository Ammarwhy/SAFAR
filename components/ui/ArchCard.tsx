import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Radius, Spacing, Typography } from "@/constants/Theme";

type ArchCardProps = {
  imageUri: string;
  title: string;
  subtitle?: string;
  badge?: string;
  onPress?: () => void;
};

export default function ArchCard({ imageUri, title, subtitle, badge, onPress }: ArchCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.archWrap}>
        <ImageBackground source={{ uri: imageUri }} style={styles.image} imageStyle={styles.archImage}>
          {badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ) : null}
        </ImageBackground>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  archWrap: {
    backgroundColor: Colors.brand,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  image: {
    height: 170,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  archImage: {
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  badge: {
    margin: Spacing.sm,
    backgroundColor: Colors.success,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  badgeText: {
    color: Colors.bgCard,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  body: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  title: {
    ...Typography.h4,
    color: Colors.brand,
  },
  subtitle: {
    ...Typography.bodyMd,
    color: Colors.textMuted,
  },
});
