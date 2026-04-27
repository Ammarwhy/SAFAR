import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow, scale, vscale } from '../../../constants/Theme';
import { SWIPE_TRAVELERS, SwipeTraveler } from '../../../constants/mockData';
import SafarHeader from '../../../components/layouts/SafarHeader';
import BottomTabBar from '../../../components/layouts/BottomTabBar';
import SwipeCard, { SwipeCardRef } from '../../../components/community/SwipeCard';

const { width } = Dimensions.get('window');

export default function CommunityScreen() {
  const [deck, setDeck] = useState<SwipeTraveler[]>(SWIPE_TRAVELERS);
  const [matchOverlay, setMatchOverlay] = useState<SwipeTraveler | null>(null);
  const matchOpacity = useRef(new Animated.Value(0)).current;
  const cardRef = useRef<SwipeCardRef>(null);

  const topTraveler = deck[0];
  const nextTraveler = deck[1];

  useEffect(() => {
    if (matchOverlay) {
      Animated.sequence([
        Animated.timing(matchOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(2400),
        Animated.timing(matchOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => setMatchOverlay(null));
    }
  }, [matchOverlay, matchOpacity]);

  const handleSwipeLeft = () => {
    setDeck((prev) => prev.slice(1));
  };

  const handleSwipeRight = () => {
    const swiped = deck[0];
    setDeck((prev) => prev.slice(1));
    if (swiped?.mutualMatch) {
      setMatchOverlay(swiped);
    }
  };

  const resetDeck = () => {
    setDeck(SWIPE_TRAVELERS);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <SafarHeader title="COMMUNITY" subtitle="Swipe to Connect" />

      <View style={styles.content}>
        {topTraveler ? (
          <>
            <View style={styles.stackArea}>
              <SwipeCard
                ref={cardRef}
                topTraveler={topTraveler}
                nextTraveler={nextTraveler}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            </View>

            <View style={styles.actionRow}>
              <ActionBtn
                size={56}
                bg={Colors.bg}
                borderColor={Colors.brand}
                iconName="close"
                iconColor="#B44747"
                onPress={() => cardRef.current?.triggerSwipeLeft()}
              />
              <ActionBtn
                size={64}
                bg={Colors.brand}
                iconName="star"
                iconColor={Colors.textOnDark}
                onPress={() => cardRef.current?.triggerSwipeRight()}
              />
              <ActionBtn
                size={56}
                bg={Colors.brand}
                iconName="checkmark"
                iconColor={Colors.textOnDark}
                onPress={() => cardRef.current?.triggerSwipeRight()}
              />
            </View>
          </>
        ) : (
          <EmptyDeck onRefresh={resetDeck} />
        )}
      </View>

      {matchOverlay && (
        <Animated.View style={[styles.matchOverlay, { opacity: matchOpacity }]}>
          <Pressable style={styles.matchContent} onPress={() => setMatchOverlay(null)}>
            <Text style={styles.matchTitle}>It's a Match!</Text>
            <View style={styles.matchPhotos}>
              <View style={styles.matchPhotoWrap}>
                <Image
                  source={{ uri: 'https://picsum.photos/seed/you/200/200' }}
                  style={styles.matchPhoto}
                />
              </View>
              <View style={[styles.matchPhotoWrap, { marginLeft: -20 }]}>
                <Image
                  source={{ uri: matchOverlay.photo }}
                  style={styles.matchPhoto}
                />
              </View>
            </View>
            <Text style={styles.matchSub}>
              You and {matchOverlay.name} both want to travel together
            </Text>
            <View style={styles.matchActions}>
              <TouchableOpacity
                style={styles.matchStartBtn}
                onPress={() => setMatchOverlay(null)}
              >
                <Text style={styles.matchStartText}>Start Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.matchKeepBtn}
                onPress={() => setMatchOverlay(null)}
              >
                <Text style={styles.matchKeepText}>Keep Exploring</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Animated.View>
      )}

      <BottomTabBar />
    </SafeAreaView>
  );
}

function ActionBtn({
  size,
  bg,
  borderColor,
  iconName,
  iconColor,
  onPress,
}: {
  size: number;
  bg: string;
  borderColor?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.timing(scaleAnim, { toValue: 0.92, duration: 100, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.actionBtn,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bg,
            borderWidth: borderColor ? 2 : 0,
            borderColor: borderColor ?? 'transparent',
          },
        ]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={1}
      >
        <Ionicons name={iconName} size={size === 64 ? 28 : 24} color={iconColor} />
      </TouchableOpacity>
    </Animated.View>
  );
}

function EmptyDeck({ onRefresh }: { onRefresh: () => void }) {
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyIllustration}>
        <View style={styles.archOuter}>
          <View style={styles.archInner} />
        </View>
      </View>
      <Text style={styles.emptyTitle}>You've explored everyone nearby</Text>
      <Text style={styles.emptySub}>Check back soon for new travel partners</Text>
      <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
        <Text style={styles.refreshText}>Refresh Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  // content uses flex:1 — fills space between header and BottomTabBar
  content: { flex: 1 },

  stackArea: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },

  // action row sits naturally below the card
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(20),
    paddingTop: 12,
    paddingBottom: 16,
  },
  actionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },

  matchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(238,237,233,0.97)',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchContent: {
    alignItems: 'center',
    paddingHorizontal: scale(32),
  },
  matchTitle: {
    fontSize: scale(28),
    fontWeight: '800',
    color: Colors.brand,
    marginBottom: vscale(20),
    letterSpacing: 0.5,
  },
  matchPhotos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vscale(20),
  },
  matchPhotoWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: Colors.brand,
    overflow: 'hidden',
    ...Shadow.md,
  },
  matchPhoto: {
    width: '100%',
    height: '100%',
  },
  matchSub: {
    fontSize: scale(14),
    color: Colors.textBody,
    textAlign: 'center',
    lineHeight: scale(22),
    marginBottom: vscale(28),
  },
  matchActions: {
    width: '100%',
    gap: scale(12),
  },
  matchStartBtn: {
    backgroundColor: Colors.brand,
    borderRadius: Radius.button,
    height: vscale(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchStartText: {
    fontSize: scale(16),
    fontWeight: '700',
    color: Colors.textOnDark,
  },
  matchKeepBtn: {
    borderRadius: Radius.button,
    height: vscale(52),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.brand,
  },
  matchKeepText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: Colors.brand,
  },

  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(32),
  },
  emptyIllustration: {
    marginBottom: vscale(28),
  },
  archOuter: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    borderWidth: 2,
    borderColor: Colors.brand,
    opacity: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  archInner: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: Colors.bgMuted,
  },
  emptyTitle: {
    fontSize: scale(18),
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: scale(8),
  },
  emptySub: {
    fontSize: scale(13),
    color: Colors.textBody,
    textAlign: 'center',
    lineHeight: scale(20),
    marginBottom: vscale(24),
  },
  refreshBtn: {
    backgroundColor: Colors.brand,
    borderRadius: Radius.button,
    paddingHorizontal: scale(28),
    paddingVertical: vscale(14),
  },
  refreshText: {
    fontSize: scale(15),
    fontWeight: '700',
    color: Colors.textOnDark,
  },
});
