(function () {
  var root = document.documentElement;

  function saved() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var system = window.matchMedia('(prefers-color-scheme: dark)');
  if (system.addEventListener) system.addEventListener('change', function (e) {
    if (!saved()) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });

  var news = document.querySelector('.news');
  if (news) {
    var items = [].slice.call(news.children);
    var limit = parseInt(news.getAttribute('data-limit'), 10) || items.length;
    if (items.length > limit) {
      var older = items.slice(limit);
      older.forEach(function (li) { li.hidden = true; });
      var more = document.createElement('button');
      more.type = 'button';
      more.className = 'btn btn-sm news-more';
      more.textContent = 'Show all (' + items.length + ')';
      more.addEventListener('click', function () {
        older.forEach(function (li) { li.hidden = false; });
        more.parentNode.removeChild(more);
      });
      news.parentNode.insertBefore(more, news.nextSibling);
    }
  }

  var updated = document.getElementById('updated');
  var modified = new Date(document.lastModified);
  if (updated && !isNaN(modified)) {
    updated.textContent = ' · Last updated ' +
      modified.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
})();
