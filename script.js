(function () {
  const navLinks = Array.from(document.querySelectorAll('ul.navbar a'));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.target.id) return;
      const link = document.querySelector('ul.navbar a[href="#' + entry.target.id + '"]');
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0.01
  });

  sections.forEach(s => observer.observe(s));

  window.addEventListener('load', () => {
    const visible = sections.find(s => s.getBoundingClientRect().top <= window.innerHeight/2 && s.getBoundingClientRect().bottom >= window.innerHeight/2);
    if (visible) {
      const link = document.querySelector('ul.navbar a[href="#' + visible.id + '"]');
      navLinks.forEach(l => l.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
})();