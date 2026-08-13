document.addEventListener('DOMContentLoaded', () => {
  const grid   = document.getElementById('gallery-grid');
  const empty  = document.getElementById('gallery-empty');
  const photos = (typeof PHOTOS !== 'undefined') ? PHOTOS : [];

  if (!photos.length) {
    empty.hidden = false;
    return;
  }

  // ---- Build the gallery -------------------------------------------------
  photos.forEach((photo, index) => {
    const figure = document.createElement('figure');
    figure.dataset.index = index;

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption || 'A photo';
    img.loading = 'lazy';

    figure.appendChild(img);

    if (photo.caption) {
      const caption = document.createElement('figcaption');
      caption.textContent = photo.caption;
      figure.appendChild(caption);
    }

    figure.addEventListener('click', () => openLightbox(index));
    grid.appendChild(figure);
  });

  // ---- Fade photos in as they scroll into view ---------------------------
  const figures = grid.querySelectorAll('figure');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  figures.forEach((figure) => observer.observe(figure));

  // ---- Lightbox ------------------------------------------------------------
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const btnClose     = document.getElementById('lightbox-close');
  const btnPrev       = document.getElementById('lightbox-prev');
  const btnNext       = document.getElementById('lightbox-next');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    showPhoto(currentIndex);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function showPhoto(index) {
    const photo = photos[index];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.caption || 'A photo';
    lightboxCap.textContent = photo.caption || '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % photos.length;
    showPhoto(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    showPhoto(currentIndex);
  }

  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft')  showPrev();
  });
});
