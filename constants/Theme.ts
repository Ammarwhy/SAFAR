/**
 * Unified design system theme constants
 * Includes Colors, Typography, Spacing, and Radius
 */

export const Colors = {
  // Brand colors
  brand: "#1A3A6E", // Primary blue
  accent: "#C8A96E", // Gold accent
  
  // Background colors
  bg: "#F5F0E8", // Cream background
  bgMuted: "#E9E4DA", // Muted background (for decorative elements)
  bgCard: "#FFFFFF", // Card background
  
  // Text colors
  textPrimary: "#1C1C1E", // Dark text
  textSecondary: "#8E8E93", // Muted text
  textMuted: "#A0A0A0", // Light muted text
  
  // Status colors
  error: "#D32F2F",
  success: "#4CAF50",
  warning: "#FF9800",
  danger: "#D32F2F", // Red error color
  dangerBg: "#FFE5E5", // Light red background
  
  // Card & surface colors
  card: "#FFFFFF",
  surface: "#FAFAFA",
  
  // Border colors
  border: "#E3DACD",
  borderDark: "#D0C5B8",
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
  screen: 16, // Standard screen padding
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
};

export const Shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 8,
  },
};
