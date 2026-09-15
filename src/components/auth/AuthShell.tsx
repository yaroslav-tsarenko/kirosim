import { Section, Container } from "@/components/ui/Section";
import { ChipMark } from "@/components/ui/Chip";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Auth pages are a single ruled panel on the porcelain canvas — no centred
 * card floating in a gradient. The chip mark sits above the heading so the
 * page is recognisably ours before a word is read.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  wide,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <Section band="concrete">
      <Container className="flex justify-center py-14 sm:py-20">
        <div className={cn("card-flat w-full p-6 sm:p-8", wide ? "max-w-xl" : "max-w-md")}>
          <ChipMark className="h-8 w-10" />
          <h1 className="t-h1 mt-5 text-ink">{title}</h1>
          <p className="mb-7 mt-3 text-sm leading-relaxed text-ink-muted">{subtitle}</p>
          {children}
          <p className="readout mt-8 border-t border-hairline pt-4 normal-case tracking-normal">
            {site.name} · {site.company}
          </p>
        </div>
      </Container>
    </Section>
  );
}
