// Flyers (1080×1350 PNG). Ten layouts, one metro world: route red, graphite, the line colours,
// Barlow. Each style is a function that turns an activity into a DOM node. Uses the global `htmlToImage`.

import { APP_NAME, ELECTION_DATE } from './config.js';
import { capitalize, daysBetween, formatTime, formatTimeRange, monthName, parseDay, slugify, weekdayName } from './events.js';
import { typeColor, typeLabel } from './types.js';
import { brandMark, icon } from './icons.js';

export const FLYER_WIDTH = 1080;
export const FLYER_HEIGHT = 1350;

// Signs off every flyer.
export const FLYER_SLOGAN = 'Bora virar voto!';

// Keeps flyers readable in a WhatsApp thumbnail.
const MAX_DESCRIPTION = 110;

const election = parseDay(ELECTION_DATE);

// ---------- Helpers ----------

function h(tag, className, ...kids) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const kid of kids.flat()) {
    if (kid == null || kid === false || kid === '') continue;
    node.append(kid instanceof Node ? kid : String(kid));
  }
  return node;
}

function raw(className, html) {
  const node = document.createElement('span');
  node.className = className;
  node.innerHTML = html;
  return node;
}

function truncate(text, max) {
  if (!text || text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.]+$/, '')}…`;
}

// Picks a size class from the text length: is-xl / is-lg / is-md / is-sm.
function fit(text, [xl, lg, md] = [22, 40, 64]) {
  const n = text.length;
  if (n <= xl) return 'is-xl';
  if (n <= lg) return 'is-lg';
  if (n <= md) return 'is-md';
  return 'is-sm';
}

function clock(minutes) {
  const hh = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mm = String(minutes % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

// Everything a layout may need, computed once.
function facts(event) {
  const d = event.date;
  const wdLong = weekdayName(d);
  return {
    title: event.title,
    type: typeLabel(event.type),
    color: typeColor(event.type),
    day: String(d.getDate()).padStart(2, '0'),
    month: String(d.getMonth() + 1).padStart(2, '0'),
    wdShort: capitalize(wdLong.slice(0, 3)),
    wdLong: capitalize(wdLong),
    wdName: capitalize(wdLong.split('-')[0]),
    monthLong: capitalize(monthName(d.getMonth())),
    monthShort: monthName(d.getMonth()).slice(0, 3),
    station: `${capitalize(wdLong.slice(0, 3))} ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
    time: formatTimeRange(event),
    start: event.time != null ? formatTime(event.time) : event.timeRaw,
    startClock: event.time != null ? clock(event.time) : null,
    endClock: event.endTime != null ? clock(event.endTime) : null,
    local: event.local,
    desc: truncate(event.description, MAX_DESCRIPTION),
    contact: event.contact,
    link: event.link,
    toElection: election ? daysBetween(d, election) : null,
    electionDate: election ? `${String(election.getDate()).padStart(2, '0')}/${String(election.getMonth() + 1).padStart(2, '0')}` : '',
  };
}

const brand = (cls = '') => h('div', `fx-brand ${cls}`, raw('fx-mark', brandMark('fx-mark-svg')), h('span', null, APP_NAME));
const typeMark = (f, cls = '') => {
  const dot = h('span', 'fx-type-dot');
  dot.style.background = f.color;
  return h('div', `fx-type ${cls}`, dot, h('span', null, f.type));
};
const pin = (cls = 'fx-pin') => raw(cls, icon('pin', 'fx-icon'));

// Contact and link beside the slogan, or the slogan alone.
function foot(f, cls = 'fx-foot') {
  const node = h('div', cls);
  if (f.contact || f.link) {
    node.classList.add('has-info');
    node.append(h('div', 'fx-info', f.contact && h('div', 'fx-contact', `Fala com: ${f.contact}`), f.link && h('div', 'fx-link', f.link)));
  }
  node.append(h('div', 'fx-slogan', FLYER_SLOGAN));
  return node;
}

