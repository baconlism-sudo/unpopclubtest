/* ─────────────────────────────────────────────
   The Unpopular Club — Interactive Layer
   Highlight · Sticker · Drag
   Session-only (clears on refresh)
───────────────────────────────────────────── */

(function () {
  const STICKERS = ['⭐', '✨', '💫', '🌸', '💜', '✦', '🌟', '🦋', '🌙', '💛'];
  let stickerIdx = 0;
  let mode = 'normal'; // 'normal' | 'highlight' | 'sticker'

  /* ── Inject styles ───────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* Toolbar */
    #uc-toolbar {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    #uc-toolbar-toggle {
      width: 44px; height: 44px;
      border-radius: 50%;
      background: #2E2A42;
      border: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      box-shadow: 0 4px 16px rgba(46,42,66,.35);
      transition: transform .2s, box-shadow .2s;
      color: #fff;
    }
    #uc-toolbar-toggle:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(46,42,66,.45); }

    #uc-toolbar-panel {
      display: none;
      flex-direction: column;
      gap: 6px;
      background: #fff;
      border: 1px solid rgba(46,43,67,.10);
      border-radius: 16px;
      padding: 10px 8px;
      box-shadow: 0 8px 32px rgba(46,42,66,.18);
      align-items: center;
    }
    #uc-toolbar-panel.open { display: flex; }

    .uc-tool-btn {
      width: 40px; height: 40px;
      border-radius: 10px;
      border: 1.5px solid transparent;
      background: transparent;
      cursor: pointer;
      font-size: 1.1rem;
      display: flex; align-items: center; justify-content: center;
      transition: background .15s, border-color .15s, transform .15s;
      position: relative;
    }
    .uc-tool-btn:hover { background: rgba(104,113,159,.10); transform: scale(1.08); }
    .uc-tool-btn.active {
      background: rgba(104,113,159,.15);
      border-color: rgba(104,113,159,.40);
    }
    .uc-tool-btn[title]:hover::after {
      content: attr(title);
      position: absolute;
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
      background: #2E2A42;
      color: #fff;
      font-size: 0.7rem;
      font-family: sans-serif;
      font-weight: 600;
      white-space: nowrap;
      padding: 4px 10px;
      border-radius: 6px;
      pointer-events: none;
      letter-spacing: .03em;
    }

    .uc-divider {
      width: 24px; height: 1px;
      background: rgba(46,43,67,.10);
      margin: 2px 0;
    }

    /* Sticker picker */
    #uc-sticker-picker {
      display: none;
      position: fixed;
      bottom: 88px;
      right: 80px;
      z-index: 9999;
      background: #fff;
      border: 1px solid rgba(46,43,67,.10);
      border-radius: 14px;
      padding: 10px;
      box-shadow: 0 8px 28px rgba(46,42,66,.18);
      flex-wrap: wrap;
      gap: 4px;
      width: 168px;
    }
    #uc-sticker-picker.open { display: flex; }
    .uc-sticker-opt {
      width: 36px; height: 36px;
      border-radius: 8px;
      border: 1.5px solid transparent;
      background: transparent;
      cursor: pointer;
      font-size: 1.2rem;
      display: flex; align-items: center; justify-content: center;
      transition: background .12s, transform .12s;
    }
    .uc-sticker-opt:hover { background: rgba(104,113,159,.12); transform: scale(1.15); }
    .uc-sticker-opt.selected { border-color: rgba(104,113,159,.45); background: rgba(104,113,159,.12); }

    /* Highlight */
    .uc-highlight {
      background: rgba(255, 220, 80, 0.42);
      border-radius: 2px;
      padding: 0 1px;
      cursor: pointer;
      transition: background .2s;
    }
    .uc-highlight:hover { background: rgba(255, 200, 50, 0.60); }
    .uc-highlight-violet {
      background: rgba(104, 113, 159, 0.20);
    }

    /* Cursor in modes */
    body.mode-highlight { cursor: text; }
    body.mode-sticker   { cursor: crosshair; }

    /* Placed sticker */
    .uc-sticker {
      position: absolute;
      font-size: 1.6rem;
      cursor: grab;
      user-select: none;
      z-index: 8888;
      line-height: 1;
      transition: transform .1s;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,.18));
      animation: uc-pop .25s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    .uc-sticker:active { cursor: grabbing; transform: scale(1.2); }
    .uc-sticker:hover::after {
      content: '×';
      position: absolute;
      top: -6px; right: -6px;
      width: 16px; height: 16px;
      background: #2E2A42;
      color: #fff;
      border-radius: 50%;
      font-size: 0.6rem;
      font-weight: 800;
      display: flex; align-items: center; justify-content: center;
      font-family: sans-serif;
      cursor: pointer;
      line-height: 16px;
      text-align: center;
    }

    @keyframes uc-pop {
      from { transform: scale(0) rotate(-15deg); opacity: 0; }
      to   { transform: scale(1) rotate(0deg);   opacity: 1; }
    }

    /* Highlight color picker row */
    #uc-color-row {
      display: none;
      gap: 5px;
      align-items: center;
      margin-top: 2px;
    }
    #uc-color-row.open { display: flex; }
    .uc-color-dot {
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: transform .12s, border-color .12s;
      flex-shrink: 0;
    }
    .uc-color-dot:hover { transform: scale(1.2); }
    .uc-color-dot.selected { border-color: #2E2A42; }
  `;
  document.head.appendChild(style);

  /* ── Build toolbar HTML ──────────────────── */
  const toolbar = document.createElement('div');
  toolbar.id = 'uc-toolbar';
  toolbar.innerHTML = `
    <div id="uc-toolbar-panel">
      <!-- Highlight tool -->
      <button class="uc-tool-btn" id="uc-btn-highlight" title="Highlight">🖊️</button>
      <div id="uc-color-row">
        <div class="uc-color-dot selected" data-color="rgba(255,220,80,.42)" style="background:rgba(255,220,80,.85);"></div>
        <div class="uc-color-dot" data-color="rgba(104,113,159,.22)" style="background:rgba(104,113,159,.65);"></div>
        <div class="uc-color-dot" data-color="rgba(130,200,140,.40)" style="background:rgba(130,200,140,.85);"></div>
        <div class="uc-color-dot" data-color="rgba(255,120,120,.35)" style="background:rgba(255,120,120,.80);"></div>
      </div>
      <div class="uc-divider"></div>
      <!-- Sticker tool -->
      <button class="uc-tool-btn" id="uc-btn-sticker" title="Sticker">⭐</button>
      <div class="uc-divider"></div>
      <!-- Clear all -->
      <button class="uc-tool-btn" id="uc-btn-clear" title="Clear all">🗑️</button>
    </div>
    <button id="uc-toolbar-toggle" title="Interactive mode">✦</button>
  `;
  document.body.appendChild(toolbar);

  /* Sticker picker */
  const picker = document.createElement('div');
  picker.id = 'uc-sticker-picker';
  STICKERS.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'uc-sticker-opt' + (i === 0 ? ' selected' : '');
    btn.textContent = s;
    btn.dataset.idx = i;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      stickerIdx = i;
      picker.querySelectorAll('.uc-sticker-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      document.getElementById('uc-btn-sticker').textContent = s;
    });
    picker.appendChild(btn);
  });
  document.body.appendChild(picker);

  /* ── State helpers ───────────────────────── */
  let highlightColor = 'rgba(255,220,80,.42)';
  let panelOpen = false;

  function setMode(m) {
    mode = m;
    document.body.classList.remove('mode-highlight', 'mode-sticker');
    if (m === 'highlight') document.body.classList.add('mode-highlight');
    if (m === 'sticker')   document.body.classList.add('mode-sticker');

    document.querySelectorAll('.uc-tool-btn').forEach(b => b.classList.remove('active'));
    if (m === 'highlight') document.getElementById('uc-btn-highlight').classList.add('active');
    if (m === 'sticker')   document.getElementById('uc-btn-sticker').classList.add('active');

    // show/hide color row
    const colorRow = document.getElementById('uc-color-row');
    colorRow.classList.toggle('open', m === 'highlight');

    // close sticker picker if not in sticker mode
    if (m !== 'sticker') picker.classList.remove('open');
  }

  function togglePanel() {
    panelOpen = !panelOpen;
    const panel = document.getElementById('uc-toolbar-panel');
    panel.classList.toggle('open', panelOpen);
    const toggle = document.getElementById('uc-toolbar-toggle');
    toggle.textContent = panelOpen ? '✕' : '✦';
    if (!panelOpen) {
      setMode('normal');
      picker.classList.remove('open');
    }
  }

  /* ── Toolbar events ──────────────────────── */
  document.getElementById('uc-toolbar-toggle').addEventListener('click', togglePanel);

  document.getElementById('uc-btn-highlight').addEventListener('click', () => {
    setMode(mode === 'highlight' ? 'normal' : 'highlight');
  });

  document.getElementById('uc-btn-sticker').addEventListener('click', (e) => {
    e.stopPropagation();
    if (mode !== 'sticker') {
      setMode('sticker');
      picker.classList.add('open');
    } else {
      setMode('normal');
      picker.classList.remove('open');
    }
  });

  document.getElementById('uc-btn-clear').addEventListener('click', () => {
    // Remove highlights
    document.querySelectorAll('.uc-highlight').forEach(el => {
      const parent = el.parentNode;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
    });
    // Remove stickers
    document.querySelectorAll('.uc-sticker').forEach(el => el.remove());
    setMode('normal');
  });

  // Color dots
  document.querySelectorAll('.uc-color-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      highlightColor = dot.dataset.color;
      document.querySelectorAll('.uc-color-dot').forEach(d => d.classList.remove('selected'));
      dot.classList.add('selected');
    });
  });

  // Close picker when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#uc-sticker-picker') && !e.target.closest('#uc-btn-sticker')) {
      picker.classList.remove('open');
    }
  });

  /* ── Highlight on mouseup ────────────────── */
  document.addEventListener('mouseup', (e) => {
    if (mode !== 'highlight') return;
    if (e.target.closest('#uc-toolbar') || e.target.closest('#uc-sticker-picker')) return;

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.toString().trim() === '') return;

    const range = sel.getRangeAt(0);

    // Skip if selection is inside toolbar
    if (range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE) {
      if (range.commonAncestorContainer.closest('#uc-toolbar')) return;
    }

    const mark = document.createElement('mark');
    mark.className = 'uc-highlight';
    mark.style.background = highlightColor;

    // Double-click to remove highlight
    mark.addEventListener('dblclick', () => {
      const parent = mark.parentNode;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
    });

    try {
      range.surroundContents(mark);
    } catch {
      // Selection spans multiple elements — use extractContents
      try {
        const fragment = range.extractContents();
        mark.appendChild(fragment);
        range.insertNode(mark);
      } catch { /* skip */ }
    }

    sel.removeAllRanges();
  });

  /* ── Sticker placement ───────────────────── */
  document.addEventListener('click', (e) => {
    if (mode !== 'sticker') return;
    if (e.target.closest('#uc-toolbar') || e.target.closest('#uc-sticker-picker')) return;

    const sticker = document.createElement('div');
    sticker.className = 'uc-sticker';
    sticker.textContent = STICKERS[stickerIdx];

    // Position relative to document (not viewport)
    const x = e.pageX - 12;
    const y = e.pageY - 12;
    sticker.style.left = x + 'px';
    sticker.style.top  = y + 'px';

    // Double-click to remove
    sticker.addEventListener('dblclick', () => sticker.remove());

    makeDraggable(sticker);
    document.body.appendChild(sticker);
  });

  /* ── Drag helper ─────────────────────────── */
  function makeDraggable(el) {
    let startX, startY, origLeft, origTop;

    el.addEventListener('mousedown', (e) => {
      if (e.detail === 2) return; // ignore dblclick
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      origLeft = parseInt(el.style.left) || 0;
      origTop  = parseInt(el.style.top)  || 0;
      el.style.transition = 'none';
      el.style.zIndex = 9000;

      function onMove(e) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.style.left = (origLeft + dx) + 'px';
        el.style.top  = (origTop  + dy) + 'px';
      }
      function onUp() {
        el.style.zIndex = 8888;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    // Touch support
    el.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      origLeft = parseInt(el.style.left) || 0;
      origTop  = parseInt(el.style.top)  || 0;

      function onMove(e) {
        const t = e.touches[0];
        el.style.left = (origLeft + t.clientX - startX) + 'px';
        el.style.top  = (origTop  + t.clientY - startY) + 'px';
      }
      function onEnd() {
        el.removeEventListener('touchmove', onMove);
        el.removeEventListener('touchend', onEnd);
      }
      el.addEventListener('touchmove', onMove, { passive: true });
      el.addEventListener('touchend', onEnd);
    }, { passive: true });
  }

})();
