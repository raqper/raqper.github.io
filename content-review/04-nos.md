# NOS App — Content Review
> Edit this file with your changes. When done, tell Claude to apply them to portfolio-data.ts.
> Legend: ✅ Keep as-is · ⚠️ Issue found · ✏️ Suggested improvement · 🖼️ Image note

---

## Meta

| Field | Current | Notes |
|---|---|---|
| `year` | `"2021–2022"` | ✅ |
| `role` | `"Product Designer"` | ✅ |
| `bgImage` | `nosBgImg` | ✅ Set. |

---

## Summary

**Current:**
> Redesigned the NOS mobile app experience for Portugal's largest telco, serving roughly a quarter of the country's population across iOS and Android. Led the full design process — from research and usability testing through final UI — while building and maintaining a multi-brand design system across 3 brands (NOS, WTF, WOO), multiple platforms, and technologies.

**Assessment:** ✅ Strong. "serving roughly a quarter of the country's population" is a powerful scale signal. The sentence is slightly long — you could split after "iOS and Android." but it reads well enough.

---

## Overview

### context.caption

**Current:**
> Portugal's largest telco, struggling with its own app.

**Assessment:** ✅ Sharp and slightly ironic. Works perfectly as a caption. Keep.

---

### context.description

**Current:**
> Research revealed users struggled to navigate the app and find the NOS card, often needing support for tasks that should have been self-serve. The app had grown without a clear information architecture, and it showed. Users had trouble finding the NOS card (used for perks like cinema tickets and discounts) and the benefits section — NOS Vantagens — was cluttered and hard to navigate.

**Assessment:** ✅ Good. Clear, grounded in user research.

Minor: the NOS card is described twice ("used for perks like cinema tickets and discounts" and then "NOS Vantagens — was cluttered"). Slight repetition. You could merge.

**Slight tightening:**
> Research revealed users struggled to navigate the app and find the NOS card — the entry point for perks like cinema tickets and discounts — often calling support for tasks that should have been self-serve. The app had grown without a clear information architecture. The benefits section, NOS Vantagens, was cluttered and hard to navigate.

---

### scope

**Current:**
> End-to-end redesign of a B2C mobile app serving ~2.5M users across iOS and Android, spanning navigation, the NOS card, and the benefits section (NOS Vantagens). Delivered within a multi-brand design system (Universo) covering 3 brands (NOS, WTF, WOO), with base components for Mobile, Desktop, and TV, UX Patterns, and Accessibility — built on Figma, Coda, Notion, Vue, React, Angular, Outsystems, and Salesforce.

**Assessment:** ✅ Comprehensive. The technology stack list at the end is useful for context.

---

### role.summary

**Current:**
> Led the full design process end-to-end, from research through final UI, integrating and creating components while maintaining and evolving the multi-brand design system.

**Assessment:** ✅ Good.

---

## Problem

### headline

**Current:**
> Users couldn't find core features — and the app was making them call support to do it.

**Assessment:** ✅ Excellent. Direct, human, and shows a real cost (support calls). Keep.

---

### framing

**Current:**
> The NOS card — used for perks like cinema tickets and discounts — was buried deep inside the app. NOS Vantagens, the benefits section, mixed multiple benefit types with no clear hierarchy. Users who wanted to simply show their card or activate a discount had no clear path. The friction was invisible to the team but constant for users, driving up support contact rates for tasks that should have been effortless. On the design system side, the product relied on a multi-brand system spanning 3 brands, multiple platforms, and technologies — serving a core design team working in decentralised squads, with no unified component architecture to keep them aligned.

**Assessment:** ✅ Strong. "The friction was invisible to the team but constant for users" is an excellent insight — shows UX maturity.

The final sentence pivots to the design system side — it's fine, but it slightly breaks the user problem narrative. Consider whether to keep both threads here or move the DS framing to its own card.

---

## Approach

### narrative

**Current:**
> Collaborated with the PO, IT Architect, and product team to scope the work and prioritise features. Ran competitor benchmarks to identify navigation patterns that worked, then built quick wireframes to test feasibility before moving to final UI. Requirements were mapped in detail — covering NOS Vantagens organisation, card visibility, benefit categorisation (Destaques, Campanhas, Ofertas, Parcerias, Equipamentos), and interaction patterns — before any UI work began.\n\nFor the design system, the approach followed a three-phase process: Discovery (design inventories across brands with designers), Definition (gathering the team to validate proposals for the system), and Documentation (recording all processes and decisions on Coda). External benchmarks informed component structure — comparing how FAQs, support, and key patterns were handled across NOS, WTF, and WOO brands to identify shared patterns worth systematising.

**Issues:**
- ⚠️ **Same `\n\n` rendering bug.** The two paragraphs will run together.

**Content assessment:** ✅ Good. The three-phase DS process (Discovery → Definition → Documentation) is a useful framework and well-explained.

---

### keyDecisions

**Assessment:** ✅ All four decisions are strong. Particularly good: "Build within a multi-brand design system from the start" — shows the discipline to think beyond the immediate project. "Validate with usability testing before committing to final UI" shows process rigour.

---

## Execution

### narrative

