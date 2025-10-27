"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export function FAQ() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto glass-card px-6 py-4 sm:px-8 sm:py-6 md:px-10 md:py-8 rounded-3xl shadow-xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
        {t("faq.title")}
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-3 sm:space-y-4"
      >
        <AccordionItem
          value="item-1"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            {t("faq.question1")}
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            {t("faq.answer1")}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            {t("faq.question2")}
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            {t("faq.answer2")}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            {t("faq.question3")}
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            {t("faq.answer3")}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            {t("faq.question4")}
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            {t("faq.answer4")}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            {t("faq.question5")}
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            {t("faq.answer5")}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-6"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            {t("faq.question6")}
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            {t("faq.answer6")}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-7"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            {t("faq.question7")}
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            {t("faq.answer7")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
