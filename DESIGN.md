---
name: Calendário de Luta
description: The campaign's activities as one red metro line running to election day, each station ready to share.
colors:
  route: "#E4002B"
  route-hover: "#C70026"
  route-tint: "#FDEBEE"
  next: "#FFC20E"
  graphite: "#1C1C1E"
  ground: "#EFEFEC"
  panel: "#FFFFFF"
  panel-hover: "#F7F7F5"
  seam: "#D9D9D4"
  muted: "#5C5C61"
  travelled: "#BDBDB8"
  on-sign: "#FFFFFF"
  on-sign-muted: "#B4B4B9"
  line-azul: "#0455A1"
  line-verde: "#00875A"
  line-lilas: "#9B3894"
  line-turquesa: "#00808A"
  line-laranja: "#C25700"
  line-prata: "#5E6A71"
  line-marrom: "#7A4E2D"
  line-magenta: "#C2185B"
typography:
  sign-display:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
  sign-headline:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
    fontFeature: "tnum"
  sign-title:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.03em"
  time:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.05
    fontFeature: "tnum"
  headline:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.45
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.2
  label-caps:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.06em"
  button:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1
  flyer-display:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "136px"
    fontWeight: 800
    lineHeight: 0.98
  flyer-numeral:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "520px"
    fontWeight: 800
    lineHeight: 0.78
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  flyer-brand:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
  flyer-slogan:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.01em"
rounded:
  xs: "4px"
  md: "6px"
  lg: "8px"
  sheet: "14px"
  pill: "19px"
  bullet: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
  route: "8px"
components:
  button-route:
    backgroundColor: "{colors.route}"
    textColor: "{colors.on-sign}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 18px"
    height: "48px"
  button-route-hover:
    backgroundColor: "{colors.route-hover}"
    textColor: "{colors.on-sign}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 18px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-sign}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 18px"
    height: "48px"
  icon-button:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    size: "44px"
  chip:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "38px"
  chip-selected:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-sign}"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    padding: "16px"
  next-plate:
    backgroundColor: "{colors.next}"
    textColor: "{colors.graphite}"
    typography: "{typography.sign-display}"
    rounded: "{rounded.xs}"
    padding: "5px 10px 4px"
  sign-bar:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-sign}"
    height: "64px"
    padding: "10px 16px"
  station-badge-today:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-sign}"
    typography: "{typography.label-caps}"
    padding: "4px 7px"
  station-badge-election:
    backgroundColor: "{colors.route}"
    textColor: "{colors.on-sign}"
    typography: "{typography.label-caps}"
    padding: "4px 7px"
  stop-selected:
    backgroundColor: "{colors.route-tint}"
    textColor: "{colors.route}"
  brand-mark:
    textColor: "{colors.route}"
    size: "34px"
  style-select:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    padding: "0 84px 0 14px"
    height: "44px"
  flyer-foot:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-sign}"
    typography: "{typography.flyer-slogan}"
    padding: "44px 72px 52px"
---

# Design System: Calendário de Luta

## Overview

**Creative North Star: "Linha da Virada"**

The campaign is drawn as a São Paulo-style metro line. Graphite sign bars carry the name and the countdown; a red route strip runs under them; every day with activity is a station on a vertical red line that ends at a double-ringed terminal on election day. The interface reads like wayfinding signage, not like a calendar app: condensed uppercase station names, tabular condensed times, round line bullets, and two line weights only (the 8px route and 1px seams).

Density is phone-first and generous. Tap targets are 44 to 48px, the ground is a pale platform grey so white panels separate without heavy shadows, and contrast holds up outdoors. On desktop the same world becomes a production bench: line on the left, a persistent share bench on the right. The ten 1080 × 1350 flyer layouts are the same signage at poster scale, each a different object from the metro (a station sign, a departures board, a ticket, a tile wall, a network map), so a shared image and the site are recognisably one system. The brand is a red calendar mark beside the name, in the sign bar, the favicon and every flyer.

The world explicitly refuses the default calendar app (white cards on white, grid first) and the protest-poster costume (cream paper with condensed ink boxes).

