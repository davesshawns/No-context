---
doc: scope
status: approved
---

# NO CONTEXT

A playful internet-culture playground where you pick a painfully relatable scenario, get a prefilled *fictional* chat, remix it, and export a shareable image.

## The Unique Kernel
**Scenario-first, not blank-canvas.** Ordinary fake-chat generators hand you an empty editor. NO CONTEXT starts from a funny real-life situation — choose a scenario, get a prefilled fictional conversation, customize it, export it. The scenarios (and their writing) are the product.

## Who It's For
Gen Z, students, meme lovers, and friend groups who enjoy relatable internet humor — someone who wants to drop a funny "this is literally us" image into the group chat without writing a whole conversation from scratch.

## The Core Loop
Open NO CONTEXT → browse scenario cards → pick one → the Chat Lab opens with a prefilled fictional conversation → tweak messages and participants while a phone-style preview updates live → export an image → come back for the next scenario or revisit a saved creation.

## Inspiration & Identity
Premium, playful internet-culture energy — explicitly *not* a SaaS dashboard or CRUD app. Deep charcoal / near-black backgrounds, electric lime used selectively, purple gradients and expressive highlights, bold typography, generous spacing, realistic chat bubbles, subtle satisfying animations. Responsive on mobile and desktop. Every generated chat is clearly labelled fictional — never presented as real evidence.

## Why This Matters to the Learner
Wants "a memorable, visually polished, fully functional frontend application — not a large collection of unfinished features," and to get better at using agents and moving faster.

## What "Working" Looks Like
The one-minute demo, in the learner's words: show the homepage and scenario cards, select a relatable scenario, customize the generated chat, preview the polished conversation, and export it as an image. End on the finished creation with NO CONTEXT branding.

**The "oh, that's cool" beat:** one tap on a scenario card and a fully written, believable (fictional) chat appears in a phone mockup — then it downloads as a polished image.

## The POC Boundary
- **Discover:** home with NO CONTEXT brand, **8 hand-written, genuinely funny scenarios** across friends, relationships, group chats, university/work, and family; category filter; clear "create" actions.
- **Chat Lab:** prefilled from a scenario or started blank; add/edit/delete messages; multiple participants with editable names and basic appearance; live phone-style preview; reset/new.
- **Image export** of the finished chat, with a visible "fictional" marker and NO CONTEXT branding.
- **Persistence:** creations saved in the browser and surviving a refresh.

Quality and relatability over quantity.

## Later
- **Meme Studio** (templates/backgrounds, captions, export) — only if Chat Lab, Discover, and export are finished and polished.
- More scenarios beyond the starter 8.

## Explicitly Cut
- **Backend, database, accounts, cloud sync** — no server in a static frontend PoC; localStorage covers persistence.
- **Real-time social voting / community features** — need a backend and users; out of scope.
- **AI / paid / external APIs** — the hand-written scenarios *are* the content; no generation needed to prove the kernel.
