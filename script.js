/* THE UNPOPULAR CLUB — Main JS */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Language toggle TH / EN --- */
  function applyLang(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    document.querySelectorAll('[data-en]').forEach(el => {
      // Skip <option> elements — handled separately below
      if (el.tagName === 'OPTION') return;
      // Stash original TH on first call
      if (!el.dataset.th) el.dataset.th = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.th;
    });

    // Handle select <option> elements with data-en
    document.querySelectorAll('option[data-en]').forEach(el => {
      if (!el.dataset.th) el.dataset.th = el.textContent;
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.th;
    });

    // Handle placeholder translations for inputs/textareas
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
      if (!el.dataset.thPlaceholder) el.dataset.thPlaceholder = el.placeholder;
      el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.thPlaceholder;
    });

    document.querySelectorAll('.lang-opt-th, .lang-opt-en').forEach(btn => {
      const isTh = btn.classList.contains('lang-opt-th');
      btn.classList.toggle('active', (lang === 'th') === isTh);
    });
  }

  const savedLang = localStorage.getItem('lang') || 'th';
  applyLang(savedLang);

  document.querySelectorAll('.lang-opt-th').forEach(b => b.addEventListener('click', () => applyLang('th')));
  document.querySelectorAll('.lang-opt-en').forEach(b => b.addEventListener('click', () => applyLang('en')));

  /* --- Flyout nav --- */
  const hamburger     = document.querySelector('.nav-hamburger');
  const flyoutDrawer  = document.getElementById('flyout-drawer');
  const flyoutOverlay = document.getElementById('flyout-overlay');
  const flyoutClose   = document.getElementById('flyout-close');

  function openFlyout() {
    if (flyoutDrawer)  flyoutDrawer.classList.add('open');
    if (flyoutOverlay) flyoutOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeFlyout() {
    if (flyoutDrawer)  flyoutDrawer.classList.remove('open');
    if (flyoutOverlay) flyoutOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger)     hamburger.addEventListener('click', openFlyout);
  if (flyoutClose)   flyoutClose.addEventListener('click', closeFlyout);
  if (flyoutOverlay) flyoutOverlay.addEventListener('click', closeFlyout);

  /* --- Active nav link --- */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isHome = (href === 'index.html' || href === './') && (path === '/' || path.endsWith('/index.html') || path.endsWith('/'));
    if (isHome || (href !== 'index.html' && href !== './' && path.endsWith(href))) {
      link.classList.add('active');
    }
  });

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* --- Certificate carousel --- */
  const wrapper = document.querySelector('.carousel-overflow');
  const track   = document.querySelector('.carousel-track');
  const prev    = document.querySelector('.carousel-prev');
  const next    = document.querySelector('.carousel-next');

  if (wrapper && track) {
    let idx = 0;

    const cardW = () => {
      const c = track.querySelector('.cert-card');
      if (!c) return 276;
      return c.offsetWidth + 16;
    };

    const maxIdx = () => {
      const total   = track.querySelectorAll('.cert-card').length;
      const visible = Math.floor(wrapper.offsetWidth / cardW());
      return Math.max(0, total - visible);
    };

    const goTo = n => {
      idx = Math.max(0, Math.min(n, maxIdx()));
      track.style.transform = `translateX(-${idx * cardW()}px)`;
    };

    if (prev) prev.addEventListener('click', () => goTo(idx - 1));
    if (next) next.addEventListener('click', () => goTo(idx + 1));

    /* Auto-advance every 4s */
    setInterval(() => {
      goTo(idx >= maxIdx() ? 0 : idx + 1);
    }, 4000);
  }

  /* --- Smooth reveal on scroll --- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .card-sm, .card-cream, .path-card, .article-card').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  /* --- Image placeholders (show when asset files are missing) --- */
  const IMG_META = {
    'khai-logo.png':                      { label: 'THE UNPOPULAR CLUB', sub: 'Logo',                     bg: '#2E3158', fg: '#ECF1F5', w: 400, h: 120 },
    'khai-avatar.png':                    { label: 'Khai',               sub: 'Founder',                  bg: '#E4E8F5', fg: '#5D6BA0', w: 600, h: 600 },
    'sean-avatar.png':                    { label: 'Sean',               sub: 'Instructor',               bg: '#D0E8EE', fg: '#2E3158', w: 600, h: 600 },
    'lvd-cover.jpg':                      { label: 'Living Your Design', sub: 'Course Cover',             bg: '#5D6BA0', fg: '#ECF1F5', w: 800, h: 1000 },
    'workshop-cover.jpg':                 { label: 'Why You Feel Lost',  sub: 'Free Workshop Cover',      bg: '#2E3158', fg: '#ECF1F5', w: 800, h: 450  },
    'bg5-foundation-cover.jpg':           { label: 'BG5 Foundation',     sub: 'Course Cover',             bg: '#5BA4B4', fg: '#ECF1F5', w: 800, h: 1000 },
    'bg5-journey-roadmap.png':            { label: 'BG5 Journey',        sub: 'Roadmap',                  bg: '#ECF1F5', fg: '#2E3158', w: 1200, h: 600 },
    'sean-certifications.png':            { label: 'Sean',               sub: 'Certifications',           bg: '#E4E8F5', fg: '#5D6BA0', w: 800, h: 500 },
    'sean-bg5-chart.png':                 { label: 'Sean',               sub: 'BG5 BodyGraph',            bg: '#ECF1F5', fg: '#2E3158', w: 600, h: 600 },
    'patreon-capitalism-promo-card.png':  { label: 'Human Design',       sub: 'in Capitalism',            bg: '#2E3158', fg: '#ECF1F5', w: 800, h: 500 },
    'patreon-mind-promo-card.png':        { label: 'Mind',               sub: 'เสียงในหัว',               bg: '#5D6BA0', fg: '#ECF1F5', w: 800, h: 500 },
    'patreon-gut-feeling-promo-card.png': { label: 'GUT Feeling',        sub: 'How to Hear Clearly',      bg: '#5BA4B4', fg: '#ECF1F5', w: 800, h: 500 },
    'patreon-ra-uru-hu-promo-card.png':   { label: 'Ra Uru Hu',          sub: 'Happy Belated Birthday',   bg: '#7C4F78', fg: '#ECF1F5', w: 800, h: 500 },
  };

  // Certificate placeholders
  const CERT_LABELS = [
    'BG5 Foundation\nLicensed Teaching',
    'BG5 Career &\nBusiness Consultant',
    'BG5 Cycles\nConsultant',
    'BG5 Profit\nPotential',
    'Dream Rave\nAnalysis',
    'Individual Rave\nAnalysis',
    'Living Your Design\nLicensed Teaching',
  ];
  const CERT_FILES = [
    'bg5-foundation-teaching-licensed.png',
    'bg5-career-business-consultant.png',
    'bg5-career-business-cycles-consultant.png',
    'bg5-profit-potential.png',
    'human-design-dream-rave-analysis.png',
    'human-design-individual-rave-analysis.png',
    'living-your-design-guide-licensed-teaching.png',
  ];
  CERT_FILES.forEach((f, i) => {
    IMG_META['certificates/' + f] = { label: CERT_LABELS[i] || f, sub: 'Certificate', bg: '#ECF1F5', fg: '#2E3158', w: 520, h: 390 };
  });

  function makePlaceholderSVG(m) {
    const lines = m.label.split('\n');
    const lineH = 28;
    const startY = m.h / 2 - (lines.length * lineH) / 2 - 14;
    const textNodes = lines.map((l, i) =>
      `<text x="50%" y="${startY + i * lineH}" text-anchor="middle" dominant-baseline="middle"
        font-family="'Sukhumvit Set',Sarabun,sans-serif" font-size="22" font-weight="700" fill="${m.fg}">${l}</text>`
    ).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${m.w}" height="${m.h}" viewBox="0 0 ${m.w} ${m.h}">
      <rect width="100%" height="100%" fill="${m.bg}"/>
      <rect x="12" y="12" width="${m.w-24}" height="${m.h-24}" fill="none" stroke="${m.fg}" stroke-width="1.5" stroke-opacity="0.2" stroke-dasharray="6,5"/>
      ${textNodes}
      <text x="50%" y="${startY + lines.length * lineH + 10}" text-anchor="middle" dominant-baseline="middle"
        font-family="'Sukhumvit Set',Sarabun,sans-serif" font-size="13" fill="${m.fg}" opacity="0.5">${m.sub}</text>
    </svg>`;
  }

  document.querySelectorAll('img').forEach(img => {
    const tryPlaceholder = () => {
      const src  = img.getAttribute('src') || '';
      const file = src.includes('certificates/')
        ? 'certificates/' + src.split('/').pop()
        : src.split('/').pop();
      const meta = IMG_META[file];
      if (!meta) return;
      img.onerror = null;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(makePlaceholderSVG(meta));
    };
    img.addEventListener('error', tryPlaceholder);
    // If already broken (src 404 before listener attached)
    if (img.complete && img.naturalWidth === 0) tryPlaceholder();
  });

});
