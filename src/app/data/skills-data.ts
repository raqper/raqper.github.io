// ─────────────────────────────────────────────────────────────────────────────
// skills-data.ts
// Skills and tool logos for the Career page Skills section.
// ─────────────────────────────────────────────────────────────────────────────

import figmaLogo from "@/assets/figma.png";
import styleDictionaryLogo from "@/assets/style-dictionary.png";
import storybookLogo from "@/assets/storybook.svg";
import supernovaLogo from "@/assets/supernova.svg";
import claudeLogo from "@/assets/claude.svg";
import cursorLogo from "@/assets/cursor.svg";
import windsurfLogo from "@/assets/windsurf.svg";
import reactLogo from "@/assets/react.svg";
import githubLogo from "@/assets/github.svg";
import vscodeLogo from "@/assets/vscode.png";
import htmlLogo from "@/assets/html.png";
import cssLogo from "@/assets/css.png";
import wcagLogo from "@/assets/w3c.svg";
import miroLogo from "@/assets/miro.svg";
import adobeLogo from "@/assets/adobe.svg";
import blenderLogo from "@/assets/blender.svg";

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: "hard" | "soft";
}

export const toolLogos: { name: string; src: string }[] = [
  { name: "Figma", src: figmaLogo },
  { name: "Style Dictionary", src: styleDictionaryLogo },
  { name: "Storybook", src: storybookLogo },
  { name: "Supernova", src: supernovaLogo },
  { name: "Claude", src: claudeLogo },
  { name: "Cursor", src: cursorLogo },
  { name: "Windsurf", src: windsurfLogo },
  { name: "React", src: reactLogo },
  { name: "GitHub", src: githubLogo },
  { name: "VS Code", src: vscodeLogo },
  { name: "HTML", src: htmlLogo },
  { name: "CSS", src: cssLogo },
  { name: "W3C", src: wcagLogo },
  { name: "Miro", src: miroLogo },
  { name: "Adobe CC", src: adobeLogo },
  { name: "Blender", src: blenderLogo },
];

export const skills: Skill[] = [
  {
    id: "01",
    name: "Design Systems",
    description:
      "Scalable, multi-platform, multi-brand design systems — design tokens, theming architecture, modes, governance, and production-ready component libraries. Figma variables, Tokens Studio, Style Dictionary, Storybook, and Supernova for cross-platform handoff and design ops workflows.",
    category: "hard",
  },
  {
    id: "02",
    name: "Design Operations",
    description:
      "Developing design workflows, defining KPIs and ROI metrics, building business cases for design system budgets, and improving delivery efficiency through cross-team alignment.",
    category: "hard",
  },
  {
    id: "03",
    name: "AI & Automation",
    description:
      "AI-assisted design workflows with Claude, Claude Code, and Cursor for rapid prototyping and vibe coding. Figma MCP, Code Connect, and Make templates for design-to-code automation and large-scale library migrations.",
    category: "hard",
  },
  {
    id: "04",
    name: "Engineering",
    description:
      "Contributing to token structures (JSON, CSS variables, Style Dictionary), component development support during handoffs, and assuring consistent interaction patterns between design and code via GitHub and React.",
    category: "hard",
  },
  {
    id: "05",
    name: "Accessibility",
    description:
      "Embedding accessibility into design systems and product workflows — inclusive component patterns, WCAG compliance, team training, and advocating for accessible-by-default culture across design and engineering teams.",
    category: "hard",
  },
  {
    id: "06",
    name: "Product Design",
    description:
      "End-to-end mobile and web application design: user testing, UI design, prototyping, and implementation across Android, iOS, and web under fintech, telco, and automotive constraints.",
    category: "hard",
  },
  {
    id: "07",
    name: "Leadership",
    description:
      "Design lead for distributed teams of 2–5 designers (junior and mid-level). Mentoring designers and developers, facilitating workshops on design systems and AI adoption, and driving cross-functional collaboration.",
    category: "soft",
  },
  {
    id: "08",
    name: "Teaching",
    description:
      "CCP-certified teacher with complete beginner and advanced design systems courses in Portuguese, teaching remotely for Portugal and Brazil with an average student rating of 9/10.",
    category: "soft",
  },
  {
    id: "09",
    name: "Advocacy",
    description:
      "Leading Friends of Figma Lisbon with 30+ community events, workshops, and a hybrid conference (Layers). Chapter Lead for Into Design Systems, reaching 200+ attendees. Driving design system adoption through documentation, theme redesign advocacy, release maintenance, and conference speaking at Hatch, Into Design Systems, and UXLx Lisbon.",
    category: "soft",
  },
];
