# Kampala Capital City Authority (KCCA) — Website Redesign Specification
> **For use by an AI coding agent (e.g. Impeccable / OpenCode)**
> This document is the single source of truth for the redesign. Follow every section closely.

---

## 1. Project Overview

**Client:** Kampala Capital City Authority
**Website:** kcca.go.ug
**Tagline:** "For a Better City"
**HQ:** City Hall, Plot 1-3 Apollo Kaggwa Road, Kampala
**Toll-free:** 0800 199 000 | **Email:** info@kcca.go.ug
**Social:** Facebook, Twitter, YouTube, Instagram, Flickr (@kccaug)

**Goal:** Redesign the KCCA website into a modern, citizen-first government platform that fixes all identified weaknesses — replacing the overloaded directorate-based navigation with a task-based citizen journey model, adding a guided homepage with clear pathways, consolidating fragmented portals under a unified visual identity, and delivering a fully functional mobile experience.

**Output:** A single-file `index.html` (HTML + CSS + vanilla JS, no build step required).

---

## 2. Weaknesses to Fix

| # | Weakness | Solution |
|---|----------|----------|
| W1 | Overloaded navigation by directorate | Task-based navigation: "I want to..." model |
| W2 | No citizen guidance on homepage | Prominent service finder + user-type quick paths |
| W3 | Fragmented external portals, inconsistent branding | Unified portal cards with consistent design system |
| W4 | Dated visual design | Full visual redesign — modern civic design language |
| W5 | Broken mobile navigation and layout | Mobile-first layout, clean hamburger menu |
| W6 | FAQ covers only one directorate | Expanded citizen FAQ covering all top services |

---

## 3. Aesthetic Direction

### 3.1 Theme
**Modern Civic Authority** — trustworthy, accessible, serious without being intimidating.
Think GOV.UK meets an East African civic identity — clean white space, strong government green, readable typography, no unnecessary decoration. The design communicates: *this organisation is competent, organised, and here to serve you.*

### 3.2 Color Palette
```css
:root {
  --bg-primary:     #FFFFFF;
  --bg-soft:        #F4F7F4;   /* Very light green tint — alternate sections */
  --bg-dark:        #0A2A1A;   /* Deep forest green — footer */
  --accent-green:   #1B6B3A;   /* KCCA primary green — nav, headings, CTAs */
  --accent-green-l: #2E8B57;   /* Lighter green — hover states */
  --accent-gold:    #C49A2A;   /* KCCA crest gold — accents, badges */
  --accent-red:     #B52B2B;   /* Alerts, urgent notices */
  --accent-blue:    #1A4B8C;   /* Links, secondary actions */
  --text-primary:   #1A1A1A;
  --text-muted:     #52595E;
  --text-light:     #F4F7F4;
  --border:         #D8E4D8;
  --card-shadow:    rgba(27, 107, 58, 0.08);
  --success:        #1B6B3A;
  --warning:        #C49A2A;
}
```

### 3.3 Typography
```html
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```
- **Display / Section headings:** `Source Serif 4` — authoritative, readable, institutional serif
- **Body / UI / Navigation / Forms:** `Inter` — clean, highly accessible, government-grade readability
- **Service labels / Badges / Stats:** `Inter`, bold, all-caps tracking

### 3.4 Visual Details
- Clean white cards with `2px` left border in `--accent-green` for service items
- Section headings: `Source Serif 4` 700, dark green, with a short `--accent-gold` 3px underline bar
- Buttons: `--accent-green` filled (primary), outlined green (secondary), `border-radius: 4px` — no pill shapes (civic, not consumer)
- News cards: image top, date in `--accent-gold`, title in Source Serif 4
- Icons: use Unicode emoji or simple inline SVG — no icon library dependency
- No background textures or gradients on content sections — clean flat civic design
- Alert / notice strip at top of page in `--accent-gold` background for important announcements

---

## 4. Page Structure & Sections

Single scrolling `index.html` with a **sticky navigation bar**.

---

### 4.0 `<nav>` — Sticky Navigation

