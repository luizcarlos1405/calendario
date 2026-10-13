// The route line: days are stations on one red line that ends on election day.

import { dateKey, formatStationDate, formatTime, relativeDay } from './events.js';
import { typeTag } from './types.js';
import { icon } from './icons.js';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// One row per activity: departures-board time column, title, type and place.
export function renderStops(events, { selectedId, onSelect }) {
  const list = el('ul', 'stops');
  for (const ev of events) {
    const item = el('li');
    const stop = el('button', 'stop');
    stop.type = 'button';
    stop.dataset.id = ev.id;
    if (ev.id === selectedId) {
      stop.classList.add('is-selected');
      stop.setAttribute('aria-current', 'true');
    }

    const time = ev.time != null ? formatTime(ev.time) : ev.timeRaw;
    stop.append(el('span', 'stop-time', time || '—'));

    const body = el('span', 'stop-body');
    body.append(el('span', 'stop-title', ev.title));
    const sub = el('span', 'stop-sub');
    sub.append(typeTag(ev.type));
    if (ev.local) sub.append(el('span', 'stop-local', ev.local));
    body.append(sub);
    stop.append(body);

    const go = el('span', 'stop-go');
    go.innerHTML = icon('right');
    stop.append(go);

    stop.addEventListener('click', () => onSelect(ev));
    item.append(stop);
    list.append(item);
  }
  return list;
}

export function renderLine(container, { events, today, election, electionLabel, selectedId, nextId, showPast, animate, onSelect, onTogglePast }) {
  container.replaceChildren();
  const todayKey = dateKey(today);
  const electionKey = election ? dateKey(election) : null;

  const byDay = new Map();
  for (const ev of events) {
    if (!byDay.has(ev.dateKey)) byDay.set(ev.dateKey, []);
    byDay.get(ev.dateKey).push(ev);
  }

  // Today and election day are always stations, even without activities.
  const keys = new Set(byDay.keys());
  if (!electionKey || todayKey <= electionKey) keys.add(todayKey);
  if (electionKey && electionKey >= todayKey) keys.add(electionKey);
  const sorted = [...keys].sort();

  const pastKeys = sorted.filter((k) => k < todayKey);
  const visible = showPast ? sorted : sorted.filter((k) => k >= todayKey);

  if (visible.length === 0) {
    container.append(el('p', 'placeholder', 'Nenhuma atividade na linha.'));
    return;
  }

  if (pastKeys.length) {
    const toggle = el('button', 'line-more');
    toggle.type = 'button';
    toggle.id = 'past-toggle';
    toggle.setAttribute('aria-expanded', String(showPast));
    const days = `${pastKeys.length} ${pastKeys.length === 1 ? 'dia anterior' : 'dias anteriores'}`;
    toggle.innerHTML = `${icon(showPast ? 'down' : 'up')}<span>${showPast ? 'Ocultar' : 'Mostrar'} ${days}</span>`;
    toggle.addEventListener('click', onTogglePast);
    container.append(toggle);
  }

  const line = el('ol', 'line');
  if (animate) line.classList.add('is-drawing');
  const nextKey = nextId ? events.find((ev) => ev.id === nextId)?.dateKey : null;

  visible.forEach((key, i) => {
    const [y, m, d] = key.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const station = el('li', 'station');
    station.style.setProperty('--i', i);
    if (key < todayKey) station.classList.add('is-past');
    if (key === todayKey) station.classList.add('is-today');
    if (key === nextKey) station.classList.add('is-next');
    if (key === electionKey) station.classList.add('is-election');
    if (i === visible.length - 1) station.classList.add('is-terminal');

    station.append(el('span', 'station-ring'));
    const head = el('div', 'station-head');
    head.append(el('h3', 'station-day', formatStationDate(date)));
    if (key === electionKey) head.append(el('span', 'station-note is-election', electionLabel));
    else if (key === todayKey) head.append(el('span', 'station-note is-today', 'Hoje'));
    else if (key > todayKey) head.append(el('span', 'station-note', relativeDay(date, today)));
    station.append(head);

    const dayEvents = byDay.get(key);
    if (dayEvents) station.append(renderStops(dayEvents, { selectedId, onSelect }));
    else if (key === todayKey) station.append(el('p', 'station-empty', 'Nenhuma atividade hoje.'));

    line.append(station);
  });

  container.append(line);
}
