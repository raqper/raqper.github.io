// ─────────────────────────────────────────────────────────────────────────────
// timeline-data.ts
// Milestones for the Career page Timeline section.
// ─────────────────────────────────────────────────────────────────────────────

export interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: "education" | "role";
}

export const milestones: Milestone[] = [
  {
    id: "01",
    year: "2025",
    title: "CCP — Teaching Credential",
    subtitle: "IEFP — Certificate of Pedagogical Skills",
    description: "Official Portuguese credential for professional teaching.",
    type: "education",
  },
  {
    id: "02",
    year: "2024 - Present",
    title: "UX Lead Designer — Design System",
    subtitle: "Nokia · Telco · Remote",
    description: "Led a team of 2–5 designers, shaping design system best practices, processes, and roadmaps.",
    type: "role",
  },
  {
    id: "03",
    year: "2022 - 2024",
    title: "Design Operations",
    subtitle: "Volkswagen Group · Automotive · Remote",
    description: "Built a new design system (web, mobile, HMI) under 6 months; organized design events.",
    type: "role",
  },
  {
    id: "04",
    year: "2021 - 2022",
    title: "Product Designer",
    subtitle: "NOS · Telco · Hybrid",
    description: "Designed mobile app features; maintained a multi-brand system; advocated for design ops practices.",
    type: "role",
  },
  {
    id: "05",
    year: "2020 - 2021",
    title: "Product Designer",
    subtitle: "Leonteq · Fintech · Remote",
    description: "Designed fintech products platform, indices and crypto; redesigned 40-page institutional site.",
    type: "role",
  },
  {
    id: "06",
    year: "2018 - 2020",
    title: "User Interface Designer",
    subtitle: "Worten · Retail · Hybrid",
    description: "Made front-end, drove Sketch to Figma migration (asset production from 10 to 2 minutes).",
    type: "role",
  },
  {
    id: "07",
    year: "2018",
    title: "UX/UI Design",
    subtitle: "EDIT",
    description: "User-centered design methodologies and digital products.",
    type: "education",
  },
  {
    id: "08",
    year: "2014 - 2017",
    title: "Audiovisual & Multimedia (Bachelor)",
    subtitle: "Escola Superior de Comunicação Social",
    description: "Video, design, web, and interactive multimedia experiences.",
    type: "education",
  },
  {
    id: "09",
    year: "2013",
    title: "Brand Design",
    subtitle: "ETIC",
    description: "Communication, brand activation, and advertising campaigns.",
    type: "education",
  },
];
