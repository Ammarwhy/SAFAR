import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Image, ImageBackground, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../../constants/Theme';
import { MOCK_EXPLORE, ExploreJourney } from '../../../constants/mockData';
import BottomTabBar from '../../../components/layouts/BottomTabBar';

type CategoryEntry = { headline: string; journeys: ExploreJourney[] };

const CATEGORY_DATA: Record<string, CategoryEntry> = {
  MOUNTAINS: {
    headline: 'Alpine Expeditions',
    journeys: [
      {
        title: 'Karakoram Chronicle',
        description: 'High passes, glacier viewpoints, and curated lodge stops.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80',
        matchCount: 18,
      },
      {
        title: 'Nanga Parbat Base',
        description: "Face the world's ninth-highest peak at its dramatic base camp.",
        image: 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?auto=format&fit=crop&w=1000&q=80',
        subtitle: 'DIAMIR FACE',
        matchCount: 7,
      },
    ],
  },
  HERITAGE: {
    headline: 'Cultural Corridors',
    journeys: [
      {
        title: 'Lahore Mughal Trail',
        description: "Follow the footsteps of emperors through Old Lahore's layered streets.",
        image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1000&q=80',
        matchCount: 14,
      },
      {
        title: 'Taxila Excavation Route',
        description: '2,500-year-old Buddhist ruins along the ancient Silk Road.',
        image: 'https://images.unsplash.com/photo-1706980062378-ee1160f15195?auto=format&fit=crop&w=1000&q=80',
        subtitle: 'RAWALPINDI DISTRICT',
        matchCount: 9,
      },
    ],
  },
  DESERT: {
    headline: 'Desert Routes',
    journeys: [
      {
        title: 'Desert Caravan Nights',
        description: 'Sandstone routes, stargazing camps, and craft bazaar detours.',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=80',
        subtitle: 'SINDH • THAR BELT',
        matchCount: 12,
      },
      {
        title: 'Cholistan Fortress Loop',
        description: 'Desert forts, nomadic culture, and golden dune ridges at dusk.',
        image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1000&q=80',
        matchCount: 6,
      },
    ],
  },
  LAKES: {
    headline: 'Lakeside Trails',
    journeys: [
      {
        title: 'Attabad Lake Route',
        description: 'Turquoise waters carved by history, with boats departing at dawn.',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80',
        matchCount: 11,
      },
      {
        title: 'Saif-ul-Malook Trek',
        description: 'Magical high-altitude lake beneath the Malika Parbat peak.',
        image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1000&q=80',
        subtitle: 'KAGHAN VALLEY',
        matchCount: 8,
      },
    ],
  },
  CITY: {
    headline: 'Urban Explorations',
    journeys: [
      {
        title: 'Lahore Old City Wander',
        description: 'Food streets, Mughal monuments, and buzzing evening bazaars.',
        image: 'https://images.unsplash.com/photo-1596881324451-600e1cb9f9d4?auto=format&fit=crop&w=1000&q=80',
        matchCount: 22,
      },
      {
        title: 'Karachi Coastal Loop',
        description: 'Clifton, Seaview, and the colonial quarter traced on foot.',
        image: 'https://images.unsplash.com/photo-1531501410720-c8d437636169?auto=format&fit=crop&w=1000&q=80',
        subtitle: 'SINDH COASTLINE',
        matchCount: 15,
      },
    ],
  },
};

