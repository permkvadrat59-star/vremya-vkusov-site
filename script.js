(function () {
  var html = document.documentElement;
  var thumb = document.getElementById('lightThumb');
  var labelDay = document.getElementById('labelDay');
  var labelEve = document.getElementById('labelEve');
  var STORAGE_KEY = 'vv-mode';

  function apply(mode) {
    var evening = mode === 'evening';
    html.classList.toggle('evening', evening);
    thumb.setAttribute('aria-pressed', String(evening));
    labelDay.classList.toggle('active', !evening);
    labelEve.classList.toggle('active', evening);
  }

  function setMode(mode) {
    apply(mode);
    try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) {}
  }

  function initialMode() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === 'day' || saved === 'evening') return saved;
    var hour = new Date().getHours();
    return (hour >= 19 || hour < 7) ? 'evening' : 'day';
  }

  apply(initialMode());

  thumb.addEventListener('click', function () {
    setMode(html.classList.contains('evening') ? 'day' : 'evening');
  });
  labelDay.addEventListener('click', function () { setMode('day'); });
  labelEve.addEventListener('click', function () { setMode('evening'); });

  var overlay = document.getElementById('navOverlay');
  var menuBtn = document.getElementById('menuToggle');
  var closeBtn = document.getElementById('menuClose');

  function openMenu() {
    overlay.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    overlay.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', function () {
      if (overlay.classList.contains('open')) { closeMenu(); } else { openMenu(); }
    });
    closeBtn.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }
})();
