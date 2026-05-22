document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const noticeStrip = document.getElementById('notice-strip');
  const noticeCloseBtn = document.getElementById('notice-close-btn');

  if (noticeCloseBtn) {
    if (sessionStorage.getItem('kcca-notice-dismissed') === 'true') {
      noticeStrip.style.display = 'none';
    }
    noticeCloseBtn.addEventListener('click', () => {
      noticeStrip.style.display = 'none';
      sessionStorage.setItem('kcca-notice-dismissed', 'true');
    });
  }

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }
    });
  }

  if (hamburgerToggle && mobileOverlay) {
    function toggleMobileMenu() {
      const isOpen = mobileOverlay.classList.contains('open');
      if (isOpen) {
        mobileOverlay.classList.remove('open');
        hamburgerToggle.classList.remove('active');
        hamburgerToggle.setAttribute('aria-expanded', 'false');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      } else {
        mobileOverlay.classList.add('open');
        hamburgerToggle.classList.add('active');
        hamburgerToggle.setAttribute('aria-expanded', 'true');
        mobileOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    hamburgerToggle.addEventListener('click', toggleMobileMenu);

    const overlayLinks = document.querySelectorAll('.mobile-overlay-item, .mobile-overlay-actions a');
    overlayLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileOverlay.classList.contains('open')) {
          toggleMobileMenu();
        }
      });
    });
  }
});
