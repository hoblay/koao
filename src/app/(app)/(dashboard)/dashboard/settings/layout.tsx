import { SettingsSidebar } from "./_components/SettingsSideBar";
import { SettingsViews } from "./_components/SettingsViews";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <SettingsSidebar />
      <SettingsViews>{children}</SettingsViews>
    </div>
  );
}
