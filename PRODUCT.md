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
- UI language: Portuguese (pt-BR).

## Capabilities and Constraints

- CSV is Brazilian-formatted: `;` separator, UTF-8 with BOM, dd/mm/aaaa dates. Columns: `Título`, `Descrição`, `Tipo` (free text), `Dia`, `Horário`, `Local`, `Término`, `Contato`, `Link`. Headers match without accents/case; `,` separator, Windows-1252 files and legacy English headers are also accepted. Empty fields are omitted from outputs.
- Views: month calendar and list (list default on phones), filter by type.
- Per activity: WhatsApp message (copy, open in WhatsApp via `wa.me`) and 1080×1350 PNG flyer download.
- Activity types are free text — any styling per type must work for unknown types.
- Invalid rows (no title / bad date) are skipped and reported in a notice.

## Brand Commitments

- Red is required and must stay the dominant color, but not overwhelming; the rest of the palette is open.
- Name "Agenda de Luta" and slogan "Bora virar voto!" are placeholders until the movement provides official ones; keep them easy to swap.
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
