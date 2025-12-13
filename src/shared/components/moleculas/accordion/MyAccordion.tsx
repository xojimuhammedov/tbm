import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { ReactNode } from "react";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
}

const MyAccordion = ({ title = "", children }: AccordionProps) => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value={`custom-accordion`} className={"border-0"}>
          <AccordionTrigger className={"bg-item-tertiary p-2 mt-2 rounded-lg"}>
            {title}
          </AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default MyAccordion;
