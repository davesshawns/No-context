---
doc: spec
status: approved
---

# NO CONTEXT — Technical Spec

## How This Works, In Plain Language
NO CONTEXT is a **single-page web app that runs entirely in the browser** — there's no server and no database.

- **The scenarios** are 8 hand-written conversations stored as a plain JavaScript file inside the app. They never change; the app only ever *copies* them.
- **The pages** — Discover, Chat Lab, My Creations — are React components. **React Router** gives each page its own web address (`/`, `/lab/…`, `/creations`), so the browser's Back button and refresh behave normally.
- **Your chats** live in one shared "creations store" in memory while you use the app. Every time you change something, the store writes the updated list to **localStorage** — a sticky note the browser keeps for this one site. When you come back or refresh, the app reads that sticky note and everything reappears.
- **The phone preview** is just the chat drawn from the same data the editor changes, so it updates the instant you type.
- **Export** uses a small library, **html-to-image**, that takes a hidden, frame-less version of the chat (with branding and the "Fictional conversation" label) and turns it into a PNG the browser downloads.

Why this shape: everything the PRD asks for — editing, preview, saving, export — can happen on the user's own device. Adding a server would cost time and failure points without proving anything more about the idea.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. User opens `/` → **DiscoverPage** reads the 8 scenarios from `scenarios.js` and shows them as **ScenarioCard**s.
2. User taps a category → DiscoverPage filters the list in memory; nothing is saved.
3. User taps **Use scenario** → the app navigates to `/lab/new?scenario=<id>`. **ChatLabPage** builds a *new creation* by deep-copying that scenario (fresh IDs, `scenarioId` recorded), so the original template is never touched.
4. User edits → **ChatEditor** sends each change to the **creations store**. The store updates the creation in memory, marks it saved, and (shortly after typing stops) writes all creations to localStorage. The URL is replaced with `/lab/<creationId>`. **PhonePreview** re-renders from the same creation instantly.
5. User taps **Export PNG** → **exportChat** renders the frame-less **ExportCard**, waits for fonts to load, calls `html-to-image` `toPng`, and triggers a download named `no-context-<chat-name>.png`. A toast confirms success or failure.
6. Later, user opens `/creations` → **CreationsPage** lists creations from the store (already loaded from localStorage at startup) → Open goes to `/lab/<id>`; Rename/Delete update the store, which saves.

```
 scenarios.js ──copy──▶ creation (in memory) ◀──edits── ChatEditor
                              │        │
                              │        └──render──▶ PhonePreview / ExportCard ──html-to-image──▶ PNG
                              ▼
                         localStorage  ──(on load)──▶ creations store ──▶ CreationsPage
```

## Stack
All versions checked against npm on 2026-10-24.

| Piece | Version | Why | Docs |
|---|---|---|---|
| **Vite** (`create-vite` React JS template) | 8.3.x | Fast dev server + production build. Learner choice. Needs Node ≥ 20.19 / 22.12 (we have 22.23). | https://vite.dev/guide/ |
| **React** + react-dom | 19.3.x | Learner choice. | https://react.dev |
| **Tailwind CSS v4** via **`@tailwindcss/vite`** | 4.3.x | Learner choice. v4 uses the official Vite plugin and `@import "tailwindcss"` + `@theme` tokens in CSS — **no `tailwind.config.js`, no PostCSS config**. | https://tailwindcss.com/docs/installation/using-vite |
| **React Router** | 8.5.x | Learner accepted recommendation: real URLs, working Back button. Used in simple "declarative" mode (`BrowserRouter`, `Routes`, `Route`) imported from `react-router`. Requires Node ≥ 22.22 for tooling. | https://reactrouter.com |
| **lucide-react** | 1.61.x | Learner choice: icons. | https://lucide.dev/guide/packages/lucide-react |
| **html-to-image** | 1.11.13 | Learner accepted recommendation: small, dependency-free DOM → PNG. Tradeoff: fonts and gradients can need care; last release April 2025 — stable but not actively developed. | https://github.com/bubkoo/html-to-image |
| **@fontsource-variable/space-grotesk**, **@fontsource-variable/inter** | 5.3.x | Implementation detail derived from "bold clean typography": fonts are bundled with the app (no Google Fonts link), so export can embed them reliably and the app works offline. | https://fontsource.org |

JavaScript only (no TypeScript). Lint with the ESLint config that ships with the Vite template.

**Verify early in the build:** html-to-image correctly embeds the bundled fonts and the purple gradient in the exported PNG.

