## PRD: StarwayTrasporti Static, Responsive Web App (MVP)

### 1) Introduction / Overview

StarwayTrasporti.com will be a static, internationalized marketing website for an Italy-based transportation business. It highlights services with a modern, engaging presentation to attract new clients and helps existing clients quickly find key information (e.g., locations, contact). The site must be responsive, performant, SEO-friendly, and managed through a CMS. Reference competitor: https://trasportiromagna.com.

Primary goal: deliver a static SvelteKit site with multi-language content (IT-first, EN support), CMS editing (Sanity), simple auth for CMS, and a polished UX with animations and parallax while remaining accessible and fast.

### 2) Goals

- Build a fully responsive static site that loads fast on mobile and desktop.
- Support international visitors (Italian default; English supported; extendable to others).
- Enable non-technical content editors to manage pages, sections, media, and scheduling via CMS.
- Communicate brand credibility with consistent design, testimonials, stats, and clear CTAs.
- Provide essential client info quickly (locations, contact, hours, coverage) with accessible navigation.
- Ensure SEO readiness (metadata, sitemap, robots) and analytics to measure engagement.
- Provide a foundation for ad/affiliate monetization while respecting privacy (cookie consent, GDPR).

### 3) User Stories

From CMS perspective:

- As a content editor, I want to log into the CMS in my language, navigate clear sections/pages, and manage forms, inputs, and media so I can easily create/update content and customize URLs.
- As a content editor, I can stage changes and schedule publish times for production releases.

From visitor perspective (potential client):

- As a visitor, I want a professional brand presentation, trust signals (stats/testimonials), and clear information architecture to evaluate if StarwayTrasporti can meet my logistics needs.
- As a visitor, I want accessible navigation that works great on mobile and desktop, with a sticky header.
- As a visitor, I want clear section organization with links to related pages.
- As a visitor, I want a cookie preference prompt and transparent data handling since there may be ads.
- As a visitor, I want a standard footer with links to About and Privacy Policy.
- As a visitor, I want an easy way to reach out and schedule a call or visit.

From visitor perspective (current client):

- As a current client, I want quick access to warehouse locations (map and/or collapsible list by region/country), contact info, and an easily navigable mobile UI.

### 4) Functional Requirements

1. Static site generation
   - The site must be statically generated (SSG) wherever possible and deployable to a CDN (Vercel). CMS content should be cached; no real-time updates required for MVP.
2. Homepage multi-level parallax
   - Implement a multi-depth parallax hero with the company name in strong, bold typography.
3. Sticky, responsive navigation
   - Sticky header; collapses into a hamburger menu on smaller screens; keyboard-accessible with focus states; ARIA-compliant.
4. Internationalization (i18n)
   - Auto-detect locale; default to Italian; allow user switching (language switcher).
   - Use Paraglide-js for i18n; ensure string keys and content are translatable; prepare EN/IT content.
5. Page animations
   - Apply tasteful fade/fly-in animations for text and media on route transitions/section reveal.
   - Respect prefers-reduced-motion; provide non-animated fallbacks.
6. CMS integration
   - Use Sanity CMS for content: pages, sections, media, testimonials, locations, and navigation items.
   - Provide an authenticated dashboard path at /dashboard linking to CMS (or embedded admin UI if applicable).
   - Support scheduled publishing and drafts.
7. Authentication for CMS
   - Implement simple authentication (Drizzle ORM + PostgreSQL) for internal admin access (roles: editor, admin).
8. Locations module
   - Display locations via collapsible lists grouped by region/country and optionally a map.
   - Location entries managed in CMS with fields (name, address, region, country, coordinates, hours, contact).
9. Contact and lead capture
   - Prominent CTAs (call/email/WhatsApp link or form). If using a form, validate inputs and send via provider (e.g., email/API) with success/failure messaging.
10. Cookie consent and privacy
   - Cookie consent banner/modal; store preferences; block non-essential scripts until consent; link to Privacy Policy.
11. Footer
   - Standard footer with About, Privacy Policy, Contact, and locale switch.
