/* THE UNPOPULAR CLUB — Cookie / PDPA consent
   - Blocks non-essential third-party embeds (Calendly) until the visitor agrees
   - Remembers the choice in localStorage
   - Choice can be changed again from the footer link (#cookie-settings)
*/
(function () {
  'use strict';

  var KEY = 'unpop_consent';        // 'all' | 'essential'
  var STAMP = 'unpop_consent_at';   // ISO date of the choice

  function get()  { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) {
    try {
      localStorage.setItem(KEY, v);
      localStorage.setItem(STAMP, new Date().toISOString());
    } catch (e) {}
  }

  /* Load anything held back until consent:
     <div data-consent-src="https://..."></div>  →  becomes a real <script> */
  function loadDeferred() {
    document.querySelectorAll('[data-consent-src]').forEach(function (el) {
      if (el.dataset.consentLoaded) return;
      var s = document.createElement('script');
      s.src = el.getAttribute('data-consent-src');
      s.async = true;
      document.body.appendChild(s);
      el.dataset.consentLoaded = '1';
    });
    document.querySelectorAll('.consent-placeholder').forEach(function (el) {
      el.style.display = 'none';
    });
    document.querySelectorAll('[data-consent-show]').forEach(function (el) {
      el.style.display = '';
    });
  }

  function isTH() {
    return document.documentElement.getAttribute('data-lang') !== 'en';
  }

  function banner() {
    if (document.getElementById('cookie-banner')) return;

    var th = isTH();
    var wrap = document.createElement('div');
    wrap.id = 'cookie-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', th ? 'การใช้คุกกี้' : 'Cookie notice');
    wrap.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<div class="cookie-banner-text">' +
          '<p class="cookie-banner-title">' + (th ? 'เว็บนี้ใช้คุกกี้' : 'This site uses cookies') + '</p>' +
          '<p class="cookie-banner-body">' +
            (th
              ? 'เราใช้คุกกี้ที่จำเป็นเพื่อให้เว็บทำงานได้ และใช้คุกกี้จากบริการภายนอก เช่น ปฏิทินจองเวลา เฉพาะเมื่อคุณอนุญาต ' +
                '<a href="privacy-policy.html">อ่านนโยบายความเป็นส่วนตัว</a>'
              : 'We use essential cookies to run the site, and third-party cookies (such as the booking calendar) only if you allow them. ' +
                '<a href="privacy-policy.html">Read the privacy policy</a>') +
          '</p>' +
        '</div>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="btn btn-outline btn-sm" id="cookie-essential">' +
            (th ? 'เฉพาะที่จำเป็น' : 'Essential only') + '</button>' +
          '<button type="button" class="btn btn-primary btn-sm" id="cookie-accept">' +
            (th ? 'ยอมรับทั้งหมด' : 'Accept all') + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    requestAnimationFrame(function () { wrap.classList.add('is-visible'); });

    function close() {
      wrap.classList.remove('is-visible');
      setTimeout(function () { wrap.remove(); }, 260);
    }
    document.getElementById('cookie-accept').addEventListener('click', function () {
      save('all'); loadDeferred(); close();
    });
    document.getElementById('cookie-essential').addEventListener('click', function () {
      save('essential'); close();
    });
  }

  function init() {
    var choice = get();
    if (choice === 'all') loadDeferred();
    else if (!choice) banner();

    // footer link to change the choice later
    document.querySelectorAll('[href="#cookie-settings"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        try { localStorage.removeItem(KEY); } catch (err) {}
        banner();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
