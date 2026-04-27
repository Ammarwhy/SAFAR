import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow, scale, vscale } from '../../constants/Theme';
import { SwipeTraveler } from '../../constants/mockData';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.88;
const CARD_HEIGHT = height * 0.58;
const PHOTO_HEIGHT = CARD_HEIGHT * 0.60;
const INFO_HEIGHT = CARD_HEIGHT * 0.40;
const SWIPE_THRESHOLD = width * 0.38;
const VELOCITY_THRESHOLD = 800;

export interface SwipeCardRef {
  triggerSwipeLeft: () => void;
  triggerSwipeRight: () => void;
}

interface Props {
  topTraveler: SwipeTraveler;
  nextTraveler?: SwipeTraveler;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeCard = forwardRef<SwipeCardRef, Props>(
  ({ topTraveler, nextTraveler, onSwipeLeft, onSwipeRight }, ref) => {
    const translateX = useSharedValue(0);
    const [expanded, setExpanded] = useState(false);

    const flyLeft = useCallback(() => {
      translateX.value = withTiming(-width * 1.5, { duration: 280 }, (done) => {
        if (done) runOnJS(onSwipeLeft)();
      });
    }, [onSwipeLeft, translateX]);

    const flyRight = useCallback(() => {
      translateX.value = withTiming(width * 1.5, { duration: 280 }, (done) => {
        if (done) runOnJS(onSwipeRight)();
      });
    }, [onSwipeRight, translateX]);

    useImperativeHandle(ref, () => ({
      triggerSwipeLeft: flyLeft,
      triggerSwipeRight: flyRight,
    }));

    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        translateX.value = e.translationX;
      })
      .onEnd((e) => {
        const movedFar = Math.abs(translateX.value) > SWIPE_THRESHOLD;
        const fastFling = Math.abs(e.velocityX) > VELOCITY_THRESHOLD;
        const wasTap =
          Math.abs(e.translationX) < 10 && Math.abs(e.translationY) < 10;

        if (wasTap) {
          translateX.value = withSpring(0, { stiffness: 200, damping: 20 });
          runOnJS(setExpanded)(true);
          return;
        }

        if (movedFar || fastFling) {
          if (translateX.value > 0) {
            translateX.value = withTiming(width * 1.5, { duration: 280 }, (done) => {
              if (done) runOnJS(onSwipeRight)();
            });
          } else {
            translateX.value = withTiming(-width * 1.5, { duration: 280 }, (done) => {
              if (done) runOnJS(onSwipeLeft)();
            });
          }
        } else {
          translateX.value = withSpring(0, { stiffness: 40, damping: 7 });
        }
      });

    const cardAnimStyle = useAnimatedStyle(() => {
      const rotate = (translateX.value / width) * 15;
      return {
        transform: [{ translateX: translateX.value }, { rotate: `${rotate}deg` }],
      };
    });

    const connectOpacity = useAnimatedStyle(() => ({
      opacity: Math.max(0, Math.min(translateX.value / 120, 1)),
    }));

    const passOpacity = useAnimatedStyle(() => ({
      opacity: Math.max(0, Math.min(-translateX.value / 120, 1)),
    }));

    const behindCardStyle = useAnimatedStyle(() => {
      const progress = Math.min(Math.abs(translateX.value) / SWIPE_THRESHOLD, 1);
      return {
        transform: [
          { scale: 0.95 + 0.05 * progress },
          { translateY: -8 + 8 * progress },
        ],
      };
    });

    return (
      <View style={styles.container}>
        {/* Behind card — fills container, scaled down */}
        {nextTraveler && (
          <Animated.View style={[StyleSheet.absoluteFill, styles.card, behindCardStyle]}>
            <Image
              source={{ uri: nextTraveler.photo }}
              style={styles.photo}
              resizeMode="cover"
            />
            <View style={styles.infoPanel}>
              <Text style={styles.name}>{nextTraveler.name}</Text>
            </View>
          </Animated.View>
        )}

        {/* Top card */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[StyleSheet.absoluteFill, styles.card, cardAnimStyle]}>
            {/* Drag labels */}
            <Animated.View style={[styles.overlayLabel, styles.connectLabel, connectOpacity]}>
              <Text style={styles.overlayText}>CONNECT ✓</Text>
            </Animated.View>
            <Animated.View style={[styles.overlayLabel, styles.passLabel, passOpacity]}>
              <Text style={styles.overlayText}>PASS ✗</Text>
            </Animated.View>

            <Image
              source={{ uri: topTraveler.photo }}
              style={styles.photo}
              resizeMode="cover"
            />

            {topTraveler.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#2F6F5E" />
              </View>
            )}

