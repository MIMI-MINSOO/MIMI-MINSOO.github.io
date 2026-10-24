(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme toggle: remember the visitor's choice, otherwise follow the system.
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

  // Header: solid background once the page scrolls; menu button on small screens.
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var navToggle = header.querySelector('.nav-toggle');
    if (navToggle) {
      navToggle.addEventListener('click', function () {
        var open = header.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      [].forEach.call(header.querySelectorAll('.nav a'), function (a) {
        a.addEventListener('click', function () {
          header.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // Hero: type out each role in turn.
  var typed = document.querySelector('.typed');
  if (typed && !reduceMotion) {
    var roles = [];
    try { roles = JSON.parse(typed.getAttribute('data-roles')) || []; } catch (e) {}
    if (roles.length > 1) {
      var index = 0;
      var text = roles[0];
      var deleting = true;
      var tick = function () {
        var target = roles[index];
        if (deleting) {
          text = text.slice(0, -1);
          if (!text) { deleting = false; index = (index + 1) % roles.length; }
        } else {
          text = target.slice(0, text.length + 1);
        }
        typed.textContent = text;
        var delay = deleting ? 40 : 90;
        if (!deleting && text === roles[index]) { deleting = true; delay = 1800; }
        else if (deleting && !text) { delay = 300; }
        setTimeout(tick, delay);
      };
      setTimeout(tick, 1800);
    }
  }

  // Resume: mark the section currently in view in the side menu.
  var spyLinks = document.querySelectorAll('.resume-nav a');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    [].forEach.call(spyLinks, function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        [].forEach.call(spyLinks, function (a) { a.classList.remove('active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    spyLinks[0].classList.add('active');
  }

  // News: fold items past data-limit behind a "Show all" button.
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

  // Footer: "Last updated" follows the page's modification date.
  var updated = document.getElementById('updated');
  var modified = new Date(document.lastModified);
  if (updated && !isNaN(modified)) {
    updated.textContent = ' · Last updated ' +
      modified.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
})();
