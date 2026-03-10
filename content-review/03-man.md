# MAN — CRAFT Design System — Content Review
> Edit this file with your changes. When done, tell Claude to apply them to portfolio-data.ts.
> Legend: ✅ Keep as-is · ⚠️ Issue found · ✏️ Suggested improvement · 🖼️ Image note

---

## Meta

| Field | Current | Notes |
|---|---|---|
| `year` | `"2022–2023"` | ✅ |
| `role` | `"Design Ops — Design System Lead"` | ✅ |
| `bgImage` | none | 🖼️ No background image. No MAN-specific assets in `/src/assets/`. See Images section. |

---

## Summary

**Current:**
> Built MAN's first design system from scratch — CRAFT — used across 10+ digital products. Established the visual identity, Figma libraries, token architecture, tooling pipeline, and the processes that enabled 20+ designers to work in alignment for the first time.

**Assessment:** ✅ Strong opener. "enabled 20+ designers to work in alignment for the first time" is a good human outcome. The parenthetical "CRAFT" naming is clear.

**Minor suggestion:** "for the first time" at the end can feel slightly dramatic. If accurate, keep it. If you mean "consistently", consider that.

---

## Overview

### context.caption

**Current:**
> A company with low design maturity and teams working in silos — no shared system, no shared language.

**Assessment:** ✅ Honest and clear. Good.

---

### context.description

**Current:**
> MAN had low design maturity. UX was not seen as a priority. Teams worked in silos, and design efforts were inconsistent across products. There was no shared component library, no token structure, and no agreed process for how design and development would collaborate. It was hard to align around a shared approach — or even a shared visual language.

**Assessment:** ✅ Short and punchy. The short sentences create good rhythm here. Keep.

---

### scope

**Current:**
> End-to-end creation of CRAFT — MAN's first design system — covering visual identity, Figma component libraries, design tokens, tooling pipeline (Tokens Studio, Style Dictionary, Storybook, Stencil), contribution processes, and designer onboarding. Used across 10+ digital products including the Truck Configurator, MAN TopUsed, and Truck Offer Portal.

**Assessment:** ✅ Excellent scope statement. Naming specific products (Truck Configurator, TopUsed, Truck Offer Portal) adds real credibility. Keep.

---

### role.summary

**Current:**
> As Design Ops, I drove the entire CRAFT Design System: led the roadmap with my manager, created the visual identity, structure, business case, and Figma libraries, defined work processes, and mentored the design team.

**Assessment:** ✅ Good. Clear ownership.

---

## Problem

### headline

**Current:**
> Without a shared system, every product team was reinventing the wheel — and the wheel kept coming out different.

**Assessment:** ✏️ The automotive metaphor (reinventing the wheel, at a truck company) is clever, but "the wheel kept coming out different" is slightly awkward as a sentence. It works, but you could sharpen it.

**Alternative if you want a tighter version:**
> Without a shared system, every team was solving the same problems independently — and getting different answers every time.