## Where It Runs and How Someone Tries It
- **Runtime:** any modern browser. Dev requires Node 22.22+ (installed via nvm: `nvm use 22`).
- **Run locally:** `npm install` → `npm run dev` → open `http://localhost:5173`.
- **Production check:** `npm run build` → `npm run preview` → open `http://localhost:4173`.
- **No API keys, no `.env` needed.**
- **Demo recording:** record the local app: Discover → filter → Use scenario → edit → Export PNG → open the PNG → My Creations → refresh to show it persists.
- **Submission:** demo video + public GitHub repo are required. **The learner pushes to GitHub themselves**; the agent does not commit or push.
- **Optional deployment — Vercel** (if time permits): import the GitHub repo in Vercel, framework preset "Vite", build `npm run build`, output `dist`. A `vercel.json` rewrite sends all paths to `index.html` so refreshing `/creations` doesn't 404. Free hobby tier. Docs: https://vercel.com/docs/frameworks/frontend/vite

## Look and Feel
Carried from `prd.md > Look and Feel`. Implemented as Tailwind v4 `@theme` tokens in `src/index.css`, so every component uses the same names.

- **Colour tokens:**
  - `ink-950` `#0a0a0c` (page), `ink-900` `#111114`, `ink-800` `#1a1a1f` (surfaces), `ink-700` `#26262d` (borders), `ink-400`/`ink-300` (muted text), off-white `#f4f4f0` (text).
  - `lime` `#c6ff00` — **only** primary actions, active filter/nav, focus rings, small highlights.
  - `violet` `#7c3aed` → `fuchsia` `#c026d3` — subtle gradients (hero glow, preview backdrop, export background), never full-screen fills.
  - Curated **bubble palette** (~8 colours that read well on dark: lime, violet, sky, coral, amber, mint, pink, slate) for participant bubbles.
- **Type:** Space Grotesk (bold, tight tracking) for display and headings, very large on the hero; Inter for body/UI. The NO CONTEXT wordmark is uppercase Space Grotesk with a lime accent.
- **Density:** spacious — generous section padding, clear hierarchy, few elements per screen. Discover uses cards; Chat Lab and My Creations deliberately don't become card grids.
- **Motion:** 150–250 ms transitions on hover/press (slight lift/scale), message bubbles fade-and-rise when added, smooth Edit/Preview switch on mobile. Respect `prefers-reduced-motion`.
- **Chat look (own style):** rounded "squircle" bubbles with a small tail on the last bubble of a run; Me on the right in Me's colour, others on the left with initials avatar + name above runs; small muted timestamps; "Seen" under Me's last message; header with chat name and stacked participant initials. Not WhatsApp/iMessage colours or layouts.
- **Interface copy:** short, playful, internet-native, never mean. Fictional labels always present.
- **Components share states:** default / hover / active / focus-visible (lime ring) / disabled (reduced opacity, no pointer).

## Components

### App Shell and Routing
`App.jsx` defines routes inside `BrowserRouter`; `Layout` renders **TopNav** (wordmark → `/`, Chat Lab, My Creations; active link in lime) and the page outlet, plus the **Toast** host. Wraps everything in **CreationsProvider**.
Routes: `/` Discover · `/lab` (redirects to most-recent creation or `/lab/new`) · `/lab/new` (blank, or `?scenario=<id>`) · `/lab/:id` · `/creations` · `*` → friendly 404 linking home.
PRD ref: `prd.md > Screens and Layout`, `prd.md > States and Boundaries` ("Opening Chat Lab directly").

### Creations Store
`CreationsProvider` (React context + `useReducer`) holds `creations[]`, `lastOpenedId`, and `storageOk`. Exposes `upsert(creation)`, `rename(id, name)`, `remove(id)`, `get(id)`. On mount it loads from `storage.js`; after each change it writes back (debounced ~300 ms; flushed on `pagehide`).
PRD ref: `prd.md > My Creations and Saving`.

### Storage Helpers
`src/lib/storage.js`: `loadCreations()`, `saveCreations()`, wrapped in `try/catch`. Detects unavailable/full storage → store sets `storageOk = false` → a small banner says saving isn't available. Corrupt JSON → start empty and warn once (don't crash).
PRD ref: `prd.md > States and Boundaries`.

### Discover Page
Hero (wordmark, tagline, lime "Create a chat" → `/lab/new`, subtle violet glow), **CategoryFilter** (pill buttons: All + 5 categories; active = lime), grid of **ScenarioCard** (title, premise, category tag, mini bubble teaser, "Use scenario" → `/lab/new?scenario=<id>`). Responsive: 1 col mobile, 2 tablet, 3–4 desktop.
PRD ref: `prd.md > Discover`, `prd.md > Starter Scenarios`.

