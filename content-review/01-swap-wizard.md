# Swap Wizard — Content Review
> Edit this file with your changes. When done, tell Claude to apply them to portfolio-data.ts.
> Legend: ✅ Keep as-is · ⚠️ Issue found · ✏️ Suggested improvement · 🖼️ Image note

---

## Meta

| Field | Current | Notes |
|---|---|---|
| `year` | `"2025"` | ⚠️ The execution section says February 6–8, **2026**. The event is *called* "Into Design Systems 2025" but happened in 2026. Suggest changing to `"2026"` or `"2025–2026"`. |
| `role` | `"Initiator, Team Lead & Product Designer"` | ✅ |

---

## Summary

**Current:**
> Conceived and led a 10-person distributed team to ship a Figma plugin that solves one of design system migration's most persistent pain points — in 48 hours, with a live pitch to 1,000+ attendees worldwide.

**Assessment:** ✅ Strong. Clear, specific, and has the right level of ambition. No change needed unless you want to name the pain point explicitly ("the component swap problem" or similar).

---

## Overview

### context.caption

**Current:**
> A hackathon entry that became a product sprint — because the problem was too real to stop at the demo.

**Assessment:** ✅ Excellent. Keep.

---

### context.description

**Current:**
> Design system migrations stall at the same place every time: Figma's built-in swap only works when component names match exactly. One rename, one restructured component, one cross-library change — and it returns 'None found' across the board. Detached components are worse: frames that lost their library link become invisible to any bulk action. What started as a hackathon idea at Into Design Systems 2025 — 150 participants, 48 hours — quickly became something more. The team operated like a small agile product squad from day one, and the plugin kept evolving long after the weekend ended.

**Issues:**
- ⚠️ **150 vs 1,000+**: You say "150 participants" here, but elsewhere you cite "1,000+ attendees." These refer to different things (hackathon entrants vs. conference audience), but the distinction isn't clear on first read. Suggest specifying.
- ✏️ "What started as a hackathon idea... quickly became something more" is a slightly soft ending. The description cuts off before telling the reader what "something more" is.

**Suggested revision:**
> Design system migrations stall at the same place every time: Figma's built-in swap only works when component names match exactly. One rename, one restructured component, one cross-library change — and it returns 'None found' across the board. Detached components are worse: frames that lost their library link become invisible to any bulk action. What started as a hackathon entry at Into Design Systems 2025 — 150 teams, 48 hours — became something more the moment the demo ran. The team had operated like a product squad from the start. The plugin kept evolving long after the weekend ended.

---

### scope

**Current:**
> A working Figma plugin shipped in 48 hours by 10 designers across time zones — 3 juniors, the rest senior or lead level — combining plugin architecture, AI-powered component matching, and a public landing page, all live by end of weekend. Three testing rounds using 2 purpose-built libraries and 2 demo files ran in parallel with development.

**Assessment:** ✅ Good. Clear and specific. One minor note: "3 juniors, the rest senior or lead level" reads slightly informally. Optionally: "3 junior designers, 7 senior or lead" for precision.

---

### role.summary

**Current:**
> Originated the problem, formed the team, led product direction and design throughout, and co-presented the final pitch live in front of 1,000+ attendees worldwide.

**Assessment:** ✅ Strong.

---

## Problem

### headline

**Current:**
> Design system migrations are held back by a problem Figma never fully solved — and teams are paying for it in weeks of manual work.

**Assessment:** ✅ Keep. Direct and credible.

---

### framing

**Current:**
> When a design system evolves, files don't automatically follow. Figma's swap library works on exact name matches only — any deviation and it fails silently, leaving designers to hunt down mismatches by hand. Detached components add another layer of pain: once a component loses its library link, it becomes a ghost that no bulk action can reach. For design system teams managing migrations across dozens of files, this friction isn't occasional — it's structural. It was a problem everyone in the room already felt. The hackathon was the forcing function to finally fix it.

**Assessment:** ✅ Solid. "a ghost that no bulk action can reach" is a good image. The last two sentences are a touch dramatic but work in context. Keep.

---

## Approach

### narrative

