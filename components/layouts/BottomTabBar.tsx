import FrameBottomNav from "@/components/layouts/FrameBottomNav";

export default function BottomTabBar() {
  return (
    <FrameBottomNav
      items={[
        { label: "Compass" },
        { label: "Search" },
        { label: "People", active: true },
        { label: "Messages" },
        { label: "Profile" },
      ]}
    />
  );
}
