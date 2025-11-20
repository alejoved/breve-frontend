import React from "react";
import { AppOverviewSection } from "./sections/AppOverviewSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { FAQSection } from "./sections/FAQSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { HeroSection } from "./sections/HeroSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationSection } from "./sections/NavigationSection";
import { PricingSection } from "./sections/PricingSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { UserReviewsSection } from "./sections/UserReviewsSection";

export const LandingPage = (): JSX.Element => {
  return (
    <div className="bg-[#3d1c87] overflow-hidden w-full relative">
      <div className="absolute top-[4034px] left-[calc(50.00%_-_515px)] w-[1031px] h-[1031px] rounded-[515.5px] blur-[250px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,136,170,1)_0%,rgba(255,136,170,0)_100%)] pointer-events-none" />

      <div className="absolute top-[4944px] left-[calc(50.00%_-_1109px)] w-[2218px] h-[2218px] rounded-[1109px] blur-[283.92px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(153,97,212,1)_0%,rgba(153,97,212,0)_100%)] pointer-events-none" />

      <div className="absolute top-[63px] left-[calc(50.00%_-_870px)] w-[1740px] h-[1740px] rounded-[870px] blur-[250px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,136,170,1)_0%,rgba(255,136,170,0)_100%)] pointer-events-none" />

      <img
        className="absolute w-0 h-0 top-[33.64%] left-[14.91%]"
        alt="Vector"
        src="/vector-2.svg"
      />

      <img
        className="top-[33.68%] left-[15.44%] absolute w-0 h-0"
        alt="Vector"
        src="/vector.svg"
      />

      <img
        className="top-[33.64%] left-[15.53%] absolute w-0 h-0"
        alt="Vector"
        src="/vector-3.svg"
      />

      <img
        className="top-[37.13%] left-[57.00%] absolute w-0 h-0"
        alt="Vector"
        src="/vector-1.svg"
      />

      <div className="relative flex flex-col w-full">
        <CallToActionSection />
        <MainContentSection />
        <FeaturesSection />
        <PricingSection />
        <UserReviewsSection />
        <FAQSection />
        <TestimonialsSection />
        <HeroSection />
        <AppOverviewSection />
        <NavigationSection />
      </div>

      <footer className="w-full bg-[#52319b] relative">
        <div className="h-px" />
      </footer>

      <a
        href="https://wa.me/573002381340"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center animate-pulse-soft hover:scale-110 hover:shadow-2xl hover:rotate-[5deg] transition-all duration-300 ease-in-out group"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};
