import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, scale } from '@/constants/Theme';

export default function SplashScreen() {
  const router = useRouter();
  const wordmarkOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(wordmarkOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(400),
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const t = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => router.replace('/(auth)/login'));
    }, 2200);

    return () => clearTimeout(t);
  }, []);

  return (
    <Animated.View style={[styles.screen, { opacity: screenOpacity }]}>
      <View style={styles.archDecor} />
      <Animated.Text style={[styles.wordmark, { opacity: wordmarkOpacity }]}>
        SAFAR
      </Animated.Text>
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Every journey tells a story.
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  archDecor: {
    position: 'absolute',
    alignSelf: 'center',
    width: scale(180),
    height: scale(180),
    borderRadius: scale(90),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.borderDark,
    opacity: 0.35,
    top: '28%',
  },
  wordmark: {
    fontSize: scale(48),
    fontWeight: '700',
    color: Colors.brand,
    letterSpacing: 6,
    marginBottom: scale(16),
  },
  tagline: {
    fontSize: scale(13),
    fontWeight: '400',
    color: Colors.textMuted,
    letterSpacing: scale(2),
  },
});
