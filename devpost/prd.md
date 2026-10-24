---
doc: prd
status: approved
---

# NO CONTEXT — Product Requirements

A playful internet-culture playground where Gen Z, students, meme lovers, and friend groups pick a painfully relatable scenario, get a prefilled *fictional* chat, remix it, and export a shareable PNG.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. Someone opens NO CONTEXT and lands on **Discover**: bold brand, a short tagline, a prominent **Create a chat** button, category filters, and 8 scenario cards.
2. They tap a category filter; the grid narrows to that category.
3. They tap **Use scenario** on a card. **Chat Lab** opens with a *personal copy* of that scenario: chat name, participants, and a fully written fictional conversation, shown in a live phone-style preview.
4. They edit — rename participants, change colours/initials, pick who is "Me", rewrite/add/delete messages, toggle "seen". Every change appears in the preview instantly.
5. They tap **Export PNG**. A polished image of the chat (no phone frame) downloads, with a subtle "Fictional conversation" label and NO CONTEXT branding.
6. Their chat is autosaved. Later they open **My Creations**, reopen it, rename it, or delete it — it survives a page refresh.

**Success:** scenario → customized chat → downloaded PNG in about a minute, and the creation is still there after refresh.

## Screens and Layout

Three screens, connected by a persistent top navigation (NO CONTEXT wordmark → Discover, **Chat Lab**, **My Creations**).

- **Discover (home)** — hero with bold NO CONTEXT branding, short tagline, prominent "Create a chat" action; category filter row (All, Friends, Relationships, Group Chats, Uni & Work, Family); grid of 8 scenario cards. Each card: funny title, short premise, category tag, "Use scenario" action.
- **Chat Lab** — desktop: editor on the left, live phone preview on the right. Mobile: editor first with a clear toggle to switch between **Edit** and **Preview**. Toolbar: chat name, New, Reset, Export PNG.
- **My Creations** — list of saved chats (name, source scenario or "Blank", last edited, message count), each with Open, Rename, Delete.

## Look and Feel
Source: `scope.md > Inspiration & Identity`.

- **Mood:** premium, playful internet culture. Expressive and confident, not corporate.
- **Colour:** deep charcoal / near-black base; **electric lime** as the selective accent (primary actions, active states, highlights); **subtle purple gradients** for depth and expressive moments.
- **Type:** bold, clean typography — big confident headings, readable body.
- **Surfaces:** expressive cards for scenarios; generous spacing; strong hierarchy. Don't fill every screen with cards.
- **Motion:** smooth transitions and satisfying interaction feedback, kept subtle.
- **Chat style:** NO CONTEXT's *own* recognizable chat look — not a copy of WhatsApp or iMessage. Realistic bubbles, chat/group name header, timestamps, optional "seen".
- **Avoid:** generic SaaS dashboards, clutter, copying existing messaging apps.

## Features and Behavior

### Discover
- As a meme lover, I want to browse funny ready-made scenarios so I can start from a joke instead of a blank page.
  - [ ] Home shows the brand, tagline, "Create a chat" button, category filters, and 8 scenario cards.
  - [ ] Each card shows title, premise, category tag, and "Use scenario".
  - [ ] Selecting a category shows only that category's cards; "All" shows all 8. The active filter is visibly highlighted.
  - [ ] "Use scenario" opens Chat Lab with that scenario's chat loaded.
  - [ ] "Create a chat" opens Chat Lab with a blank chat (two default participants, no messages).

### Starter Scenarios
Eight hand-written, clearly fictional scenarios with invented names. Drafted by the agent for learner review; full message scripts (~6–12 messages each) are written during the build.

| # | Title | Category | Premise / punchline |
|---|---|---|---|
| 1 | **"5 mins away"** | Friends | Friend insists they're nearly there. Their shared location says they're at home. Then they post a story of their duvet. |
| 2 | **"We need to talk"** | Relationships | Partner sends the four most terrifying words. Me spirals through every apology. It was about where to get dinner. |
| 3 | **"u up?"** | Relationships | 2:14am text from the ex. Heart racing. They just need the Netflix password. "the one with the profile called 'kids'". |
| 4 | **The trip that never happens** | Group Chats | Five friends: "we NEED to go on a trip this summer 😭". Pure hype, zero bookings. Cut to "so… next summer?" |
| 5 | **Splitting the bill** | Group Chats | Dinner bill maths. One person "only had a water". Receipts get posted. The water was three cocktails. |
| 6 | **The group project ghost** | Uni & Work | Silent for six weeks. 11:58pm on deadline night: "hey guys what's our topic again? 🙂" |
| 7 | **The sick day** | Uni & Work | "Not feeling great, taking a sick day 🤒". Manager: "feel better!" … "also loved your festival story 👀" |
| 8 | **Grandma discovers LOL** | Family | Family group chat. Grandma replies "LOL" to everything — including bad news — because she thinks it means "lots of love". |

### Chat Lab — Editing Messages
Source: `scope.md > The POC Boundary`.
- As a creator, I want to rewrite the conversation so it becomes *my* joke.
  - [ ] Each message row shows sender, text, and timestamp; all are editable inline.
  - [ ] "Add message" appends a message (sender selectable; defaults to alternating), and the preview shows it immediately.
  - [ ] Deleting a message removes it from editor and preview immediately.
  - [ ] The chat/group name is editable and shown in the preview header.

