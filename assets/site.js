/* =========================================================
   MANGA BUFF 資料サイト  共通スクリプト
   - パスワードゲート（初回入力。sessionStorageで全ページ共有）
   - モバイルナビ開閉
   - 現在ページのナビハイライト
   ========================================================= */
(function () {
  'use strict';

  // --- Password gate ---
  var CORRECT_HASH = '285aaf424e5c24eae0b61348bed407b5219f56abfc8f2b43568bb1a982fce3bf';

  async function sha256(str) {
    var buf = new TextEncoder().encode(str);
    var hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(function (b) {
      return b.toString(16).padStart(2, '0');
    }).join('');
  }

  function unlock() {
    document.body.classList.remove('locked');
    var gate = document.getElementById('gate');
    if (gate) gate.classList.add('hidden');
  }

  var gate = document.getElementById('gate');
  if (gate) {
    // 既に解錠済みなら即表示（別ページから遷移してきたケース）
    if (sessionStorage.getItem('mb-unlocked') === '1') {
      unlock();
    }
    var pwInput = document.getElementById('gate-pw');
    var btn = document.getElementById('gate-btn');
    var errEl = document.getElementById('gate-err');

    async function tryUnlock() {
      var hash = await sha256(pwInput.value);
      if (hash === CORRECT_HASH) {
        sessionStorage.setItem('mb-unlocked', '1');
        unlock();
      } else if (errEl) {
        errEl.classList.add('show');
      }
    }
    if (btn) btn.addEventListener('click', tryUnlock);
    if (pwInput) pwInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryUnlock();
    });
  }

  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
  }

  // --- Active nav link highlight ---
  var path = location.pathname.split('/').pop() || 'index.html';
  if (path === '') path = 'index.html';
  var links = document.querySelectorAll('.nav-menu a');
  links.forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();
