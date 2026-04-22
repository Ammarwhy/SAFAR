import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import { usePathname } from "expo-router";

export default function BottomTabBar() {
  const pathname = usePathname();

  const activeLabel = pathname.includes("/profile")
    ? "Profile"
    : pathname.includes("/messages")
      ? "Messages"
      : pathname.includes("/community")
        ? "Community"
        : pathname.includes("/explore") || pathname.includes("/traveler") || pathname.includes("/agencies")
          ? "Explore"
          : "Journeys";

  return (
    <FrameBottomNav
      items={[
        { label: "Explore", icon: "◇", href: "/(tabs)/explore", active: activeLabel === "Explore" },
        { label: "Journeys", icon: "▣", href: "/(tabs)/journeys", active: activeLabel === "Journeys" },
        { label: "Community", icon: "◌", href: "/(tabs)/community", active: activeLabel === "Community" },
        { label: "Messages", icon: "✉", href: "/(tabs)/messages", active: activeLabel === "Messages" },
        { label: "Profile", icon: "◉", href: "/(tabs)/profile", active: activeLabel === "Profile" },
      ]}
    />
  );
}
