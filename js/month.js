// Month grid: a station map of the month. Picking a day lists its activities below.

import { capitalize, dateKey, formatLongDate, formatTime, monthName } from './events.js';
import { typeColor } from './types.js';
import { icon } from './icons.js';
import { renderStops } from './line.js';

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

export function renderMonth(container, { year, month, events, today, election, electionLabel, selectedDay, selectedId, nextId, onPrev, onNext, onDay, onSelect }) {
  container.replaceChildren();
  const todayKey = dateKey(today);
  const electionKey = election ? dateKey(election) : null;

  const byDay = new Map();
  for (const ev of events) {
    if (!byDay.has(ev.dateKey)) byDay.set(ev.dateKey, []);
    byDay.get(ev.dateKey).push(ev);
  }

  const head = el('div', 'month-head');
  const prev = el('button', 'icon-btn');
  prev.type = 'button';
  prev.setAttribute('aria-label', 'Mês anterior');
  prev.innerHTML = icon('left');
  prev.addEventListener('click', onPrev);
  const next = el('button', 'icon-btn');
  next.type = 'button';
  next.setAttribute('aria-label', 'Próximo mês');
  next.innerHTML = icon('right');
  next.addEventListener('click', onNext);
  head.append(prev, el('h3', 'month-title', `${capitalize(monthName(month))} ${year}`), next);
  container.append(head);

  const grid = el('div', 'month-grid');
  grid.setAttribute('role', 'grid');
  for (const label of WEEKDAYS) grid.append(el('span', 'month-weekday', label));

  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday first
  const total = Math.ceil((offset + new Date(year, month + 1, 0).getDate()) / 7) * 7;

  for (let i = 0; i < total; i++) {
    const date = new Date(year, month, 1 - offset + i);
    const key = dateKey(date);
    const dayEvents = byDay.get(key) || [];
    const cell = el('button', 'day');
    cell.type = 'button';
    if (date.getMonth() !== month) cell.classList.add('is-outside');
    if (key < todayKey) cell.classList.add('is-past');
    if (key === todayKey) cell.classList.add('is-today');
    if (key === electionKey) cell.classList.add('is-election');
    if (key === selectedDay) cell.classList.add('is-selected');
    if (dayEvents.length) cell.classList.add('has-events');
    cell.setAttribute('aria-pressed', String(key === selectedDay));
    const cancelled = dayEvents.filter((ev) => ev.cancelled).length;
    const count = dayEvents.length ? `${dayEvents.length} atividade(s)${cancelled ? `, ${cancelled} cancelada(s)` : ''}` : 'sem atividades';
    cell.setAttribute('aria-label', `${formatLongDate(date)}: ${count}`);

    cell.append(el('span', 'day-num', String(date.getDate())));
    if (key === electionKey) cell.append(el('span', 'day-election', 'Eleição'));

    if (dayEvents.length) {
      const dots = el('span', 'day-dots');
      const rows = el('span', 'day-rows');
      for (const ev of dayEvents) {
        // Cancelled activities keep their line colour as a hollow bullet.
        const dot = el('span', `type-bullet${ev.cancelled ? ' is-cancelled' : ''}`);
        dot.style.color = typeColor(ev.type);
        if (ev.id === nextId) dot.classList.add('is-next');
        dots.append(dot);

        const row = el('span', `day-row${ev.cancelled ? ' is-cancelled' : ''}`);
        const bullet = el('span', `type-bullet${ev.cancelled ? ' is-cancelled' : ''}`);
        bullet.style.color = typeColor(ev.type);
        const time = ev.time != null ? formatTime(ev.time) : ev.timeRaw;
        row.append(bullet, el('span', 'day-row-time', time || ''), el('span', 'day-row-title', ev.title));
        rows.append(row);
      }
      cell.append(dots, rows);
    }

    cell.addEventListener('click', () => onDay(key, dayEvents));
    grid.append(cell);
  }
  container.append(grid);

  // The chosen day's activities, as stops.
  const detail = el('section', 'day-detail');
  if (selectedDay) {
    const [y, m, d] = selectedDay.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const title = el('h3', 'day-detail-title', formatLongDate(date));
    if (selectedDay === electionKey) title.append(el('span', 'station-note is-election', electionLabel));
    detail.append(title);
    const dayEvents = byDay.get(selectedDay);
    if (dayEvents) detail.append(renderStops(dayEvents, { selectedId, onSelect }));
    else detail.append(el('p', 'station-empty', 'Nenhuma atividade neste dia.'));
  }
  container.append(detail);
}