**Top bar (thin strip above main nav):**
```
📞 Toll-Free: 0800 199 000   ✉ info@kcca.go.ug   |  [Facebook] [Twitter] [YouTube] [Instagram]
```
Dark green background, light text, small Inter font.

**Main nav:**
- **Left:** KCCA logo (green circle with "KCCA" text, CSS-only) + **Kampala Capital City Authority** in Source Serif 4
- **Center — Task-based links (NOT directorate names):**
  `Get a Licence | Apply for a Permit | Pay Online | Report an Issue | Jobs | Tenders | News`
- **Right:** `Contact Us` + `Citizen Feedback` button (gold outlined)
- **Mobile:** Clean hamburger icon → full-screen overlay menu with large tap targets (min `52px` per item)
- Nav: white background, green bottom border `3px`

> **CRITICAL DESIGN DECISION — Task-based navigation:**
> Every nav link must be a citizen task, not a directorate name. "Get a Licence" instead of "Revenue Collection". "Apply for a Permit" instead of "Physical Planning". This is the single biggest improvement over the current site.

---

### 4.1 `#hero` — Hero / Homepage Header

Not a full-viewport hero — this is a government site. Use a **focused service finder** instead.

**Background:** White, with a subtle `--bg-soft` gradient band.

**Content (centred, max-width container):**
- Small label above: `🏙️  Kampala Capital City Authority — Serving 1.5 Million Residents`
- Headline (Source Serif 4, large, dark green): `"Welcome to the City of Kampala"`
- Sub-line: `"Find services, apply online, pay fees, report issues and stay informed — all in one place."`

**Service Search Bar (the most important element on the page):**
```
🔍  What are you looking for?  e.g. "trading licence", "building permit", "jobs"
[ _________________________________________________ ]  [ Search ]
```
Large, prominent, full-width on mobile. JS: filter and show matching service cards on keypress.

**Quick-path buttons below search bar — "I want to...":**
```
[ 🪪 Get a Trading Licence ]   [ 🏗️ Apply for a Permit ]   [ 💳 Pay a Fee Online ]
[ 📋 Apply for a Job ]          [ 🚨 Report an Issue ]       [ 📰 Read the Latest News ]
```
2×3 grid on desktop, 1-column on mobile. Each is a large clickable tile (min `80px` tall) that smooth-scrolls to the relevant section or opens the relevant portal link.

**Notice / alert strip (immediately below quick paths, if content warrants):**
A `--accent-gold` strip for time-sensitive announcements. Example:
`"📣 Trading licence renewal deadline: 30 June 2026. Pay online at eCitie →"`
Toggle with JS — dismissable with an ✕ button. If no active notice, hide this element entirely.

---

### 4.2 `#services` — Citizen Services Hub

> Fixes W1 and W2. Replaces directorate-based navigation with task-based service cards.

**Section heading:** `"What Can We Help You With?"`

**Tab filter:**
`All Services | Licensing & Revenue | Planning & Building | Health & Environment | Jobs & Careers | City Projects | Open Government`

**Service cards grid — 3 columns desktop, 2 tablet, 1 mobile:**

Each card:
```
┌──────────────────────────────────┐
│  🪪                              │
│  Trading Licence                 │  ← Source Serif 4 bold
│  Apply for a new licence or      │  ← Inter, muted
│  renew an existing one online.   │
│                                  │
│  [ Apply Online → ]              │  ← links to portal
└──────────────────────────────────┘
```
Left border `3px` solid `--accent-green`. Hover: border becomes `--accent-gold`, card lifts slightly.

**Service data (use all of these — real KCCA services):**

