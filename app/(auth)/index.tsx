import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/Theme';

// Mountain SVG-like logo using pure RN shapes
function MountainLogo() {
  return (
    <View style={logoStyles.container}>
      {/* Large peak */}
      <View style={logoStyles.peakLarge} />
      {/* Small peak (left foreground) */}
      <View style={logoStyles.peakSmall} />
    </View>
  );
}

export default function SplashScreen() {
  const router = useRouter();

  // Auto-navigate to login after 2.5s (can also tap)
  useEffect(() => {
    const t = setTimeout(() => router.replace('/(auth)/login'), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <TouchableOpacity
      style={styles.screen}
      activeOpacity={1}
      onPress={() => router.replace('/(auth)/login')}
    >
      {/* Decorative circle behind logo */}
      <View style={styles.logoCircle}>
        <MountainLogo />
      </View>

      {/* Wordmark */}
      <Text style={styles.wordmark}>SAFAR</Text>

      {/* Tagline with decorative lines */}
      <View style={styles.taglineRow}>
        <View style={styles.taglineLine} />
        <Text style={styles.tagline}>HAR SAFAR TERA APNA</Text>
        <View style={styles.taglineLine} />
      </View>

      {/* Bottom decorative circle (partially visible) */}
      <View style={styles.bottomDecor} />

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.statBar} />
          <Text style={styles.statLabel}>ALTITUDE</Text>
          <Text style={styles.statValue}>2,430M</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={[styles.statBar, { backgroundColor: Colors.border }]} />
          <Text style={styles.statLabel}>HORIZON</Text>
          <Text style={styles.statValue}>INFINITE</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.screen,
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.bgMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  wordmark: {
    ...Typography.displayXl,
    color: Colors.brand,
    marginBottom: 20,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 80,
  },
  taglineLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderDark,
  },
  tagline: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  bottomDecor: {
    position: 'absolute',
    bottom: -120,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: Colors.bgMuted,
    opacity: 0.5,
  },
  statsRow: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statBar: {
    width: 36,
    height: 2,
    backgroundColor: Colors.brand,
    borderRadius: 1,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.label,
    color: Colors.textMuted,
    fontSize: 10,
  },
  statValue: {
    ...Typography.h4,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    alignSelf: 'stretch',
  },
});

const logoStyles = StyleSheet.create({
  container: {
    width: 70,
    height: 50,
    position: 'relative',
    alignItems: 'center',
  },
  peakLarge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 28,
    borderRightWidth: 28,
    borderBottomWidth: 50,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.brand,
  },
  peakSmall: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 36,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.brand,
  },
});