# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

"Agenda de Luta" is a static, no-build site (plain HTML/CSS/vanilla ES modules, no package.json, no tests, no linter) showing a calendar of second-round campaign activities. For each activity it generates a WhatsApp-ready message and a 1080×1350 PNG flyer. All user-facing text is Brazilian Portuguese (pt-BR); keep new UI strings in pt-BR. Code comments are in English.

## Running

The page must be served over HTTP: ES modules and the `fetch` of the CSV fail under `file://` (an inline script in `index.html` shows an error notice in that case).

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

Deploy = publish the whole folder to any static host.

## Data

The agenda lives in `data/agenda.csv`, loaded from `CSV_URL` in `js/app.js` (can be swapped for a published Google Sheets CSV link). Columns: `title`, `day` (required); `description`, `type`, `time`, `end_time`, `local`, `contact`, `link`, `visible`, `cancelled`, `cancel_reason` (optional; pt-BR headers `Visível`, `Cancelado`, `Motivo Cancelamento`). `type` is free text. `Visível` unchecked hides a row (`isHidden`); `Cancelado` checked sets `event.cancelled` (`isChecked`) with `event.cancelReason`: cancelled events are skipped by `findNext`, drawn as closed stations (`.is-cancelled`), and get a notice message (`buildWhatsAppMessage`) and the `aviso` flyer (`NOTICE_STYLE` in `flyer.js`, forced regardless of the picked style). Headers are matched loosely: accents/case/spaces are normalized and pt-BR aliases accepted (`COLUMN_ALIASES` in `js/events.js`). Rows missing a title or a valid date are dropped and reported in a notice at the top of the page, using their spreadsheet line number (header = line 1).

## Architecture

Data flow: `app.js` fetches CSV → `csv.js` `parseCSV` (RFC 4180, BOM strip, auto-detects `,` vs `;`) → `events.js` `buildEvents` (column mapping, date/time parsing, sorted event objects) → `calendar.js` renders month grid or list → clicking an event opens the `<dialog>` in `index.html`, filled by `whatsapp.js` (message text + `wa.me` link + HTML preview) and `flyer.js` (flyer DOM + PNG export).

- `js/app.js` is the only stateful module: a single `state` object (current year/month, view, active type filters, selected event) and all DOM wiring. Other modules are pure-ish render/format helpers that take data and return strings or DOM nodes. Rendering is full re-render via `replaceChildren()`; no framework.
- Event object shape is defined in `buildEvents` (`js/events.js`). Times are stored as minutes-since-midnight (`time`, `endTime`) alongside the raw strings (`timeRaw`, `endTimeRaw`); formatters fall back to the raw text when parsing failed. `dateKey` (`YYYY-MM-DD`) is used for string comparison of days (past/today checks, grouping). Dates are local `Date` objects, never UTC.
- Date/time formatting helpers (`formatShortDate`, `formatLongDate`, `formatTimeRange`, `weekdayName`, `monthName`) live in `events.js` and are shared by calendar, WhatsApp and flyer. Weekday/month names are hardcoded pt-BR arrays, not `Intl`.
- Type colors: `assignTypeColors` (called on load with the sorted type list) gives each type a distinct `TYPE_PALETTE` entry in `calendar.js`; types beyond the palette fall back to a name hash. `typeColor` is used by chips, badges, list cards and filter dots.
- Flyer: `renderFlyer` builds a fixed 1080×1350 DOM node styled by the `.flyer*` rules in `css/style.css`; the dialog preview shrinks it with a CSS `transform: scale()` on `#flyer-scaler` (recomputed on tab switch and resize). Export uses the global `htmlToImage` (html-to-image, loaded from jsDelivr in `index.html`) and waits for `document.fonts.ready` (Anton/Inter from Google Fonts). Title font size is picked by length (`titleSizeClass`), description truncated at 200 chars.
- WhatsApp formatting uses `*bold*`/`_italic_` markup; lines for empty fields are omitted. `previewHtml` escapes HTML before converting markup — keep that order.
- Offline: `sw.js` (registered at the end of `app.js` with `?csv=<CSV_URL>` so the classic worker knows the cross-origin CSV) is network-first for every same-origin GET and the CSV, refreshing the cache on each success and falling back to it only on network failure/5xx. The `SHELL` list is precached on install — add new CSS/JS/font files there. Cached CSV copies carry an `X-Cached-At` header; `load()` uses it to show the "Sem conexão" notice. No cache version bump is needed on deploy.
- PWA: `manifest.webmanifest` (relative `id`/`start_url`/`scope` so it works at any path) + manifest/apple meta tags in `index.html`. Icons in `assets/icons/` are rendered from `assets/icon.html` (`#any` transparent rounded tile, `#maskable` full bleed, mark inside the 80% safe zone); manifest screenshots in `assets/screenshots/` are captures of the site (narrow 780×1688, wide 1440×900) — keep `sizes` in the manifest in sync.

## Customization points

- WhatsApp closing line: `CLOSING_LINE` in `js/whatsapp.js`.
- Flyer footer slogan (used when no contact/link): `FLYER_SLOGAN` in `js/flyer.js`.
- Colors: CSS variables at the top of `css/style.css`; type colors in `TYPE_PALETTE` (`js/calendar.js`).