function daysLabel(n) {
  return n === 1 ? '1 dia até a eleição' : `${n} dias até a eleição`;
}

// ---------- Layouts ----------

// 1. The station sign: graphite sign bar, title, a two-stop route from "when" to "where".
function placa(f) {
  const route = h('div', `pl-route${f.local ? '' : ' is-single'}`,
    h('div', 'pl-stop', h('span', 'pl-ring'), h('div', 'pl-date', f.station), f.time && h('div', 'pl-time', f.time)),
    f.local && h('div', 'pl-stop', h('span', 'pl-ring'), h('div', 'pl-place', f.local)),
  );
  return [
    h('div', 'pl-sign', brand('pl-brand'), typeMark(f, 'pl-type')),
    h('div', 'pl-strip'),
    h('div', 'pl-body', h('h1', `pl-title ${fit(f.title)}`, f.title), route, f.desc && h('p', 'pl-desc', f.desc)),
    foot(f, 'fx-foot pl-foot'),
  ];
}

// 2. A stretch of line from this activity to the election terminal, days counted between.
function linha(f) {
  const hasEnd = f.toElection != null && f.toElection > 0;
  const here = h('div', 'ln-stop is-here', h('div', 'ln-above', f.station), h('span', 'ln-ring'), h('div', 'ln-below', f.time || ''));
  const route = h('div', `ln-route${hasEnd ? '' : ' is-single'}`, h('span', 'ln-track'), here);
  if (hasEnd) {
    route.append(
      h('div', 'ln-gap', daysLabel(f.toElection)),
      h('div', 'ln-stop is-end', h('div', 'ln-above', f.electionDate), h('span', 'ln-ring is-terminal'), h('div', 'ln-below is-end', 'Eleição')),
    );
  }
  return [
    h('div', 'ln-top', brand(), typeMark(f)),
    h('h1', `ln-title ${fit(f.title)}`, f.title),
    route,
    f.local && h('div', 'ln-place', pin(), h('span', null, f.local)),
    f.desc && h('p', 'ln-desc', f.desc),
    foot(f, 'fx-foot ln-foot'),
  ];
}

// 3. Drenched: the whole sheet is route red, the day number fills half of it.
function vermelho(f) {
  return [
    h('div', 'vm-top', typeMark(f, 'vm-type'), brand('vm-brand')),
    h('div', 'vm-date',
      h('div', 'vm-day', f.day),
      h('div', 'vm-side', h('div', 'vm-wd', f.wdName), h('div', 'vm-month', f.monthLong), f.time && h('div', 'vm-time', f.time)),
    ),
    h('div', 'vm-rail', h('span', 'vm-ring')),
    h('h1', `vm-title ${fit(f.title)}`, f.title),
    f.local && h('div', 'vm-place', pin(), h('span', null, f.local)),
    foot(f, 'fx-foot vm-foot'),
  ];
}

// 4. Departures board: split-flap tiles for the time, rows for the rest.
function partidas(f) {
  const text = f.startClock || `${f.day}/${f.month}`;
  const tiles = h('div', 'pt-tiles', [...text].map((ch) => h('span', /\d/.test(ch) ? 'pt-tile' : 'pt-sep', ch)));
  const row = (label, ...value) => h('div', 'pt-row', h('div', 'pt-label', label), h('div', 'pt-value', ...value));
  const dot = h('span', 'fx-type-dot');
  dot.style.background = f.color;
  return [
    h('div', 'pt-top', brand('pt-brand'), h('div', 'pt-date', f.station)),
    h('div', 'pt-board', tiles, f.endClock && h('div', 'pt-until', `até ${f.endClock}`)),
    h('div', 'pt-rows',
      row('Atividade', h('span', `pt-title ${fit(f.title, [24, 44, 70])}`, f.title)),
      f.local && row('Local', f.local),
      row('Tipo', dot, f.type),
    ),
    foot(f, 'fx-foot pt-foot'),
  ];
}