| Icon | Service | Category | CTA | Portal Link |
|------|---------|----------|-----|-------------|
| 🪪 | Trading Licence | Licensing & Revenue | Apply Online | https://ecitie2.kcca.go.ug |
| 🏗️ | Building / Development Permit | Planning & Building | Apply via Smart Permit | https://kcca.iras.go.ug |
| 💳 | Pay Fees & Rates Online | Licensing & Revenue | Pay Now | https://ecitie2.kcca.go.ug |
| 📄 | Track Your Document | Planning & Building | Track Now | https://camcamv.kcca.go.ug |
| ✅ | Check Plan Approval Status | Planning & Building | Check Status | https://www.kcca.go.ug/plan-approval |
| 💼 | Job Opportunities | Jobs & Careers | View Openings | https://www.kcca.go.ug/employment-opportunities |
| 🎓 | Internship Programme | Jobs & Careers | Apply Now | https://www.kcca.go.ug/internship |
| 🚨 | Report Illegal Construction | Planning & Building | Report | https://survey123.arcgis.com/share/1135f088e21b402eb735285c1a115f85 |
| 🗑️ | Waste & Garbage Services | Health & Environment | Learn More | https://www.kcca.go.ug/waste-management |
| 🏥 | Public Health Services | Health & Environment | Learn More | https://www.kcca.go.ug/Health |
| 📊 | Tenders & Procurement | Open Government | View Tenders | https://www.kcca.go.ug/tenders |
| 📂 | Open Government Data | Open Government | Explore Data | https://www.kcca.go.ug/open-gov |
| 💬 | Citizen Feedback | Open Government | Submit Feedback | https://www.kcca.go.ug/citizen-feedback |
| 📚 | KCCA Library | Jobs & Careers | Visit Library | https://www.kcca.go.ug/library |
| 💰 | Credit Facilities | Licensing & Revenue | Learn More | https://www.kcca.go.ug/credit-facilities |

**Portal Notice (below grid):**
A unified info panel explaining the multi-portal structure, so citizens aren't confused when they leave the main site:
```
ℹ️  Some KCCA services open in a dedicated portal.
    All portals are official KCCA systems operating under kcca.go.ug or go.ug domains.
```
Styled as a muted info box in `--bg-soft`.

---

### 4.3 `#news` — Latest News & Announcements

**Section heading:** `"Latest from City Hall"`

**Layout:** Featured story (large, left, 60%) + two smaller stories (right column stacked).

**Featured story card:**
```
┌─────────────────────────────────────────────────┐
│  [Image area — dark green gradient fallback]    │
│                                                 │
│  21 May 2026                (gold date label)   │
│  SSEBUWUFU WINS KCCA SPEAKER RACE AS            │
│  NAMAZZI SECURES DEPUTY SEAT                    │
│  Brief excerpt — two lines max...               │
│  [ Read More → ]                                │
└─────────────────────────────────────────────────┘
```

**Smaller story cards (same structure, condensed).**

**News data (use these real current headlines):**

| Date | Headline |
|------|----------|
| 21 May 2026 | Ssebuwufu Wins KCCA Speaker Race as Namazzi Secures Deputy Seat |
| 20 May 2026 | Balimwezo Assumes Office as Lord Mayor of Kampala |
| 19 May 2026 | Swearing-in Ceremony for the Lord Mayor and Lord Councillors |
| 11 May 2026 | Kololo Set for Museveni Swearing-in as Seventh Term Begins |

Below stories: `[ View All News → ]` link.

---

### 4.4 `#projects` — City Projects

**Section heading:** `"Building a Better Kampala"`

Horizontal scrollable row of project cards (CSS `overflow-x: auto`, `scroll-snap`):

Each project card:
```
┌────────────────────────────┐
│  🛣️                        │
│  Kampala Flyover Project   │
│  In partnership with UNRA  │
│  [ Learn More → ]          │
└────────────────────────────┘
```

**Projects (use these real KCCA projects):**

| Icon | Project | Partner |
|------|---------|---------|
| 🛣️ | Kampala Flyover Project | UNRA |
| 🏙️ | Africa Smart Towns Network (ASToN) | EU |
| 🏥 | KCCA/CDC Urban Health Project | CDC |
| 🚦 | JICA Road Safety Campaign | JICA |
| 🌿 | Climate Change Programme | KCCA |
| 🚰 | City-Wide Inclusive Sanitation (CWIS) | KCCA |
| ♀️ | Girls Empowering Girls (GEG) | KCCA |
| 🗺️ | Kampala Roads Rehabilitation (KCRRP) | KCCA/World Bank |