            <View style={styles.infoPanel}>
              {/* Row 1: name + compat badge */}
              <View style={styles.nameRow}>
                <Text style={styles.name} numberOfLines={1}>
                  {topTraveler.name}
                </Text>
                <View style={styles.compatBadge}>
                  <Text style={styles.compatText}>{topTraveler.compatibility}%</Text>
                </View>
              </View>

              {/* Row 2 */}
              <Text style={styles.ageCity} numberOfLines={1}>
                {topTraveler.age} · {topTraveler.city}
              </Text>

              {/* Row 3 */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll}>
                {topTraveler.travelStyle.slice(0, 3).map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText} numberOfLines={1}>{tag}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Row 4 */}
              <Text style={styles.bio} numberOfLines={2} ellipsizeMode="tail">
                {topTraveler.bio}
              </Text>
            </View>
          </Animated.View>
        </GestureDetector>

        <ExpandedProfile
          visible={expanded}
          traveler={topTraveler}
          onClose={() => setExpanded(false)}
          onConnect={() => {
            setExpanded(false);
            flyRight();
          }}
          onPass={() => {
            setExpanded(false);
            flyLeft();
          }}
        />
      </View>
    );
  }
);

SwipeCard.displayName = 'SwipeCard';
export default SwipeCard;

// ─── Expanded Profile Modal ───────────────────────────────────────────────────

interface ExpandedProfileProps {
  visible: boolean;
  traveler: SwipeTraveler;
  onClose: () => void;
  onConnect: () => void;
  onPass: () => void;
}

