/* ===========================================================
   CONTAINER WRAPPER SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Used across index, store, creators, submit, vote, and
   dashboard pages to unify layout spacing and width rules.

   BASE RULE:
     .container, .page-container, .submit-container
       padding: 20px
       max-width: 960px
       margin: 0 auto

   PAGE-SPECIFIC WIDTHS:
     • creator-dashboard → custom width (not inherited)
     • vote page → same padding, layout controlled by grids
     • store page → image grid defines width

   NOTES:
     • Only width differs between pages.
     • Padding is universal (20px).
     • NEVER force overflow:hidden; components rely on free overflow.
=========================================================== 

   HERO SUBCOMPONENT SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Standard hero architecture used across pages.

   Hero Base:
     .hero
       display: grid
       two-column layout
       max-width: 960px
       padding: 0 20px

   Hero Title:
     .hero-title
       uses typography system h1 size
       green terminal glow

   Hero Copy:
     .hero-copy
       body text sizing & spacing

   Hero Tagline:
       min-height enforced
       small text style

   PAGE VARIANTS:
     • Hero Banner: image-based hero (page-specific)
     • Vote hero: uses padding instead of banner image

   NOTES:
     • Only hero-banner is page-specific.
     • All other hero components unified globally.
===========================================================

   FORM INPUT SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Unified styling based on submit.css.

   INPUT STYLING:
     padding: 10px 12px
     border: 1px solid #33384a
     background: #0b0b12
     radius: 6px
     font-size: 0.95rem

   INPUT SPACING:
     margin-bottom: 15px
     label margin-bottom: 6px

   FOCUS STATE:
     teal border + glow using global focus system

   NOTES:
     • All pages inherit these styles.
     • Avoid page-specific overrides unless functional.
===========================================================

   MODAL SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Global modal architecture unified from vote.css.

   MODAL STRUCTURE:
     .modal, .image-modal
       fixed-position fullscreen overlay
       dark blurred background
       centered content

   CONTENT:
     padding: 16px
     rounded corners
     teal focus rings allowed

   SCROLL BEHAVIOR:
     modal scrolls internally
     body scroll locked via .no-scroll

   NOTES:
     • All modals share the same base styling.
     • Vote modals use additional caption styling.
===========================================================

   GRID SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Page grids unified under utility classes with specific
   mappings for layout variability.

   GLOBAL GRID:
     .grid
       display: grid
       gap: 20px

   PAGE-SPECIFIC GRIDS:
     • store → 3-column flexible product grid
     • creators → 2-column directory grid
     • vote → 2-column card selection grid
     • submit/login → single-column form grid

   NOTES:
     • Gap values remain page-specific to preserve density.
     • All grids use unified class structure.
===========================================================

   CARD SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Cards share a global foundation (.card-base) with
   page-level identity layers.

   CARD BASE:
     background: deep neutral
     padding: 12px
     radius: 12px
     transitions for movement + glow

   PAGE VARIANTS:
     • .card-product  → store aesthetic
     • .card-profile  → creators aesthetic
     • .option-card
   → vote aesthetic

   MAPPING:
     .card          → product card mapping
     .artist-card   → profile card mapping
     .option-card   → vote card mapping

   NOTES:
     • Visual identity intentionally differs per page.
     • Glow levels and borders remain page-locked.
===========================================================

   TAG CHIPS & BADGES SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Small label elements used across creators, vote, and
   occasional metadata elements.

   BASE STYLE:
     display: inline-flex
     padding: 4px 10px
     border-radius: 999px
     font-size: 0.7rem
     border: 1px solid rgba(255,255,255,0.15)

   USAGE:
     • creator tags
     • vote tags
     • status indicators

   NOTES:
     • Color remains universal (neutral white).
     • Use tiny typography size exclusively.
===========================================================

   WALLET BUTTON SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Unifies:
     .wallet-btn  (login)
     .wallet-selector-button (vote)

   BASE STYLE:
     background: #000
     border: 1px solid #00ff9d
     radius: 6px
     padding: 6px 12px
     font-size: 0.85rem

   INTERACTION:
     hover glow
     teal focus ring
     active press behavior

   NOTES:
     • Do not alter mapping — both classes must exist.
===========================================================

   HERO BANNER VARIANT SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Distinguishes hero banners from standard hero components.

   USED ON:
     • index.html
     • vote.html (non-image variant)

   RULES:
     • hero-banner is page-specific
     • hero-title, hero-copy, hero-tagline are global
     • hero-banner may include images or gradients unique to page

   NOTES:
     • Preserve uniqueness across pages.
     • Banners do NOT share unified styling.
===========================================================

   GLOBAL FOOTER SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Shared footer across all pages.

   FOOTER STYLE:
     centered text
     padding-top: 25px
     padding-bottom: 40px
     border-top: 1px solid #222
     background: #050507

   LINK STYLE:
     teal link color
     magenta hover glow

   NOTES:
     • No page may override footer styling.
     • Footer is a universal component.
===========================================================

   BORDER & RADIUS STYLE GUIDE (REFERENCE ONLY)
   -----------------------------------------------------------
   These are the existing border & radius patterns used across
   the unified component system. They are PURPOSE-BASED and
   should be followed for future additions to avoid design drift.

   === CONTAINER SURFACES ===
   • border: 1px solid #252538
   • radius: 16px
   Used for: page containers, layout wrappers.

   === FORM ELEMENTS ===
   • border: 1px solid #33384a
   • radius: 6px
   Used for: input fields, selects, textareas.

   === MODAL PANELS ===
   • border: 1px solid #303040
   • radius: 18px (cinematic)
   Used for: modal windows, vote banners.

   === PRODUCT CARDS (STORE) ===
   • border: 2px solid rgba(255,255,255,0.05)
   • radius: 14px
   Used for: gallery-style item cards.

   === PROFILE CARDS (CREATORS) ===
   • border: 1px solid #26263a
   • radius: 10px
   Used for: creator directory cards.

   === OPTION CARDS (VOTE) ===
   • border: 1px solid #252538
   • radius: 18px
   Used for: vote selection cards.

   === BADGES / TAG CHIPS ===
   • borders: rgba(255,255,255,0.10 - 0.15)
   • radius: 999px (pill-shaped)
   Used for: metadata labels & chips.

   === WALLET BUTTONS ===
   • border: 1px solid #00ff9d
   • radius: 6px
   Used for: login & vote wallet interactions.
=========================================================== 

   SHADOW & GLOW STYLE GUIDE (REFERENCE ONLY)
   -----------------------------------------------------------
   These values define the shadow/glow language used across
   memetic.exe. Each tier serves a specific PURPOSE.

   === AMBIENT PAGE CONTAINER SHADOWS ===
   • 0 0 38px rgba(0,0,0,0.82)
   • Used for: page wrappers (index, vote, submit, creators)
   • Creates deep cyber-diffuse background separation.

   === PREMIUM PRODUCT CARD SHADOWS (STORE) ===
   • 0 0 22px rgba(0,0,0,0.4)
   • Hover: 0 0 35px rgba(255,0,255,0.25)
   • Used for: merch display, gallery items.

   === PROFILE CARDS (CREATORS) ===
   • none
   • Used for: reading-focused, low-noise UI.

   === VOTE OPTION CARD SHADOWS ===
   • 0 12px 24px rgba(0,0,0,0.65)
   • Selected: neon teal glow (see .option-card.selected)
   • Used for: highly interactive UI components.

   === MODAL SHADOWS ===
   • 0 18px 40px rgba(0,0,0,0.75)
   • Used for: elevation above blurred backdrop.

   === TERMINAL/ADMIN GREEN GLOW (DASHBOARD) ===
   • 0 0 12px rgba(0,255,155,0.12)
   • 0 0 22px rgba(0,255,155,0.08)
   • Used for: internal creator dashboard styling.

   === BUTTON GLOWS ===
   • Wallet Buttons: 0 0 10px rgba(0,255,150,0.35)
   • Run Button: strong magenta/cyan hover glow
   • Used for: interactive call-to-action elements.

   === VOTE-ONLY GLITCH EFFECTS ===
   • ambient scanlines
   • flicker bursts
   • screen-glitch overlays
   • Used ONLY on vote page. Do NOT reuse elsewhere.
=========================================================== 

   VOTE-ONLY UI SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   The vote page contains unique interactive and glitch effects
   intended ONLY for voting interfaces. These styles should NOT
   be applied to other pages.

   === INTERACTIVE OPTION CARDS ===
   • .option-card
   • .option-card:hover
   • .option-card.selected
   • .card-ambient-glitch

   Used for user selection, animated feedback, hover zoom,
   border-color transitions, and neon teal glow on selection.

   === GLITCH EFFECT SYSTEM ===
   • .glitch-burst
   • .card-ambient-glitch
   • .cinematic-overlay
   • .cinematic-noise
   • @keyframes ambientGlitch
   • @keyframes screenGlitch
   • @keyframes noiseShift

   These create:
   • scanlines
   • flicker bursts
   • ambient neon haze
   • noise displacement
   • cinematic grain overlays

   DO NOT reuse these outside the vote page.

   === WALLET SELECTOR PANEL ===
   • .wallet-selector
   • .wallet-selector-button
   • .wallet-wallet-item
   • .wallet-selector-backdrop

   Used only for selecting wallets during the voting process.

   === VOTE MODALS ===
   • .image-modal (uses unified modal styling)
   • .image-modal-content
   • .image-modal-caption

   Used exclusively for viewing option artwork fullscreen.

   -----------------------------------------------------------
   IMPORTANT:
   The vote UI uses intentional cinematic + glitch aesthetics.
   These effects must remain isolated to preserve page identity.
   DO NOT unify or generalize them into global components.
===========================================================

   TYPOGRAPHY SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Modular Scale Used: Major Third (1.250)
   Base Font: Inter, system-ui
   Dashboard Font: JetBrains Mono (isolated to dashboard only)

   TYPE SCALE (USE THESE VALUES ACROSS THE PROJECT)
   -----------------------------------------------------------
   display: 2.0rem      - Rare, cinematic headings or standout text
   h1:      1.5rem      - Hero titles, major section openers
   h2:      1.25rem     - Section headers across pages
   h3:      1.1rem      - Card titles, option titles, headings inside UI
   body:    0.95rem     - Default body text across all pages
   small:   0.8rem      - Metadata, captions, subtle UI text
   tiny:    0.7rem      - Labels, badges, tag chips

   LINE HEIGHT GUIDELINES
   -----------------------------------------------------------
   display, h1, h2:   normal height for sharp visual presence
   body, small:       line-height around 1.45 for readable text
   tiny:              tighter, around 1.3 for dense meta elements

   USAGE RULES
   -----------------------------------------------------------
   - Use h1 for hero-title or major top-level section headlines.
   - Use h2 for “Creators”, “Store”, “Vote”, and other section headers.
   - Use h3 for ALL card titles (store, creators, vote option titles).
   - Use body for any descriptive paragraph or supporting text.
   - Use small for captions, secondary metadata, UI descriptions.
   - Use tiny ONLY for badges, chips, small labels, or utility text.
   - Dashboard uses JetBrains Mono — DO NOT apply this elsewhere.

   NOTES
   -----------------------------------------------------------
   This system is meant to eliminate drift such as:
   - random 1rem / 0.9rem / 0.85rem values
   - inconsistent card titles across pages
   - mismatched body text sizes
   - duplicate small text sizes
   ALL new components should follow this scale.

   DO NOT MODIFY THESE VALUES unless you intentionally
   re-scale the entire typography system across the project.
=========================================================== 

   FOOTER SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   The footer is global and identical across all pages.
   It uses a dark background, subtle top border, centered text,
   and brand-accented X link styling.

   ELEMENTS:
   footer
   footer .x-link
   footer .x-link a
   footer .footer-copy

   DESIGN RULES:
   • Footer always has 40px bottom padding
   • Footer always has 20–25px top padding
   • Footer uses matching dark background (#050507)
   • Top border must be subtle (1px solid #222)
   • Link uses glitch-teal with muted-magenta hover
   • Text size is 0.8rem for body, 0.9rem for link
   • No variant footers should exist in the project
=========================================================== 

   SPACING SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Spacing scale used throughout the project for consistent
   vertical rhythm and layout balance.

   SPACING SCALE:
   xs: 6px    - tight UI elements, labels, small gaps
   sm: 12px   - button padding, small group spacing
   md: 20px   - container padding, default section spacing
   lg: 30px   - spacing between major sections
   xl: 40px   - hero spacing, footer-top margin, page dividers

   RULES:
   • All containers should use padding: 20px (md).
   • All section tops should use margin-top: 30px (lg) unless
     following a hero/banner.
   • The first section after a hero uses margin-top: 20px (md).
   • Footer always uses margin-top: 40px (xl).
   • Avoid 22px, 24px, 28px, 35px, etc — these cause drift.
   • Card padding remains per-type (store/creators/vote).
=========================================================== 

   ANIMATION TIMING SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Animation timing guidelines used across the project.
   All new animations should choose from the timing categories
   below to maintain consistency and prevent drift.

   TIMING SCALE:
   fast:        0.12s     - micro-interactions, glitch bursts
   ui:          0.15s     - buttons, card hover states
   smooth:      0.20s     - image zoom, opacity fades
   modal:       0.25s     - modal open/close transitions
   glitch-long: 0.7s–2.1s - ambient glitch cycles (vote-only)

   RULES:
   • Standard UI elements always use 0.15s ease transitions.
   • Hover image zooms use 0.20s.
   • Modals always animate at 0.25s.
   • Vote glitch effects must remain long and stepped.
   • NEVER create random 0.18s, 0.23s, 0.3s values.
   • All easing defaults should be `ease` unless glitch-based.
===========================================================

   Z-INDEX SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Global stacking order to prevent layered UI conflicts.
   All new components must use the tiers below.

   Z-INDEX TIERS:
   0   - page background, base layout
   10  - standard content, cards, hero sections
   20  - header, sticky bars, anchored UI
   30  - cinematic/glitch overlays (vote page only)
   40  - dropdowns, tooltips, quick menus
   50  - modals, fullscreen image views
   60  - wallet selector panel
   100 - future: toast notifications, emergency overlays

   RULES:
   • Never use arbitrary large numbers (e.g., z-index: 9999).
   • Vote-only overlays MUST stay in tier 30.
   • Header must stay above all content (tier 20).
   • Modals always use tier 50.
   • Wallet selector uses tier 60.
=========================================================== 
   
   COLOR & BRAND ACCENT SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   This guide documents the color palette and brand accents
   used across the memetic.exe ecosystem. These colors define
   the aesthetic language of the site and should be reused for
   all future components to prevent design drift.

   -----------------------------------------------------------
   BRAND ACCENT COLORS
   -----------------------------------------------------------
   GLITCH TEAL (Primary Accent):
     #00ff9d / #00ffca / rgba(0,255,200,x)
     Used for: wallet button borders, vote glows, glitch overlays,
               highlight states, interactive accents.

   GLITCH MAGENTA (Secondary Accent):
     #ff00ff / rgba(255,0,255,x)
     Used for: run buttons, store card hovers, neon visual elements.

   MEMORY GREEN (Hero Accent):
     var(--memory-green) → typically #00ffa0
     Used for: hero titles, terminal-themed UI, subtle glow areas.

   -----------------------------------------------------------
   CORE NEUTRALS (Foundational UI Colors)
   -----------------------------------------------------------
   Text Primary:      #e2e2e7
   Text Subtle:       #808089
   Border Dark:       #252538
   Border Soft:       #26263a
   Border Input:      #33384a
   Border Modal:      #303040

   Background Deep:   #050507
   Panel Dark:        #0b0b12
   Surface Neutral:   #141420

   -----------------------------------------------------------
   PAGE-SPECIFIC COLOR NOTES
   -----------------------------------------------------------
   STORE:
     • Uses premium magenta + cyan glow accents.
     • Glossy white borders for product elevation.

   CREATORS:
     • Slightly blue-tinted neutral palette.
     • Editorial look with low-glow, low-noise surfaces.

   VOTE:
     • Heavy usage of glitch teal.
     • Neon glow states, scanlines, and cinematic overlays.

   DASHBOARD:
     • Terminal-inspired monochrome green.
     • JetBrains Mono typography + neon terminal accents.

   LOGIN/SUBMIT:
     • Functional gray neutrals.
     • Minimal accent usage, simple UI states.

   -----------------------------------------------------------
   USAGE RULES
   -----------------------------------------------------------
   • Always pull accent colors from the core teal/magenta/green.
   • Avoid introducing new neon colors unless they serve a
     clear glitch or brand purpose.
   • Neutrals must remain consistent across all pages.
   • Page-specific themes should remain isolated.

   DO NOT introduce arbitrary hex values. Use the patterns above.
   =========================================================== 
   
   GLOBAL SCROLL & OVERFLOW SYSTEM (REFERENCE)
   -----------------------------------------------------------
   These rules define proper scroll/overflow behavior across
   the entire site. They prevent hidden layout drift,
   horizontal scrolling, and background movement under modals.

   RULES:
   1. Horizontal scrolling is disabled globally.
   2. Body scrolling is locked whenever any modal or wallet
      selector is open (via .no-scroll class in JS).
   3. Modals and wallet selector are fixed-position and do
      not create secondary scrollbars.
   4. Containers should NOT force overflow: hidden, as this
      breaks card shadows and glitch animations.
   5. Vote glitch layers rely on unrestricted overflow.
   6. Smooth scrolling improves UX across pages.

   NEVER apply overflow: hidden to sections that contain:
   • cards with glows
   • hero banners
   • glitch overlays
   • cinematic layers

   ONLY apply overflow control to:
   • body (scroll lock)
   • modals (scroll for tall content)
=========================================================== 
   
   FOCUS & ACTIVE STATE SYSTEM (REFERENCE ONLY)
   -----------------------------------------------------------
   Focus Ring:
     outline: 2px solid #00ffca (glitch teal)
     outline-offset: 3px
   Used on: buttons, inputs, links, interactive cards.

   Active State (mouse press):
     transform: translateY(1px) scale(0.98)
   Used on: buttons, cards, wallet selectors.

   RULES:
   • Never remove outline without replacing with the teal ring.
   • Hover styles must NOT override focus styles.
   • Glitch overlays may remain, but must not hide focus rings.
   • Vote cards: focus ring should appear outside the card area.
   • Inputs must show a teal border AND teal ring on focus.
   • Modal close buttons require focus-visible styles.
   =========================================================== */