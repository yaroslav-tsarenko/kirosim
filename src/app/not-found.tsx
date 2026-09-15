import { Section, Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { ChipOutline } from "@/components/ui/Chip";
import { Marked } from "@/components/ui/Plate";

export default function NotFound() {
  return (
    <Section band="porcelain">
      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl">
          <ChipOutline className="h-12 w-16 text-hairline-strong" />
          <p className="eyebrow mt-6">Error 404 · no signal here</p>
          <h1 className="t-hero mt-4 text-ink">
            This page is <Marked>off</Marked> the map.
          </h1>
          <p className="mt-5 max-w-[48ch] text-pretty leading-relaxed text-ink-muted">
            Whatever was here has moved or never existed. Pick a destination instead — that is
            almost certainly what you came for.
          </p>
          <div className="relative z-30 mt-8 max-w-xl">
            <DestinationSearch size="lg" />
          </div>
          <div className="mt-6">
            <ButtonLink href="/" variant="outline">Back to home</ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
