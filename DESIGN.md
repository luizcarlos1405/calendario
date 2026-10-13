---
name: Agenda de Luta
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
---

# Design System: Agenda de Luta

## Overview

**Creative North Star: "Linha da Virada"**

The campaign is drawn as a São Paulo-style metro line. Graphite sign bars carry the name and the countdown; a red route strip runs under them; every day with activity is a station on a vertical red line that ends at a double-ringed terminal on election day. The interface reads like wayfinding signage, not like a calendar app: condensed uppercase station names, tabular condensed times, round line bullets, and two line weights only (the 8px route and 1px seams).

Density is phone-first and generous. Tap targets are 44 to 48px, the ground is a pale platform grey so white panels separate without heavy shadows, and contrast holds up outdoors. On desktop the same world becomes a production bench: line on the left, a persistent share bench on the right. The 1080 × 1350 flyer is the same signage at poster scale, so a shared image and the site are recognisably one system.

The world explicitly refuses the default calendar app (white cards on white, grid first) and the protest-poster costume (cream paper with condensed ink boxes).

**Key Characteristics:**
- One red route line (8px) is the spine of every view, including the flyer.
- Platform yellow appears only on the next station.
- Activity types are other metro line colours, shown as round bullets and named once.
- Barlow for reading, Barlow Condensed for signs, times and dates.
- Flat panels outlined by a 1px seam ring; 6px rectangular corners.
- The line draws itself once on load, along its own axis.

## Colors

A signage palette: graphite and platform grey carry the structure, route red carries the line and the actions, and one reserved yellow marks what comes next.

### Primary
- **Route Red** (`route`): the line itself, the route strip under the sign bar, the bench head's bottom border, primary buttons ("Enviar no WhatsApp"), the selected view tab underline, the election terminal and badge, flyer times and slogan. Red stays dominant by being the one continuous line on screen, not by filling surfaces.
- **Route Red, Pressed** (`route-hover`): hover on primary buttons, and links inside the bench facts, where it reads as text on white.
- **Route Tint** (`route-tint`): background of the selected stop and of error notices.

### Secondary
- **Platform Yellow** (`next`): the next-station plate on the board, the next station's ring on the line, the ring around the next activity's dot in the month grid, and the focus outline on dark surfaces.

### Tertiary
- **Connection Lines** (`line-azul`, `line-verde`, `line-lilas`, `line-turquesa`, `line-laranja`, `line-prata`, `line-marrom`, `line-magenta`): activity-type colours, assigned in sorted order to the known types, with a name hash as fallback for unknown free-text types. They appear only as round bullets (10px in lists, 8 to 9px in the month grid, 40px on the flyer).

### Neutral
- **Graphite** (`graphite`): sign bars, bench head, month weekday row, ink, the "Hoje" badge and ring, the outline button, the selected chip, and the default focus outline.
- **Platform Grey** (`ground`): page background, flyer body, segmented control track.
- **Panel White** (`panel`) and **Panel Hover** (`panel-hover`): surfaces such as the next board, stop lists, month cells and the bench, and their hover state.
- **Seam** (`seam`): 1px dividers, panel outline rings, chip and quiet-button borders, month grid gutters.
- **Muted Ink** (`muted`): secondary text, relative-day notes, past stations, inactive tabs.
- **Travelled** (`travelled`): the stretch of line already behind today, and past rings.
- **On Sign** (`on-sign`) and **On Sign Muted** (`on-sign-muted`): text on graphite.

### Named Rules
**The Reserved Yellow Rule.** Platform yellow marks the next station and nothing else. A focus ring on dark surfaces is the only other use.

**The Two Reserved Colours Rule.** Route red and platform yellow never appear among the activity-type colours. Types ride the connection-line palette only.

**The Travelled Line Rule.** Time already behind today turns the line and its rings to `travelled` grey, and past text to muted ink. Never hide past stations; grey them.

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
- **Flyer Display** (Condensed 800, 74 to 136px stepped by title length, line-height 0.98): flyer titles; flyer dates at 104px, times at 72px.

### Named Rules
**The Tabular Time Rule.** Every time, date and count is set in Barlow Condensed with tabular figures, so the time column aligns like a departures board.

**The Said Once Rule.** A type is named in exactly one place per item, next to its bullet. Nothing is labelled twice.

## Layout

Phone first. A single column in a 1280px max container with 16px gutters; at 960px and wider the shell becomes a two-column grid (`minmax(0, 1fr)` plus a 420px bench) with a 32px gap and 28/32/64px padding, and the sign bar grows from 64 to 72px.

Below the sign bar and route strip come the next-station board, the view tabs with a horizontally scrolling filter row (fading out at the right edge), and then the view. The line view is a vertical list with a 48px left gutter holding the route (16px from the edge) and 24px station rings; stations are 28px apart. The month view is a 7-column grid with 1px seam gutters; on phones cells show type dots, on desktop they show time and title rows clamped to two lines.

