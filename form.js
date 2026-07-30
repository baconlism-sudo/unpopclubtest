/* THE UNPOPULAR CLUB — contact form → Google Sheets
   Posts to the Netlify Function at /.netlify/functions/contact,
   which appends a row to the Google Sheet.
   Falls back to a plain submit if JavaScript can't reach the function.
*/
(function () {
  'use strict';

  var ENDPOINT = '/.netlify/functions/contact';

  function t(th, en) {
    return document.documentElement.getAttribute('data-lang') === 'en' ? en : th;
  }

  function init() {
    var form = document.querySelector('form[name="contact"]');
    if (!form) return;

    var status = document.getElementById('form-status');
    var button = form.querySelector('button[type="submit"]');
    var buttonLabel = button ? button.textContent.trim() : '';

    function setStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status' + (kind ? ' ' + kind : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.reportValidity()) return;

      var data = Object.fromEntries(new FormData(form).entries());
      data.pdpaConsent = form.querySelector('#pdpa-consent')
        ? form.querySelector('#pdpa-consent').checked
        : false;
      data.sourcePage = location.pathname.replace(/^\//, '') || 'contact.html';
      delete data['form-name'];

      if (button) {
        button.disabled = true;
        button.textContent = t('กำลังส่ง…', 'Sending…');
      }
      setStatus(t('กำลังส่ง…', 'Sending…'), '');

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          return res.json().then(function (json) {
            return { ok: res.ok, json: json };
          });
        })
        .then(function (r) {
          if (!r.ok) throw new Error(r.json && r.json.error ? r.json.error : 'failed');
          window.location.href = '/thank-you.html';
        })
        .catch(function (err) {
          console.error('contact form:', err);
          if (button) {
            button.disabled = false;
            button.textContent = buttonLabel;
          }
          setStatus(
            t('ส่งไม่สำเร็จ ลองใหม่อีกครั้ง หรือทักมาทาง LINE ได้เลย',
              "That didn't send. Try again, or reach us on LINE."),
            'error'
          );
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
