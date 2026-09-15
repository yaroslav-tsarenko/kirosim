import visa from "@/assets/visa.svg";
import mastercard from "@/assets/mastercard.svg";
import pciDss from "@/assets/pci-dss.svg";
import { cn } from "@/lib/utils";

const marks = [
  { src: visa, alt: "Visa" },
  { src: mastercard, alt: "Mastercard" },
  { src: pciDss, alt: "PCI DSS compliant" },
];

/** Payment marks keep their own white plate so the brand logos stay legible
 *  on the graphite footer band. */
export function PaymentMarks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {marks.map((m) => (
        <li key={m.alt} className="grid h-7 place-items-center rounded-xs bg-white px-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.src.src} alt={m.alt} className="h-4 w-auto" />
        </li>
      ))}
    </ul>
  );
}
