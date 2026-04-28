# Project: Modular AI-Assisted Web App Platform

## Objective

Build a modular web platform to host multiple small-to-medium web applications.
Primary goals:

1. Rapid development using AI-assisted coding
2. High relevance to modern frontend/fullstack market
3. Clean, scalable architecture for adding new apps
4. Practical learning of current technologies
5. Optional monetization later

Initial apps:

* Quiz App
* Yu-Gi-Oh Deck Builder (first implementation target)

---

## Tech Stack (Mandatory)

### Core

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend / Infra

* Supabase (Auth, Postgres, Storage)
* Vercel (Deployment, Serverless runtime)

### Supporting

* Zod (validation)
* React Hook Form (forms)
* lucide-react (icons)

---

## Architecture Overview

Single monolithic Next.js application acting as:

* Frontend (UI)
* Backend (Server Actions, Route Handlers)
* API layer (internal + external integrations)

External services:

* Supabase → database, auth, storage
* Optional third-party APIs (e.g. Yu-Gi-Oh card API)

---

## High-Level Structure

```
src/
  app/
    page.tsx
    layout.tsx

    dashboard/

    apps/
      yugioh/
        page.tsx
        builder/
        decks/
      quiz/
        page.tsx

  features/
    yugioh/
      components/
      actions/
      queries/
      schemas/
      types.ts

    quiz/
      components/
      actions/
      queries/
      schemas/
      types.ts

  components/
    ui/
    layout/
    shared/

  lib/
    supabase/
    auth/
    utils/
    env.ts

  db/
    migrations/
    types.ts
```

---

## Architectural Rules

### 1. Feature Isolation

Each app must be isolated in `/features/<app-name>`:

* No cross-feature coupling
* Shared logic goes to `/lib` or `/components/shared`
* Each feature owns:

  * UI components
  * server actions
  * data schemas
  * types

---

### 2. Data Access Pattern

Use:

* Server Components for data fetching
* Server Actions for mutations
* Route Handlers only when necessary (e.g. external API proxy)

No client-side direct database access unless strictly required.

---

### 3. Validation

All input must be validated using Zod:

* Forms
* Server Actions
* API inputs

---

### 4. Auth

Use Supabase Auth:

* Email/password or magic link
* Protect routes via middleware
* Store user profile in `profiles` table

---

### 5. Styling

* Tailwind only
* shadcn/ui for components
* No custom CSS unless unavoidable

---

### 6. State Strategy

* Prefer server state over client state
* Use local state only for UI interaction
* Avoid global state libraries initially

---

### 7. AI Code Constraints

Generated code must:

* Be typed (TypeScript)
* Follow folder structure strictly
* Avoid unnecessary abstractions
* Prefer readability over cleverness
* Avoid overengineering

---

## Database Design (Initial)

### Core Tables

```
profiles
- id
- email
- created_at
```

---

### Yu-Gi-Oh Feature Tables

```
ygo_decks
- id
- user_id
- name
- created_at

ygo_deck_cards
- id
- deck_id
- card_id
- quantity

ygo_favorites
- id
- user_id
- card_id
```

---

### Quiz Feature Tables (later)

```
quiz_quizzes
quiz_questions
quiz_answers
quiz_attempts
```

---

## Routing Strategy

```
/                → Landing page
/dashboard       → User dashboard

/apps/yugioh     → Yu-Gi-Oh overview
/apps/yugioh/builder
/apps/yugioh/decks

/apps/quiz       → Quiz overview
```

---

## Phase 1: Platform Foundation

Tasks:

1. Initialize Next.js project with TypeScript
2. Install and configure:

   * Tailwind
   * shadcn/ui
   * Supabase client
3. Setup base layout
4. Setup navigation
5. Setup authentication (Supabase)
6. Create dashboard page
7. Create `/apps` structure
8. Setup environment variables

---

## Phase 2: Yu-Gi-Oh Deck Builder (Start Here)

### Core Features

* Search cards via external API
* Display card list
* Add/remove cards to deck
* Save deck
* Load existing decks
* Basic deck view

---

### Required Components

```
CardSearch
CardList
CardItem
DeckBuilder
DeckList
DeckView
```

---

### Required Logic

* API integration (card search)
* Local state for current deck
* Server Action for saving decks
* Fetch decks per user
* Validation of deck structure

---

### Constraints

* Keep UI simple but clean
* Focus on functionality first
* No premature optimization
* No advanced drag-and-drop initially

---

## Phase 3 (Later)

* Quiz App
* Public sharing
* AI features (e.g. generate quiz questions)
* Monetization (Stripe)
* App registry system

---

## Development Principles

* Build small, complete vertical slices
* Ship working features early
* Refactor after functionality exists
* Avoid premature abstractions
* Keep cognitive load low

---

## Expected Output from AI Tool

1. Full project scaffold
2. Folder structure exactly as defined
3. Base layout + navigation
4. Auth integration
5. Initial Yu-Gi-Oh feature skeleton
6. Clean, typed, minimal code

Do not generate placeholder-heavy or pseudo-code structures.
Produce working, runnable code only.
