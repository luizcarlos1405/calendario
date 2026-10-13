import { APP_NAME, CITY, CSV_URL, ELECTION_DATE, ELECTION_LABEL } from './config.js';
import { decodeCSV, parseCSV } from './csv.js';
import { buildEvents, dateKey, daysBetween, formatLongDate, formatStationDate, formatTimeRange, parseDay, relativeDay } from './events.js';
import { assignTypeColors, typeColor, typeTag } from './types.js';
import { buildWhatsAppMessage, previewHtml, whatsAppShareUrl } from './whatsapp.js';
import { FLYER_STYLES, FLYER_WIDTH, canShareFiles, downloadFlyer, flyerFilename, renderFlyer, shareFlyer } from './flyer.js';
import { renderLine } from './line.js';
import { renderMonth } from './month.js';
import { brandMark, icon } from './icons.js';

const desktop = window.matchMedia('(min-width: 960px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const today = new Date();
const election = parseDay(ELECTION_DATE);

const state = {
  events: [],
  view: 'line',
  activeTypes: new Set(), // empty = all types
  selectedId: null,
  nextId: null,
  showPast: false,
  year: today.getFullYear(),
  month: today.getMonth(),
  selectedDay: dateKey(today),
  drawn: false,
};

const $ = (id) => document.getElementById(id);
const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// ---------- Data ----------

function eventTypes() {
  return [...new Set(state.events.map((ev) => ev.type).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

function visibleEvents() {
  return state.events.filter((ev) => state.activeTypes.size === 0 || state.activeTypes.has(ev.type));
}

function findEvent(id) {
  return state.events.find((ev) => ev.id === id) || null;
}

// The next activity still ahead (today's count until an hour after they start).
function findNext(events) {
  const todayKey = dateKey(today);
  const nowMinutes = today.getHours() * 60 + today.getMinutes();
  return events.find((ev) => ev.dateKey > todayKey || (ev.dateKey === todayKey && (ev.time == null || ev.time + 60 >= nowMinutes))) || null;
}

async function load() {
  try {
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { headers, records } = parseCSV(decodeCSV(await res.arrayBuffer()));
    const { events, invalid } = buildEvents(headers, records);
    state.events = events;
    assignTypeColors(eventTypes());
    showInvalid(invalid);
  } catch (err) {
    console.error(err);
    showNotice(`<strong>Não foi possível carregar a agenda.</strong> Confira a conexão e recarregue a página. Se o problema continuar, avise quem cuida da planilha (<code>${escapeHtml(CSV_URL)}</code>).`, 'error');
  }

  const next = findNext(state.events);
  state.nextId = next?.id ?? null;
  if (next) {
    state.year = next.date.getFullYear();
    state.month = next.date.getMonth();
    state.selectedDay = next.dateKey;
  }
  if (desktop.matches && next) state.selectedId = next.id;

  renderFilters();
  renderAll();
  renderBench();
}

function showNotice(html, kind = 'warning') {
  const notice = $('notice');
  notice.innerHTML = `${icon('alert')}<div>${html}</div>`;
  notice.dataset.kind = kind;
  notice.hidden = false;
}

function showInvalid(invalid) {
  if (!invalid.length) return;
  const items = invalid.map((r) => `<li>Linha ${r.line}: “${escapeHtml(r.title)}”, dia “${escapeHtml(r.day)}”</li>`).join('');
  showNotice(`<strong>${invalid.length === 1 ? '1 linha da planilha ficou de fora' : `${invalid.length} linhas da planilha ficaram de fora`}</strong> por falta de título ou data inválida. Use datas como 17/10/2026.<ul>${items}</ul>`);
}

// ---------- Shell ----------

function renderCountdown() {
  const node = $('countdown');
  if (!election) return;
  const days = daysBetween(today, election);
  if (days < 0) {
    node.hidden = true;
    return;
  }
  node.innerHTML = days === 0
    ? '<strong>É hoje</strong><span>dia de eleição</span>'
    : `<strong>${days} ${days === 1 ? 'dia' : 'dias'}</strong><span>até a eleição</span>`;
  node.hidden = false;
}

function renderNext() {
  const section = $('next');
  const ev = findEvent(state.nextId);
  if (!ev) {
    section.hidden = true;
    return;
  }
  section.replaceChildren();

  // Yellow plate = the next station; it carries the time, nothing else.
  const head = document.createElement('div');
  head.className = 'next-head';
  const time = formatTimeRange(ev);
  const when = [relativeDay(ev.date, today), formatStationDate(ev.date)].join(' · ');
  head.innerHTML = time
    ? `<span class="next-time">${escapeHtml(time)}</span><span class="next-when">${escapeHtml(when)}</span>`
    : `<span class="next-time">${escapeHtml(formatStationDate(ev.date))}</span><span class="next-when">${escapeHtml(relativeDay(ev.date, today))}</span>`;

  const title = document.createElement('h2');
  title.className = 'next-title';
  const open = document.createElement('button');
  open.type = 'button';
  open.textContent = ev.title;
  open.addEventListener('click', () => select(ev, { tab: 'message', trigger: open }));
  title.append(open);

  const sub = document.createElement('p');
  sub.className = 'next-sub';
  sub.append(typeTag(ev.type));
  if (ev.local) sub.append(document.createTextNode(ev.local));

  const actions = document.createElement('div');
  actions.className = 'actions';
  const wa = document.createElement('a');
  wa.className = 'btn btn-route';
  wa.href = whatsAppShareUrl(buildWhatsAppMessage(ev));
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.innerHTML = `${icon('message')}<span>Enviar no WhatsApp</span>`;
  const flyer = document.createElement('button');
  flyer.type = 'button';
  flyer.className = 'btn btn-line';
  flyer.innerHTML = `${icon('image')}<span>Panfleto</span>`;
  flyer.addEventListener('click', () => select(ev, { tab: 'flyer', trigger: flyer }));
  actions.append(wa, flyer);

  section.append(head, title, sub, actions);
  section.hidden = false;
}

function renderFilters() {
  const container = $('filters');
  container.replaceChildren();
  const types = eventTypes();
  if (types.length < 2) return;

  const chip = (label, active, onClick, color) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.setAttribute('aria-pressed', String(active));
    if (color) {
      const dot = document.createElement('span');
      dot.className = 'type-bullet';
      dot.style.background = color;
      b.append(dot);
    }
    b.append(document.createTextNode(label));
    b.addEventListener('click', onClick);
    return b;
  };

  container.append(chip('Todos', state.activeTypes.size === 0, () => {
    state.activeTypes.clear();
    renderFilters();
    renderView();
  }));
  for (const type of types) {
    container.append(chip(type, state.activeTypes.has(type), () => {
      if (state.activeTypes.has(type)) state.activeTypes.delete(type);
      else state.activeTypes.add(type);
      renderFilters();
      renderView();
    }, typeColor(type)));
  }
}

function renderTabs() {
  document.querySelectorAll('.view-tabs [role=tab]').forEach((tab) => {
    const active = tab.dataset.view === state.view;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  $('view').setAttribute('aria-labelledby', state.view === 'line' ? 'tab-line' : 'tab-month');
}

function renderView() {
  const container = $('view');
  const common = {
    events: visibleEvents(),
    today,
    election,
    electionLabel: ELECTION_LABEL,
    selectedId: state.selectedId,
    nextId: state.nextId,
    onSelect: (ev) => select(ev, { trigger: document.activeElement }),
  };

  if (state.view === 'line') {
    renderLine(container, {
      ...common,
      showPast: state.showPast,
      animate: !state.drawn && !reducedMotion.matches,
      onTogglePast: () => {
        state.showPast = !state.showPast;
        renderView();
        // The button is re-rendered; keep keyboard focus on it.
        document.getElementById('past-toggle')?.focus({ preventScroll: true });
      },
    });
    state.drawn = true;
  } else {
    renderMonth(container, {
      ...common,
      year: state.year,
      month: state.month,
      selectedDay: state.selectedDay,
      onPrev: () => shiftMonth(-1),
      onNext: () => shiftMonth(1),
      onDay: (key, dayEvents) => {
        state.selectedDay = key;
        if (desktop.matches && dayEvents.length) state.selectedId = dayEvents[0].id;
        renderView();
        renderBench();
      },
    });
  }
}

function renderAll() {
  renderCountdown();
  renderNext();
  renderTabs();
  renderView();
}

function shiftMonth(delta) {
  const d = new Date(state.year, state.month + delta, 1);
  state.year = d.getFullYear();
  state.month = d.getMonth();
  renderView();
}

// ---------- Share bench ----------

let activePanel = 'message';
let returnFocus = null;

function select(ev, { tab, trigger } = {}) {
  state.selectedId = ev.id;
  if (tab) activePanel = tab;
  renderView();
  renderBench();
  if (!desktop.matches) openSheet(trigger);
}

function fact(iconName, content, label) {
  const row = document.createElement('div');
  row.className = 'fact';
  const dt = document.createElement('dt');
  dt.innerHTML = `${icon(iconName)}<span class="sr-only">${label}</span>`;
  const dd = document.createElement('dd');
  if (typeof content === 'string') dd.textContent = content;
  else dd.append(content);
  row.append(dt, dd);
  return row;
}

function renderBench() {
  const ev = findEvent(state.selectedId);
  $('bench-empty').hidden = Boolean(ev);
  $('bench-body').hidden = !ev;
  if (!ev) return;

  $('bench-title').textContent = ev.title;

  const facts = $('bench-facts');
  facts.replaceChildren(typeTagFact(ev));
  facts.append(fact('calendar', formatLongDate(ev.date), 'Dia'));
  const time = formatTimeRange(ev);
  if (time) facts.append(fact('clock', time, 'Horário'));
  if (ev.local) facts.append(fact('pin', ev.local, 'Local'));
  if (ev.contact) facts.append(fact('user', ev.contact, 'Contato'));
  if (ev.link) {
    const a = document.createElement('a');
    a.href = ev.link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = ev.link.replace(/^https?:\/\//, '');
    facts.append(fact('link', a, 'Link'));
  }
  if (ev.description) {
    const p = document.createElement('p');
    p.className = 'bench-desc';
    p.textContent = ev.description;
    const row = document.createElement('div');
    row.className = 'fact is-desc';
    const dd = document.createElement('dd');
    dd.append(p);
    row.append(dd);
    facts.append(row);
  }

  const message = buildWhatsAppMessage(ev);
  $('bubble').innerHTML = previewHtml(message);
  $('wa-link').href = whatsAppShareUrl(message);

  renderFlyerPreview(ev);
  showPanel(activePanel);
}

// ---------- Flyer style picker ----------

const STYLE_KEY = 'agenda.flyerStyle';
let flyerStyle = FLYER_STYLES[0].id;
try {
  const saved = localStorage.getItem(STYLE_KEY);
  if (FLYER_STYLES.some((s) => s.id === saved)) flyerStyle = saved;
} catch {
  // Storage unavailable (private mode): the default style is fine.
}

function renderFlyerPreview(ev = findEvent(state.selectedId)) {
  if (!ev) return;
  $('flyer-scaler').replaceChildren(renderFlyer(ev, flyerStyle));
  const index = FLYER_STYLES.findIndex((s) => s.id === flyerStyle);
  $('style-select').value = flyerStyle;
  $('style-count').textContent = `${index + 1}/${FLYER_STYLES.length}`;
}

function setFlyerStyle(id) {
  flyerStyle = id;
  try {
    localStorage.setItem(STYLE_KEY, id);
  } catch {
    // Not remembered; still applied for this visit.
  }
  renderFlyerPreview();
}

function stepFlyerStyle(delta) {
  const index = FLYER_STYLES.findIndex((s) => s.id === flyerStyle);
  setFlyerStyle(FLYER_STYLES[(index + delta + FLYER_STYLES.length) % FLYER_STYLES.length].id);
}

for (const style of FLYER_STYLES) {
  const option = document.createElement('option');
  option.value = style.id;
  option.textContent = style.name;
  $('style-select').append(option);
}
$('style-select').addEventListener('change', (e) => setFlyerStyle(e.target.value));
$('style-prev').innerHTML = icon('left');
$('style-next').innerHTML = icon('right');
$('style-prev').addEventListener('click', () => stepFlyerStyle(-1));
$('style-next').addEventListener('click', () => stepFlyerStyle(1));

function typeTagFact(ev) {
  const row = document.createElement('div');
  row.className = 'fact is-type';
  const dt = document.createElement('dt');
  dt.className = 'sr-only';
  dt.textContent = 'Tipo';
  const dd = document.createElement('dd');
  dd.append(typeTag(ev.type));
  row.append(dt, dd);
  return row;
}

function showPanel(name) {
  activePanel = name;
  document.querySelectorAll('.seg [role=tab]').forEach((tab) => {
    const active = tab.dataset.panel === name;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  $('panel-message').hidden = name !== 'message';
  $('panel-flyer').hidden = name !== 'flyer';
  if (name === 'flyer') requestAnimationFrame(scaleFlyer);
}

function scaleFlyer() {
  const frame = $('flyer-frame');
  if (!frame.clientWidth) return;
  $('flyer-scaler').style.transform = `scale(${frame.clientWidth / FLYER_WIDTH})`;
}

function openSheet(trigger) {
  returnFocus = trigger instanceof HTMLElement ? trigger : null;
  $('sheet-backdrop').hidden = false;
  document.body.classList.add('sheet-open');
  requestAnimationFrame(() => {
    $('bench').classList.add('is-open');
    $('bench').focus({ preventScroll: true });
    scaleFlyer();
  });
}

function closeSheet() {
  if (!$('bench').classList.contains('is-open')) return;
  $('bench').classList.remove('is-open');
  document.body.classList.remove('sheet-open');
  $('sheet-backdrop').hidden = true;
  const target = returnFocus && document.contains(returnFocus) ? returnFocus : document.querySelector(`.stop[data-id="${state.selectedId}"]`);
  target?.focus({ preventScroll: true });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.append(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
}

function setButton(button, iconName, label) {
  button.innerHTML = `${icon(iconName)}<span>${label}</span>`;
}

function flash(button, iconName, label, restore) {
  setButton(button, iconName, label);
  button.classList.add('is-done');
  clearTimeout(button._timer);
  button._timer = setTimeout(() => {
    button.classList.remove('is-done');
    restore();
  }, 2000);
}

// ---------- Wiring ----------

function wireTabs(selector, onPick) {
  const tabs = [...document.querySelectorAll(selector)];
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => onPick(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      onPick(next);
    });
  });
}

$('app-name').textContent = APP_NAME;
$('app-city').textContent = CITY;
$('brand-mark').innerHTML = brandMark();
document.title = `${APP_NAME} · ${CITY}`;

wireTabs('.view-tabs [role=tab]', (tab) => {
  state.view = tab.dataset.view;
  renderTabs();
  renderView();
});
wireTabs('.seg [role=tab]', (tab) => showPanel(tab.dataset.panel));

const resetWa = () => setButton($('wa-link'), 'message', 'Enviar no WhatsApp');
const resetCopy = () => setButton($('copy-btn'), 'copy', 'Copiar texto');
const resetShare = () => setButton($('share-btn'), 'share', 'Compartilhar imagem');
const resetDownload = () => setButton($('download-btn'), 'download', 'Baixar PNG');
resetWa();
resetCopy();
resetShare();
resetDownload();
$('bench-close').innerHTML = icon('close');
$('share-btn').hidden = !canShareFiles();
if (!$('share-btn').hidden) $('download-btn').classList.replace('btn-line', 'btn-quiet');

$('copy-btn').addEventListener('click', async () => {
  const ev = findEvent(state.selectedId);
  if (!ev) return;
  await copyText(buildWhatsAppMessage(ev));
  flash($('copy-btn'), 'check', 'Copiado', resetCopy);
});

async function withFlyer(button, busyLabel, action, doneLabel, reset) {
  const ev = findEvent(state.selectedId);
  const node = $('flyer-scaler').firstElementChild;
  if (!ev || !node) return;
  button.disabled = true;
  setButton(button, 'image', busyLabel);
  try {
    await action(node, ev);
    flash(button, 'check', doneLabel, reset);
  } catch (err) {
    if (err?.name === 'AbortError') {
      reset();
    } else {
      console.error(err);
      flash(button, 'alert', 'Não deu certo, tente de novo', reset);
    }
  } finally {
    button.disabled = false;
  }
}

$('download-btn').addEventListener('click', () =>
  withFlyer($('download-btn'), 'Gerando imagem…', (node, ev) => downloadFlyer(node, flyerFilename(ev, flyerStyle)), 'Imagem baixada', resetDownload));

$('share-btn').addEventListener('click', () =>
  withFlyer($('share-btn'), 'Gerando imagem…', (node, ev) => shareFlyer(node, flyerFilename(ev, flyerStyle), ev.title), 'Compartilhado', resetShare));

$('bench-close').addEventListener('click', closeSheet);
$('sheet-backdrop').addEventListener('click', closeSheet);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSheet();
});

desktop.addEventListener('change', () => {
  if (desktop.matches) {
    closeSheet();
    if (!state.selectedId && state.nextId) {
      state.selectedId = state.nextId;
      renderView();
      renderBench();
    }
  }
  scaleFlyer();
});
new ResizeObserver(scaleFlyer).observe($('flyer-frame'));

if (location.protocol !== 'file:') load();
