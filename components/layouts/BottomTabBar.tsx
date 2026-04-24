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
        { label: "Explore", iconName: activeLabel === "Explore" ? "compass" : "compass-outline", href: "/(tabs)/explore", active: activeLabel === "Explore" },
        { label: "Journeys", iconName: activeLabel === "Journeys" ? "map" : "map-outline", href: "/(tabs)/journeys", active: activeLabel === "Journeys" },
        { label: "Community", iconName: activeLabel === "Community" ? "people" : "people-outline", href: "/(tabs)/community", active: activeLabel === "Community" },
        { label: "Messages", iconName: activeLabel === "Messages" ? "chatbubble" : "chatbubble-outline", href: "/(tabs)/messages", active: activeLabel === "Messages" },
        { label: "Profile", iconName: activeLabel === "Profile" ? "person" : "person-outline", href: "/(tabs)/profile", active: activeLabel === "Profile" },
      ]}
    />
  );
}
