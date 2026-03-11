import { lazy, Suspense } from "react";
import { HobbiesHero } from "@/app/features/hobbies/components/hobbies-hero";
import { AnalogPhotos } from "@/app/features/hobbies/components/analog-photos";
import { Tattoos } from "@/app/features/hobbies/components/tattoos";
import { SeriesCarousel } from "@/app/features/hobbies/components/series-carousel";
import { HobbiesFooter } from "@/app/features/hobbies/components/hobbies-footer";

const TravelMap = lazy(() => import("@/app/features/hobbies/components/travel-map").then((m) => ({ default: m.TravelMap })));

export default function HobbiesHome() {
  return (
    <div className="w-full min-h-screen" style={{ background: "#f5f0e8" }}>
      <HobbiesHero />
      <AnalogPhotos />
      <Tattoos />
      <Suspense fallback={<div className="min-h-[420px] w-full" style={{ background: "#f5f0e8" }} />}>
        <TravelMap />
      </Suspense>
      <SeriesCarousel />
      <HobbiesFooter />
    </div>
  );
}