---

### 4.5 `#faq` — Frequently Asked Questions

> Fixes W6 — expands from Physical Planning only to all top citizen questions.

**Section heading:** `"Common Questions"`

**Tab filter:**
`All | Licensing | Permits & Planning | Payments | Jobs | Reporting`

**FAQ accordion — click to expand each answer:**

Implement as a `<details>/<summary>` HTML accordion with CSS styling (no JS required, but add smooth animation via JS max-height toggle for better UX).

**FAQ data (use all of these):**

```
LICENSING
─────────
Q: How do I apply for a new trading licence?
A: Apply online via the eCitie portal at ecitie2.kcca.go.ug. You will need your NIN, business name, 
   physical address, and proof of premises. Fees depend on your business category.

Q: When is the trading licence renewal deadline?
A: Licences must be renewed by 31 March each year. Late renewals attract a penalty fee.
   Renew online at ecitie2.kcca.go.ug at any time.

PERMITS & PLANNING
──────────────────
Q: How do I apply for a building or development permit?
A: Submit your application through the Smart Permit portal at kcca.iras.go.ug.
   You will need approved architectural drawings from a registered architect.
   Letters should be addressed to the Director of Physical Planning, KCCA, P.O. Box 7010, Kampala.

Q: Where can I find a registered architect?
A: Contact the Architect's Registration Board of Uganda at Plot 1B Kira Road (Kalamu House),
   or the Uganda Society of Architects at Plot 9 Agip House, Kampala Road.

Q: How do I track my submitted plans?
A: Track your submitted documents at camcamv.kcca.go.ug using your reference number.

PAYMENTS
────────
Q: What fees can I pay online?
A: Trading licence fees, parking fees, market dues, land rates, and ground rent can all be
   paid at ecitie2.kcca.go.ug. Mobile money and card payments are accepted.

Q: Where are KCCA's physical payment offices?
A: City Hall, Plot 1-3 Apollo Kaggwa Road, Kampala. Offices are open Monday to Friday, 8AM–5PM.

JOBS
────
Q: How do I apply for a job at KCCA?
A: All current vacancies are listed at kcca.go.ug/employment-opportunities.
   Applications are submitted online. KCCA does not accept walk-in applications.

Q: Does KCCA offer internships?
A: Yes. Internship opportunities are listed at kcca.go.ug/internship.
   Applications are open to university students and recent graduates.

REPORTING
─────────
Q: How do I report an illegal construction?
A: Report online at the KCCA ArcGIS survey portal (link on the services page),
   or call the toll-free line: 0800 199 000.

Q: How do I give feedback about a KCCA service?
A: Submit feedback at kcca.go.ug/citizen-feedback. You can also email info@kcca.go.ug
   or call the toll-free helpline.
```

---

### 4.6 `#contact` — Contact Section

**Two-column layout:**

**Left — Contact Details:**
```
🏛️  KCCA Headquarters
    City Hall, Plot 1-3 Apollo Kaggwa Road
    P.O. Box 7010, Kampala, Uganda

📞  Toll-Free Helpline
    0800 199 000  (Mon–Fri, 8AM–5PM)

✉️  General Enquiries
    info@kcca.go.ug

🕐  Office Hours
    Monday – Friday: 8:00 AM – 5:00 PM
    Saturday – Sunday: Closed
```

**Right — Citizen Feedback Form:**
```
Your Name          [__________________]
Phone / Email      [__________________]
Division / Area    [ Select ▾ ]
Type of Feedback:  ( ) Complaint  ( ) Suggestion  ( ) Compliment  ( ) Enquiry
Your Message       [ textarea, min 4 rows ]

[ Submit Feedback ]
```

Inline validation on submit: name, contact, and message are required.  
On submit: show `"✓ Thank you. Your feedback has been received and will be reviewed within 5 working days."`

