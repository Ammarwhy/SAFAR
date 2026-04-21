import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import { usePathname } from "expo-router";

export default function BottomTabBar() {
  const pathname = usePathname();

  const activeLabel = pathname.includes("/profile")
    ? "Profile"
    : pathname.includes("/messages")
      ? "Messages"
      : pathname.includes("/community")
        ? "People"
        : pathname.includes("/explore")
          ? "Search"
          : "Compass";

  return (
    <FrameBottomNav
      items={[
        { label: "Compass", active: activeLabel === "Compass" },
        { label: "Search", active: activeLabel === "Search" },
        { label: "People", active: activeLabel === "People" },
        { label: "Messages", active: activeLabel === "Messages" },
        { label: "Profile", active: activeLabel === "Profile" },
      ]}
    />
  );
}
