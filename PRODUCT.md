# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS + vanilla JS (ES modules), no build step. One pinned CDN dependency (`html-to-image`) for PNG export; Google Fonts. Must be served over HTTP (local: `python3 -m http.server`; production: any static host such as GitHub Pages/Netlify).

## Users

Everyone in a leftist movement's campaign for the Brazilian second round (segundo turno), **phone-first**:
- Rank-and-file activists open it on their phones, check what's happening, pick an activity and forward its WhatsApp message or flyer to their own groups.
- Coordinators / communication people also use it on desktop to produce material for the whole movement.

## Product Purpose

One place that shows the calendar of the movement's activities (panfletagens, formações, atos de rua, plenárias…) and turns any activity into ready-to-share material in seconds: a formatted WhatsApp message and a simple, direct PNG flyer. Success = an activist goes from "what's on?" to "sent to my group" in a couple of taps.

## Operating Context

- Data comes from a CSV: currently `data/agenda.csv`; later a public Google Sheet published as CSV (`CSV_URL` in `js/config.js`). Editing the sheet updates the site.
- Used during an intense, short campaign window (days to the election), often outdoors, on mid-range Android phones, frequently shared via WhatsApp.
- All activities happen in Dourados/MS (`CITY` in `js/config.js`); the city is shown in the header, the WhatsApp message and the link preview (flyers stay as they are; most places already name the city).
- UI language: Portuguese (pt-BR).

## Capabilities and Constraints

- CSV is Brazilian-formatted: `;` separator, UTF-8 with BOM, dd/mm/aaaa dates. Columns: `Título`, `Descrição`, `Tipo` (free text), `Dia`, `Horário`, `Local`, `Término`, `Contato`, `Link`. Optional `Visível` checkbox column (TRUE/FALSE): unchecked rows are drafts and are hidden from the site; empty or missing means visible. Optional `Cancelado` checkbox plus `Motivo Cancelamento` (free text, a word or one sentence): checked rows stay on the line as cancelled (struck, never the next station) and their message and flyer become a cancellation notice. Headers match without accents/case; `,` separator, Windows-1252 files and legacy English headers are also accepted. Empty fields are omitted from outputs.
- Views: month calendar and list (list default on phones), filter by type.
- Per activity: WhatsApp message (copy, open in WhatsApp via `wa.me`) and 1080×1350 PNG flyer download.
- Activity types are free text — any styling per type must work for unknown types.
- Invalid rows (no title / bad date) are skipped and reported in a notice.

## Brand Commitments

- Red is required and must stay the dominant color, but not overwhelming; the rest of the palette is open.
- Name: "Calendário de Luta" (chosen by the user), with a red calendar mark as its logo. The slogan "Bora virar voto!" is still a placeholder until the movement provides an official one; keep both easy to swap (`APP_NAME` in `js/config.js`, `FLYER_SLOGAN` in `js/flyer.js`).
- No real party or candidate names in sample content.

## Evidence on Hand

- Sample data only (`data/agenda.csv`, 10 fictional activities 14–25/10/2026). No logo, photos, or official identity assets yet — do not fabricate any.

## Product Principles

1. Share in two taps: the path from seeing an activity to sending it must be the shortest thing in the app.
2. Phone first, desktop as a production bench.
3. The spreadsheet is the source of truth; the site never requires anyone to touch code to update the agenda.
4. Outputs are direct and legible at a glance — a flyer is read in a WhatsApp thumbnail.

## Accessibility & Inclusion

Must be readable outdoors on cheap phones: strong contrast, large tap targets, works on slow connections.