The share bench is sticky beside the line on desktop and becomes a bottom sheet (up to 92dvh, translucent graphite backdrop, grab handle on the bench head) below 960px. Its actions stick to the bottom of the bench.

Spacing steps observed: 4, 8, 12, 16, 24 and 32px, with 48 and 64px for page bottoms.

## Elevation & Depth

Flat, with tonal layering: white panels sit on platform grey and are outlined by a 1px seam drawn as a ring shadow, plus a barely visible 1 to 2px drop. Real lift is reserved for things that float over the page: the bench and the flyer preview.

### Shadow Vocabulary
- **Panel seam** (`box-shadow: 0 0 0 1px #D9D9D4, 0 1px 2px rgba(28, 28, 30, 0.06)`): next board, stop lists, notices.
- **Bench lift** (`box-shadow: 0 0 0 1px #D9D9D4, 0 10px 30px rgba(28, 28, 30, 0.08)`): the share bench and bottom sheet.
- **Preview lift** (`box-shadow: 0 0 0 1px #D9D9D4, 0 6px 18px rgba(28, 28, 30, 0.14)`): the flyer preview frame.
- **Segment lift** (`box-shadow: 0 1px 2px rgba(28, 28, 30, 0.14)`): the selected segment in the Mensagem / Panfleto control.

### Named Rules
**The Seam Not Shadow Rule.** Panels are separated by a 1px seam ring, not by drop shadows. Only floating surfaces get a soft lift.

## Shapes

Rectangular signage with gently cut corners (6px) on panels, buttons, icon buttons and the month grid; 4px on small plates (the yellow time plate, segment tabs). The bench uses 8px and becomes 14px on top as a bottom sheet. Filter chips are full pills.

Circles are the world's other shape and carry meaning: station rings (24px with a 5px border), the election terminal (32px with a 7px red border, then ground and graphite outer rings), type bullets, and the brand bullet (a red disc with a white inner ring). The route is a straight 8px bar, scaled up to 20px on the flyer.

**The Two Line Weights Rule.** Lines come in two weights only: the 8px route and the 1px seam. Selection and active states use the route colour at 2 to 4px as an inset (tab underline, selected month day), never a third decorative stroke.

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
Graphite bar with the brand bullet and uppercase brand name on the left and the countdown (Sign Display number over a Label Caps unit line) on the right, followed by the 8px route strip.

### Next Station Board
White panel led by the yellow time plate and the relative day, then the activity title as a Headline (an underline appears in route red on hover), the type tag and place, then the route and line buttons.

### Route Line (signature)
Each station has a day in Sign Headline, a relative-day note or a badge (graphite "HOJE", route-red election badge), and a panel of stops. Stop rows are a three-column grid: tabular time, title with type tag and place, and a chevron. The selected stop takes route tint with a red time and chevron. Ring states: route-red default, travelled grey for past, graphite ring for today, yellow fill with a graphite ring for next, and the double-ringed terminal for the election. On load the route segments scale in from the top and the rings pop in at 70ms intervals; reduced-motion users get none of it.

### Share Bench
Graphite head with an 8px route-red bottom border, a facts list with icons, the Mensagem / Panfleto segmented control, then either a WhatsApp-style preview or the scaled flyer preview, with sticky actions at the bottom.

### Flyer
1080 × 1350 poster: a 168px graphite sign bar (brand, plus the type as a white-ringed bullet and name), a 20px route strip, a platform-grey body with the condensed title, a mini route of two rings (date and time, then place), a description clamped to three lines, and a graphite footer with the contact and the slogan in route red.

## Do's and Don'ts

### Do:
- **Do** keep the 8px route red line as the spine of any new view or export; red stays dominant through the line and the primary action, not through filled areas.
- **Do** set all times, dates and counts in Barlow Condensed with tabular figures.
- **Do** separate panels with the 1px seam ring on platform grey (`0 0 0 1px` seam plus a 1 to 2px drop).
- **Do** show an activity type as a round line bullet plus its name, once per item, using only the connection-line palette.
- **Do** keep tap targets at 44px or more and primary buttons at 48px.
- **Do** grey out time that has passed (travelled line, muted text) rather than removing it.

### Don't:
- **Don't** use platform yellow for anything but the next station (and focus rings on dark surfaces).
- **Don't** give an activity type route red or platform yellow.
- **Don't** add a third line weight or decorative border; the system has the 8px route and the 1px seam.
- **Don't** drift into the default calendar app look (white cards on white, grid as the first view) or the protest-poster costume (cream paper, condensed ink boxes).
- **Don't** label a type or a station twice.
