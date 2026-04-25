import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const scale = (size: number) => (width / 390) * size;

export const Colors = {
  brand: "#371B17",
  accent: "#371B17",
  brandLight: "#8A5E4A",

  bg: "#EEEDE9",
  bgMuted: "#E5E1DA",
  bgCard: "#FAFAF8",

  textPrimary: "#251816",
  textSecondary: "#625654",
  textMuted: "#8A7060",
  textOnDark: "#F5F0E8",

  error: "#B44747",
  success: "#2F6F5E",
  match: "#5B6BF5",
  warning: "#A27245",
  danger: "#B44747",
  dangerDark: "#8B2020",
  dangerBg: "#F6E8E7",

  card: "#FAFAF8",
  surface: "#FAFAF8",

  border: "#D9D4CB",
  borderDark: "#BFB6AE",
  divider: "#D9D4CB",
  tabInactive: "#B0A090",
};

export const Typography = {
  display: {
    fontSize: 48,
    fontWeight: "700" as const,
    lineHeight: 56,
    letterSpacing: -0.5,
  },
  displayXl: {
    fontSize: 48,
    fontWeight: "700" as const,
    lineHeight: 56,
    letterSpacing: -0.5,
  },
  displayLg: {
    fontSize: 40,
    fontWeight: "700" as const,
    lineHeight: 48,
    letterSpacing: -0.3,
  },
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
    lineHeight: 40,
    letterSpacing: 0,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 36,
    letterSpacing: 0,
  },
  h3: {
    fontSize: 24,
    fontWeight: "700" as const,
    lineHeight: 32,
    letterSpacing: 0,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  bodyMd: {
    fontSize: 15,
    fontWeight: "400" as const,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  bodySm: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  label: {
    fontSize: 12,
    fontWeight: "600" as const,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: 11,
    fontWeight: "400" as const,
    lineHeight: 14,
    letterSpacing: 0.4,
  },
};

export const Spacing = {
  screen: 16,
  xs: 8,
  sm: 12,
  md: 16,
  button: 12,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  input: 10,
  button: 12,
  card: 16,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  full: 999,
  pill: 999,
};

export const Shadow = {
  sm: {
    shadowColor: "#371B17",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  md: {
    shadowColor: "#371B17",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: "#371B17",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
};
