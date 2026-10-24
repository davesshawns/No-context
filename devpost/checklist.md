---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

Browser verification uses headless Google Chrome (`/usr/bin/google-chrome`) driven by `playwright-core` from a scratch folder outside the project (`~/.cache/no-context-checks/`), so no test dependencies are added to the app.

## Slices

- [ ] **1. Pick a scenario and see it as a fictional chat**
  Becomes usable: The app runs with NO CONTEXT branding and navigation; Discover shows all 8 written scenarios with working category filters; "Use scenario" opens Chat Lab showing that scenario's conversation in the phone preview; "Create a chat" opens an empty chat.
  Why now: This is the unique kernel — scenario-first — so it comes first. Bootstrapping (Vite, Tailwind v4 tokens, fonts, router) lives inside it, and it establishes the design system every later slice reuses.
  PRD ref: `prd.md > The Core Journey` (steps 1–3), `prd.md > Discover`, `prd.md > Starter Scenarios`, `prd.md > Chat Lab — Live Preview`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack`, `spec.md > Look and Feel`, `spec.md > App Shell and Routing`, `spec.md > Discover Page`, `spec.md > Chat Lab Page`, `spec.md > Phone Preview`, `spec.md > Chat Thread`, `spec.md > Data Model`, `spec.md > File Structure`
  Build: Scaffold Vite React JS; install Tailwind v4 + `@tailwindcss/vite`, React Router, lucide-react, Fontsource fonts; `@theme` tokens; Layout/TopNav/Wordmark; shared Button and FictionalBadge; full scripts for all 8 scenarios; Discover hero, CategoryFilter, ScenarioCard; `createFromScenario`/`createBlank`; ChatLabPage two-column layout with read-only PhonePreview + ChatThread; NotFound page.
  Verify (mechanical): `npm run build` and `npm run lint` pass; headless Chrome: 8 cards on `/`, each category filter shows only its cards, "Use scenario" on two different cards navigates to Chat Lab and renders that scenario's messages, "Create a chat" shows the empty state, unknown path shows 404; desktop + mobile screenshots reviewed by the agent.
  Learner check: Open the app, filter by a category, tap "Use scenario" on one you like, and see the chat in the phone. Do the jokes land?
  Commit: `Discover scenarios and preview them in Chat Lab`

- [ ] **2. Export the chat as a PNG**
  Becomes usable: "Export PNG" downloads a frame-less, branded, fictional-labelled image of the whole conversation; disabled for empty chats; success/failure toast.
  Why now: html-to-image font/gradient fidelity is the project's main technical risk (`spec.md > Important Failure Modes`). Proving it before building the editor means bad news arrives early, and the demo's finish line exists from slice 2.
  PRD ref: `prd.md > Image Export`
  Spec ref: `spec.md > Export Card and Export`, `spec.md > Shared UI` (Toast)
  Build: Install html-to-image; ExportCard (off-screen, reuses ChatThread, branding footer, fictional label); `exportChat.js`; ToastContext + Toast; LabToolbar with Export button and disabled state.
  Verify (mechanical): `npm run build` and `npm run lint` pass; headless Chrome: export on a scenario chat produces a downloaded PNG file of plausible size; agent opens the PNG and checks fonts, gradient, all messages, label and branding render correctly; export is disabled on an empty chat.
  Learner check: Open a scenario in Chat Lab, tap Export PNG, and open the downloaded image. Would you post it?
  Commit: `Export chats as branded PNG images`

- [ ] **3. Edit the conversation and participants live**
  Becomes usable: Edit chat name; add/edit/delete messages (sender, text, time); customize participants (name, initials, colour, "Me", add/remove with confirmation); toggle "Seen"; New and Reset; mobile Edit/Preview toggle. The preview updates instantly.
  Why now: Completes the core loop — scenario → customize → export — on top of a proven export path, so the early hands-on check can shape everything left.
  PRD ref: `prd.md > Chat Lab — Editing Messages`, `prd.md > Chat Lab — Participants`, `prd.md > Chat Lab — New and Reset`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Chat Editor`, `spec.md > Chat Lab Page`, `spec.md > Shared UI` (ConfirmDialog, IconButton)
  Build: ParticipantEditor, MessageEditor, chat-name field, Seen toggle, New/Reset with ConfirmDialog, mobile segmented toggle; editing always targets the personal copy.
  Verify (mechanical): `npm run build` and `npm run lint` pass; headless Chrome: edit a message's text and see it in the preview; add and delete a message; rename a participant and change colour; switch "Me" and confirm bubble sides flip; remove a participant removes their messages; Reset restores the scenario; the scenario on Discover is unchanged; mobile viewport toggles Edit/Preview; export after editing includes the edits.
  Learner check: Pick a scenario, make it your own (rename people, swap who's "Me", rewrite the punchline), and export it.
  Commit: `Edit messages and participants with live preview`

- [ ] **4. Autosave and My Creations**
  Becomes usable: Chats autosave on edit and survive a refresh; `/lab` reopens the latest draft; My Creations lists saved chats with Open, Rename, Delete (confirm) and an empty state; storage failures show a banner instead of crashing.
  Why now: Persistence depends on the editing data shape from slice 3, and closes the core journey (step 6).
  PRD ref: `prd.md > My Creations and Saving`, `prd.md > States and Boundaries`, `prd.md > The Core Journey` (step 6)
  Spec ref: `spec.md > Creations Store`, `spec.md > Storage Helpers`, `spec.md > My Creations Page`, `spec.md > Data Model`
  Build: `storage.js`, CreationsContext with debounced autosave and `pagehide` flush, persist-on-first-edit with URL replace, `/lab` redirect, CreationsPage list with inline rename and delete confirm, StorageBanner, unknown creation id message.
  Verify (mechanical): `npm run build` and `npm run lint` pass; headless Chrome: edit a scenario chat → reload → edits still present; My Creations lists it; rename persists across reload; delete removes it across reload; an untouched blank chat doesn't appear; empty state shows; corrupt localStorage JSON doesn't crash the app.
  Learner check: Edit a chat, refresh the page, and find it in My Creations. Rename it, then delete it.
  Commit: `Autosave chats and add My Creations`

- [ ] **5. Polish, responsiveness, and edge states**
  Becomes usable: The whole app feels finished on phone and desktop: motion and interaction feedback, focus states, reduced motion, favicon and page title, `vercel.json`, README.
  Why now: Polish only pays off once every behavior exists; doing it last avoids restyling moving targets.
  PRD ref: `prd.md > Look and Feel`, `prd.md > What We're Building`
  Spec ref: `spec.md > Look and Feel`, `spec.md > Where It Runs and How Someone Tries It`, `spec.md > File Structure`
  Build: Transitions and bubble entrance animation, hover/press feedback, focus-visible rings, `prefers-reduced-motion`, responsive pass at 375 / 768 / 1280 px, favicon + meta, `vercel.json` SPA rewrite, README (what it is, features, setup, scripts, fictional-content note).
  Verify (mechanical): `npm run build`, `npm run lint`, `npm run preview` serves the production build; headless Chrome full core journey on the production build (Discover → filter → Use scenario → edit → export → reload → My Creations); screenshots at 375 / 768 / 1280 px reviewed for overflow or broken layout; no console errors.
  Learner check: Run through your one-minute demo on desktop and on a narrow window. Anything that feels unfinished?
  Commit: `Polish visuals, responsiveness, and docs`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 3 (scenario → edit → export works end to end; feedback can still shape persistence and polish)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence:
Route and stops:
Edit outcome:
Reflection:
Activity mode:

## Revisions