function ExpandedProfile({
  visible,
  traveler,
  onClose,
  onConnect,
  onPass,
}: ExpandedProfileProps) {
  const traitEntries = Object.entries(traveler.traits) as [string, number][];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={ep.container}>
        <TouchableOpacity style={ep.closeBtn} onPress={onClose} hitSlop={12}>
          <Ionicons name="close" size={20} color={Colors.brand} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Image source={{ uri: traveler.photo }} style={ep.photo} resizeMode="cover" />

          <View style={ep.body}>
            <View style={ep.headerRow}>
              <View style={ep.headerLeft}>
                <Text style={ep.name}>{traveler.name}</Text>
                <Text style={ep.meta}>
                  {traveler.age} · {traveler.city}
                  {traveler.verified ? '  ✓ Verified' : ''}
                </Text>
              </View>
              <View style={ep.compatCircle}>
                <Text style={ep.compatPct}>{traveler.compatibility}</Text>
                <Text style={ep.compatLabel}>Match</Text>
              </View>
            </View>

            <Text style={ep.bio}>{traveler.bio}</Text>

            <Text style={ep.sectionTitle}>Travel DNA</Text>
            {traitEntries.map(([trait, value]) => (
              <View key={trait} style={ep.traitRow}>
                <Text style={ep.traitLabel}>{trait}</Text>
                <View style={ep.traitTrack}>
                  <View style={[ep.traitFill, { width: `${value}%` }]} />
                </View>
                <Text style={ep.traitValue}>{value}</Text>
              </View>
            ))}

            <Text style={ep.sectionTitle}>Past Destinations</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={ep.destRow}
            >
              {traveler.pastDestinations.map((dest) => (
                <View key={dest} style={ep.destChip}>
                  <Text style={ep.destText}>{dest}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={ep.actions}>
              <TouchableOpacity style={ep.passBtn} onPress={onPass}>
                <Text style={ep.passBtnText}>Pass</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ep.connectBtn} onPress={onConnect}>
                <Text style={ep.connectBtnText}>Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    ...Shadow.lg,
  },
  photo: {
    width: CARD_WIDTH,
    height: PHOTO_HEIGHT,
  },
  compatBadge: {
    backgroundColor: '#371B17',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  compatText: {
    fontSize: scale(13),
    fontWeight: '700',
    color: '#F5F0E8',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.pill,
    padding: 5,
  },
  overlayLabel: {
    position: 'absolute',
    top: 36,
    zIndex: 10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: Radius.md,
    borderWidth: 2.5,
  },
  connectLabel: {
    left: 14,
    borderColor: '#2F6F5E',
    backgroundColor: 'rgba(47,111,94,0.85)',
  },
  passLabel: {
    right: 14,
    borderColor: '#B44747',
    backgroundColor: 'rgba(180,71,71,0.85)',
  },
  overlayText: {
    fontSize: scale(18),
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  infoPanel: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EEEDE9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: scale(5),
  },
  name: {
    fontSize: scale(18),
    fontWeight: '700',
    color: Colors.brand,
    lineHeight: scale(22),
  },
  ageCity: {
    fontSize: scale(13),
    color: Colors.textMuted,
    lineHeight: scale(17),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagsScroll: {
    flexGrow: 0,
  },
  tag: {
    borderWidth: 1,
    borderColor: Colors.brand,
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  tagText: {
    fontSize: scale(11),
    color: Colors.brand,
    fontWeight: '600',
  },
  bio: {
    width: '100%',
    fontSize: scale(13),
    color: Colors.textBody,
    fontStyle: 'italic',
    lineHeight: scale(19),
  },
  tapHint: {
    fontSize: scale(11),
    color: Colors.textMuted,
  },
});

const ep = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.pill,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  photo: {
    width: '100%',
    height: 220,
  },
  body: {
    padding: scale(20),
    paddingBottom: scale(40),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(12),
  },
  headerLeft: { flex: 1, paddingRight: scale(12) },
  name: {
    fontSize: scale(22),
    fontWeight: '700',
    color: Colors.brand,
  },
  meta: {
    fontSize: scale(13),
    color: Colors.textMuted,
    marginTop: 4,
  },
  compatCircle: {
    alignItems: 'center',
    backgroundColor: Colors.bgMuted,
    borderRadius: Radius.pill,
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
  },
  compatPct: {
    fontSize: scale(26),
    fontWeight: '800',
    color: Colors.brand,
  },
  compatLabel: {
    fontSize: scale(11),
    color: Colors.textMuted,
    fontWeight: '600',
  },
  bio: {
    fontSize: scale(14),
    color: Colors.textBody,
    lineHeight: scale(22),
    marginBottom: scale(20),
  },
  sectionTitle: {
    fontSize: scale(11),
    fontWeight: '700',
    color: Colors.brand,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: scale(10),
  },
  traitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginBottom: scale(10),
  },
  traitLabel: {
    width: scale(72),
    fontSize: scale(12),
    color: Colors.textBody,
    fontWeight: '600',
  },
  traitTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.bgMuted,
    borderRadius: 3,
    overflow: 'hidden',
  },
  traitFill: {
    height: 6,
    backgroundColor: Colors.brand,
    borderRadius: 3,
  },
  traitValue: {
    width: scale(28),
    fontSize: scale(11),
    color: Colors.textMuted,
    textAlign: 'right',
  },
  destRow: {
    gap: scale(8),
    paddingBottom: scale(16),
    paddingTop: scale(4),
  },
  destChip: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.pill,
    paddingHorizontal: scale(12),
    paddingVertical: scale(5),
  },
  destText: {
    fontSize: scale(12),
    color: Colors.textBody,
  },
  actions: {
    flexDirection: 'row',
    gap: scale(12),
    marginTop: scale(20),
  },
  passBtn: {
    flex: 1,
    height: vscale(48),
    borderRadius: Radius.button,
    borderWidth: 1.5,
    borderColor: Colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  passBtnText: {
    fontSize: scale(15),
    fontWeight: '700',
    color: Colors.brand,
  },
  connectBtn: {
    flex: 1,
    height: vscale(48),
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brand,
  },
  connectBtnText: {
    fontSize: scale(15),
    fontWeight: '700',
    color: Colors.textOnDark,
  },
});
