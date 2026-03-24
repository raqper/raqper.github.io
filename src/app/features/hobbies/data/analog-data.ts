// England
import england1 from "@/assets/analog/england/england_1.jpg";
import england2 from "@/assets/analog/england/england_2.jpg";
import england3 from "@/assets/analog/england/england_3.jpg";
import england4 from "@/assets/analog/england/england_4.jpg";
import england5 from "@/assets/analog/england/england_5.jpg";
import england6 from "@/assets/analog/england/england_6.jpg";

// France
import paris1 from "@/assets/analog/france/paris_1.jpg";
import paris2 from "@/assets/analog/france/paris_2.jpg";
import paris3 from "@/assets/analog/france/paris_3.jpg";
import paris4 from "@/assets/analog/france/paris_4.jpg";
import paris5 from "@/assets/analog/france/paris_5.jpg";

// Greece
import greece1 from "@/assets/analog/greece/greece_1.jpg";
import greece2 from "@/assets/analog/greece/greece_2.jpg";
import greece3 from "@/assets/analog/greece/greece_3.jpg";
import greece4 from "@/assets/analog/greece/greece_4.jpg";
import greece5 from "@/assets/analog/greece/greece_5.jpg";
import greece6 from "@/assets/analog/greece/greece_6.jpg";
import greece7 from "@/assets/analog/greece/greece_7.jpg";
import greece8 from "@/assets/analog/greece/greece_8.jpg";

// Ireland
import ireland1 from "@/assets/analog/ireland/ireland_1.jpg";
import ireland2 from "@/assets/analog/ireland/ireland_2.jpg";
import ireland3 from "@/assets/analog/ireland/ireland_3.jpg";
import ireland4 from "@/assets/analog/ireland/ireland_4.jpg";

// Italy
import rome1 from "@/assets/analog/italy/rome_1.jpg";
import rome2 from "@/assets/analog/italy/rome_2.jpg";
import rome3 from "@/assets/analog/italy/rome_3.jpg";
import rome4 from "@/assets/analog/italy/rome_4.jpg";
import rome5 from "@/assets/analog/italy/rome_5.jpg";

// Marrakesh
import marroco2 from "@/assets/analog/marroco/marroco_2.jpg";
import marroco3 from "@/assets/analog/marroco/marroco_3.jpg";
import marroco4 from "@/assets/analog/marroco/marroco_4.jpg";
import marroco5 from "@/assets/analog/marroco/marroco_5.jpg";
import marroco6 from "@/assets/analog/marroco/marroco_6.jpg";
import marroco8 from "@/assets/analog/marroco/marroco_8.jpg";

// Netherlands
import amsterdam2 from "@/assets/analog/netherlands/amsterdam_2.jpg";
import amsterdam3 from "@/assets/analog/netherlands/amsterdam_3.jpg";
import amsterdam4 from "@/assets/analog/netherlands/amsterdam_4.jpg";

// Portugal
import abrantes1 from "@/assets/analog/portugal/abrantes_1.jpg";
import abrantes2 from "@/assets/analog/portugal/abrantes_2.jpg";
import abrantes3 from "@/assets/analog/portugal/abrantes_3.jpg";
import acores1 from "@/assets/analog/portugal/acores_1.jpg";
import acores2 from "@/assets/analog/portugal/acores_2.jpg";
import acores3 from "@/assets/analog/portugal/acores_3.jpg";
import alentejo1 from "@/assets/analog/portugal/alentejo_1.jpg";
import alentejo2 from "@/assets/analog/portugal/alentejo_2.jpg";
import alentejo3 from "@/assets/analog/portugal/alentejo_3.jpg";
import alentejo4 from "@/assets/analog/portugal/alentejo_4.jpg";
import algarve1 from "@/assets/analog/portugal/algarve_1.jpg";
import algarve2 from "@/assets/analog/portugal/algarve_2.jpg";
import lisbon1 from "@/assets/analog/portugal/lisbon_1.jpg";
import lisbon2 from "@/assets/analog/portugal/lisbon_2.jpg";
import obidos1 from "@/assets/analog/portugal/obidos_1.jpg";
import porto1 from "@/assets/analog/portugal/porto_1.jpg";
import porto3 from "@/assets/analog/portugal/porto_3.jpg";
import porto4 from "@/assets/analog/portugal/porto_4.jpg";
import porto6 from "@/assets/analog/portugal/porto_6.jpg";
import porto8 from "@/assets/analog/portugal/porto_8.jpg";
import sintra1 from "@/assets/analog/portugal/sintra_1.jpg";

