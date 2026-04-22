import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Switch, SafeAreaView, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../../constants/Theme';
import { MOCK_USER } from '../../../constants/mockData';
import SafarHeader from '../../../components/layouts/SafarHeader';
import BottomTabBar from '../../../components/layouts/BottomTabBar';

export default function ProfileScreen() {
  const router = useRouter();
  const [is2FA, set2FA] = useState(MOCK_USER.is2FAEnabled);
  const [isFaceID, setFaceID] = useState(MOCK_USER.isFaceIDEnabled);

  const handleLogout = () => {
    router.push('/flows/logout-confirm');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <SafarHeader showAvatar={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(420).springify()} style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editBadge}
              onPress={() => router.push('/flows/profile-photo')}
            >
              <Text style={styles.editIcon}>✏</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{MOCK_USER.name}</Text>
          <Text style={styles.title}>{MOCK_USER.title}</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(70).springify()} style={styles.statsCard}>
          {[
            { val: MOCK_USER.countries, label: 'COUNTRIES' },
            { val: MOCK_USER.trips, label: 'TRIPS' },
            { val: `${(MOCK_USER.followers / 1000).toFixed(1)}k`, label: 'FOLLOWERS' },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <View style={styles.statDivider} />}
              <View style={styles.statItem}>
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(110).springify()} style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>ACCOUNT PREFERENCES</Text>
          {[
            {
              icon: '👤',
              label: 'Personal Information',
              onPress: () => router.push('/flows/personal-info'),
            },
            {
              icon: '💳',
              label: 'Payments & Payouts',
              onPress: () => router.push('/flows/payments-payouts'),
            },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.menuRow} onPress={item.onPress}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(150).springify()} style={styles.membershipCard}>
          <Text style={styles.sectionLabel}>MEMBERSHIP</Text>
          <Text style={styles.membershipStatus}>Not Verified</Text>
          <Text style={styles.membershipDesc}>
            Get verified to enjoy personalized matching, vibe-based rooms, and exclusive stays.
          </Text>
          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={() => router.push('/flows/verification')}
          >
            <Text style={styles.verifyBtnText}>Verify</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(190).springify()} style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>SECURITY</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Two-Factor</Text>
            <Switch
              value={is2FA}
              onValueChange={set2FA}
              trackColor={{ false: Colors.border, true: Colors.brand }}
              thumbColor="#fff"
            />
          </View>
          <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.toggleLabel}>Face ID</Text>
            <Switch
              value={isFaceID}
              onValueChange={setFaceID}
              trackColor={{ false: Colors.border, true: Colors.brand }}
              thumbColor="#fff"
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(230).springify()} style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>SUPPORT & TRANSPARENCY</Text>
          {[
            { icon: '❓', label: 'Get Help', onPress: () => router.push('/safety') },
            {
              icon: '📄',
              label: 'Privacy Policy',
              onPress: () => router.push('/flows/privacy-policy'),
            },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.menuRow} onPress={item.onPress}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(270).springify()}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOG OUT OF SAFAR</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.versionText}>VERSION 1.0.0 (ARCHES)</Text>
        <View style={{ height: 20 }} />
      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  avatarSection: { alignItems: 'center', paddingVertical: 20 },
  avatarWrap: { position: 'relative', marginBottom: 12 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: Colors.border },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: Colors.brand, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.bg,
  },
  editIcon: { fontSize: 12, color: '#fff' },
  name: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 4 },
  title: { ...Typography.label, color: Colors.textSecondary },

  statsCard: {
    marginHorizontal: Spacing.screen, backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg, padding: 16,
    flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16, ...Shadow.sm,
  },
  statItem: { alignItems: 'center' },
  statVal: { ...Typography.h2, color: Colors.textPrimary },
  statLabel: { ...Typography.label, color: Colors.textMuted, fontSize: 10 },
  statDivider: { width: 1, backgroundColor: Colors.border, alignSelf: 'stretch' },

  sectionCard: {
    marginHorizontal: Spacing.screen, backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg, padding: 16, marginBottom: 12, ...Shadow.sm,
  },
  sectionLabel: { ...Typography.label, color: Colors.textMuted, marginBottom: 12 },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  menuIcon: { fontSize: 18, width: 24 },
  menuLabel: { ...Typography.h4, color: Colors.textPrimary, flex: 1 },
  menuChevron: { fontSize: 20, color: Colors.textMuted },

  membershipCard: {
    marginHorizontal: Spacing.screen, backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg, padding: 16, marginBottom: 12, ...Shadow.sm,
  },
  membershipStatus: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 6 },
  membershipDesc: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 14 },
  verifyBtn: {
    backgroundColor: Colors.brand, borderRadius: Radius.full,
    paddingVertical: 12, alignItems: 'center',
  },
  verifyBtnText: { ...Typography.h4, color: '#fff' },

  toggleRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  toggleLabel: { ...Typography.h4, color: Colors.textPrimary },

  logoutBtn: {
    marginHorizontal: Spacing.screen, borderWidth: 1.5, borderColor: Colors.danger,
    borderRadius: Radius.full, paddingVertical: 14, alignItems: 'center', marginBottom: 12,
  },
  logoutText: { ...Typography.h4, color: Colors.danger },
  versionText: { ...Typography.caption, color: Colors.textMuted, textAlign: 'center', marginBottom: 8 },
});
