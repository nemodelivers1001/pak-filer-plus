

# Plan: Complete Pak Filer Public Website Rebuild

This is a large-scale rebuild covering 14 public pages, global component updates, and build error fixes. Due to the scope, implementation will be split into **6 sequential batches**.

---

## Batch 0: Fix Existing Build Errors

**File: `src/pages/Dashboard.tsx`**
- Remove duplicate import on line 31 (`fadeInUp, staggerContainer` imported twice)
- Fix `dramaticFadeIn` variant type error: change `type: "spring"` to `type: "spring" as const` so TypeScript narrows the string literal correctly
- Remove duplicate `<UnifiedBackground>` on line 164

---

## Batch 1: Global Infrastructure

**Google Fonts** — Add Plus Jakarta Sans + Inter to `index.html`

**Updated Header** (`src/components/layout/PublicLayout.tsx`):
- Add Pricing, Contact Us to nav links
- Change CTA button to "File Your Taxes Now" with green gradient
- Add mega-dropdown on Services link showing all 8 services with icons and descriptions
- Full-screen mobile drawer with all links

**Updated Footer** (`src/components/layout/Footer.tsx`):
- 4-column layout: Brand, Services (8 links), Company (6 links), Contact info
- Dark background `#0F1F14`, white text
- Bottom bar with copyright + trust badges

**New: Back-to-top button** (`src/components/layout/BackToTop.tsx`)

**New: Global CTA Banner** — Update `src/components/layout/FinalCTA.tsx` with content from document

**New: SEO Helmet component** (`src/components/layout/SEOHead.tsx`) — reusable component for meta tags, OG tags, JSON-LD

**Update `src/App.tsx`** — Add all new routes for service detail pages and contact page

---

## Batch 2: Home Page (Complete Rewrite)

**File: `src/pages/public/Home.tsx`** — Full rewrite with document content:

1. **Hero** — Green gradient bg, trust badge, H1 "File Your Taxes Online — Fast, Easy & CA-Certified", subheading, 2 CTAs, dashboard mockup on right, trust badges row, animated stat counters
2. **Trust Bar** — 5 stats strip with counters
3. **Services Grid** — 8 cards (4-col desktop, 2-col tablet, 1-col mobile) with icons, titles, descriptions, links
4. **How It Works** — 3-step horizontal timeline with connecting arrows
5. **Why Choose Us** — 6 feature cards in 3x2 grid with green accent borders
6. **Pricing Snapshot** — 3 starting-price cards
7. **Testimonials** — 3-card carousel (Ahmed Raza, Sara Khan, Bilal Traders)
8. **FAQ Accordion** — 5 home FAQs with first open
9. **Global CTA Banner**

---

## Batch 3: Services Listing + Service Detail Pages (Part 1)

**Rewrite: `src/pages/public/Services.tsx`** — Hero with gradient, breadcrumb, 8 service cards grid, "Why Use Pak Filer" section, CTA banner

**New service detail pages** (all follow consistent template: hero, content sections, pricing cards, documents, process steps, FAQ accordion):

- `src/pages/public/services/PersonalTaxFiling.tsx` — Who is this for (6 categories), what's included, 2 filing options, pricing table, documents needed, process timeline, 4 FAQs
- `src/pages/public/services/FamilyTaxFiling.tsx` — Who can use, 4 benefits, required docs, process & pricing, 2 FAQs
- `src/pages/public/services/BusinessTaxReturn.tsx` — 4 entity types, what's included, pricing table (online/upload/CA for each), documents, process, FAQs
- `src/pages/public/services/NTNRegistration.tsx` — 5 category cards (Salaried Rs500, Sole Prop Rs1500, Partnership Rs3500, Company Rs7000, NPO Rs9000) with icons/timelines, process steps, FAQs

---

## Batch 4: Service Detail Pages (Part 2)

- `src/pages/public/services/IRISProfileUpdate.tsx` — What is IRIS, when to update (8 reasons), 2 pricing categories (Salary Rs100, Business Rs800), process, FAQs
- `src/pages/public/services/GSTRegistration.tsx` — What is GST, who must register (6 categories), what's included, flat fee Rs9000, required docs, FAQs
- `src/pages/public/services/BusinessIncorporation.tsx` — 6 sub-categories with all services/prices/timelines displayed as organized card sections (Company Registration, NPO/Trust, Employee Benefit Funds, PSEB, Trade Bodies, Compliance Services), why choose us, FAQs
- `src/pages/public/services/SalaryTaxCalculator.tsx` — Interactive calculator with FBR 2024-25 tax slabs (6 slabs), inputs (annual salary, govt employee toggle, medical allowance, zakat), animated result cards, slab breakdown table with highlighted active bracket, disclaimer

---

## Batch 5: Pricing, About, Contact, FAQ (Rewrites + New)

**Rewrite: `src/pages/public/Pricing.tsx`** — All pricing sections from document: Personal Tax Filing, Business Tax Return (with entity sub-sections), NTN Registration (5-category comparison), Other Services, Business Incorporation pricing, comparison table, pricing FAQ

**Rewrite: `src/pages/public/About.tsx`** — Hero, Who We Are (3 paragraphs), Mission & Vision side-by-side cards, Why We Started (3 paragraphs), 4 Values cards (Integrity, Transparency, Accessibility, Excellence), Professional Credentials list, Stats strip (6 numbers)

**New: `src/pages/public/Contact.tsx`** — Contact info cards (WhatsApp, Email, Phone, Hours), validated contact form with success/error states, Google Maps placeholder, CTA banner

**Rewrite: `src/pages/public/FAQ.tsx`** — Search bar with real-time filtering, 5 categories (General, Tax Filing, NTN & GST, Billing & Pricing, Process & Timeline), all 18 Q&As from document, smooth accordion

---

## Design Standards Applied Throughout

- **Colors**: Green gradient `#1A8549` → `#146B3A` on heroes/CTAs/badges, `#F7FAF8` alternating sections, `#0F1F14` footer
- **Typography**: Plus Jakarta Sans for headings, Inter for body
- **Cards**: White bg, 12px radius, `#E0EAE4` border, subtle shadow, hover lift
- **Buttons**: Green gradient primary, outline secondary
- **Animations**: Fade-in on scroll via Intersection Observer, animated counters, smooth transitions
- **Responsive**: 320px mobile, 768px tablet, 1280px+ desktop
- **SEO**: Meta tags, OG tags, JSON-LD schemas per page

---

## Files Summary

| Action | Count | Files |
|--------|-------|-------|
| Fix | 1 | Dashboard.tsx |
| Modify | 4 | index.html, App.tsx, PublicLayout.tsx, Footer.tsx |
| Rewrite | 5 | Home.tsx, Services.tsx, Pricing.tsx, About.tsx, FAQ.tsx |
| Create | 12 | 8 service pages, Contact.tsx, BackToTop.tsx, SEOHead.tsx, FinalCTA.tsx update |

**Total: ~22 files across 6 batches**

