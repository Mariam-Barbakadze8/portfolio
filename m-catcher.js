/* M Catcher: the logo catches falling pixel buttons (portrait). Add <script src="m-catcher/m-catcher.js"></script> at the end of <body>. */
(() => {
  'use strict';

  // Swap for a path to your own file if you like, e.g. './pictures/M%20logo.png'
  const LOGO_SRC = 'data:image/png;base64,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';

  const root = document.getElementById('mcatch');
  if (!root) return;
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  /* ---------------- Tunables ---------------- */
  const W = 360;            // logical width (portrait)
  const H = 520;            // logical height
  const FLOOR = 26;         // floor strip height
  const PW = 84;            // catcher (logo) width
  const LIVES = 3;
  const S = 4;              // pixel size of the button art
  const FONT = '"Press Start 2P", ui-monospace, Menlo, Consolas, monospace';
  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Pixel button art ---------------- */
  // X = rim, L = face, W = highlight, H = thread holes
  const BUTTON_4 = [
    '..XXXXXX..',
    '.XXLLLLXX.',
    'XXWWLLLLXX',
    'XLWHLLHLLX',
    'XLLLLLLLLX',
    'XLLLLLLLLX',
    'XLLHLLHLLX',
    'XXLLLLLLXX',
    '.XXLLLLXX.',
    '..XXXXXX..'
  ];
  const BUTTON_2 = [
    '..XXXXXX..',
    '.XXLLLLXX.',
    'XXWWLLLLXX',
    'XLWLLLLLLX',
    'XLLHLLHLLX',
    'XLLHLLHLLX',
    'XLLLLLLLLX',
    'XXLLLLLLXX',
    '.XXLLLLXX.',
    '..XXXXXX..'
  ];
  function compile(rows) {
    const rects = [];
    rows.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const c = row[x];
        if (c === '.') { x++; continue; }
        let x2 = x;
        while (x2 < row.length && row[x2] === c) x2++;
        rects.push({ x, y, w: x2 - x, c });
        x = x2;
      }
    });
    return rects;
  }
  const SPRITES = [compile(BUTTON_4), compile(BUTTON_2)];
  const BTN = 10 * S;       // button size in px
  const HOLE = '#3A1F33';
  const PALETTES = [
    { X: '#B89B72', L: '#E8D5B5', W: '#FBF1DE' },   // beige
    { X: '#A8845A', L: '#D4B896', W: '#F0DFC4' },   // sand
    { X: '#3F7FBF', L: '#6FB1F0', W: '#BFE0FF' },   // sky blue
    { X: '#1F4E8C', L: '#3C7BD0', W: '#8DB8F2' },   // denim blue
    { X: '#6F9FC4', L: '#A9CDE8', W: '#E0F0FB' }    // powder blue
  ];
  const GOLD = { X: '#8FA8C8', L: '#F4F8FF', W: '#FFFFFF' };   // rare pearl bonus button

  function drawButton(b, sx) {
    const pal = b.gold ? GOLD : PALETTES[b.kind];
    const left = b.x - (BTN / 2) * sx, top = Math.round(b.y - BTN / 2);
    for (const r of SPRITES[b.variant]) {
      ctx.fillStyle = r.c === 'H' ? HOLE : pal[r.c];
      const x1 = Math.round(left + r.x * S * sx);
      const x2 = Math.round(left + (r.x + r.w) * S * sx);
      ctx.fillRect(x1, top + r.y * S, Math.max(1, x2 - x1), S);
    }
  }

  /* ---------------- Logo ---------------- */
  const logo = new Image();
  let PH = Math.round(PW * 116 / 140);
  logo.onload = () => { PH = Math.round(PW * logo.naturalHeight / logo.naturalWidth); };
  logo.src = LOGO_SRC;

  /* ---------------- Sizing ---------------- */
  let scale = 1, sized = false;
  function resize() {
    const cw = root.clientWidth;
    if (!cw) return;                       // hidden panel
    scale = cw / W;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.height = (H * scale) + 'px';
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(H * scale * dpr);
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    if (!sized) { px = tx = W / 2; sized = true; }
  }

  /* ---------------- Sound toggle (speaker icon, off by default) ---------------- */
  const ICON_ON  = '<svg class="mcatch__ico mcatch__ico--on" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const ICON_OFF = '<svg class="mcatch__ico mcatch__ico--off" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="m16 9 5 6"/><path d="m21 9-5 6"/></svg>';
  const soundBtn = document.createElement('button');
  soundBtn.type = 'button';
  soundBtn.className = 'mcatch__sound';
  soundBtn.setAttribute('aria-pressed', 'false');
  soundBtn.setAttribute('aria-label', 'Turn sound on');
  soundBtn.innerHTML = ICON_ON + ICON_OFF;
  root.appendChild(soundBtn);

  let ac = null, muted = true;
  function beep(f1, f2, dur, type = 'square', vol = 0.035, delay = 0) {
    if (muted || !ac) return;
    const t0 = ac.currentTime + delay, o = ac.createOscillator(), g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f1, t0);
    o.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(t0); o.stop(t0 + dur);
  }
  soundBtn.addEventListener('click', () => {
    muted = !muted;
    if (!muted) {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      ac.resume();
      beep(600, 900, 0.08);
    }
    soundBtn.classList.toggle('is-on', !muted);
    soundBtn.setAttribute('aria-pressed', String(!muted));
    soundBtn.setAttribute('aria-label', muted ? 'Turn sound on' : 'Turn sound off');
    root.focus({ preventScroll: true });
  });

  /* ---------------- State ---------------- */
  let state = 'idle';                       // idle | running | paused | over
  let t = 0, score = 0, hi = 0, lives = LIVES, streak = 0, caught = 0;
  let spawnT = 0.8, pulse = 0, shake = 0, overAt = 0, newBest = false;
  let px = 180, tx = 180, vx = 0, keyDir = 0, usePointer = false;
  let buttons = [], particles = [], floaters = [];
  try { hi = parseInt(localStorage.getItem('mcatch-hi') || '0', 10) || 0; } catch (e) {}

  // Background: pixel-banded gradient + twinkling stars
  const BANDS = (() => {
    const a = [25, 11, 21], b = [58, 26, 46], n = 9;
    return Array.from({ length: n }, (_, i) => {
      const k = i / (n - 1);
      return `rgb(${a.map((v, j) => Math.round(v + (b[j] - v) * k)).join(',')})`;
    });
  })();
  const stars = Array.from({ length: 34 }, () => ({
    x: Math.random() * W, y: 8 + Math.random() * (H - FLOOR - 70), ph: Math.random() * 6, big: Math.random() < 0.2
  }));

  function startGame() {
    score = 0; lives = LIVES; streak = 0; caught = 0;
    buttons = []; particles = []; floaters = [];
    spawnT = 0.8; pulse = 0; shake = 0; newBest = false;
    state = 'running';
  }

  function die() {
    state = 'over'; overAt = t;
    if (score > hi) {
      hi = score; newBest = true;
      try { localStorage.setItem('mcatch-hi', String(hi)); } catch (e) {}
    }
    beep(380, 70, 0.5, 'sawtooth', 0.05);
  }

  /* ---------------- Spawning ---------------- */
  function level() { return 1 + Math.floor(caught / 10); }

  function spawn() {
    const lv = level();
    const gold = Math.random() < 0.07;
    let vy = Math.min(460, 150 + lv * 22 + Math.random() * 40);
    if (gold) vy *= 1.3;
    const x0 = 30 + Math.random() * (W - 60);
    buttons.push({
      x: x0, x0, y: -BTN, vy, gold,
      kind: (Math.random() * PALETTES.length) | 0,
      variant: Math.random() < 0.5 ? 0 : 1,
      ph: Math.random() * 6, amp: 4 + Math.random() * 10,
      a: Math.random() * 6, spin: 3 + Math.random() * 3
    });
    spawnT = Math.max(0.3, 0.95 - lv * 0.06) + Math.random() * 0.35;
  }

  function burst(x, y, color, n, up) {
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2, sp = 60 + Math.random() * 140;
      particles.push({ x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp * (up ? 1 : 0.5) - (up ? 60 : 20), life: 0.5 + Math.random() * 0.3, c: color });
    }
  }

  function multiplier() { return Math.min(4, 1 + Math.floor(streak / 8)); }

  /* ---------------- Update ---------------- */
  function update(dt) {
    t += dt;
    pulse = Math.max(0, pulse - dt * 3.5);
    shake = Math.max(0, shake - dt);

    for (const p of particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 520 * dt; p.life -= dt; }
    particles = particles.filter(p => p.life > 0);
    for (const f of floaters) { f.y -= 40 * dt; f.life -= dt; }
    floaters = floaters.filter(f => f.life > 0);

    // catcher movement
    if (state === 'idle' || state === 'running') {
      const prev = px;
      if (keyDir !== 0) { px += keyDir * 470 * dt; tx = px; }
      else if (usePointer) px += (tx - px) * Math.min(1, dt * 16);
      px = Math.min(W - PW * 0.4, Math.max(PW * 0.4, px));
      vx = (px - prev) / Math.max(dt, 0.001);
    }
    if (state !== 'running') return;

    spawnT -= dt;
    if (spawnT <= 0) spawn();

    const top = H - FLOOR - PH;
    const catchTop = top + PH * 0.08, catchBottom = catchTop + PH * 0.5;
    const floorY = H - FLOOR;
    const half = BTN / 2;

    for (let i = buttons.length - 1; i >= 0; i--) {
      const b = buttons[i];
      b.y += b.vy * dt;
      b.x = b.x0 + Math.sin(t * 2 + b.ph) * b.amp;
      b.a += b.spin * dt;

      const inBand = b.y + half >= catchTop && b.y - half <= catchBottom;
      if (inBand && Math.abs(b.x - px) <= PW * 0.46 + 8) {
        // caught
        buttons.splice(i, 1);
        streak++; caught++;
        const pts = (b.gold ? 5 : 1) * multiplier();
        score += pts;
        pulse = 1;
        const col = (b.gold ? GOLD : PALETTES[b.kind]).L;
        burst(b.x, b.y, col, b.gold ? 16 : 9, true);
        floaters.push({ x: b.x, y: catchTop - 6, txt: '+' + pts, life: 0.7, c: col });
        const f = 520 + Math.min(streak, 20) * 28;
        if (b.gold) { beep(880, 1180, 0.1); beep(1180, 1560, 0.14, 'square', 0.035, 0.09); }
        else beep(f, f * 1.5, 0.08);
      } else if (b.y + half >= floorY) {
        // missed
        buttons.splice(i, 1);
        burst(b.x, floorY - 2, '#9a6f86', 6, false);
        if (!b.gold) {
          lives--; streak = 0;
          if (!reduceMotion) shake = 0.25;
          beep(200, 90, 0.18, 'sawtooth', 0.04);
          if (lives <= 0) { die(); break; }
        }
      }
    }
  }

  /* ---------------- Draw ---------------- */
  function text(str, x, y, size, color, align = 'center') {
    ctx.font = `${size}px ${FONT}`;
    ctx.textAlign = align;
    ctx.fillStyle = color;
    ctx.fillText(str, Math.round(x), Math.round(y));
  }

  function drawPlayer() {
    if (!(logo.complete && logo.naturalWidth)) return;
    const bottom = H - FLOOR;
    let rot = Math.max(-0.22, Math.min(0.22, vx / 2600));
    let sx = 1, sy = 1, bob = 0;
    if (state === 'idle') bob = Math.sin(t * 3) * 2;
    if (pulse > 0) { const k = Math.sin(pulse * Math.PI); sy = 1 - 0.14 * k; sx = 1 + 0.1 * k; }
    let alpha = 1;
    if (state === 'over') { rot = 0.5; alpha = 0.8; }

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(px, bottom + 1, PW * 0.42, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(px, bottom + bob);
    ctx.rotate(rot);
    ctx.scale(sx, sy);
    ctx.drawImage(logo, -PW / 2, -PH, PW, PH);
    ctx.restore();
  }

  function draw() {
    ctx.save();
    if (shake > 0) ctx.translate((Math.random() - 0.5) * 8 * (shake / 0.25), (Math.random() - 0.5) * 8 * (shake / 0.25));

    // background bands
    const bh = Math.ceil((H + 10) / BANDS.length);
    BANDS.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(-10, i * bh - 5, W + 20, bh + 1); });

    // stars
    for (const s of stars) {
      if (s.x > W) continue;
      ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.5 + s.ph));
      ctx.fillStyle = '#FFD9E5';
      const sz = s.big ? 3 : 2;
      ctx.fillRect(Math.round(s.x), Math.round(s.y), sz, sz);
    }
    ctx.globalAlpha = 1;

    // floor
    const fy = H - FLOOR;
    ctx.fillStyle = '#ED5E8C'; ctx.fillRect(-10, fy, W + 20, FLOOR + 10);
    ctx.fillStyle = '#FF9BBD'; ctx.fillRect(-10, fy, W + 20, 4);
    ctx.fillStyle = '#D94F7D';
    for (let x = 0; x < W + 12; x += 12) {
      const odd = (x / 12) % 2;
      ctx.fillRect(x, fy + 8 + (odd ? 0 : 8), 6, 6);
    }

    // buttons (spinning via horizontal squash)
    for (const b of buttons) {
      const sx = Math.max(0.28, Math.abs(Math.cos(b.a)));
      drawButton(b, reduceMotion ? 1 : sx);
      if (b.gold) {
        ctx.fillStyle = '#DFF0FF';
        for (let k = 0; k < 3; k++) {
          if (Math.sin(t * 8 + k * 2.1 + b.ph) > 0.2) {
            const ang = k * 2.1 + t * 2, rx = b.x + Math.cos(ang) * 24, ry = b.y + Math.sin(ang) * 24;
            ctx.fillRect(Math.round(rx) - 1, Math.round(ry) - 4, 2, 8);
            ctx.fillRect(Math.round(rx) - 4, Math.round(ry) - 1, 8, 2);
          }
        }
      }
    }

    drawPlayer();

    // particles + floating text
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 0.4));
      ctx.fillStyle = p.c;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), 4, 4);
    }
    ctx.globalAlpha = 1;
    for (const f of floaters) {
      ctx.globalAlpha = Math.max(0, Math.min(1, f.life / 0.4));
      text(f.txt, f.x, f.y, 12, f.c);
    }
    ctx.globalAlpha = 1;

    ctx.restore();

    /* HUD (not shaken) */
    for (let i = 0; i < LIVES; i++) {
      if (logo.complete && logo.naturalWidth) {
        ctx.globalAlpha = i < lives ? 1 : 0.2;
        ctx.drawImage(logo, 56 + i * 30, 12, 24, Math.round(24 * logo.naturalHeight / logo.naturalWidth));
      }
    }
    ctx.globalAlpha = 1;
    text(String(score).padStart(5, '0'), W - 16, 30, 12, '#FFD9E5', 'right');
    if (hi > 0) text('HI ' + String(hi).padStart(5, '0'), W - 16 - 12 * 5 - 24, 30, 12, '#7A4C69', 'right');
    if (state === 'running' && multiplier() > 1) text('COMBO x' + multiplier(), W / 2, 66, 12, '#E8D5B5');

    // messages
    if (state === 'idle') {
      text('BUTTON CATCH', W / 2, H * 0.30, 22, '#ED5E8C');
      text('MOUSE, TOUCH OR ARROW KEYS', W / 2, H * 0.30 + 40, 10, '#FFD9E5');
      text('CLICK OR PRESS SPACE TO START', W / 2, H * 0.30 + 66, 10, '#C79DB0');
    } else if (state === 'paused') {
      text('PAUSED', W / 2, H * 0.32, 20, '#FFD9E5');
      text('CLICK OR PRESS SPACE TO CONTINUE', W / 2, H * 0.32 + 32, 10, '#C79DB0');
    } else if (state === 'over') {
      text('GAME OVER', W / 2, H * 0.28, 22, '#FFD9E5');
      text('SCORE ' + score, W / 2, H * 0.28 + 38, 12, '#ED5E8C');
      if (newBest) text('NEW BEST!', W / 2, H * 0.28 + 62, 10, '#E8D5B5');
      text('CLICK OR PRESS SPACE TO RETRY', W / 2, H * 0.28 + 90, 10, '#C79DB0');
    }
  }

  /* ---------------- Input ---------------- */
  function action() {
    if (state === 'idle') startGame();
    else if (state === 'over') { if (t - overAt > 0.5) startGame(); }
    else if (state === 'paused') state = 'running';
  }
  function pointerX(e) {
    const r = canvas.getBoundingClientRect();
    return (e.clientX - r.left) / scale;
  }

  const left = c => c === 'ArrowLeft' || c === 'KeyA';
  const right = c => c === 'ArrowRight' || c === 'KeyD';
  const held = { l: false, r: false };
  function syncKeys() { keyDir = (held.r ? 1 : 0) - (held.l ? 1 : 0); if (keyDir) usePointer = false; }

  root.addEventListener('keydown', e => {
    if (left(e.code))  { e.preventDefault(); held.l = true; syncKeys(); }
    else if (right(e.code)) { e.preventDefault(); held.r = true; syncKeys(); }
    else if ((e.code === 'Space' || e.code === 'Enter') && e.target !== soundBtn) {
      e.preventDefault();
      if (!e.repeat) action();
    }
  });
  root.addEventListener('keyup', e => {
    if (left(e.code))  { held.l = false; syncKeys(); }
    else if (right(e.code)) { held.r = false; syncKeys(); }
  });

  canvas.addEventListener('pointerdown', e => {
    e.preventDefault();
    root.focus({ preventScroll: true });
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    usePointer = true; tx = pointerX(e);
    action();
  });
  canvas.addEventListener('pointermove', e => { usePointer = true; tx = pointerX(e); });

  function autoPause() { if (state === 'running') { state = 'paused'; held.l = held.r = false; keyDir = 0; } }
  root.addEventListener('focusout', e => { if (!root.contains(e.relatedTarget)) autoPause(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) autoPause(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(en => { if (!en[0].isIntersecting) autoPause(); }, { threshold: 0.2 }).observe(root);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(root);
  window.addEventListener('resize', resize);
  resize();
  try { document.fonts && document.fonts.load('12px "Press Start 2P"'); } catch (e) {}

  /* ---------------- Optional: hidden until a logo is clicked ---------------- */
  const trigger = document.getElementById('mcatch-trigger');
  const panel = document.getElementById('mcatch-panel');
  if (trigger && panel) {
    const open = () => {
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      resize();
      startGame();
      root.focus({ preventScroll: true });
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    const close = () => {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      state = 'idle'; held.l = held.r = false; keyDir = 0;
    };
    trigger.addEventListener('click', () => (panel.hidden ? open() : close()));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !panel.hidden) { close(); trigger.focus(); }
    });
  }

  /* ---------------- Loop ---------------- */
  //__DEBUG__
  let prev = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    update(dt);
    draw();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