**Current:**
> From the start, the team operated less like a hackathon group and more like a focused product squad — with a problem already framed, a backlog already prioritised, and roles clear enough that async work across time zones could run without bottlenecks. The core architectural decision was to separate scanning from swapping: give designers a full audit of what exists, let them review AI-suggested mappings, and only then commit to changes. This two-phase model made the plugin trustworthy from the first test run.\n\nAI was embedded in the workflow as an operational choice, not a feature. Cursor handled plugin logic and refactoring. GitHub kept 10 people moving in parallel without stepping on each other. Lovable shipped the landing page while the plugin was still being built. The goal was to use every available tool to close the gap between a 48-hour window and a production-quality output.

**Issues:**
- ⚠️ **Rendering bug**: The `\n\n` in this string does NOT create a visual line break in HTML. Both paragraphs will display as one unbroken block of text. This affects the Execution narrative too. Fix: either remove the `\n\n` and merge into one paragraph, or I can add `whitespace: pre-wrap` to the component (minor code change, not data change).

**Your call:** Do you want me to (a) merge the paragraphs in the data, or (b) fix the component to respect line breaks?

---

### keyDecisions

**Assessment:** ✅ All three decisions are well-framed. The rationale for each is specific and shows clear thinking. No changes needed.

---

## Execution

### narrative

**Same `\n\n` rendering bug as Approach narrative.** See above.

**Assessment of content:** ✅ Otherwise strong. The post-hackathon development detail ("multi-select shipped, variable swapping under investigation, library link persistence in progress") is a good differentiator — shows this is a real product, not just a portfolio piece.

---

### validation

**Assessment:** ✅ Both validation entries are solid and specific.

---

## Outcomes

**Assessment:** ✅ All three highlights are well-structured. The significance notes add real depth.

Minor observation: "The collaboration model it demonstrated is the model worth generalising" (in Organizational) is strong — but similar phrasing appears in the Impact summary too. Not a problem, just FYI.

---

## Impact

### summary

**Current:**
> Swap Wizard proved that a small, distributed, async team — with a clearly framed problem and the right AI tooling — can ship production-quality work under extreme constraints. Among 150 hackathon participants, it stood out not just as a working plugin but as a product with a real backlog, active development, and a growing user base. The collaboration model it demonstrated is the model worth generalising.

**Assessment:** ✅ Good closer. Note: "Among 150 hackathon participants" — this is fine here since you're clearly talking about the hackathon cohort.

---

## Learnings

**Assessment:** ✅ Both `reflection` and `aiAndTooling` are among the strongest writing in the whole portfolio. Keep exactly as written. "It's a multiplier, not a compass" is memorable.

---

## Systems

**Assessment:** ✅ Good. Forward-looking without being vague.

---

## Feature Deep Dive

**Assessment:** ✅ Excellent section overall. The mode-by-mode breakdown (Plan → Ask → Agent → Debug) is a strong differentiator. The two-round structure narrative is clear and shows real process thinking.

One observation: the `reflection` field has the phrase "This is the workflow I bring to AI-assisted development" — this is in first person, which is the right voice for a portfolio. Keep.

---

## Images

🖼️ **Background (bgImage):** `swap-wizard-bg.png` is already set. ✅

🖼️ **Available assets for this use case:** Only `swap-wizard-bg.png` exists in `/src/assets/`. If you have screenshots of the Figma plugin UI (the scan panel, the mapping UI, the swap results), those would significantly strengthen this case. Add them to `/src/assets/` and we can reference them.

🖼️ **Hackathon images:** `ids-hackathon.png` and `ids-meetup-lisbon.png` exist in assets — are these relevant to the Swap Wizard case? If so, we could use them.

---

## Summary of Issues to Fix

1. ⚠️ `year` field: change `"2025"` → `"2026"` (or `"2025–2026"`)
2. ⚠️ `\n\n` rendering bug in `approach.narrative` and `execution.narrative` — needs fix (content merge or component patch)
3. ✏️ Minor: clarify 150 participants vs 1,000+ attendees in `context.description`
4. 🖼️ Consider adding plugin screenshots if you have them

**Overall quality: Very high.** The writing is specific, the metrics are credible, and the Feature Deep Dive is genuinely distinctive. Changes needed are mostly technical.
