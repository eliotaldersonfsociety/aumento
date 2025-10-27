// app/page.tsx
"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PricingSelector } from "@/components/pricing-selector";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { initDemoData } from "@/lib/init-demo-data";
import { Gallery } from "@/components/gallery";
import { FAQ } from "@/components/faq";
import { useTranslation } from "react-i18next";

const FollowerGrowthSimulator = dynamic(() => import("@/components/FollowerGrowthSimulator"), {
  ssr: false,
  loading: () => (
    <div className="bg-white min-h-screen font-sans relative">
      {/* Header skeleton */}
      <div className="sticky top-0 bg-white z-10 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-4"></div>
        </div>
        <div className="flex space-x-4">
          <div className="h-5 bg-gray-200 rounded w-5"></div>
          <div className="h-5 bg-gray-200 rounded w-5"></div>
          <div className="h-5 bg-gray-200 rounded w-5"></div>
        </div>
      </div>

      {/* Profile skeleton */}
      <div className="px-4 py-4">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="flex space-x-6">
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="flex border-b mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1 p-3">
              <div className="h-6 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>

        {/* Posts grid skeleton */}
        <div className="grid grid-cols-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200"></div>
          ))}
        </div>
      </div>

      {/* Bottom navigation skeleton */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded w-6 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-8"></div>
          </div>
        ))}
      </div>
    </div>
  )
});

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    initDemoData();
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <section id="pricing">
        <PricingSelector />
      </section>
      <Gallery />
      <Features />
      
      {/* Sección del simulador con texto grande al lado */}
      <div className="px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 md:gap-12">
            {/* Texto grande */}
            <div className="flex-1">
              <h2 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-400 leading-tight animate-slide-in-left">
                {t("simulator.title")}
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl animate-slide-in-left">
                {t("simulator.description")}
              </p>
            </div>

            {/* Simulador */}
            <div className=" w-full max-w-lg animate-slide-in-right">
              <FollowerGrowthSimulator />
            </div>
          </div>
        </div>
      </div>

      <div id="faq" className="px-6 py-4 sm:px-8 sm:py-6 md:px-10 md:py-8">
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}