**Key Characteristics:**
- One red route line (8px) is the spine of every view; flyers carry route red as a scaled line, a strip or a full ground.
- Platform yellow appears only on the next station.
- Activity types are other metro line colours, shown as round bullets and named once.
- Barlow for reading, Barlow Condensed for signs, times and dates.
- Flat panels outlined by a 1px seam ring; 6px rectangular corners.
- The line draws itself once on load, along its own axis.
- The brand is a red calendar mark; station rings stay rings and are never the logo.

## Colors

A signage palette: graphite and platform grey carry the structure, route red carries the line and the actions, and one reserved yellow marks what comes next.

### Primary
- **Route Red** (`route`): the line itself, the route strip under the sign bar, the bench head's bottom border, primary buttons ("Enviar no WhatsApp"), the selected view tab underline, the election terminal and badge, the brand mark's body, flyer times and slogan, and the full ground of the Vermelho total and Bilhete de ida flyers. Red stays dominant by being the one continuous line on screen, not by filling surfaces.
- **Route Red, Pressed** (`route-hover`): hover on primary buttons, and links inside the bench facts, where it reads as text on white.
- **Route Tint** (`route-tint`): background of the selected stop and of error notices.

### Secondary
- **Platform Yellow** (`next`): the next-station plate on the board, the next station's ring on the line, the ring around the next activity's dot in the month grid, and the focus outline on dark surfaces.

### Tertiary
- **Connection Lines** (`line-azul`, `line-verde`, `line-lilas`, `line-turquesa`, `line-laranja`, `line-prata`, `line-marrom`, `line-magenta`): activity-type colours, assigned in sorted order to the known types, with a name hash as fallback for unknown free-text types. They appear only as round bullets (10px in lists, 8 to 9px in the month grid, 26 to 40px on flyers), plus the converging lines of the Mapa da rede flyer, where the activity's own type colour is the line that reaches the interchange.

### Neutral
- **Graphite** (`graphite`): sign bars, bench head, month weekday row, ink, the "Hoje" badge and ring, the outline button, the selected chip, and the default focus outline.
- **Platform Grey** (`ground`): page background, segmented control track, and the default flyer ground.
- **Panel White** (`panel`) and **Panel Hover** (`panel-hover`): surfaces such as the next board, stop lists, month cells and the bench, and their hover state.
- **Seam** (`seam`): 1px dividers, panel outline rings, chip and quiet-button borders, month grid gutters.
- **Muted Ink** (`muted`): secondary text, relative-day notes, past stations, inactive tabs.
- **Travelled** (`travelled`): the stretch of line already behind today, and past rings.
- **On Sign** (`on-sign`) and **On Sign Muted** (`on-sign-muted`): text on graphite.

### Named Rules
**The Reserved Yellow Rule.** Platform yellow marks the next station and nothing else. A focus ring on dark surfaces is the only other use.

**The Two Reserved Colours Rule.** Route red and platform yellow never appear among the activity-type colours. Types ride the connection-line palette only.

**The Travelled Line Rule.** Time already behind today turns the line and its rings to `travelled` grey, and past text to muted ink. Never hide past stations; grey them.

**The Flyer Palette Rule.** Flyers use route red, graphite, the connection lines and white or pale neutrals, nothing else. Platform yellow never appears on a flyer: there is no "next" in a single activity. The few material neutrals a layout needs (tile white and grout on Azulejo, the flap-tile grey on Partidas, pasted-paper white on Lambe-lambe) belong to the object it depicts.

## Typography

**Display Font:** Barlow Condensed 600/700/800 (with Barlow, system-ui)
**Body Font:** Barlow 500/600/700 (with system-ui)

Both are self-hosted woff2 files; the Barlow Condensed 800 and Barlow 600 files are preloaded.

**Character:** Barlow Condensed is the voice of the signs: uppercase station days, the brand, view tabs, times and countdown, always in tabular figures where digits appear. Barlow is the reading voice: titles, places, descriptions and buttons, set medium-weight for outdoor legibility.

