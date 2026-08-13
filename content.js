/* ============================================================
   EVERYTHING YOU'LL WANT TO EDIT LIVES IN THIS FILE.
   No HTML or CSS knowledge needed below — just edit the text
   between quotes, and the PHOTOS list at the bottom.
   ============================================================ */

// ---- Header text -------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  setText('hero-eyebrow',   'in loving memory of');
  setText('hero-name',      'Luna');
  setText('hero-dates',     '2012 – 2026');
  setText('hero-epitaph',   'The best patch of sunlight in the house was always wherever she happened to be sitting.');

  setText('message-text',   'These are the years, the afternoons, and the small ordinary moments — collected here so they’re never far from reach.');

  setText('closing-line',      'Until we’re together again.');
  setText('closing-signature', 'With all my love.');
});

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ============================================================
   PHOTOS
   ------------------------------------------------------------
   1. Put your image files in the /images folder.
   2. Add one line per photo below with the filename.
   3. "caption" is optional — delete the line or leave it as ''
      if you don't want text under a particular photo.
   4. Photos appear in the order you list them here.
   ============================================================ */

const PHOTOS = [
  // { src: 'images/luna-01.jpg', caption: 'Her favorite windowsill, 2015' },
  // { src: 'images/luna-02.jpg', caption: '' },
  // { src: 'images/luna-03.jpg', caption: 'The day we brought her home' },
];
