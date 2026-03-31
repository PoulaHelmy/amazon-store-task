
---

# AmazonMini — Angular Frontend Interview Challenge

Welcome! This challenge is designed to evaluate your Angular skills across three tasks of increasing depth. You have **90 minutes** total. Prioritize correctness, maintainability, and sound technical judgment.

---

## Tech Stack

* Angular 21 (standalone components, signals)
* ngx-translate for i18n
* PrimeNG 21 with Aura theme
* Make sure your local Node.js version matches the version expected by the project

## Setup

```bash
npm install
npm start      # runs the app at http://localhost:4200
```

---

## Task 1 — PR Review (20 min)

A teammate opened a PR on the `feature/promo-code` branch. Review the code and write your feedback as if you were leaving GitHub review comments.

**Branch:** `feature/promo-code`
https://github.com/PoulaHelmy/amazon-store-task/pull/1/
```bash
git checkout feature/promo-code
git diff main feature/promo-code
```

Write your review in `PR_REVIEW.md` overall notes after leaving comments on the pr.

Focus on areas you see it is important to address, such as:
* Code quality and maintainability
* Architectural decisions
* Test coverage
* improve the skills for the new-commers and jouniors
---

## Task 2 — Implement ProductCard Component (30 min)

The `ProductCardComponent` exists in `src/app/shared/components/product-card/` but needs to be fully implemented to match the design spec.

**Design spec:** `design-spec/product-card-design-spec.pdf`
**Reference HTML:** `design-spec/product-card.html` (open in browser for visual reference)

**Requirements:**

1. Display all 6 card states: normal, on-sale (with % badge), out-of-stock (overlay + disabled button), new (badge), featured (badge), low-stock (warning text)
2. Use Angular’s signal-based component APIs where appropriate for inputs, outputs, and derived state
3. Support RTL — the card must flip correctly when `dir="rtl"` is set on `<html>`
4. The "Add to Cart" button must emit the product via the `addToCart` output
5. Show star rating and review count

All 6 states are already represented in the product data at `/assets/data/products.json`.

---

## Task 3 — Project Review & Feature Implementation (40 min)

Review the codebase and address as many of the following as you can. Focus on correctness, maintainability, and architectural quality.

---

### 3a. Angular Patterns & Architecture

* Review `app.ts`. There are issues related to responsibility boundaries and application startup flow. Identify them and refactor toward a more appropriate design.
* The application depends on runtime configuration (e.g. locale, direction, payment providers), but the current approach can leave the app in a partially initialized state. Improve the startup flow so the app becomes interactive only after essential runtime setup is complete.
* Eliminate misplaced responsibilities and hardcoded runtime assumptions.
* Explain your reasoning and trade-offs behind the changes.

---

### 3b. Dependency Injection Bug

* The cart count in the navbar does not update when adding items from the product list page. Investigate and resolve the underlying DI issue.
* Briefly explain why the issue occurred.

---

### 3c. HTTP Layer

The current HTTP layer lacks centralized handling for cross-cutting concerns. Improve it to ensure:

* Requests consistently reflect the active user locale and regional context
* The UI can react to ongoing network activity in a unified way
* Errors are handled in a consistent and user-friendly manner

Explain any design decisions you make.

---

### 3d. Routing

* Navigation to the product detail page (`products/:id`) can result in inconsistent UI states depending on timing of data availability. Improve the routing/data flow to make the experience deterministic and robust.

---

### 3e. Search Page Bug

* The search experience is not preserved when navigating away and returning via browser history. Identify the root cause and fix it in a way that aligns with expected web navigation behavior.

---

### 3f. Performance

* The product list implementation has a scalability issue that may degrade performance with large datasets. Identify the problem and optimize it. Explain your approach.

---

### 3g. RTL Support

* Although RTL is claimed to be supported, parts of the UI rely on hardcoded directional styles. Refactor at least two instances to support proper bidirectional layouts.

---

### Data Consistency

* Review the product data model and backing JSON data. If there are inconsistencies or missing properties, update them accordingly.
* Ensure the UI handles incomplete data gracefully.
* Document any assumptions or changes you introduce.

---

## Bonus Task — Environment Strategy

This app is likely to evolve across multiple deployment targets with differing configuration needs. Describe how you would approach environment-specific configuration in a maintainable way, then implement a minimal version of that approach for this project.

Capture your notes in `ENVIRONMENT_NOTES.md`, and include support for at least:

* `staging`
* `production`

Document any assumptions or trade-offs.

Consider questions such as:

* How should environment-specific configuration be structured as the number of keys grows over time?
* What belongs in build-time configuration versus runtime-loaded configuration?
* How would you handle cases where environments differ in integrations, providers, feature flags, or external service settings?
* What risks do you see in pushing too much environment behavior into static configuration files?

---

## Submission

When done, push your changes:

```bash
git add .
git commit -m "feat: interview submission"
git push
```

Good luck! 🚀