### Hierarchy
- **Sign Display** (Condensed 800, 26px phone / 30px desktop, line-height 1, tabular): countdown number and the next-station time plate.
- **Sign Headline** (Condensed 800, 22px, uppercase, 0.02em, tabular): station days ("QUA 14/10"), day-detail title; the month title uses 24px.
- **Sign Title** (Condensed 700, 22px, uppercase, 0.02 to 0.03em): brand name (26px desktop) and Linha / Mês view tabs.
- **Time** (Condensed 700, 22px, line-height 1.05, tabular): the time column of each stop. Month cells use 14px.
- **Headline** (Barlow 700, 21px phone / 26px desktop, line-height 1.2, balanced): the next activity's title; bench title at 22px.
- **Title** (Barlow 600, 17px, line-height 1.25): stop titles.
- **Body** (Barlow 500, 16px, line-height 1.45): facts and running text; secondary lines at 14 to 15px in muted ink.
- **Label** (Barlow 600, 14 to 15px): type tags, chips, relative-day notes.
- **Label Caps** (Barlow 700, 12px, uppercase, 0.06em): status badges ("HOJE", "ELEIÇÃO · 2º TURNO"), month weekday row, the countdown unit line.
- **Button** (Barlow 700, 16px, line-height 1).
- **Flyer scale** (poster sizes, 24 to 520px; see Components > Flyers): a separate ramp for the 1080 × 1350 canvas. Flyer Display is the condensed 800 title (136px at its largest on Placa da estação, line-height 0.92 to 1.02), stepped down by text length; Flyer Numeral is the oversized day or date (520px on Vermelho total, 400px on Data gigante, -0.03em, tabular); Flyer Brand (36px) and Flyer Slogan (64px, 52px in route red beside contact) are shared by every layout. Small caps labels sit at 24 to 26px with 0.08 to 0.1em tracking.

### Named Rules
**The Tabular Time Rule.** Every time, date and count is set in Barlow Condensed with tabular figures, so the time column aligns like a departures board.

**The Said Once Rule.** A type is named in exactly one place per item, next to its bullet. Nothing is labelled twice.

**The Poster Scale Rule.** Flyer sizes belong to the flyer scale and never enter the UI ramp. A flyer's title (and the Lambe-lambe type strip) takes one of four size classes picked from text length (`is-xl`, `is-lg`, `is-md`, `is-sm`; by default up to 22, 40 and 64 characters), never a hand-tuned size per activity.

## Layout

Phone first. A single column in a 1280px max container with 16px gutters; at 960px and wider the shell becomes a two-column grid (`minmax(0, 1fr)` plus a 420px bench) with a 32px gap and 28/32/64px padding, and the sign bar grows from 64 to 72px.

Below the sign bar and route strip come the next-station board, the view tabs with a horizontally scrolling filter row (fading out at the right edge), and then the view. The line view is a vertical list with a 48px left gutter holding the route (16px from the edge) and 24px station rings; stations are 28px apart. The month view is a 7-column grid with 1px seam gutters; on phones cells show type dots, on desktop they show time and title rows clamped to two lines.

The share bench is sticky beside the line on desktop and becomes a bottom sheet (up to 92dvh, translucent graphite backdrop, grab handle on the bench head) below 960px. Its actions stick to the bottom of the bench. In the Panfleto panel, the style picker (previous button, select, next button, 8px gaps) sits above a 340px-wide scaled preview of the flyer.

Flyers are a fixed 1080 × 1350 canvas laid out as a vertical stack: 72px side margins on most layouts (40 to 80px on Lambe-lambe and Data gigante), a header row with the brand and the type, and a footer that bleeds to the edges and is pushed to the bottom.

Spacing steps observed: 4, 8, 12, 16, 24 and 32px, with 48 and 64px for page bottoms.

## Elevation & Depth

Flat, with tonal layering: white panels sit on platform grey and are outlined by a 1px seam drawn as a ring shadow, plus a barely visible 1 to 2px drop. Real lift is reserved for things that float over the page: the bench and the flyer preview.

