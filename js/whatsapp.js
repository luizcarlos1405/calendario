// Builds a WhatsApp-ready message for an event.
// WhatsApp formatting: *bold*, _italic_. Lines for empty fields are left out.

import { CITY } from './config.js';
import { formatShortDate, formatTimeRange } from './events.js';

// Closing line added to every message — change it freely (or set to '' to remove).
export const CLOSING_LINE = '✊ Bora virar voto!';

export function buildWhatsAppMessage(event) {
  const blocks = [];

  // A cancelled activity becomes a notice to the groups that were already invited:
  // the cancellation leads, and the description (what was planned) is left out.
  if (event.cancelled) {
    blocks.push(['❌ *ATIVIDADE CANCELADA*', event.cancelReason && `_Motivo: ${event.cancelReason}_`].filter(Boolean));
  }

  // The type (when there is one) and the city head every message, so it travels with its context.
  blocks.push([event.type ? `🚩 *${event.type.toUpperCase()}* · ${CITY}` : `🚩 ${CITY}`]);

  blocks.push([`*${event.title}*`]);

  const when = [`📅 *${formatShortDate(event.date)}*`];
  const time = formatTimeRange(event);
  if (time) when.push(`⏰ ${time}`);
  if (event.local) when.push(`📍 ${event.local}`);
  blocks.push(when);

  if (event.description && !event.cancelled) blocks.push([event.description]);

  const extra = [];
  if (event.contact) extra.push(`📞 Fala com: ${event.contact}`);
  if (event.link) extra.push(`🔗 ${event.link}`);
  if (extra.length) blocks.push(extra);

  if (CLOSING_LINE) blocks.push([CLOSING_LINE]);

  return blocks.map((lines) => lines.join('\n')).join('\n\n');
}

export function whatsAppShareUrl(message) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

// Renders WhatsApp markup (*bold*, _italic_) as HTML for the in-page preview.
export function previewHtml(message) {
  const escaped = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>')
    .replace(/(^|\s)_([^_\n]+)_(?=\s|$)/g, '$1<em>$2</em>')
    .replace(/\n/g, '<br>');
}