12. Timeline (nice-to-have)
   - Optional interactive timeline slider with a small animated truck icon; on milestones show text toast or image (e.g., historical logo). Load progressively.
13. SEO basics
   - Metadata per page, OpenGraph/Twitter cards, sitemap.xml, robots.txt, structured data for organization.
14. Analytics
   - Integrate privacy-aware analytics (e.g., Vercel Analytics or similar), gated by cookie consent.
15. Accessibility
   - Conform to WCAG 2.1 AA where practical (color contrast, keyboard nav, skip links, focus management).
16. Performance budgets
   - Target <2.5s LCP on 4G mid-tier devices; ship minimal JS; optimize images; use lazy loading.
17. Testing
   - Component stories in Storybook; add a11y checks.
   - E2E tests (Playwright) for: homepage render, navigation works (desktop/mobile), cookie consent flow, language switch, locations page basics.
   - Place Playwright tests under src/lib/pages sub-directories as noted.
18. Deployment and environments
   - Deploy to Vercel; configure environment variables for CMS, database, and analytics; set preview/prod flows.
19. Ads/affiliate readiness
   - Provide placeholders/slots for future ad/affiliate modules with consent gating.

### 5) Non-Goals (Out of Scope)

- Real-time content updates from CMS; SSR on each request.
- Complex customer portals, quote calculators, or shipment tracking.
- Native mobile apps.
- Advanced search with indexing beyond simple site search (MVP may omit search entirely).
- Multi-tenant CMS/auth model; only two CMS users expected (editor and developer).
- Heavy e-commerce flows or payments.

### 6) Design Considerations

- Tone: serious, professional; balanced media and text to maintain engagement.
- Navigation: sticky, clear IA, large legible buttons and typography.
- Animations: subtle parallax and media transitions; avoid motion overdose.
- Content layout: flexible sections (e.g., two stacked images on right, text on left) driven by CMS.
- Brand: ensure consistent theme, color palette, and component library usage.
- Accessibility: color contrast, focus states, mobile-first layout, readable line lengths.
- Reference: take cues from trasportiromagna.com for balance of media/text and subtle animation.

### 7) Technical Considerations

- Stack
  - SvelteKit + Vite; Tailwind CSS; Paraglide-js; Drizzle ORM + PostgreSQL; Sanity CMS; Storybook; Playwright; deploy on Vercel.
- Architecture
  - Modular structure with self-contained components in src/lib/components (with optional __STORIES__/__TESTS__).
  - Page templates in src/lib/layouts (article, form, homepage); page experiments in src/lib/pages before promotion to src/routes.
- Performance & caching
  - Prefer static generation; cache CMS responses; image optimization; minimal client JS.
- Internationalization
  - Keyed messages via Paraglide; IT and EN messages maintained; auto-detect with manual override.
- Security
  - Secure admin auth (hashed passwords, rate limiting where applicable); protect /dashboard; follow GDPR for cookies/analytics.
- Testing & quality
  - Storybook-driven component dev; Playwright E2E; Vitest where helpful; a11y checks.

### 8) Success Metrics

- Performance: LCP < 2.5s (mid-tier mobile), CLS < 0.1, Lighthouse Performance > 90 on key pages.
- Engagement: +20% time-on-page vs baseline; bounce rate < 55% on homepage.
- Lead generation: ≥ 2% conversion on contact CTA clicks/submissions.
- Localization: ≥ 95% strings localized in supported locales; language switch usage tracked.
- Editorial efficiency: editors can publish changes without developer assistance; average publish cycle < 1 day.

### 9) Open Questions

- Final list of supported locales at launch: IT and EN only, or add others (e.g., US English variants)?
- Brand assets and guidelines availability (logo, colors, typography choices).
- Exact CMS schema (sections, page types, testimonials, locations) and editorial workflows.
- Which analytics and ad/affiliate platforms to integrate (and consent requirements)?
- Map provider and data for locations (static map images vs interactive; provider license).
- Contact flow: email links only vs integrated form handler; preferred provider.
- Legal pages content readiness (Privacy Policy, Terms, Cookie Policy) and languages.
- Hosting domain and DNS ownership; subpath for dashboard and CMS access method.