### Shadow Vocabulary
- **Panel seam** (`box-shadow: 0 0 0 1px #D9D9D4, 0 1px 2px rgba(28, 28, 30, 0.06)`): next board, stop lists, notices.
- **Bench lift** (`box-shadow: 0 0 0 1px #D9D9D4, 0 10px 30px rgba(28, 28, 30, 0.08)`): the share bench and bottom sheet.
- **Preview lift** (`box-shadow: 0 0 0 1px #D9D9D4, 0 6px 18px rgba(28, 28, 30, 0.14)`): the flyer preview frame.
- **Segment lift** (`box-shadow: 0 1px 2px rgba(28, 28, 30, 0.14)`): the selected segment in the Mensagem / Panfleto control.

### Named Rules
- **Flyer material shadows**: some flyers depict physical objects and the soft shadow belongs to the object: the ticket on Bilhete de ida (`0 18px 40px`, 0.28), the enamel plate, frieze and panel on Azulejo (6 to 30px blur, 0.12 to 0.18), the pasted strips on Lambe-lambe (`0 3px 8px`, 0.14), and the inset bottom edge of the split-flap tiles on Partidas. All are soft and graphite-tinted; none are hard offsets.

**The Seam Not Shadow Rule.** Panels are separated by a 1px seam ring, not by drop shadows. Only floating surfaces, and the depicted objects on a flyer, get a soft lift.

## Shapes

Rectangular signage with gently cut corners (6px) on panels, buttons, icon buttons and the month grid; 4px on small plates (the yellow time plate, segment tabs). The bench uses 8px and becomes 14px on top as a bottom sheet. Filter chips are full pills.

Circles are the world's other shape and carry meaning: station rings (24px with a 5px border), the election terminal (32px with a 7px red border, then ground and graphite outer rings), and type bullets. The route is a straight 8px bar, scaled to 20 to 44px on flyers (with flyer rings of 80 to 120px).

The brand mark is the one rectangle-with-meaning: a red calendar (a 4px-rounded body with two binder tabs, a white header band and five day cells) drawn on a 32 × 32 grid. Flyer objects keep their own corners: the 28px ticket, 14px flap tiles and enamel plate, the 18px enamel panel, the 100px pill around the Mapa da rede interchange.

**The Two Line Weights Rule.** In the interface, lines come in two weights only: the 8px route and the 1px seam. Selection and active states use the route colour at 2 to 4px as an inset (tab underline, selected month day), never a third decorative stroke. Flyers scale the route and may draw the edges of the object they depict (the ticket perforation, the enamel frieze trim, the departures-board row rules, the interchange outline), but no decorative borders.

**The Mark Is Not A Ring Rule.** The logo is the calendar mark. Station rings, terminals and type bullets are line vocabulary and never stand in for the brand.

## Components

### Buttons
Signage-plain and full-height, sized for thumbs.
- **Shape:** 6px corners, 48px minimum height, 2px border, icon plus label with an 8px gap.
- **Route (primary):** route red with white text; hover darkens to route-hover. Used for "Enviar no WhatsApp" and native share.
- **Line (secondary):** transparent with a 2px graphite border; hover and the done state ("Copiado") fill graphite with white text.
- **Quiet:** seam border that turns graphite on hover.
- **Icon button:** 44px square, 1px seam border, white; graphite border on hover. On the bench head it is transparent with a translucent white border.
- **Focus:** 3px graphite outline offset 2px; platform yellow on graphite surfaces and on the route button.

### Chips
- **Style:** white pill, 38px high (34px on desktop), 1px seam border, Label type, with the type's line bullet.
- **State:** hover darkens the border to graphite; pressed fills graphite with white text and gives the bullet a white ring.

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** panel white on platform grey.
- **Shadow Strategy:** panel seam (see Elevation & Depth).
- **Internal Padding:** 16px on phones, 20 to 24px on desktop for the next board; 12 to 14px for stop rows.

### Navigation
- **View tabs:** Sign Title type in muted ink over a 1px seam baseline; the selected tab turns graphite with a 4px inset route-red underline.
- **Segmented control:** platform-grey track with 4px padding; the selected segment is white with a segment lift.