---

### 4.7 `#footer` — Footer

**4 columns, dark green background (`--bg-dark`):**

1. **Brand** — KCCA logo, tagline "For a Better City", social icons (Facebook, Twitter, YouTube, Instagram, Flickr)
2. **Citizen Services** — Trading Licence, Building Permit, Pay Online, Report Issue, Track Document, Citizen Feedback
3. **The Authority** — About KCCA, Directorates, Projects, Open Government, Tenders, Careers
4. **Contact** — Phone, Email, Address, Office Hours

**Sub-footer strip (very dark, full width):**
`© 2025 Kampala Capital City Authority. Government of Uganda. All rights reserved.`
Right side: `Privacy Policy | Accessibility | Site Map`

---

## 5. Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| `< 480px` | 1-col service grid, full-width search bar, hamburger nav with overlay |
| `480–768px` | 2-col service grid, stacked news layout |
| `> 768px` | 3-col service grid, featured + 2-col news, full nav |

**Mobile nav requirements (fixes W5):**
- Hamburger icon minimum `44×44px` tap target
- Full-screen overlay menu on mobile — not a dropdown
- Each menu item minimum `52px` tall
- Close button (`✕`) top-right of overlay, clearly visible

---

## 6. JavaScript Requirements

Vanilla JS only — no jQuery, no React, no libraries.

| Feature | JS |
|---------|----|
| Service search bar | Filter `.service-card` elements by `data-keywords` on keypress |
| Quick-path scroll | `scrollIntoView` to section anchors |
| Notice strip dismiss | Toggle `display: none` on ✕ click, store in `sessionStorage` |
| Tab filters (services, FAQ) | Show/hide cards by `data-category` attribute |
| FAQ accordion | Toggle `max-height` on each `<details>` for smooth animation |
| Feedback form validation | Validate on submit, show inline errors, show success message |
| Nav scroll behaviour | Add shadow class when `scrollY > 60` |
| Hamburger menu | Toggle full-screen overlay nav class |
| Smooth scroll | All `a[href^="#"]` |

---

## 7. Code Quality Rules

1. No external CSS frameworks — all CSS from scratch using the design system above
2. No external JS libraries — vanilla JS only
3. All colours via `var(--accent-green)` — never hardcode hex values in CSS rules
4. Every form input has a visible `<label>` above it (accessibility — government standard)
5. Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<form>`
6. All links to external portals must open in `target="_blank"` with `rel="noopener noreferrer"`
7. Service cards must use `data-category` and `data-keywords` attributes to support the search and filter JS
8. Zero network requests except Google Fonts CDN

---

## 8. File Output

Single file: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- meta, title, viewport, Google Fonts -->
  <style>
    /* ALL CSS — variables → reset → top-bar → nav → hero → notice-strip →
       services → news → projects → faq → contact → footer */
  </style>
</head>
<body>
  <!-- top-bar, nav (+ mobile overlay), hero (search + quick paths),
       notice strip, services hub, news, projects, faq, contact, footer -->
  <script>
    // ALL JS — search filter, category tabs, FAQ accordion,
    // notice dismiss, feedback form, nav scroll, hamburger, smooth scroll
  </script>
</body>
</html>
```

---

## 9. Agent Instructions Summary

1. Read this entire document before writing any code.
2. Fix **all 6 weaknesses** — every section must be present.
3. Use **exactly** the color palette and fonts (Source Serif 4 + Inter) from Section 3.
4. The navigation must be **task-based**, not directorate-based — this is the most important structural decision.
5. The **service search bar** on the homepage must filter service cards live on keypress.
6. The **service cards grid** must include all 15 real KCCA services with correct portal links.
7. The **FAQ** must cover all 10 questions across all 5 categories.
8. The **mobile hamburger menu** must be a full-screen overlay with `52px` tap targets — not a dropdown.
9. All external portal links must use `target="_blank"` with `rel="noopener noreferrer"`.
10. No CSS framework, no JS library — one clean, well-commented `index.html`.