### Chat Lab Page
Resolves which creation to show: `:id` from the store; `new?scenario=` → `createFromScenario()`; `new` → `createBlank()`. Unknown `:id` → message + link to My Creations. Holds the working creation; first edit calls `upsert` and replaces the URL with `/lab/<id>` (so blank/untouched chats don't clutter My Creations). Layout: desktop two columns (ChatEditor left, PhonePreview right, sticky); mobile shows **Edit / Preview** segmented toggle. **LabToolbar**: editable chat name, New, Reset (confirm), Export PNG (disabled with hint when 0 messages).
PRD ref: `prd.md > Chat Lab — New and Reset`, `prd.md > Screens and Layout`.

### Chat Editor
Two sections:
- **ParticipantEditor** — row per participant: name input, initials input (auto from name until edited, max 2 chars), colour swatches from the bubble palette, "Me" radio, remove button (confirm; also removes their messages; disabled when only 2 remain; can't remove Me without choosing another). "Add participant" (max 6).
- **MessageEditor** — list of message rows: sender select, auto-growing text area, time input (`text`, e.g. "11:58 PM"), delete button. "Add message" appends with the next sender in rotation and a time 1 minute after the last. "Show 'Seen'" toggle.
PRD ref: `prd.md > Chat Lab — Editing Messages`, `prd.md > Chat Lab — Participants`.

### Phone Preview
Phone-shaped frame (rounded body, notch, status bar) containing **ChatThread**: header (chat name, stacked initials), messages with grouped runs, timestamps, "Seen". Empty state: "No messages yet — add one to start the drama." Subtle "Fictional conversation" chip. Auto-scrolls to the newest message.
PRD ref: `prd.md > Chat Lab — Live Preview`.

### Chat Thread
The shared, pure rendering of a creation's header + bubbles. Used by both PhonePreview and ExportCard so the export matches what you see.

### Export Card and Export
`ExportCard`: fixed width (~440 px), no phone frame, dark background with a soft violet gradient, ChatThread rendered at full height (all messages), footer with the NO CONTEXT wordmark and "Fictional conversation · made with NO CONTEXT". Rendered off-screen (fixed, positioned outside the viewport — not `display:none`, which html-to-image can't capture).
`src/lib/exportChat.js`: `await document.fonts.ready` → `toPng(node, { pixelRatio: 2, cacheBust: true, backgroundColor })` → create `<a download>` and click it. Errors are caught → toast "Export failed — try again"; success → toast "Saved to your downloads".
PRD ref: `prd.md > Image Export`.

### My Creations Page
List (not a card grid) of creations sorted by last edited: name, source ("from *Scenario title*" or "Blank"), relative time, message count, and a mini colour strip of participants. Actions: Open (→ `/lab/<id>`), Rename (inline edit, Enter/blur saves, Esc cancels; empty name falls back to the chat name), Delete (confirm). Empty state with "Browse scenarios" and "Create a chat".
PRD ref: `prd.md > My Creations and Saving`, `prd.md > States and Boundaries`.

### Shared UI
`Button` (primary lime / secondary / ghost / danger; sizes), `IconButton`, `Toast` (context-driven, auto-dismiss), `ConfirmDialog` (accessible modal; used by Reset, Delete, remove participant), `Wordmark`, `FictionalBadge`. These are the reusable building blocks of the design system.

### Meme Studio (stretch, not planned for build)
Only if every slice above is done and polished — would get its own spec addendum first. PRD ref: `prd.md > Deferred From the POC`.

## Data Model

```js
// Scenario (static, src/data/scenarios.js — never mutated)
{ id: 'five-mins-away', title, premise, category: 'friends'|'relationships'|'group'|'work'|'family',
  chatName, participants: [Participant], messages: [Message], showSeen }

// Creation (one saved chat)
{
  id: 'c_k3x9…',            // random id
  name: '5 mins away',       // display name in My Creations (renamable)
  scenarioId: 'five-mins-away' | null,
  chatName: 'Zoe 🛋️',        // shown in the chat header
  participants: [{ id: 'p1', name: 'Zoe', initials: 'ZO', color: 'violet', isMe: false }],
  messages: [{ id: 'm1', senderId: 'p1', text: 'where are u', time: '7:42 PM' }],
  showSeen: true,
  createdAt: 1761300000000,
  updatedAt: 1761300123000,
}
```

| Data | Lives where | Updated how | When user leaves and returns |
|---|---|---|---|
| Scenarios | bundled JS file | never | always the same 8 |
| Creations | store in memory + localStorage key `nocontext:v1:creations` (JSON array) | every edit → store → debounced write | reloaded from localStorage on startup |
| Most recent creation | localStorage `nocontext:v1:lastOpenedId` | set when a creation is opened/edited | `/lab` reopens it |
| Category filter, Edit/Preview toggle, dialogs, toasts | component state | user clicks | reset (not worth saving) |

Versioned key (`v1`) so a future shape change can't crash old data.

## File Structure

```
no-context/
├── index.html                 # Vite entry; title, meta description, favicon
├── package.json
├── vite.config.js             # react() + tailwindcss() plugins
├── eslint.config.js           # from the Vite template
├── vercel.json                # SPA rewrite (only needed if deployed)
├── public/
│   └── favicon.svg            # NO CONTEXT mark
├── src/
│   ├── main.jsx               # mounts <App/>, imports fonts + index.css
│   ├── App.jsx                # BrowserRouter + routes + providers
│   ├── index.css              # @import "tailwindcss"; @theme tokens; base styles
│   ├── data/
│   │   ├── scenarios.js       # the 8 hand-written fictional scenarios
│   │   └── palette.js         # bubble colour palette + categories
│   ├── lib/
│   │   ├── storage.js         # safe localStorage load/save
│   │   ├── creations.js       # createBlank, createFromScenario, ids, initials, time helpers
│   │   └── exportChat.js      # html-to-image → PNG download
│   ├── state/
│   │   ├── CreationsContext.jsx  # creations store + autosave
│   │   └── ToastContext.jsx      # toast notifications
│   ├── components/
│   │   ├── layout/            # Layout, TopNav, Wordmark, StorageBanner
│   │   ├── ui/                # Button, IconButton, ConfirmDialog, Toast, FictionalBadge
│   │   ├── discover/          # Hero, CategoryFilter, ScenarioCard
│   │   ├── lab/               # LabToolbar, ParticipantEditor, MessageEditor, PhonePreview, ExportCard
│   │   └── chat/              # ChatThread, ChatBubble, Avatar
│   └── pages/
│       ├── DiscoverPage.jsx
│       ├── ChatLabPage.jsx
│       ├── CreationsPage.jsx
│       └── NotFoundPage.jsx
├── devpost/                   # scope.md, prd.md, spec.md, checklist.md (+ ignored learner-profile.md)
├── .agents/ .claude/ agent/ skills-lock.json   # Devpost skill pack (curriculum)
└── README.md                  # what it is, features, setup, scripts, fictional-content note
```

## External Services and Dependencies
None at runtime: no APIs, keys, rate limits, or costs. npm packages listed under **Stack**. Optional Vercel hosting is free on the hobby tier.

## Important Failure Modes
- **Export renders wrong or throws** (missing fonts, gradient, element not rendered) → toast "Export failed — try again"; chat untouched. Mitigation: bundled fonts, `document.fonts.ready`, off-screen (not hidden) node, solid `backgroundColor`. Verified in the export slice by opening the actual PNG.
- **localStorage unavailable/full/corrupt** → app keeps working in memory; banner "Saving isn't available in this browser"; corrupt data ignored instead of crashing.
- **Bad URL** (`/lab/<deleted id>`, unknown path) → friendly message with links to My Creations / Discover.

## What Was Simplified and Why
- **Plain JS scenario file** instead of a content system — 8 fixed scenarios don't need one.
- **localStorage** instead of accounts/cloud — learner's choice; one browser, one person is enough to prove the loop. A fuller version would need auth + a database.
- **Text time field** ("11:58 PM") instead of a date/time picker — faster to edit, matches how chats display time.
- **Delete + add** instead of drag-to-reorder messages — agreed deferral.
- **Fixed bubble palette** instead of a free colour picker — guarantees readable, on-brand bubbles.
- **Initials avatars** instead of image uploads — no file handling; still personal.

## Decisions and Open Issues
**Learner decisions:** React + Vite + Tailwind v4 (Vite plugin) + JavaScript + Lucide + localStorage; html-to-image for PNG export; React Router; minimal dependencies; local app first, Vercel only if time permits; learner does the final GitHub push; fast build mode; Markdown reviews.

**Implementation details derived by the agent:** bundled Fontsource fonts (Space Grotesk + Inter) for reliable export; context + reducer store with debounced autosave; versioned storage key; off-screen ExportCard; chat persisted on first edit; `vercel.json` rewrite.

**Learner uncertainty:** "how to guide AI agents effectively, review their code, catch broken functionality, and make good architecture decisions without wasting tokens or time." How this build addresses it:
- every build slice cites a PRD acceptance criterion and is **verified on evidence** (production build, lint, and a real browser check — clicking through the flow and opening the exported PNG), not by the agent's say-so;
- the architecture is deliberately one store + pure render components, so a reviewer can check behaviour in two places (`CreationsContext.jsx`, `ChatThread.jsx`);
- the final walkthrough points to the 5–6 files that matter and what to check in each.

**Still open:** none blocking. Verify html-to-image font/gradient fidelity in the first export slice.
