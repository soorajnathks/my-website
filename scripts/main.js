// Small themeer + small interactions
(function () {
  const body = document.body;
  const toggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');

  // set year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // read saved theme or prefers-color-scheme
  const saved = localStorage.getItem('uplyftt-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'light') body.classList.add('light');
  else if (saved === 'dark') body.classList.remove('light');
  else if (prefersDark === false) body.classList.add('light');

  // update toggle aria
  function updateToggle() {
    const isLight = body.classList.contains('light');
    toggle.setAttribute('aria-pressed', String(!isLight));
    toggle.title = isLight ? 'Switch to dark' : 'Switch to light';
  }
  updateToggle();

  // toggle handler
  toggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light');
    localStorage.setItem('uplyftt-theme', isLight ? 'light' : 'dark');
    updateToggle();
  });

  // keyboard accessibility
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle.click();
    }
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

})();