### Chat Lab — Participants
- As a creator, I want to customize who's in the chat so it looks like my friends' chat (but fictional).
  - [ ] Participants have editable name, bubble colour (from a curated palette), and initials/avatar.
  - [ ] Exactly one participant is marked **Me**; Me's messages render on the right, everyone else's on the left with name and initials.
  - [ ] Switching who is Me flips bubble sides in the preview instantly.
  - [ ] Users can add participants (for group chats) and remove them.

### Chat Lab — Live Preview
- As a creator, I want to see a realistic phone preview while I edit.
  - [ ] A phone-style frame shows the chat header (chat name, participants), bubbles, timestamps, and optional "seen" under Me's last message.
  - [ ] Every edit is reflected in the preview without any extra click.
  - [ ] The preview carries a subtle "Fictional conversation" marker.

### Chat Lab — New and Reset
- [ ] **New** starts a fresh blank chat (previous chat stays saved in My Creations).
- [ ] **Reset** asks for confirmation, then restores a scenario-based chat to the original scenario (or empties a blank chat).

### Image Export
Source: `scope.md > What "Working" Looks Like`.
- As a creator, I want to download a polished image so I can drop it in the group chat.
  - [ ] **Export PNG** downloads a PNG of the full conversation — no phone frame.
  - [ ] The image includes the chat header, all messages, a subtle "Fictional conversation" label, and NO CONTEXT branding, without distracting from the chat.
  - [ ] Export is disabled (with a hint) until the chat has at least one message.
  - [ ] The user gets clear feedback that the export succeeded or failed.

### My Creations and Saving
- As a returning user, I want my chats to be there when I come back.
  - [ ] Chats autosave as they're edited — no Save button.
  - [ ] My Creations lists saved chats; Open reopens one in Chat Lab exactly as left.
  - [ ] Rename changes the creation's name in the list.
  - [ ] Delete asks for confirmation, then removes it.
  - [ ] All of the above survives a page refresh.

## States and Boundaries

- **First use** — Discover shows the 8 scenarios; My Creations shows a friendly empty state pointing to "Use scenario" / "Create a chat".
- **Empty chat** — preview shows an inviting empty state; Export is disabled until there's at least one message.
- **Editing a scenario** — always edits a personal copy; the original template is never changed.
- **Leaving mid-edit** — the draft is already autosaved; returning (via Chat Lab or My Creations) restores it.
- **Opening Chat Lab directly** — reopens the most recent draft if one exists, otherwise a blank chat.
- **Export failure** — a visible error message; the chat is untouched.
- **Storage unavailable/full** — the app still works for the session and tells the user saving isn't available.
- **Fictional boundary** — every preview and export is marked fictional; scenarios use invented names.

## Product Decisions

- **Scenario-first Chat Lab is the priority; Meme Studio is a stretch goal** — the demo is scenario → chat → PNG; a second editor competes for polish time.
- **8 scenarios, quality over quantity**, drafted by the agent for learner review — relatability is the product.
- **NO CONTEXT's own chat style** rather than copying WhatsApp/iMessage — recognizable identity, avoids imitation.
- **Export without the phone frame**, with a subtle fictional label and branding — the chat is the star; label keeps it honest.
- **Autosave, no Save button** — nothing is lost when leaving mid-edit.
- **Editing a scenario creates a personal copy** — templates stay pristine.
- **Export disabled for empty chats** — no blank images.
- **Mobile Chat Lab: editor first with an Edit/Preview toggle.**
- **Markdown-only plan reviews** — save time.

**Assumptions (agent, flagged for review):**
- Removing a participant also removes their messages, after confirmation; the chat must keep at least two participants and exactly one "Me".
- A blank chat only appears in My Creations once it has been edited, to avoid clutter.
- Typing indicator and message reordering are not in the PoC (see Deferred).

## What We're Building
- Discover with brand, tagline, Create a chat, category filters, 8 scenario cards.
- Chat Lab with message add/edit/delete, participant customization (name, colour, initials, Me), chat name, timestamps, optional "seen", live phone preview, New, Reset, mobile Edit/Preview toggle.
- PNG export (no frame, fictional label, branding), disabled when empty.
- Autosave + My Creations (open, rename, delete), surviving refresh.
- Persistent navigation; responsive desktop and mobile.

## Deferred From the POC
- **Meme Studio** — stretch goal; only after the core is finished and polished.
- **Typing indicator** — learner said optional; add only if time allows.
- **Message drag-to-reorder** — delete/re-add covers the PoC.
- **Share links / social posting** — would need hosting of images or a backend.

## Possible Later Enhancements
- More scenarios and community-submitted scenarios.
- Light theme / alternate chat skins.
- Image/sticker messages and reactions.

## Non-Goals
- **Accounts, backend, cloud sync** — localStorage covers persistence.
- **Real-time social voting** — needs users and a server.
- **AI or paid APIs** — the hand-written scenarios are the content.
- **Imitating real messaging apps or real people** — chats are always fictional and clearly labelled.

## Open Questions
- None blocking `4-spec`. Learner to confirm the flagged assumptions and the 8 scenario premises.
