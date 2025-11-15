// MOBILE MENU
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// SMOOTH SCROLL for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.length > 1) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  });
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  reveals.forEach(el => observer.observe(el));
} else {
  // fallback
  reveals.forEach(el => el.classList.add('visible'));
}

// COPY CONTRACT TO CLIPBOARD
document.querySelectorAll('[data-copy-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetSelector = btn.getAttribute('data-copy-target');
    const targetEl = document.querySelector(targetSelector);

    if (!targetEl) return;

    const textToCopy = targetEl.textContent.trim();
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        const originalText = btn.textContent;
        btn.textContent = 'Скопировано!';
        setTimeout(() => (btn.textContent = originalText), 1500);
      },
      () => {
        alert('Не удалось скопировать адрес. Скопируйте вручную.');
      }
    );
  });
});

// YEAR IN FOOTER
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
