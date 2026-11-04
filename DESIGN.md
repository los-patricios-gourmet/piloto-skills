---
name: Los Patricios Gourmet
description: A photographic gourmet vitrine with a compact administration workspace.
colors:
  navy: "#103144"
  navy-deep: "#091d28"
  gold: "#efbb5e"
  gold-hover: "#f5cf8d"
  cream: "#f4f5f3"
  white: "#fff"
  muted: "#52616a"
  line: "#d9dedf"
  surface: "#e9edeb"
  light-copy: "#d9e1e3"
  field-border: "#a9b6bc"
  admin-ink: "#252b2f"
  admin-muted: "#596167"
  admin-surface: "#eef0f0"
  admin-ground: "#f7f8f7"
  admin-sidebar: "#f1f3f2"
  admin-selected: "#e2e6e4"
  stock-low: "#92501d"
typography:
  ingredient:
    fontFamily: "\"Bebas Neue\", sans-serif"
    fontSize: "clamp(125px, 14vw, 225px)"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "-0.025em"
  introduction:
    fontFamily: "\"Bebas Neue\", sans-serif"
    fontSize: "clamp(42px, 4.4vw, 72px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  chapter:
    fontFamily: "\"Bebas Neue\", sans-serif"
    fontSize: "clamp(58px, 6.8vw, 110px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  product-title:
    fontFamily: "\"Bebas Neue\", sans-serif"
    fontSize: "clamp(32px, 3vw, 48px)"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "\"Montserrat\", sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  action:
    fontFamily: "\"Montserrat\", sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.6
  admin-heading:
    fontFamily: "\"Montserrat\", sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
rounded:
  square: "0px"
spacing:
  control-gap: "8px"
  field-gap: "22px"
  panel: "24px"
  section: "80px"
  editorial-section: "130px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "15px 22px"
  button-primary-hover:
    backgroundColor: "{colors.gold-hover}"
  button-text:
    textColor: "{colors.navy}"
    typography: "{typography.action}"
  input-search:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.square}"
    padding: "12px 16px"
    width: "270px"
  input-checkout:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    typography: "{typography.body}"
    padding: "14px 16px"
    rounded: "{rounded.square}"
  filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy}"
    padding: "12px 18px"
    rounded: "{rounded.square}"
  filter-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  variant:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy}"
    padding: "16px 12px"
    rounded: "{rounded.square}"
  variant-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  admin-panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.admin-ink}"
    padding: "24px"
    rounded: "{rounded.square}"
---

# Design System: Los Patricios Gourmet

## Overview

**Creative North Star: "The Photographic Vitrine"**

The photographic vitrine gives exceptional ingredients a large, direct presence while keeping selection and purchase within reach. Night blue, gold and the official logo carry Los Patricios Gourmet’s existing identity; white and cool off-white chapters create breathing room around the photography.

The storefront is spacious and editorial. Administration uses a separate compact working grammar: neutral surfaces, Montserrat headings, aligned numbers and practical list separators. Both retain square surfaces and explicit focus states.

**Key Characteristics:**
- Official identity preserved through supplied logo assets and brand typefaces.
- Large ingredient photography with clear, operable selection.
- Square, flat surfaces differentiated by tone.
- Quiet content with selective motion and keyboard-aware suppression.
- A compact neutral administration grammar.

## Colors

The official night blue and warm gold sit beside cool, restrained neutrals. The frontmatter owns exact values; CSS uses `--ink` as the storefront navy alias.

### Primary

- **Night Blue (`navy`)** anchors navigation, brand chapters, selected variants and order summaries; it is also storefront text.
- **Purchase Gold (`gold`)** marks purchase actions, current navigation, text selection and keyboard focus. It also colors the scrollbar; it is not exclusively a purchase token.
- **Deep Photographic Blue (`navy-deep`)** supports the photographic field and pilot ribbon.

### Neutral

- **Cool Ground (`cream`)** supports body and collection; **White (`white`)** opens chapters, fields and image actions.
- **Slate Copy (`muted`)** supports descriptions on light ground; **Light Copy (`light-copy`)** supports dark sections.
- **Quiet Surface (`surface`)** separates filters, quantity controls and notices. **Line (`line`)** and **Field Border (`field-border`)** define functional control boundaries.
- Administration has its own ink, muted, surface, ground, sidebar and selected-navigation neutrals. **Low Stock (`stock-low`)** is a contextual attention color.

**The Brand Asset Rule.** Use the supplied official logo crops; preserve their artwork and proportions.

## Typography

**Display Font:** Bebas Neue, with sans-serif fallback. **Body Font:** Montserrat, with sans-serif fallback. Both are self-hosted with swap loading. Montserrat supplies weights 400, 500, 600 and 700. Open Sans appears in the brand manual but is not used in this build.

The condensed display face gives ingredient names scale without making purchase controls compete. Montserrat carries descriptions, prices, forms and administration headings.

### Hierarchy

The frontmatter records real roles rather than a uniform five-size scale. The selected ingredient is larger than the introductory heading. Collection, catalog, story and footer headings have individual fluid bounds. Catalog product titles use the recorded product-title role; editorial collection titles instead use `clamp(40px, 4vw, 58px)` with line height 1. Body copy is 16px and paragraphs cap at 65ch; the final vitrine introduction override is 18px. Controls and supporting commerce copy generally use 13–14px. Prices and working figures use tabular numbers where coded.

