import { Section, Container, SectionHead } from "@/components/ui/Section";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { TextLink } from "@/components/ui/Button";
import { Marked } from "@/components/ui/Plate";
import { generalFaq } from "@/lib/data/faq";

export function FaqSection({
  items = generalFaq,
  title,
}: {
  items?: AccordionItem[];
  title?: React.ReactNode;
}) {
  return (
    <Section band="porcelain" id="faq">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <SectionHead
            index={4}
            eyebrow="FAQ"
            title={title ?? <>Questions, <Marked>answered.</Marked></>}
            lede="Everything worth knowing before you fly. If something is missing, the support desk answers in minutes, in any time zone."
            aside={<TextLink href="/help">Help centre</TextLink>}
          />
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}
