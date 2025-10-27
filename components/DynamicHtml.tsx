"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DynamicHtmlProps {
  children: React.ReactNode;
}

export function DynamicHtml({ children }: DynamicHtmlProps) {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("es");

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  return (
    <html lang={lang}>
      {children}
    </html>
  );
}