**Current:**
> Designed and shipped the multi-brand component library with theming support, enabling consistent experiences across all NOS products. The design system (Universo) used a base component architecture — a single skeleton component that each brand (NOS, WTF, WOO) themed through brand-level overrides for typography, colours, and icons, with platform variants (Desktop/Mobile). Components were mapped across frameworks (Salesforce, Outsystems, Adobe Experience Manager, Bitrise) to ensure design-to-code alignment.\n\nFor the NOS Vantagens redesign, built an interactive prototype and ran remote moderated usability tests with 5 users (2 women, 3 men, average age 38, ~40-minute sessions) across two personas — Sara (26, Dancer, Mid-digital: 'I take advantage of the digital channels whenever possible') and Raul (38, Insurance Agent, High-digital: 'Digital is fully integrated into my life'). The test used a 12-question script mixing Tasks and Open Responses covering homepage navigation, benefit discovery, NOS card sharing, Netflix activation, campaign finding, and overall organisation feedback. Results were scored on a 5-point scale (1=Unsuccess to 5=Success).\n\nKey usability insights drove the final iteration: users expected the highlights zone to be personalised; they had difficulty recognising the NOS card initially but found it intuitive once discovered; there was a lack of information about card usage limits; users had difficulty perceiving feedback after activation; customers expected benefits tailored to their tastes; and customisation was expected (consistent with benchmark findings). With these insights, the UI proposal was improved — the homepage was redesigned to prioritise high-value content with the NOS card instantly visible, and the Offers section was consolidated into a structured tab with vertical lists, filters, and sorting options.

**Issues:**
- ⚠️ **Same `\n\n` rendering bug.** Three paragraphs will all run together.
- ⚠️ **Length**: This is the longest execution narrative in the file. In a card format, it will overflow. Some trimming is needed.
- ✏️ The persona descriptions (Sara, Raul) in full are charming but verbose for a card. Consider moving the persona detail to a validation entry instead.

**Suggested approach:**
- First paragraph: keep the DS/component architecture detail ✅
- Second paragraph: condense the usability test setup to just the key parameters (5 users, 2 personas, 12-task script, remote moderated)
- Third paragraph: keep the 6 key insights but tighten the language

---

### validation

**Assessment:** ✅ All three validation entries are strong. The usability testing methodology detail is appropriate here (moved from narrative). The "weekly A/B testing" entry is a good signal of post-launch rigour.

---

## Outcomes

### highlights

**Assessment:** ✅ All three outcomes are strong. "21% engagement lift in the first month" is the standout metric and rightly leads.

---

## Impact

**Assessment:** ✅ Strong. The opening sentence — "The redesign turned a fragmented app into a coherent product experience" — is good. The signals are well-selected.

---

## Learnings

### reflection

**Current:**
> This project reinforced that data beats opinions — not as a cliché, but as a working practice...

**Assessment:** ✅ "data beats opinions — not as a cliché, but as a working practice" is excellent. Keep.

---

### aiAndTooling

**Assessment:** ✅ Good retrospective framing. "the architectural decisions made at the time anticipated where the tooling was heading" — this shows foresight without overclaiming. Keep.

---

## Systems

**Assessment:** ✅ Good. The three-phase DS process (Discovery → Definition → Documentation) is transferable and well-described.

---

## Images

🖼️ **Background (bgImage):** `nosBgImg` is set ✅

🖼️ **Rich asset library available for NOS — more than any other case:**

| Asset | What it shows | Suggested use |
|---|---|---|
| `nos-problem.png` | ⚠️ Currently imported in portfolio-data.ts but **not used** anywhere | Could anchor the Problem card visually |
| `nos-screenshot-1.png` through `nos-screenshot-6.png` | Redesigned screens | Execution card or Outcomes card |
| `nos-screenshot-before-1.png` / `nos-screenshot-before-2.png` | Before state | Problem card — before/after contrast |
| `nos-screenshot-previous-structure.png` | Old IA structure | Approach card — shows the problem |
| `nos-persona-female.png` / `nos-nokia-persona-male.png` | Personas (Sara, Raul) | Execution card — humanises the research |
| `nos-whatsapp-1.png` through `nos-whatsapp-4.png` | WhatsApp flows | Execution card — specific feature work |
| `nos-group-12.png` | Group 12 | Unknown — what is this? |
| `nos-image.png` / `nos-image-1.png` | Unknown | What are these? |
| `nos-product-image.png` | Product screenshot | Overview or Outcomes |

**Note:** The current data structure only supports `bgImage` (shown in the Overview card header). If you want inline images within other cards (Problem, Execution, etc.), the component would need to be extended. Is this something you want to explore? If yes, I can propose a data structure change and implement it.

---

## Summary of Issues to Fix

1. ⚠️ `\n\n` rendering bug in `approach.narrative` and `execution.narrative`
2. ⚠️ `execution.narrative`: significantly too long for a card — needs trimming (especially the persona descriptions)
3. ⚠️ `nosProblemImg` imported at the top of portfolio-data.ts but never referenced — either use it or remove the import
4. 🖼️ Lots of unused NOS assets — decide which ones to incorporate (requires component support for inline images)
5. ✏️ `context.description`: minor duplicate mention of NOS card

**Overall quality: High.** The research methodology detail is a genuine differentiator — most portfolios skip this level of rigor. The execution section needs tightening for card readability.
