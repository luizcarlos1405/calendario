// Activity types ride "connection line" colours. Route red and platform yellow are reserved
// (the line itself and the next station), so they never appear here.

import { normalizeKey } from './events.js';

const LINE_COLORS = [
  '#0455A1', // azul
  '#00875A', // verde
  '#9B3894', // lilás
  '#00808A', // turquesa
  '#C25700', // laranja
  '#5E6A71', // prata
  '#7A4E2D', // marrom
  '#C2185B', // magenta
];

const assigned = new Map();

// Gives each known type its own colour (in sorted order) so types never collide.
export function assignTypeColors(types) {
  assigned.clear();
  types.forEach((type, i) => {
    if (i < LINE_COLORS.length) assigned.set(normalizeKey(type), LINE_COLORS[i]);
  });
}

// Falls back to a hash of the name for types beyond the palette size.
export function typeColor(type) {
  const key = normalizeKey(type || '');
  if (assigned.has(key)) return assigned.get(key);
  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return LINE_COLORS[hash % LINE_COLORS.length];
}

export function typeLabel(type) {
  return type || 'Atividade';
}

// Small round line bullet + type name — the one place a type is named.
export function typeTag(type) {
  const tag = document.createElement('span');
  tag.className = 'type-tag';
  const bullet = document.createElement('span');
  bullet.className = 'type-bullet';
  bullet.style.background = typeColor(type);
  tag.append(bullet, document.createTextNode(typeLabel(type)));
  return tag;
}