(Or keep the wheel metaphor if you like it — it's memorable for MAN specifically.)

---

### framing

**Current:**
> Designers across MAN's digital products were recreating the same components independently, with no shared source of truth. Creating a button from scratch took 30 minutes to an hour; there was no agreed hierarchy for buttons, no token system, no documentation, and no process for requesting new components. Products looked inconsistent, collaboration was slow, and design had no seat at the table when it came to planning. The business case wasn't just about efficiency — it was about demonstrating that a shared design system could change how MAN builds digital products.

**Assessment:** ✅ Very strong. The button example (30–60 min) is a perfect concrete anchor. "design had no seat at the table when it came to planning" is honest and credible. "The business case wasn't just about efficiency" is a smart reframe. Keep.

---

## Approach

### narrative

**Current:**
> The approach started with a business case: establishing that a design system was a strategic investment, not a design team project. This required stakeholder alignment across departments that had never collaborated closely. The core philosophy was simple: as you don't need to reinvent the wheel every time you build a vehicle, you don't need to reinvent components every time you build a user interface. CRAFT was positioned as a bridge — not just a library, but an enabler of collaboration across design, development, and product.\n\nThe team audited real usage across MAN's digital products before building anything. External design systems (Decathlon, Ant Design, Salesforce, SAP Fiori, Microsoft, IBM, Atlassian, Adobe) were benchmarked for structural and contribution model inspiration. Components were validated with designers before being added to the library, ensuring CRAFT reflected actual product needs rather than theoretical ideals. The roadmap was split into short, medium, and long-term tracks across Design, Code, and Strategy workstreams — running across four quarters.

**Issues:**
- ⚠️ **Same `\n\n` rendering bug** as Swap Wizard — the two paragraphs will run together in HTML.
- ✏️ "as you don't need to reinvent the wheel every time you build a vehicle, you don't need to reinvent components every time you build a user interface" — this is a good analogy for a MAN audience, but it's slightly long. Could be tightened.

**On the bug:** same fix needed as Swap Wizard — merge paragraphs in data, or patch the component.

---

### keyDecisions

**Assessment:** ✅ All four decisions are well-argued. Particularly strong: "A design system without a contribution model becomes a bottleneck" — this is an insight many companies learn the hard way and shows real experience.

---

## Execution

### narrative

**Current:**
> The roadmap ran across four quarters with three parallel workstreams: Design (component research, creation, documentation), Code (token implementation, component development, framework integration), and Strategy (stakeholder meetings, onboarding, training, community events). Short-term deliverables included Web Components V1, Icons V1, Design Tokens V1, and Design System Advocacy. Medium-term included Mobile Components, Dark Mode, Icons V2, Design Tokens V2, and AWS integration. Long-term covered Vehicle Components, Figma variables, Figma Make exploration, Design System Matrix 2.0, and AI integration.\n\nThe token system was built on Tokens Studio and exported via Style Dictionary, feeding into Stencil components (TypeScript + SCSS) and documented in Storybook. Frontify served as the design system's public-facing documentation hub. Three versions of the button component hierarchy were iterated — V1 through V3 — to land on a clean Primary / Secondary / Tertiary × Accent / Standard model that worked across all product contexts.

**Issues:**
- ⚠️ **Same `\n\n` rendering bug.** Both paragraphs run together.
- ✏️ The first paragraph is a dense list of deliverables. In a card format, this reads as a wall of text. Consider condensing the short/medium/long term breakdown to just the most impactful items, or reformatting.

**Suggested approach for the first paragraph:**
> The roadmap ran across four quarters and three parallel workstreams — Design, Code, and Strategy — each with short, medium, and long-term tracks. Highlights: Web Components V1 and Design Tokens V1 in the first quarter; Mobile Components and Dark Mode in the second; Figma variables, AI integration, and a Design System Matrix in the longer term.

---

### validation

**Assessment:** ✅ All three validation entries are solid. The button time-savings data (30 min → 5 min) is the strongest metric in this use case. The OKR tracking shows maturity.

---

## Outcomes

**Assessment:** ✅ Well-balanced across Organizational, User, and Product categories. The button metric in the Product outcome is the right anchor.

Minor: the User outcome ("20+ designers onboarded, enabling aligned work with developers") has a significance note that reads a bit generic ("Before CRAFT, designers and developers had no shared language"). Consider adding a specific example or quote if you have one.

---

## Impact

**Assessment:** ✅ Solid. The OKR targets give it ambition.

---

## Learnings

### reflection

**Current:**
> The most important lesson from CRAFT was that a design system is not a design deliverable — it's an organisational change project. The component library was the visible output, but the real work was stakeholder alignment, contribution processes, onboarding, and advocacy. Teams don't adopt a system because it exists; they adopt it because it makes their work easier and because someone invested in their success with it. The three design events, the contribution process, and the onboarding programme were as important as the components themselves.

**Assessment:** ✅ This is the best paragraph in the MAN case. Keep every word.

---

### aiAndTooling

**Assessment:** ✅ Good forward-looking connection to AI. Appropriately humble ("even before AI tooling for design systems was mature").

---

## Systems

**Assessment:** ✅ The contribution process description is useful and transferable. Good.

---

## Images

🖼️ **Background (bgImage):** Not set. No MAN-specific assets in `/src/assets/`.

**Available assets — nothing clearly MAN-related exists.** The assets folder has `thestarter-ds-advanced.png` and `thestarter-ds-complete.png` — are these CRAFT screenshots? If so, they could be used as bgImage.

**Other options:**
- Do you have any screenshots of CRAFT components, the Figma library, the Frontify docs, or the Storybook? If yes, add to `/src/assets/` and we can reference them.
- Alternatively, the gradient blob fallback is fine for MAN — the content is strong enough to stand without an image.

---

## Summary of Issues to Fix

1. ⚠️ `\n\n` rendering bug in `approach.narrative` and `execution.narrative`
2. ✏️ `problem.headline`: optionally sharpen the wheel metaphor
3. ✏️ `execution.narrative`: condense the roadmap deliverables list for card readability
4. 🖼️ Add `bgImage` if you have a suitable CRAFT screenshot
5. ✏️ Minor: User outcome significance could be sharpened with a specific example

**Overall quality: High.** The problem framing, approach, and learnings sections are excellent. The execution section has the weakest readability due to dense lists — the most impactful edit here.
