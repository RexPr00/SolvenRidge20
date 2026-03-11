(() => {
  const langWrap = document.querySelector('[data-lang-wrap]');
  const langBtn = document.querySelector('[data-lang-btn]');
  const drawer = document.querySelector('[data-drawer]');
  const overlay = document.querySelector('[data-overlay]');
  const burger = document.querySelector('[data-burger]');
  const drawerClose = document.querySelector('[data-drawer-close]');
  const privacyOpeners = document.querySelectorAll('[data-open-privacy]');
  const privacyModal = document.querySelector('[data-privacy-modal]');
  const privacyCloseButtons = document.querySelectorAll('[data-close-privacy]');

  const focusableSelector = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  if (langBtn && langWrap) {
    langBtn.addEventListener('click', () => langWrap.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!langWrap.contains(e.target)) langWrap.classList.remove('open');
    });
  }

  const trapFocus = (container, e) => {
    const focusables = [...container.querySelectorAll(focusableSelector)];
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const openDrawer = () => {
    if (!drawer || !overlay) return;
    lastFocused = document.activeElement;
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('no-scroll');
    const first = drawer.querySelector(focusableSelector);
    if (first) first.focus();
  };

  const closeDrawer = () => {
    if (!drawer || !overlay) return;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if (lastFocused) lastFocused.focus();
  };

  burger?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  const openModal = () => {
    if (!privacyModal) return;
    lastFocused = document.activeElement;
    privacyModal.classList.add('open');
    document.body.classList.add('no-scroll');
    privacyModal.querySelector('.icon-close')?.focus();
  };

  const closeModal = () => {
    if (!privacyModal) return;
    privacyModal.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if (lastFocused) lastFocused.focus();
  };

  privacyOpeners.forEach((btn) => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
  privacyCloseButtons.forEach((btn) => btn.addEventListener('click', closeModal));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
    if (e.key === 'Tab' && drawer?.classList.contains('open')) trapFocus(drawer, e);
    if (e.key === 'Tab' && privacyModal?.classList.contains('open')) trapFocus(privacyModal.querySelector('.modal-panel'), e);
  });

  const faqItems = [...document.querySelectorAll('.faq-item')];
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-btn');
    btn?.addEventListener('click', () => {
      faqItems.forEach((i) => i.classList.remove('open'));
      item.classList.add('open');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-animate]').forEach((el) => {
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'transform .45s ease';
    observer.observe(el);
  });

  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('[data-confirm]');
      if (note) note.textContent = 'After you sign up, you get instant access to the next steps. We may send a short email to confirm your details.';
    });
  });
})();
