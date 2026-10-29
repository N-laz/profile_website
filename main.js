(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav');
  const header = document.querySelector('.site-header');

  if (header) {
    const updateHeaderContrast = () => {
      const surface = document.elementFromPoint(1, Math.min(44, header.offsetHeight / 2));
      header.classList.toggle('on-dark', Boolean(surface?.closest('.about, .services, .contact, .site-footer')));
    };

    window.addEventListener('scroll', updateHeaderContrast, { passive: true });
    window.addEventListener('resize', updateHeaderContrast);
    updateHeaderContrast();
  }

  if (menuButton && navigation) {
    const navigationLinks = [...navigation.querySelectorAll('a[href]')];
    menuButton.hidden = false;
    document.body.classList.add('menu-ready');
    navigation.setAttribute('aria-hidden', 'true');

    const setMenuOpen = (isOpen, restoreFocus = false) => {
      document.body.classList.toggle('menu-open', isOpen);
      document.documentElement.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      navigation.setAttribute('aria-hidden', String(!isOpen));

      if (isOpen) {
        requestAnimationFrame(() => {
          if (document.body.classList.contains('menu-open')) {
            navigationLinks[0]?.focus({ preventScroll: true });
          }
        });
      } else if (restoreFocus) {
        menuButton.focus({ preventScroll: true });
      }
    };

    menuButton.addEventListener('click', () => {
      setMenuOpen(!document.body.classList.contains('menu-open'));
    });

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (link && document.body.classList.contains('menu-open')) {
        setMenuOpen(false, true);
      }
    });

    document.addEventListener('keydown', event => {
      if (!document.body.classList.contains('menu-open')) return;

      if (event.key === 'Escape') {
        setMenuOpen(false, true);
        return;
      }

      if (event.key === 'Tab' && navigationLinks.length) {
        const focusable = [menuButton, ...navigationLinks];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  const year = document.getElementById('yr');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && revealItems.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    revealItems.forEach(item => observer.observe(item));
    document.documentElement.classList.add('js-motion');
  }
})();
