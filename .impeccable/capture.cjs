const { chromium } = require('/home/luizcarlos1405/.local/lib/node_modules/@playwright/cli/node_modules/playwright-core');
const out = '.impeccable/review';
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/luizcarlos1405/.nix-profile/bin/chromium' });
  const log = (p, tag) => { p.on('pageerror', e => console.log(tag, 'pageerror:', e.message)); p.on('console', m => m.type() === 'error' && console.log(tag, 'console:', m.text())); };
  // Desktop
  const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true, reducedMotion: 'reduce' });
  const d = await dctx.newPage(); log(d, 'desktop');
  await d.goto('http://localhost:8765/'); await d.waitForSelector('.stop'); await d.evaluate(() => document.fonts.ready);
  await d.screenshot({ path: `${out}/desktop.png`, fullPage: true });
  await d.click('#seg-flyer'); await d.waitForTimeout(300);
  await d.screenshot({ path: `${out}/desktop-flyer-tab.png` });
  const [dl] = await Promise.all([d.waitForEvent('download'), d.click('#download-btn')]);
  await dl.saveAs(`${out}/flyer-next.png`);
  await d.click('#tab-month'); await d.waitForTimeout(200);
  await d.screenshot({ path: `${out}/desktop-month.png`, fullPage: true });
  await d.click('.day:has-text("15") >> nth=0').catch(()=>{});
  await d.click('text=Porta a porta no Centro');
  await d.click('#seg-flyer');
  const [dl2] = await Promise.all([d.waitForEvent('download'), d.click('#download-btn')]);
  await dl2.saveAs(`${out}/flyer-sparse.png`);
  // Mobile
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const m = await mctx.newPage(); log(m, 'mobile');
  await m.goto('http://localhost:8765/'); await m.waitForSelector('.stop'); await m.evaluate(() => document.fonts.ready);
  await m.screenshot({ path: `${out}/mobile.png`, fullPage: true });
  console.log('mobile scrollWidth', await m.evaluate(() => document.documentElement.scrollWidth));
  await m.click('text=Roda de conversa: como virar voto'); await m.waitForTimeout(500);
  await m.screenshot({ path: `${out}/mobile-sheet.png` });
  await m.click('#seg-flyer'); await m.waitForTimeout(300);
  await m.screenshot({ path: `${out}/mobile-sheet-flyer.png` });
  await m.keyboard.press('Escape');
  await m.click('#tab-month'); await m.waitForTimeout(200);
  await m.screenshot({ path: `${out}/mobile-month.png`, fullPage: true });
  await browser.close();
})();