export default function ExploreScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('MOUNTAINS');
  const [searchQuery, setSearchQuery] = useState('');
  const { featured, categories, journeys, vicinityTravelers } = MOCK_EXPLORE;
  const [isFeaturedFallback, setIsFeaturedFallback] = useState(false);

  const featuredFallbackUri = featured.fallbackImage ?? featured.image;
  const featuredImageSource = useMemo(() => {
    if (isFeaturedFallback && featuredFallbackUri) {
      return featuredFallbackUri;
    }
    return featured.image;
  }, [featured.image, featuredFallbackUri, isFeaturedFallback]);
  const featuredHighlights = featured.highlights?.slice(0, 3) ?? [];

  const baseJourneys = CATEGORY_DATA[activeCategory]?.journeys ?? journeys;
  const sectionHeadline = CATEGORY_DATA[activeCategory]?.headline ?? 'Curated Journeys';
  const filteredJourneys = searchQuery.trim()
    ? baseJourneys.filter((j) => j.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : baseJourneys;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Animated.View entering={FadeInDown.duration(280)} style={styles.searchWrap}>
          <Ionicons name="search-outline" size={16} color={Colors.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where is your soul heading?"
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
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
        <Animated.View entering={FadeInUp.delay(80).duration(280)}>
        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/explore/hunza-valley' as never)}
        >
          <ImageBackground
            source={{ uri: featuredImageSource }}
            style={styles.featuredImg}
            imageStyle={styles.featuredImgStyle}
            resizeMode="cover"
            onError={() => {
              if (!isFeaturedFallback && featuredFallbackUri && featuredFallbackUri !== featured.image) {
                setIsFeaturedFallback(true);
              }
            }}
          >
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredTopRow}>
                <View style={styles.trendingBadge}>
                  <Text style={styles.trendingText}>{featured.badge}</Text>
                  <Text style={styles.trendingRegion}>  {featured.region}</Text>
                </View>
                {featured.duration ? (
                  <View style={styles.featuredMeta}>
                    <Text style={styles.featuredMetaText}>{featured.duration}</Text>
                  </View>
                ) : null}
              </View>
              {featuredHighlights.length > 0 ? (
                <View style={styles.featuredHighlights}>
                  {featuredHighlights.map((item) => (
                    <View key={item} style={styles.featuredChip}>
                      <Text style={styles.featuredChipText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
              <Text style={styles.featuredTitle}>{featured.title}</Text>
              <Text style={styles.featuredDesc}>{featured.description}</Text>
              <View style={styles.featuredActions}>
                <TouchableOpacity
                  style={styles.wishlistBtn}
                  onPress={() => router.push('/flows/wishlist')}
                >
                  <Ionicons name="heart-outline" size={20} color={Colors.textMuted} />
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
          <Text style={styles.sectionTitle}>{sectionHeadline}</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/journeys/collection')}>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        {filteredJourneys.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="compass-outline" size={36} color={Colors.textMuted} style={{ marginBottom: 8 }} />
            <Text style={styles.emptyTitle}>No journeys found</Text>
            <Text style={styles.emptyDesc}>Try a different search term.</Text>
          </View>
        )}
        {filteredJourneys[0] && (
        <Animated.View entering={FadeInUp.delay(140).duration(280)}>
        <TouchableOpacity
          style={styles.journeyCard}
          activeOpacity={0.88}
          onPress={() => router.push('/(tabs)/explore/karakoram-chronicle' as never)}
        >
          <Image source={{ uri: filteredJourneys[0].image }} style={styles.journeyImg} />
          <View style={styles.journeyBody}>
            <View style={styles.journeyTitleRow}>
              <Text style={styles.journeyTitle}>{filteredJourneys[0].title}</Text>
              <View style={styles.matchCountBadge}>
                <Text style={styles.matchCountText}>+{filteredJourneys[0].matchCount}</Text>
              </View>
            </View>
            <Text style={styles.journeyDesc}>{filteredJourneys[0].description}</Text>
            <View style={styles.journeyActions}>
              <TouchableOpacity
                style={styles.journeyActionBtn}
                onPress={() => router.push('/(tabs)/community')}
              >
                <Text style={styles.journeyActionText}>MATCH</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.journeyActionBtn}
                onPress={() => router.push('/flows/travel-tips')}
              >
                <Text style={styles.journeyActionText}>TIPS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        </Animated.View>
        )}

        <Animated.View entering={FadeInUp.delay(180).duration(280)} style={styles.winterCard}>
          <Ionicons name="snow-outline" size={24} color={Colors.brand} style={{ marginRight: 12 }} />
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
        </Animated.View>

        {filteredJourneys[1] && (
        <Animated.View entering={FadeInUp.delay(220).duration(280)}>
        <TouchableOpacity
          style={styles.fullImgCard}
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/explore/desert-caravan-nights' as never)}
        >
          <ImageBackground
            source={{ uri: filteredJourneys[1].image }}
            style={styles.fullImgBg}
            imageStyle={{ borderRadius: Radius.lg }}
          >
            <View style={styles.fullImgOverlay}>
              <Text style={styles.fullImgTitle}>{filteredJourneys[1].title}</Text>
              {filteredJourneys[1].subtitle && (
                <Text style={styles.fullImgSub}>{filteredJourneys[1].subtitle}</Text>
              )}
            </View>
          </ImageBackground>
        </TouchableOpacity>
        </Animated.View>
        )}

        <Text style={styles.vicinityLabel}>TRAVELERS IN YOUR VICINITY</Text>
        <Animated.View entering={FadeInUp.delay(260).duration(280)} style={styles.vicinityRow}>
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

  featuredCard: { marginHorizontal: Spacing.screen, marginBottom: 8, borderRadius: Radius.lg, ...Shadow.md },
  featuredImg: { width: '100%', height: 280, justifyContent: 'flex-end', borderRadius: Radius.lg, overflow: 'hidden', backgroundColor: Colors.bgMuted },
  featuredImgStyle: { borderRadius: Radius.lg },
  featuredOverlay: { padding: 16, paddingTop: 80, backgroundColor: 'rgba(0,0,0,0.38)', borderBottomLeftRadius: Radius.lg, borderBottomRightRadius: Radius.lg },
  featuredTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  trendingBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.bgCard, borderRadius: Radius.pill,
    paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 8,
  },
  trendingText: { ...Typography.label, color: Colors.brand, fontSize: 10 },
  trendingRegion: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },
  featuredMeta: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  featuredMetaText: { ...Typography.label, color: '#fff', fontSize: 10, letterSpacing: 0.6 },
  featuredHighlights: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  featuredChip: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  featuredChipText: { ...Typography.label, color: '#fff', fontSize: 9, letterSpacing: 0.4 },
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
  winterBody: { flex: 1 },
  winterTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: 2 },
  winterDesc: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 10 },
  browseBtn: {
    backgroundColor: Colors.brand, borderRadius: Radius.pill,
    paddingHorizontal: 14, paddingVertical: 7, alignSelf: 'flex-start',
  },
  browseBtnText: { ...Typography.label, color: '#fff', fontSize: 10 },
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

  emptyState: { alignItems: 'center', padding: 32 },
  emptyTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 4 },
  emptyDesc: { ...Typography.bodyMd, color: Colors.textSecondary },
});