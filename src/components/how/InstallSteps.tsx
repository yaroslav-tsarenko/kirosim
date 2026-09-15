import { Tabs } from "@/components/ui/Tabs";
import { site } from "@/lib/site";

const ios = [
  "Open Settings → Mobile Service → Add eSIM.",
  "Tap “Use QR Code” and scan the code from your confirmation.",
  `Label the plan (e.g. “${site.name} Japan”) and continue.`,
  `Turn on Data Roaming for the ${site.name} line — this uses the local network, not your home carrier.`,
  `Set ${site.name} as your Mobile Data line and you're online.`,
];

const android = [
  "Open Settings → Network & internet → SIMs.",
  "Tap “Add eSIM” / “Download a SIM instead”.",
  "Scan the QR code from your confirmation email.",
  `Enable the ${site.name} eSIM and turn on Roaming for that SIM.`,
  `Select ${site.name} for mobile data and you're connected.`,
];

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="border-t border-hairline">
      {steps.map((s, i) => (
        <li key={i} className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-hairline py-3.5">
          <span className="index-num pt-1">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-pretty text-ink">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export function InstallSteps() {
  return (
    <Tabs
      tabs={[
        { id: "ios", label: "iPhone (iOS)", content: <StepList steps={ios} /> },
        { id: "android", label: "Android", content: <StepList steps={android} /> },
      ]}
    />
  );
}
