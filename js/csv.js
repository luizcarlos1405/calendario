// Minimal RFC 4180 CSV parser.
// Handles quoted fields (commas, line breaks, "" escapes), a UTF-8 BOM,
// and auto-detects "," or ";" (pt-BR spreadsheet exports use ";").

function detectDelimiter(text) {
  const firstLine = text.split(/\r?\n/, 1)[0] || '';
  const commas = (firstLine.match(/,/g) || []).length;
  const semicolons = (firstLine.match(/;/g) || []).length;
  return semicolons > commas ? ';' : ',';
}

function parseRows(text, delimiter) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === delimiter) {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }

  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

// Excel in Portuguese often saves CSV as Windows-1252 ("CSV separado por vírgulas") instead of UTF-8.
// Try strict UTF-8 first and fall back so accents survive either way.
export function decodeCSV(buffer) {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(buffer);
  } catch {
    return new TextDecoder('windows-1252').decode(buffer);
  }
}

// Returns { headers: string[], records: object[] } with each record keyed by header.
export function parseCSV(text) {
  const clean = text.replace(/^﻿/, '');
  const rows = parseRows(clean, detectDelimiter(clean));
  if (rows.length === 0) return { headers: [], records: [] };

  const headers = rows[0].map((h) => h.trim());
  const records = rows.slice(1).map((cells) => {
    const record = {};
    headers.forEach((h, i) => {
      record[h] = (cells[i] ?? '').trim();
    });
    return record;
  });

  return { headers, records };
}