At the tablet breakpoint the ingredient is 150px and the introduction 58px. On phones the ingredient uses `clamp(90px, 21vw, 150px)`, introduction is 48px and collection chapter headings are 58px. At the narrowest breakpoint ingredient type becomes 85px. Administration headings reduce from 28px to 26px on phones.

**The Ingredient Scale Rule.** Size display type for its role and available width; the ingredient name is intentionally larger than the introductory heading.

## Layout

Desktop margins use `clamp(20px, 3.3vw, 56px)`. Full-width photographic fields alternate with asymmetric editorial products (1.25fr / 1fr) and staggered vertical starts. Catalog products form an even two-column grid. Product detail and checkout pair content with a purchase or summary column. Editorial chapters use generous vertical padding; forms use the compact gaps in frontmatter.

At 1100px navigation tightens, hero selectors reflow and administration panels stack. At 760px margins become 22px, navigation becomes a toggle-controlled menu, and photographic, product, detail, checkout and story grids become single-column. The hero photograph sits above shoppable content; ingredient controls form two columns. The 365px adjustment reduces margins to 16px. A 1600px enhancement increases hero top spacing. Administration tables retain horizontal scrolling with a minimum table width of 650px.

## Elevation & Depth

There is no box-shadow vocabulary. Depth comes from dark-to-light chapters, image crops, solid image-action squares and tonal surface differences. Gradients are limited to photographic legibility scrims. Functional field strokes and administrative list separators belong to the working grammar.

**The Flat Surface Rule.** Separate surfaces through background tone, space and photographic cropping; do not introduce card shadows.

## Shapes

Surfaces, fields, filter buttons, image actions and panels are square. Photography remains rectangular and uses cover cropping, usually biased toward the ingredient on the right. Do not apply decorative masks to complete still-life photographs. Official logo assets use contain fitting and retain the original artwork.

## Components

### Buttons

Square gold purchase actions use the frontmatter padding and a minimum height of 52px. Fine-pointer hover lightens gold. Active state scales to 0.975. Shared button press transitions use 140ms; purchase-action transform overrides use 150ms. Background hover is 180ms. Plain text actions use a 44px minimum height and gain underlining where defined. Disabled buttons reduce opacity to 0.55 and show the not-allowed cursor.

Global focus is a gold 3px outline offset by 5px. Keep keyboard focus distinct from selected state.

### Chips / Selection

Catalog filters use quiet surfaces and invert to navy/white when selected. Fixed-weight controls use the same inversion and stacked left-aligned text. Ingredient selectors instead invert from translucent night blue to white/navy and expose `aria-pressed`. They remain full controls rather than decorative tags.

### Cards / Containers

Product cards are unboxed photographic rectangles with text below. Catalog images use a 1.35 ratio; editorial collection crops vary on desktop and normalize on phones. A white 44px image action carries the arrow. Administration panels are white and use the panel spacing token.

### Inputs / Fields

Search is borderless white with a 48px minimum height. Checkout fields have functional strokes and a 52px minimum height; checkout text remains 16px. Keep labels explicit and dark selectors readable with white text. Preserve native select behavior.

### Navigation

The header pairs navy ground and white links with gold current-page text. Desktop links, market selector and cart share one row. The mobile menu exposes expanded state, closes on navigation and returns focus to its toggle on Escape. The skip link becomes visible on focus.

### Photographic Vitrine and Motion

Keep the chosen ingredient, fixed presentation and purchase action together. Changing ingredient resets presentation and confirmation. Pointer selection uses a 280ms opacity/scale transition; keyboard selection skips it. Image opacity crossfade is 220ms. The active photograph drifts subtly over 18 seconds when reduced motion is not requested. Product hover scales imagery to 1.045.

Entrance defaults to quiet. Selected headings rise over 400ms; selected imagery and ingredient type settle over 700ms. Later explanation stays still. Reduced-motion CSS disables animation and effectively removes transitions. The keyboard data attribute suppresses CSS motion, while Entrance skips animation during keyboard use. Retain these conditions when extending motion.

### Administration

Use Montserrat headings, neutral surfaces, compact functional controls and aligned quantities. Preserve practical separators and table scrolling. Oversized storefront display type does not belong in working lists.

## Do's and Don'ts

### Do:
- **Do** preserve official logo artwork and use the self-hosted brand fonts.
- **Do** show presentation, price and selection state beside the purchase action.
- **Do** keep body copy readable and keyboard focus visible.
- **Do** suppress animated travel for reduced motion and keyboard interaction.
- **Do** keep generated photographs and sample commerce data identified as part of the pilot.
- **Do** use the compact neutral grammar for administration.

### Don't:
- **Don't** redraw the official logo or replace its wordmark with typed text.
- **Don't** cover headings with imagery or decorative type overlap.
- **Don't** add decorative gradients, rounded card styling or shadow elevation to the flat storefront.
- **Don't** add section kickers or decorative glyph icons; use the coherent inline SVG set.
- **Don't** imply real payments, confirmed delivery coverage or verified product provenance in the pilot.