// 5. A one-way ticket to election day, torn along the perforation.
function bilhete(f) {
  const field = (label, value, cls = '') => h('div', `bl-field ${cls}`, h('div', 'bl-label', label), h('div', 'bl-value', value));
  return [
    h('div', 'bl-ticket',
      h('div', 'bl-head', brand('bl-brand'), typeMark(f, 'bl-type')),
      h('div', 'bl-main',
        h('h1', `bl-title ${fit(f.title)}`, f.title),
        h('div', 'bl-fields',
          field('Dia', f.station),
          field('Horário', f.time || 'A definir'),
          f.local && field('Local', f.local, 'is-wide'),
        ),
      ),
      h('div', 'bl-perf'),
      h('div', 'bl-stub',
        h('div', 'bl-dest', h('div', 'bl-label', 'Destino'), h('div', 'bl-dest-value', f.electionDate ? `Eleição · ${f.electionDate}` : 'Eleição')),
        h('div', 'bl-stub-side', f.contact && h('div', 'bl-contact', f.contact), h('div', 'bl-slogan', FLYER_SLOGAN)),
      ),
    ),
  ];
}

// 6. A full-height rail down the left edge; every fact is a stop, the slogan is the terminal.
function trilho(f) {
  const stop = (cls, ...kids) => h('div', `tr-stop ${cls}`, h('span', 'tr-ring'), ...kids);
  return [
    h('span', 'tr-rail'),
    brand('tr-brand'),
    h('div', 'tr-stops',
      stop('is-title', typeMark(f, 'tr-type'), h('h1', `tr-title ${fit(f.title)}`, f.title)),
      stop('is-date', h('div', 'tr-date', f.station), f.time && h('div', 'tr-time', f.time)),
      f.local && stop('is-place', h('div', 'tr-place', f.local)),
      stop('is-end', h('div', 'tr-slogan', FLYER_SLOGAN), f.contact && h('div', 'tr-contact', `Fala com: ${f.contact}`)),
    ),
  ];
}

// 7. Type as the image: the date set as large as the sheet allows.
function data(f) {
  return [
    h('div', 'dt-wd', f.wdLong),
    h('div', 'dt-date', `${f.day}/${f.month}`),
    h('div', 'dt-rule'),
    f.time && h('div', 'dt-time', f.time),
    h('h1', `dt-title ${fit(f.title)}`, f.title),
    f.local && h('div', 'dt-place', f.local),
    h('div', 'dt-foot', brand('dt-brand'), h('div', 'dt-slogan', FLYER_SLOGAN)),
  ];
}

// 8. Network map: coloured lines bend at 45° into one interchange — this activity.
function rede(f) {
  const map = raw('rd-map', `
    <svg viewBox="0 0 1080 760" width="1080" height="760" aria-hidden="true">
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M-20 600 H240 L420 420" stroke="#00875A" stroke-width="18"/>
        <path d="M1100 640 H880 L700 460" stroke="#9B3894" stroke-width="18"/>
        <path d="M250 -20 V120 L440 310" stroke="#C25700" stroke-width="18"/>
        <path d="M540 -20 V330" stroke="${f.color}" stroke-width="22"/>
        <path d="M-20 250 H190 L360 420 H720 L890 250 H1100" stroke="#E4002B" stroke-width="34"/>
        <path d="M540 520 V780" stroke="${f.color}" stroke-width="22"/>
      </g>
      <g fill="#fff" stroke="#1C1C1E" stroke-width="7">
        <circle cx="190" cy="250" r="17"/><circle cx="890" cy="250" r="17"/>
        <circle cx="240" cy="600" r="14"/><circle cx="880" cy="640" r="14"/>
        <circle cx="250" cy="120" r="14"/><circle cx="540" cy="150" r="15"/>
      </g>
    </svg>`);
  return [
    h('div', 'rd-top', brand(), typeMark(f)),
    map,
    h('div', 'rd-hub', h('div', 'rd-date', f.station), f.time && h('div', 'rd-time', f.time)),
    h('div', 'rd-panel',
      h('h1', `rd-title ${fit(f.title)}`, f.title),
      f.local && h('div', 'rd-place', pin(), h('span', null, f.local)),
    ),
    foot(f, 'fx-foot rd-foot'),
  ];
}

