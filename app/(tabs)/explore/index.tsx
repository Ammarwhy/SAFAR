import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Image, ImageBackground, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../../constants/Theme';
import { MOCK_EXPLORE } from '../../../constants/mockData';
import BottomTabBar from '../../../components/layouts/BottomTabBar';

export default function ExploreScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('MOUNTAINS');
  const { featured, categories, journeys, vicinityTravelers } = MOCK_EXPLORE;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(420).springify()} style={styles.searchWrap}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Where is your soul heading?"
            placeholderTextColor={Colors.textMuted}
          />
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, activeCategory === cat && styles.pillActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.pillText, activeCategory === cat && styles.pillTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>FEATURED ESCAPE</Text>
        <Animated.View entering={FadeInUp.delay(80).springify()}>
        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/explore/hunza-valley')}
        >
          <ImageBackground
            source={{ uri: featured.image }}
            style={styles.featuredImg}
            imageStyle={{ borderRadius: Radius.lg }}
          >
            <View style={styles.featuredOverlay}>
              <View style={styles.trendingBadge}>
                <Text style={styles.trendingText}>{featured.badge}</Text>
                <Text style={styles.trendingRegion}>  {featured.region}</Text>
              </View>
              <Text style={styles.featuredTitle}>{featured.title}</Text>
              <Text style={styles.featuredDesc}>{featured.description}</Text>
              <View style={styles.featuredActions}>
                <TouchableOpacity
                  style={styles.wishlistBtn}
                  onPress={() => router.push('/flows/wishlist')}
                >
                  <Text style={{ fontSize: 18 }}>♡</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.joinBtn} onPress={() => router.push('/(tabs)/journeys/new-journey')}>
                  <Text style={styles.joinText}>Join Expedition</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        </Animated.View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Curated Journeys</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/journeys/collection')}>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        <Animated.View entering={FadeInUp.delay(140).springify()}>
        <TouchableOpacity
          style={styles.journeyCard}
          activeOpacity={0.88}
          onPress={() => router.push('/(tabs)/explore/karakoram-chronicle')}
        >
          <Image source={{ uri: journeys[0].image }} style={styles.journeyImg} />
          <View style={styles.journeyBody}>
            <View style={styles.journeyTitleRow}>
              <Text style={styles.journeyTitle}>{journeys[0].title}</Text>
              <View style={styles.matchCountBadge}>
                <Text style={styles.matchCountText}>+{journeys[0].matchCount}</Text>
              </View>
            </View>
            <Text style={styles.journeyDesc}>{journeys[0].description}</Text>
            <View style={styles.journeyActions}>
              <TouchableOpacity
                style={styles.journeyActionBtn}
                onPress={() => router.push('/(tabs)/community')}
              >
                <Text style={styles.journeyActionText}>⊙ MATCH</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.journeyActionBtn}
                onPress={() => router.push('/flows/travel-tips')}
              >
                <Text style={styles.journeyActionText}>💡 TIPS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(180).springify()} style={styles.winterCard}>
          <Text style={styles.winterIcon}>✳</Text>
          <View style={styles.winterBody}>
            <Text style={styles.winterTitle}>Winter Treks</Text>
            <Text style={styles.winterDesc}>Master the art of cold exploration.</Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => router.push('/flows/winter-guide')}
            >
              <Text style={styles.browseBtnText}>BROWSE GUIDE</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.winterFigure}>🏔</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(220).springify()}>
        <TouchableOpacity
          style={styles.fullImgCard}
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/explore/desert-caravan-nights')}
        >
          <ImageBackground
            source={{ uri: journeys[1].image }}
            style={styles.fullImgBg}
            imageStyle={{ borderRadius: Radius.lg }}
          >
            <View style={styles.fullImgOverlay}>
              <Text style={styles.fullImgTitle}>{journeys[1].title}</Text>
              {journeys[1].subtitle && (
                <Text style={styles.fullImgSub}>{journeys[1].subtitle}</Text>
              )}
            </View>
          </ImageBackground>
        </TouchableOpacity>
        </Animated.View>

        <Text style={styles.vicinityLabel}>TRAVELERS IN YOUR VICINITY</Text>
        <Animated.View entering={FadeInUp.delay(260).springify()} style={styles.vicinityRow}>
          {vicinityTravelers.map((t) => (
            <TouchableOpacity key={t.id} style={styles.vicinityItem}
              onPress={() => router.push(`/traveler/${t.id}`)}>
              <Image source={{ uri: t.avatar }} style={styles.vicinityAvatar} />
              <Text style={styles.vicinityName}>{t.name}</Text>
              <Text style={styles.vicinityLoc}>{t.location}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <TouchableOpacity style={styles.fab} onPress={() => router.push('/(tabs)/journeys/new-journey')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.pill, marginHorizontal: Spacing.screen,
    marginTop: 16, marginBottom: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    ...Shadow.sm,
  },
  searchIcon: { marginRight: 8, fontSize: 15 },
  searchInput: { flex: 1, ...Typography.body, color: Colors.textPrimary },

  categoriesRow: { paddingHorizontal: Spacing.screen, paddingBottom: 4, gap: 8 },
  pill: {
    borderRadius: Radius.pill, paddingHorizontal: 14, paddingVertical: 7,
    backgroundColor: Colors.bgMuted, borderWidth: 1, borderColor: Colors.border,
    flexDirection: 'row', alignItems: 'center', gap: 5,
  },
  pillActive: { backgroundColor: Colors.brand, borderColor: Colors.brand },
  pillText: { ...Typography.label, color: Colors.textSecondary, fontSize: 11 },
  pillTextActive: { color: '#fff' },

  sectionLabel: { ...Typography.label, color: Colors.textMuted, marginHorizontal: Spacing.screen, marginTop: 16, marginBottom: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginHorizontal: Spacing.screen, marginTop: 20, marginBottom: 12 },
  sectionTitle: { ...Typography.h2, color: Colors.textPrimary },
  viewAll: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },

  featuredCard: { marginHorizontal: Spacing.screen, marginBottom: 8, borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.md },
  featuredImg: { width: '100%', height: 260, justifyContent: 'flex-end' },
  featuredOverlay: { padding: 16, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: Radius.lg },
  trendingBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.bgCard, borderRadius: Radius.pill,
    paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 8,
  },
  trendingText: { ...Typography.label, color: Colors.brand, fontSize: 10 },
  trendingRegion: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },
  featuredTitle: { ...Typography.h1, color: '#fff', marginBottom: 4 },
  featuredDesc: { ...Typography.bodyMd, color: 'rgba(255,255,255,0.85)', marginBottom: 12 },
  featuredActions: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  wishlistBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  joinBtn: {
    flex: 1, backgroundColor: Colors.bgMuted,
    borderRadius: Radius.pill, paddingVertical: 10, alignItems: 'center',
  },
  joinText: { ...Typography.h4, color: Colors.brand },

  journeyCard: {
    marginHorizontal: Spacing.screen, marginBottom: 12,
    backgroundColor: Colors.bgCard, borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.sm,
  },
  journeyImg: { width: '100%', height: 170 },
  journeyBody: { padding: 14 },
  journeyTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  journeyTitle: { ...Typography.h3, color: Colors.textPrimary },
  matchCountBadge: {
    backgroundColor: Colors.bgMuted, borderRadius: Radius.pill,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  matchCountText: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },
  journeyDesc: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 10 },
  journeyActions: { flexDirection: 'row', gap: 16 },
  journeyActionBtn: {},
  journeyActionText: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },

  winterCard: {
    marginHorizontal: Spacing.screen, marginBottom: 12,
    backgroundColor: Colors.bgMuted, borderRadius: Radius.lg,
    padding: 16, flexDirection: 'row', alignItems: 'center',
  },
  winterIcon: { fontSize: 24, marginRight: 12 },
  winterBody: { flex: 1 },
  winterTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: 2 },
  winterDesc: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 10 },
  browseBtn: {
    backgroundColor: Colors.brand, borderRadius: Radius.pill,
    paddingHorizontal: 14, paddingVertical: 7, alignSelf: 'flex-start',
  },
  browseBtnText: { ...Typography.label, color: '#fff', fontSize: 10 },
  winterFigure: { fontSize: 40, opacity: 0.2 },

  fullImgCard: { marginHorizontal: Spacing.screen, marginBottom: 8, borderRadius: Radius.lg, overflow: 'hidden', height: 180 },
  fullImgBg: { flex: 1, justifyContent: 'flex-end' },
  fullImgOverlay: { padding: 14, backgroundColor: 'rgba(0,0,0,0.4)' },
  fullImgTitle: { ...Typography.h2, color: '#fff' },
  fullImgSub: { ...Typography.label, color: 'rgba(255,255,255,0.8)', letterSpacing: 1.5 },

  vicinityLabel: { ...Typography.label, color: Colors.textMuted, marginHorizontal: Spacing.screen, marginTop: 20, marginBottom: 12, textAlign: 'center' },
  vicinityRow: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginHorizontal: Spacing.screen },
  vicinityItem: { alignItems: 'center', gap: 4 },
  vicinityAvatar: { width: 54, height: 54, borderRadius: 27, borderWidth: 2, borderColor: Colors.border },
  vicinityName: { ...Typography.bodySm, color: Colors.textPrimary, fontWeight: '600' },
  vicinityLoc: { ...Typography.label, color: Colors.textMuted, fontSize: 9 },

  fab: {
    position: 'absolute', bottom: 20, right: Spacing.screen,
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.brand, alignItems: 'center', justifyContent: 'center',
    ...Shadow.md,
  },
  fabText: { ...Typography.h2, color: '#fff', fontSize: 26, lineHeight: 28 },
});