(function () {
  /* Assemble mailto links from split data attributes so the address is not in the page source. */
  document.querySelectorAll('.js-email').forEach(function (a) {
    var addr = a.dataset.u + '@' + a.dataset.d;
    a.href = 'mailto:' + addr;
    a.title = addr;
  });

  /* Mobile menu */
  var btn = document.getElementById('menuBtn');
  var links = document.getElementById('navLinks');
  function setMenu(open) {
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('open')) { setMenu(false); btn.focus(); }
  });

  /* Highlight the nav link of the section in view */
  var anchors = Array.prototype.slice.call(links.querySelectorAll('a'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        anchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    anchors.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) spy.observe(s);
    });
  }
})();
