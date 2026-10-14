// Turns raw CSV records into normalized event objects and formats dates/times in pt-BR.

// Spreadsheet headers, matched without accents, case or spacing ("Horário de término" → horario_de_termino).
// The official headers are the first of each list; the rest are accepted variations
// (older sheets used the English names).
const COLUMN_ALIASES = {
  title: ['titulo', 'nome', 'atividade', 'title'],
  description: ['descricao', 'detalhes', 'description'],
  type: ['tipo', 'categoria', 'type'],
  day: ['dia', 'data', 'day', 'date'],
  time: ['horario', 'hora', 'inicio', 'horario_de_inicio', 'hora_de_inicio', 'time', 'start_time'],
  endTime: ['termino', 'fim', 'horario_de_termino', 'hora_de_termino', 'horario_final', 'horario_fim', 'hora_fim', 'end_time'],
  local: ['local', 'lugar', 'endereco', 'location'],
  contact: ['contato', 'responsavel', 'contact'],
  link: ['link', 'url', 'site'],
  visible: ['visivel', 'mostrar', 'publicar', 'visible'],
};

const WEEKDAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

export function normalizeKey(key) {
  return key
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, '_');
}

function buildColumnMap(headers) {
  const map = {};
  for (const header of headers) {
    const key = normalizeKey(header);
    for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
      if (!map[field] && aliases.includes(key)) map[field] = header;
    }
  }
  return map;
}

// Accepts "17/10/2026", "17/10/26", "17/10" (current year) and "2026-10-17".
export function parseDay(value, fallbackYear = new Date().getFullYear()) {
  const v = value.trim();
  let y, m, d;

  let match = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) {
    [, y, m, d] = match.map(Number);
  } else if ((match = v.match(/^(\d{1,2})[/.-](\d{1,2})(?:[/.-](\d{2,4}))?$/))) {
    d = Number(match[1]);
    m = Number(match[2]);
    y = match[3] ? Number(match[3]) : fallbackYear;
    if (y < 100) y += 2000;
  } else {
    return null;
  }

  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

// Accepts "9h", "9h30", "09:00", "9:30", "9". Returns minutes since midnight or null.
export function parseTime(value) {
  const match = value.trim().toLowerCase().match(/^(\d{1,2})\s*(?:[h:]\s*(\d{2})?)?\s*(?:min)?$/);
  if (!match) return null;
  const h = Number(match[1]);
  const min = match[2] ? Number(match[2]) : 0;
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

export function formatTime(minutes) {
  if (minutes == null) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`;
}

// "9h às 12h", "9h" or the raw text if it couldn't be parsed.
export function formatTimeRange(event) {
  const start = event.time != null ? formatTime(event.time) : event.timeRaw;
  const end = event.endTime != null ? formatTime(event.endTime) : event.endTimeRaw;
  if (start && end) return `${start} às ${end}`;
  return start || '';
}

export const weekdayName = (date) => WEEKDAYS[date.getDay()];
export const monthName = (monthIndex) => MONTHS[monthIndex];
export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// "Sábado, 17/10"
export function formatShortDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${capitalize(weekdayName(date))}, ${dd}/${mm}`;
}

// "Sábado, 17 de outubro"
export function formatLongDate(date) {
  return `${capitalize(weekdayName(date))}, ${date.getDate()} de ${monthName(date.getMonth())}`;
}

// "Qua 14/10" — the station label used on the line.
export function formatStationDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${capitalize(weekdayName(date).slice(0, 3))} ${dd}/${mm}`;
}

// Whole calendar days from `from` to `to` (both treated as local dates).
export function daysBetween(from, to) {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / 86400000);
}

// "hoje", "amanhã", "em 3 dias", "há 2 dias"
export function relativeDay(date, today = new Date()) {
  const diff = daysBetween(today, date);
  if (diff === 0) return 'hoje';
  if (diff === 1) return 'amanhã';
  if (diff === -1) return 'ontem';
  return diff > 0 ? `em ${diff} dias` : `há ${-diff} dias`;
}

export function dateKey(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${mm}-${dd}`;
}

export function slugify(text) {
  return normalizeKey(text)
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

// "Visível" is a checkbox column in the spreadsheet (exported as TRUE/FALSE). Only an explicit
// "no" hides a row: an empty cell, or a sheet without the column, keeps everything visible.
const HIDDEN_VALUES = new Set(['false', 'falso', 'nao', 'n', 'no', '0', 'off']);

export function isHidden(value) {
  return HIDDEN_VALUES.has(normalizeKey(value || ''));
}

// Returns { events, invalid } — invalid rows are those missing a title or a parseable day.
// Rows marked as not visible are skipped silently (they are drafts, not errors).
export function buildEvents(headers, records) {
  const col = buildColumnMap(headers);
  const get = (record, field) => (col[field] ? record[col[field]] || '' : '');
  const events = [];
  const invalid = [];

  records.forEach((record, index) => {
    if (isHidden(get(record, 'visible'))) return;

    const title = get(record, 'title');
    const dayRaw = get(record, 'day');
    const date = parseDay(dayRaw);
    const line = index + 2; // header is line 1

    if (!title || !date) {
      invalid.push({ line, title: title || '(sem título)', day: dayRaw || '(vazio)' });
      return;
    }

    const timeRaw = get(record, 'time');
    const endTimeRaw = get(record, 'endTime');

    events.push({
      id: `ev-${line}`,
      title,
      description: get(record, 'description'),
      type: get(record, 'type'),
      date,
      dateKey: dateKey(date),
      timeRaw,
      time: timeRaw ? parseTime(timeRaw) : null,
      endTimeRaw,
      endTime: endTimeRaw ? parseTime(endTimeRaw) : null,
      local: get(record, 'local'),
      contact: get(record, 'contact'),
      link: get(record, 'link'),
    });
  });

  events.sort((a, b) => a.date - b.date || (a.time ?? -1) - (b.time ?? -1));
  return { events, invalid };
}
