const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Natural sort so "2.jpg" comes before "10.jpg" instead of after.
function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

// Auto mode: ask GitHub what's currently in the /images folder.
async function fetchPhotosFromRepo() {
  if (typeof REPO === 'undefined' || !REPO.owner || REPO.owner === 'yourusername') {
    return null; // not configured yet
  }

  const url = `https://api.github.com/repos/${REPO.owner}/${REPO.name}/contents/${REPO.path}?ref=${REPO.branch}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const files = await response.json();
  const captions = (typeof CAPTIONS !== 'undefined') ? CAPTIONS : {};

  return files
    .filter((file) => {
      const lower = file.name.toLowerCase();
      return file.type === 'file' && IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext));
    })
    .sort((a, b) => naturalCompare(a.name, b.name))
    .map((file) => ({
      src: `${REPO.path}/${file.name}`,
      caption: captions[file.name] || '',
    }));
}

async function getPhotos() {
  // Manual mode takes priority if the PHOTOS list has anything in it.
  if (typeof PHOTOS !== 'undefined' && PHOTOS.length) {
    return PHOTOS;
  }

  try {
    const autoPhotos = await fetchPhotosFromRepo();
    return autoPhotos || [];
  } catch (err) {
    console.error('Could not load photos automatically:', err);
    return [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const grid   = document.getElementById('gallery-grid');
  const empty  = document.getElementById('gallery-empty');

  empty.textContent = 'Loading photos…';
  empty.hidden = false;

  const photos = await getPhotos();

  if (!photos.length) {
    empty.textContent = 'No photos yet — add some to the images folder (and set REPO in content.js for them to appear automatically, or list them in the PHOTOS array).';
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

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