### Sign Bar
Graphite bar with the calendar brand mark (34px) and uppercase brand name on the left and the countdown (Sign Display number over a Label Caps unit line) on the right, followed by the 8px route strip.

### Next Station Board
White panel led by the yellow time plate and the relative day, then the activity title as a Headline (an underline appears in route red on hover), the type tag and place, then the route and line buttons.

### Route Line (signature)
Each station has a day in Sign Headline, a relative-day note or a badge (graphite "HOJE", route-red election badge), and a panel of stops. Stop rows are a three-column grid: tabular time, title with type tag and place, and a chevron. The selected stop takes route tint with a red time and chevron. Ring states: route-red default, travelled grey for past, graphite ring for today, yellow fill with a graphite ring for next, and the double-ringed terminal for the election. On load the route segments scale in from the top and the rings pop in at 70ms intervals; reduced-motion users get none of it.

### Share Bench
Graphite head with an 8px route-red bottom border, a facts list with icons, the Mensagem / Panfleto segmented control, then either a WhatsApp-style preview or the flyer style picker over the scaled flyer preview, with sticky actions at the bottom.

### Brand Mark
A red calendar on a 32 × 32 grid. The body takes the current text colour and the cut-outs (header band, day cells) take a mark-ink colour that defaults to white, so the same drawing serves every ground: route red with white cut-outs in the sign bar (34px), the favicon and most flyers (44 to 60px); inverted to a white body with route-red cut-outs on the Vermelho total flyer. It always sits left of the uppercase name in Barlow Condensed 700.

### Flyer Style Picker
A row of three controls above the preview: a 44px previous icon button, a native select styled in the system (44px high, white, 1px seam border that turns graphite on hover, 6px corners, Barlow 600 16px, a 20px graphite chevron at the right), and a 44px next icon button. Inside the select, right of the name and before the chevron, a muted "n/10" counter in Barlow Condensed 700 15px with tabular figures. Previous and next wrap around the ten layouts; the choice is remembered on the device.

### Flyers
Ten 1080 × 1350 PNG layouts, listed in picker order. Every layout shares these parts:
- **Brand:** the calendar mark (52px by default) beside the app name in Flyer Brand type.
- **Type mark:** the type's line bullet (34px, with a 5px white ring) and its name in condensed 800 uppercase (38 to 52px), truncated to one line.
- **Footer:** on six layouts, a graphite full-bleed band pushed to the bottom (route red on Painel de partidas). With a contact or link, the contact ("Fala com: …", Barlow 600 34px) and the link (Barlow 500 28px, light grey) sit on the left and the slogan sits beside them on the right in route red at 52px; without them, the slogan stands alone at 64px in white.
- **Slogan:** every flyer carries "Bora virar voto!", in the shared footer or in the layout's own terminal, stub, foot row or run.
- **Description:** cut in code to 110 characters at a word boundary with an ellipsis, and also clamped to two or three lines on the layouts that show it (Placa da estação, Linha até a eleição, Azulejo da estação).
- **Title size:** one of four classes picked from text length (see The Poster Scale Rule); the sizes below are listed xl / lg / md / sm.