// United States
import newyork1 from "@/assets/analog/united states/newyork_1.jpg";
import newyork2 from "@/assets/analog/united states/newyork_2.jpg";
import newyork3 from "@/assets/analog/united states/newyork_3.jpg";
import newyork4 from "@/assets/analog/united states/newyork_4.jpg";

// Misc
import catia1 from "@/assets/analog/misc/catia_1.jpg";
import cats1 from "@/assets/analog/misc/cats_1.jpeg";
import cats2 from "@/assets/analog/misc/cats_2.jpg";
import cats3 from "@/assets/analog/misc/cats_3.jpg";
import cats4 from "@/assets/analog/misc/cats_4.jpg";
import cats5 from "@/assets/analog/misc/cats_5.jpg";
import cats6 from "@/assets/analog/misc/cats_6.jpg";
import dad1 from "@/assets/analog/misc/dad_1.jpg";
import franciscoHelena1 from "@/assets/analog/misc/francisco+helena_1.jpg";
import franciscoHelena2 from "@/assets/analog/misc/francisco+helena_2.jpg";
import joao1 from "@/assets/analog/misc/joao_1.jpg";
import joao2 from "@/assets/analog/misc/joao_2.jpg";
import marcia1 from "@/assets/analog/misc/marcia_1.jpg";
import marcia2 from "@/assets/analog/misc/marcia_2.jpg";
import me1 from "@/assets/analog/misc/me_1.jpg";
import momDad1 from "@/assets/analog/misc/mom+dad_1.jpg";
import nadia1 from "@/assets/analog/misc/nadia_1.jpg";
import wedding2 from "@/assets/analog/misc/wedding_2.jpg";
import wedding4 from "@/assets/analog/misc/wedding_4.jpg";
import wedding5 from "@/assets/analog/misc/wedding_5.jpg";
import wedding6 from "@/assets/analog/misc/wedding_6.jpg";
import wedding7 from "@/assets/analog/misc/wedding_7.jpg";
import wedding8 from "@/assets/analog/misc/wedding_8.jpg";

export interface AnalogPhoto {
  id: number;
  label: string;
  filterGroup: string;
  src: string;
  w: number;
  h: number;
  x: number;
  y: number;
  rotate: number;
}

type Orientation = "P" | "L";

interface SeedPhoto {
  label: string;
  filterGroup: string;
  src: string;
  o: Orientation;
}

