import IgnorePatternsCard from "../components/settings/IgnorePatternsCard";
import DefaultsCard from "../components/settings/DefaultsCard";
import PreferencesCard from "../components/settings/PreferencesCard";
import ClearHistoryCard from "../components/settings/ClearHistoryCard";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="grid grid-cols-2 gap-8">
        <IgnorePatternsCard />
        <DefaultsCard />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <PreferencesCard />
        <ClearHistoryCard />
      </div>
    </div>
  );
}
