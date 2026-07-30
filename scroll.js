/* THE UNPOPULAR CLUB — sticker scrapbook motion
   1. scroll-pinned sections   2. sticker parallax
   ปิดทั้งหมดถ้าผู้ใช้ตั้ง prefers-reduced-motion                    */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── 1. PIN ────────────────────────────────
     ใส่ data-pin ที่ <section> แล้วมันจะค้างอยู่กับจอ
     ให้ section ถัดไปเลื่อนทับขึ้นมา                              */
  function initPin() {
    var pins = document.querySelectorAll('[data-pin]');
    if (!pins.length) return;
    pins.forEach(function (el, i) {
      el.style.position = 'sticky';
      el.style.top = '0';
      el.style.zIndex = String(i + 1);
    });
    // section ที่อยู่หลัง pin ต้องทึบ ไม่งั้นจะเห็นทะลุ
    pins.forEach(function (el) {
      var next = el.nextElementSibling;
      while (next) {
        if (!next.style.background && !next.style.backgroundColor) {
          next.style.background = 'var(--paper)';
        }
        next.style.position = 'relative';
        next.style.zIndex = '20';
        break;
      }
    });
  }

  /* ── 2. STICKER PARALLAX ───────────────────
     ขยับตามสกอลล์เบาๆ ไม่เด้ง ไม่สปริง                             */
  function initParallax() {
    var stickers = Array.prototype.slice.call(document.querySelectorAll('.sticker[data-drift]'));
    if (!stickers.length) return;
    var ticking = false;
    stickers.forEach(function (s) {
      s.__rot = (function () {
        var m = (getComputedStyle(s).transform || '').match(/matrix\(([^)]+)\)/);
        if (!m) return 0;
        var v = m[1].split(',');
        return Math.round(Math.atan2(parseFloat(v[1]), parseFloat(v[0])) * 180 / Math.PI);
      })();
    });
    function frame() {
      var vh = window.innerHeight;
      stickers.forEach(function (s) {
        var r = s.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh;   // -1 .. 1
        var drift = parseFloat(s.getAttribute('data-drift')) || 20;
        s.style.transform = 'translateY(' + (-progress * drift).toFixed(1) + 'px) rotate(' + s.__rot + 'deg)';
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    frame();
  }

  function start() {
    if (reduce.matches) return;
    initPin();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else { start(); }
  reduce.addEventListener && reduce.addEventListener('change', function () { location.reload(); });
})();