const SEED: SeedPhoto[] = [
  // England (6)
  { label: "London", filterGroup: "England", src: england1, o: "P" },
  { label: "London", filterGroup: "England", src: england2, o: "P" },
  { label: "London", filterGroup: "England", src: england3, o: "P" },
  { label: "London", filterGroup: "England", src: england4, o: "P" },
  { label: "London", filterGroup: "England", src: england5, o: "P" },
  { label: "London", filterGroup: "England", src: england6, o: "P" },

  // France (5)
  { label: "Paris", filterGroup: "France", src: paris1, o: "P" },
  { label: "Paris", filterGroup: "France", src: paris2, o: "P" },
  { label: "Paris", filterGroup: "France", src: paris3, o: "L" },
  { label: "Paris", filterGroup: "France", src: paris4, o: "L" },
  { label: "Paris", filterGroup: "France", src: paris5, o: "P" },

  // Greece (8)
  { label: "Athens", filterGroup: "Greece", src: greece1, o: "L" },
  { label: "Athens", filterGroup: "Greece", src: greece2, o: "P" },
  { label: "Athens", filterGroup: "Greece", src: greece3, o: "P" },
  { label: "Athens", filterGroup: "Greece", src: greece4, o: "P" },
  { label: "Athens", filterGroup: "Greece", src: greece5, o: "L" },
  { label: "Athens", filterGroup: "Greece", src: greece6, o: "L" },
  { label: "Athens", filterGroup: "Greece", src: greece7, o: "L" },
  { label: "Athens", filterGroup: "Greece", src: greece8, o: "L" },

  // Ireland (4)
  { label: "Dublin", filterGroup: "Ireland", src: ireland1, o: "L" },
  { label: "Dublin", filterGroup: "Ireland", src: ireland2, o: "L" },
  { label: "Dublin", filterGroup: "Ireland", src: ireland3, o: "P" },
  { label: "Dublin", filterGroup: "Ireland", src: ireland4, o: "P" },

  // Italy (5)
  { label: "Rome", filterGroup: "Italy", src: rome1, o: "L" },
  { label: "Rome", filterGroup: "Italy", src: rome2, o: "P" },
  { label: "Rome", filterGroup: "Italy", src: rome3, o: "P" },
  { label: "Rome", filterGroup: "Italy", src: rome4, o: "P" },
  { label: "Rome", filterGroup: "Italy", src: rome5, o: "P" },

  // Morocco (Marrakesh, 6)
  { label: "Marrakesh", filterGroup: "Morocco", src: marroco2, o: "P" },
  { label: "Marrakesh", filterGroup: "Morocco", src: marroco3, o: "P" },
  { label: "Marrakesh", filterGroup: "Morocco", src: marroco4, o: "P" },
  { label: "Marrakesh", filterGroup: "Morocco", src: marroco5, o: "P" },
  { label: "Marrakesh", filterGroup: "Morocco", src: marroco6, o: "P" },
  { label: "Marrakesh", filterGroup: "Morocco", src: marroco8, o: "P" },

  // Netherlands (3)
  { label: "Amsterdam", filterGroup: "Netherlands", src: amsterdam2, o: "P" },
  { label: "Amsterdam", filterGroup: "Netherlands", src: amsterdam3, o: "P" },
  { label: "Amsterdam", filterGroup: "Netherlands", src: amsterdam4, o: "P" },

  // Portugal (25)
  { label: "Abrantes", filterGroup: "Portugal", src: abrantes1, o: "P" },
  { label: "Abrantes", filterGroup: "Portugal", src: abrantes2, o: "P" },
  { label: "Abrantes", filterGroup: "Portugal", src: abrantes3, o: "P" },
  { label: "Açores", filterGroup: "Portugal", src: acores1, o: "P" },
  { label: "Açores", filterGroup: "Portugal", src: acores2, o: "P" },
  { label: "Açores", filterGroup: "Portugal", src: acores3, o: "P" },
  { label: "Alentejo", filterGroup: "Portugal", src: alentejo1, o: "P" },
  { label: "Alentejo", filterGroup: "Portugal", src: alentejo2, o: "P" },
  { label: "Alentejo", filterGroup: "Portugal", src: alentejo3, o: "P" },
  { label: "Alentejo", filterGroup: "Portugal", src: alentejo4, o: "P" },
  { label: "Algarve", filterGroup: "Portugal", src: algarve1, o: "P" },
  { label: "Algarve", filterGroup: "Portugal", src: algarve2, o: "P" },
  { label: "Lisbon", filterGroup: "Portugal", src: lisbon1, o: "P" },
  { label: "Lisbon", filterGroup: "Portugal", src: lisbon2, o: "P" },
  { label: "Óbidos", filterGroup: "Portugal", src: obidos1, o: "P" },
  { label: "Porto", filterGroup: "Portugal", src: porto1, o: "P" },
  { label: "Porto", filterGroup: "Portugal", src: porto3, o: "P" },
  { label: "Porto", filterGroup: "Portugal", src: porto4, o: "P" },
  { label: "Porto", filterGroup: "Portugal", src: porto6, o: "P" },
  { label: "Porto", filterGroup: "Portugal", src: porto8, o: "P" },
  { label: "Sintra", filterGroup: "Portugal", src: sintra1, o: "P" },

  // United States (4)
  { label: "New York", filterGroup: "United States", src: newyork1, o: "P" },
  { label: "New York", filterGroup: "United States", src: newyork2, o: "P" },
  { label: "New York", filterGroup: "United States", src: newyork3, o: "P" },
  { label: "New York", filterGroup: "United States", src: newyork4, o: "P" },

  // Misc (23)
  { label: "Cátia", filterGroup: "Misc 😻", src: catia1, o: "L" },
  { label: "Cats", filterGroup: "Misc 😻", src: cats1, o: "P" },
  { label: "Cats", filterGroup: "Misc 😻", src: cats2, o: "L" },
  { label: "Cats", filterGroup: "Misc 😻", src: cats3, o: "P" },
  { label: "Cats", filterGroup: "Misc 😻", src: cats4, o: "L" },
  { label: "Cats", filterGroup: "Misc 😻", src: cats5, o: "P" },
  { label: "Cats", filterGroup: "Misc 😻", src: cats6, o: "P" },
  { label: "Dad", filterGroup: "Misc 😻", src: dad1, o: "P" },
  { label: "Francisco + Helena", filterGroup: "Misc 😻", src: franciscoHelena1, o: "L" },
  { label: "Francisco + Helena", filterGroup: "Misc 😻", src: franciscoHelena2, o: "L" },
  { label: "João", filterGroup: "Misc 😻", src: joao1, o: "P" },
  { label: "João", filterGroup: "Misc 😻", src: joao2, o: "P" },
  { label: "Márcia", filterGroup: "Misc 😻", src: marcia1, o: "P" },
  { label: "Márcia", filterGroup: "Misc 😻", src: marcia2, o: "P" },
  { label: "Me", filterGroup: "Misc 😻", src: me1, o: "P" },
  { label: "Mom + Dad", filterGroup: "Misc 😻", src: momDad1, o: "L" },
  { label: "Nádia", filterGroup: "Misc 😻", src: nadia1, o: "P" },
  { label: "Wedding", filterGroup: "Misc 😻", src: wedding2, o: "L" },
  { label: "Wedding", filterGroup: "Misc 😻", src: wedding4, o: "L" },
  { label: "Wedding", filterGroup: "Misc 😻", src: wedding5, o: "L" },
  { label: "Wedding", filterGroup: "Misc 😻", src: wedding6, o: "P" },
  { label: "Wedding", filterGroup: "Misc 😻", src: wedding7, o: "P" },
  { label: "Wedding", filterGroup: "Misc 😻", src: wedding8, o: "P" },
];