// 9. Station wall: white tiles, a red enamel frieze with the name, an enamel info panel.
function azulejo(f) {
  return [
    h('div', 'az-top', typeMark(f, 'az-plate'), brand('az-brand')),
    h('div', 'az-frieze', h('h1', `az-title ${fit(f.title)}`, f.title)),
    h('div', 'az-panel',
      h('div', 'az-when', h('div', 'az-date', f.station), f.time && h('div', 'az-time', f.time)),
      f.local && h('div', 'az-place', pin(), h('span', null, f.local)),
      f.desc && h('p', 'az-desc', f.desc),
    ),
    foot(f, 'fx-foot az-foot'),
  ];
}

// 10. Lambe-lambe: pasted strips of wood type, the slogan run out past the edge.
function lambe(f) {
  const when = [f.station, f.start].filter(Boolean).join(' · ');
  return [
    h('div', `lb-strip lb-type ${fit(f.type, [8, 14, 22])}`, f.type),
    h('h1', `lb-strip lb-title ${fit(f.title)}`, f.title),
    h('div', 'lb-strip lb-when', when),
    f.local && h('div', 'lb-strip lb-place', f.local),
    h('div', 'lb-strip lb-run', `${FLYER_SLOGAN} ${FLYER_SLOGAN} ${FLYER_SLOGAN}`),
    h('div', 'lb-foot', brand('lb-brand'), f.contact && h('div', 'lb-contact', f.contact)),
  ];
}

export const FLYER_STYLES = [
  { id: 'placa', name: 'Placa da estação', render: placa },
  { id: 'linha', name: 'Linha até a eleição', render: linha },
  { id: 'vermelho', name: 'Vermelho total', render: vermelho },
  { id: 'partidas', name: 'Painel de partidas', render: partidas },
  { id: 'bilhete', name: 'Bilhete de ida', render: bilhete },
  { id: 'trilho', name: 'Trilho vertical', render: trilho },
  { id: 'data', name: 'Data gigante', render: data },
  { id: 'rede', name: 'Mapa da rede', render: rede },
  { id: 'azulejo', name: 'Azulejo da estação', render: azulejo },
  { id: 'lambe', name: 'Lambe-lambe', render: lambe },
];

export function renderFlyer(event, styleId = FLYER_STYLES[0].id) {
  const style = FLYER_STYLES.find((s) => s.id === styleId) || FLYER_STYLES[0];
  return h('div', `fl fl--${style.id}`, style.render(facts(event)));
}

export function flyerFilename(event, styleId) {
  const parts = [event.dateKey, slugify(event.type || ''), slugify(event.title), styleId].filter(Boolean);
  return `${parts.join('-')}.png`;
}

async function renderBlob(node) {
  if (!window.htmlToImage) throw new Error('Gerador de imagem indisponível.');
  await document.fonts.ready;
  return window.htmlToImage.toBlob(node, { width: FLYER_WIDTH, height: FLYER_HEIGHT, pixelRatio: 1 });
}

export async function downloadFlyer(node, filename) {
  const blob = await renderBlob(node);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Native share sheet with the PNG attached (phones), so it goes straight to WhatsApp.
export function canShareFiles() {
  try {
    const probe = new File([new Blob()], 'x.png', { type: 'image/png' });
    return Boolean(navigator.canShare && navigator.canShare({ files: [probe] }));
  } catch {
    return false;
  }
}

export async function shareFlyer(node, filename, title) {
  const blob = await renderBlob(node);
  const file = new File([blob], filename, { type: 'image/png' });
  await navigator.share({ files: [file], title });
}
