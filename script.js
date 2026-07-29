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
})();
