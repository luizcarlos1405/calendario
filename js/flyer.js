// Flyer (1080×1350 PNG): a station sign for one activity. Uses the global `htmlToImage`.

import { APP_NAME } from './config.js';
import { capitalize, formatTimeRange, slugify, weekdayName } from './events.js';
import { typeColor, typeLabel } from './types.js';

export const FLYER_WIDTH = 1080;
export const FLYER_HEIGHT = 1350;

// Signs off every flyer.
export const FLYER_SLOGAN = 'Bora virar voto!';

// Keeps the flyer readable in a WhatsApp thumbnail.
const MAX_DESCRIPTION = 180;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.]+$/, '')}…`;
}

function titleSize(title) {
  const n = title.length;
  if (n <= 22) return 'is-xl';
  if (n <= 40) return 'is-lg';
  if (n <= 64) return 'is-md';
  return 'is-sm';
}

export function renderFlyer(event) {
  const flyer = el('div', 'fl');

  const sign = el('div', 'fl-sign');
  const brand = el('div', 'fl-brand');
  brand.append(el('span', 'fl-brand-bullet'), el('span', null, APP_NAME));
  const type = el('div', 'fl-type');
  const bullet = el('span', 'fl-type-bullet');
  bullet.style.background = typeColor(event.type);
  type.append(bullet, el('span', null, typeLabel(event.type)));
  sign.append(brand, type);
  flyer.append(sign, el('div', 'fl-strip'));

  const body = el('div', 'fl-body');
  body.append(el('h1', `fl-title ${titleSize(event.title)}`, event.title));

  const route = el('div', 'fl-route');
  const when = el('div', 'fl-stop');
  const dd = String(event.date.getDate()).padStart(2, '0');
  const mm = String(event.date.getMonth() + 1).padStart(2, '0');
  when.append(el('span', 'fl-ring'), el('div', 'fl-date', `${capitalize(weekdayName(event.date).slice(0, 3))} ${dd}/${mm}`));
  const time = formatTimeRange(event);
  if (time) when.append(el('div', 'fl-time', time));
  route.append(when);

  if (event.local) {
    const where = el('div', 'fl-stop');
    where.append(el('span', 'fl-ring'), el('div', 'fl-place', event.local));
    route.append(where);
  } else {
    route.classList.add('is-single');
  }
  body.append(route);

  if (event.description) body.append(el('p', 'fl-desc', truncate(event.description, MAX_DESCRIPTION)));
  flyer.append(body);

  // The slogan always signs off; contact and link sit beside it when present.
  const foot = el('div', 'fl-foot');
  if (event.contact || event.link) {
    const info = el('div', 'fl-info');
    if (event.contact) info.append(el('div', 'fl-contact', `Fala com: ${event.contact}`));
    if (event.link) info.append(el('div', 'fl-link', event.link));
    foot.append(info);
    foot.classList.add('has-info');
  }
  foot.append(el('div', 'fl-slogan', FLYER_SLOGAN));
  flyer.append(foot);

  return flyer;
}

export function flyerFilename(event) {
  const parts = [event.dateKey, slugify(event.type || ''), slugify(event.title)].filter(Boolean);
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
