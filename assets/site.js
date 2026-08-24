/* =========================================================
   MANGA BUFF 資料サイト  共通スクリプト
   - モバイルナビ開閉
   - 現在ページのナビハイライト
   ========================================================= */
(function () {
  'use strict';

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