/** Simple seeded PRNG (mulberry32) for deterministic randomness */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic pseudo-random scatter — "photos thrown on a table" */
function scatterAll(total: number): { x: number; y: number; rotate: number }[] {
  const rng = mulberry32(42);
  const results: { x: number; y: number; rotate: number }[] = [];

  for (let i = 0; i < total; i++) {
    let x: number;
    let y: number;
    let attempts = 0;

    // Try to place each photo with some minimum distance from existing ones
    do {
      x = 2 + rng() * 76;  // 2% – 78%
      y = 2 + rng() * 80;  // 2% – 82%
      attempts++;
    } while (
      attempts < 40 &&
      results.some(
        (r) => Math.abs(r.x - x) < 8 && Math.abs(r.y - y) < 10
      )
    );

    const rotate = (rng() - 0.5) * 18; // ±9°
    results.push({
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      rotate: Math.round(rotate * 10) / 10,
    });
  }

  return results;
}

const PW = 180;  // portrait width
const PH = 240;  // portrait height
const LW = 240;  // landscape width
const LH = 180;  // landscape height

/** Deterministic Fisher-Yates shuffle so photos from all groups spread evenly */
function deterministicShuffle<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr];
  const rng = mulberry32(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const SHUFFLED_SEED = deterministicShuffle(SEED, 7);
const POSITIONS = scatterAll(SHUFFLED_SEED.length);

export const ANALOG_PHOTOS: AnalogPhoto[] = SHUFFLED_SEED.map((p, i) => ({
  id: i + 1,
  label: p.label,
  filterGroup: p.filterGroup,
  src: p.src,
  w: p.o === "L" ? LW : PW,
  h: p.o === "L" ? LH : PH,
  ...POSITIONS[i],
}));

export const LOCATIONS = [
  "All",
  "Portugal",
  "Ireland",
  "England",
  "France",
  "Italy",
  "Netherlands",
  "United States",
  "Morocco",
  "Greece",
  "Misc 😻",
] as const;
