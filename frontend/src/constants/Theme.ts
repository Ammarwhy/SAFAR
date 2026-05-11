export const scale = (size: number) => size; // Web doesn't need scaling as much as mobile, or we use CSS rem/em
export const vscale = (size: number) => size;

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
  textBody: "#6B5344",
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
    fontSize: '48px',
    fontWeight: "700",
    lineHeight: '56px',
    letterSpacing: '-0.5px',
  },
  displayXl: {
    fontSize: '48px',
    fontWeight: "700",
    lineHeight: '56px',
    letterSpacing: '-0.5px',
  },
  displayLg: {
    fontSize: '40px',
    fontWeight: "700",
    lineHeight: '48px',
    letterSpacing: '-0.3px',
  },
  h1: {
    fontSize: '32px',
    fontWeight: "700",
    lineHeight: '40px',
    letterSpacing: '0px',
  },
  h2: {
    fontSize: '28px',
    fontWeight: "700",
    lineHeight: '36px',
    letterSpacing: '0px',
  },
  h3: {
    fontSize: '24px',
    fontWeight: "700",
    lineHeight: '32px',
    letterSpacing: '0px',
  },
  h4: {
    fontSize: '20px',
    fontWeight: "600",
    lineHeight: '28px',
    letterSpacing: '0px',
  },
  body: {
    fontSize: '16px',
    fontWeight: "400",
    lineHeight: '24px',
    letterSpacing: '0.3px',
  },
  bodyMd: {
    fontSize: '15px',
    fontWeight: "400",
    lineHeight: '22px',
    letterSpacing: '0.25px',
  },
  bodySm: {
    fontSize: '14px',
    fontWeight: "400",
    lineHeight: '20px',
    letterSpacing: '0.25px',
  },
  bodyMedium: {
    fontSize: '14px',
    fontWeight: "400",
    lineHeight: '20px',
    letterSpacing: '0.25px',
  },
  label: {
    fontSize: '12px',
    fontWeight: "600",
    lineHeight: '16px',
    letterSpacing: '0.5px',
  },
  caption: {
    fontSize: '11px',
    fontWeight: "400",
    lineHeight: '14px',
    letterSpacing: '0.4px',
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
  sm: '0 2px 12px rgba(55, 27, 23, 0.07)',
  md: '0 4px 12px rgba(55, 27, 23, 0.07)',
  lg: '0 6px 12px rgba(55, 27, 23, 0.07)',
};
