import { HobbiesHero } from "@/app/features/hobbies/components/hobbies-hero";
import { AnalogPhotos } from "@/app/features/hobbies/components/analog-photos";
import { Tattoos } from "@/app/features/hobbies/components/tattoos";
import { SeriesCarousel } from "@/app/features/hobbies/components/series-carousel";
import { HobbiesFooter } from "@/app/features/hobbies/components/hobbies-footer";

export default function HobbiesHome() {
  return (
    <main id="main-content" className="w-full min-h-screen" style={{ background: "#f5f0e8" }}>
      <HobbiesHero />
      <AnalogPhotos />
      <Tattoos />
      <SeriesCarousel />
      <HobbiesFooter />
    </main>
  );
}
