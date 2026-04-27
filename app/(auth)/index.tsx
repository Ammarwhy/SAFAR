import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, scale } from '@/constants/Theme';

export default function SplashScreen() {
  const router = useRouter();
  const wordmarkOpacity = useRef(new Animated.Value(0)).current;
  const lineOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(wordmarkOpacity, {
        toValue: 1,
        duration: 900,
        delay: 0,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(lineOpacity, {
        toValue: 0.3,
        duration: 600,
        delay: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 600,
        delay: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    const t = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2400);

    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Animated.Text style={[styles.wordmark, { opacity: wordmarkOpacity }]}>
        SAFAR
      </Animated.Text>
      <Animated.View style={[styles.line, { opacity: lineOpacity }]} />
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Every journey tells a story.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {
    fontSize: scale(58),
    fontWeight: '800',
    color: Colors.brand,
    letterSpacing: scale(12),
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: undefined }),
  },
  line: {
    width: scale(40),
    height: 1,
    backgroundColor: Colors.brand,
    marginVertical: 16,
  },
  tagline: {
    fontSize: scale(13),
    color: Colors.textMuted,
    letterSpacing: scale(2),
    fontStyle: 'italic',
  },
});