| # | Layout | Thesis | Ground | Signature | Type scale |
|---|---|---|---|---|---|
| 1 | Placa da estação | The station sign | Platform grey | 168px graphite sign bar and 20px route strip; a two-stop vertical route (80px rings, 16px border) from when to where | Title 136 / 110 / 90 / 74; date 104; time 72 red; place 46; description 34 |
| 2 | Linha até a eleição | A stretch of line from this activity to election day | Platform grey | 24px horizontal route from a 120px ring to the double-ringed terminal, with the days between counted under it; a single stop once the election is past | Title 132 / 110 / 90 / 74; stop dates 84; time 60 red; place 44; description 32 |
| 3 | Vermelho total | Drenched: the sheet is the route | Route red, white type | The day numeral fills half the sheet; a 24px white rail with an 84px ring; the time on a graphite plate; the brand mark inverted | Numeral 520; weekday and month 88; time 58; title 120 / 100 / 84 / 70; place 42 |
| 4 | Painel de partidas | The departures board | Graphite with a 20px route top edge | Split-flap tiles (196 × 280px, 14px corners) for the start time, a route-red separator, then label rows ruled at 2px; a route-red footer with a white slogan | Tiles 240; separator 190; until time 56; title 76 / 66 / 56 / 48; values 40; labels 26 caps |
| 5 | Bilhete de ida | A one-way ticket to election day | Route red, white ticket | A 28px-cornered ticket with a graphite head, a dashed perforation with round notches, and a stub whose destination is "Eleição · dd/mm" in red | Title 120 / 100 / 82 / 66; field values and destination 72; labels 24 caps; slogan 48 |
| 6 | Trilho vertical | Every fact is a stop on one rail | White | A 44px full-height route rail down the left with 96px rings; the slogan is the terminal, with a double ring | Title 120 / 98 / 80 / 64 uppercase; date 128; time 88 red; place 46; slogan 76 red |
| 7 | Data gigante | Type as the image | Platform grey | The date set as large as the sheet allows over a 24px route rule; a 3px graphite rule above the foot row | Weekday 92 red; date 400; time 104 red; title (Barlow 700, balanced) 96 / 80 / 66 / 56; place 40; slogan 52 red |
| 8 | Mapa da rede | The network map, converging on this activity | White | Lines bending at 45° (the route at 34px, the type's line at 22px, others at 18px, white stations outlined in graphite) into a pill interchange with a 12px graphite border holding the date and time | Hub date 96; time 64 red; title 112 / 94 / 78 / 64; place 40 |
| 9 | Azulejo da estação | The station tile wall | Tile white with grey grout on a 108px grid | A route-red enamel frieze with 14px graphite trim carrying the uppercase white title; a graphite type plate; a white enamel info panel | Title 124 / 102 / 84 / 68; date 96; time 72 red; place 40; description 30 |
| 10 | Lambe-lambe | Pasted strips of wood type | Pale pasted-paper white | Strips tilted between -1.5 and 0.6 degrees with a soft paste shadow: a red type strip, a white title strip, a graphite when strip, a red-outlined place strip, and the slogan run in red off the right edge | Type strip 200 / 160 / 120 / 96; title 150 / 124 / 98 / 78; when 112; place 66; slogan run 110 |

The Azulejo grid is a drawing of a real station tile wall (3px grout lines on both axes), a material the metro world owns; it is not a decorative UI grid and does not license grid backgrounds elsewhere.

## Do's and Don'ts

### Do:
- **Do** keep the 8px route red line as the spine of any new view or export; red stays dominant through the line and the primary action, not through filled areas.
- **Do** set all times, dates and counts in Barlow Condensed with tabular figures.
- **Do** separate panels with the 1px seam ring on platform grey (`0 0 0 1px` seam plus a 1 to 2px drop).
- **Do** show an activity type as a round line bullet plus its name, once per item, using only the connection-line palette.
- **Do** keep tap targets at 44px or more and primary buttons at 48px.
- **Do** grey out time that has passed (travelled line, muted text) rather than removing it.
- **Do** put the brand (calendar mark and name) and the slogan on every flyer, with the slogan beside the contact or link when they exist.
- **Do** make each new flyer layout a real object from the metro (a sign, a board, a ticket, a wall, a map) built from the shared brand, type mark and footer, with its title sized by the length classes.

### Don't:
- **Don't** use platform yellow for anything but the next station (and focus rings on dark surfaces).
- **Don't** give an activity type route red or platform yellow.
- **Don't** add a third line weight or decorative border; the system has the 8px route and the 1px seam.
- **Don't** drift into the default calendar app look (white cards on white, grid as the first view) or the protest-poster costume (cream paper, condensed ink boxes) in the interface. Lambe-lambe is the one flyer that quotes pasted street posters, and it stays inside the palette (pale neutral paper, white, graphite and route-red strips).
- **Don't** use a ring or a disc as the logo, and don't bring flyer sizes into the UI ramp.
- **Don't** label a type or a station twice.
