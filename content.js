/* ============================================================
   EVERYTHING YOU'LL WANT TO EDIT LIVES IN THIS FILE.
   No HTML or CSS knowledge needed below — just edit the text
   between quotes, and the PHOTOS list at the bottom.
   ============================================================ */

// ---- Header text -------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  setText('hero-eyebrow', 'in loving memory of');
  setText('hero-name', 'Arya');
  setText('hero-dates', '2017 – 2026');
  setText('hero-epitaph', 'Our Sweet Girl. Our Girly. Our Baby. Our Blue Girl.');

  setText('message-text', 'You made our family complete. I hope you are getting all the greenies you want in heaven. We love you forever sweet girl.');

  setText('closing-line', 'Until we’re together again.');
  setText('closing-signature', 'With all my love.');
});

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ============================================================
   PHOTOS — AUTOMATIC MODE (recommended)
   ------------------------------------------------------------
   Fill in your GitHub username and repo name below, then just
   drop photos into the /images folder and push. The page will
   find them on its own — nothing else to edit, ever.

   Order: photos are sorted by filename, so name them like
   01-luna.jpg, 02-luna.jpg, 03-luna.jpg to control the order.
   Anything without a leading number just sorts alphabetically.
   ============================================================ */

const REPO = {
  owner: 'ColeConley',   // <-- your GitHub username
  name: 'AryaConley', // <-- the repository this site lives in
  branch: 'main',           // <-- change if your default branch is different
  path: 'images',
};

/* Optional: give specific photos a caption by filename.
   Any photo not listed here just appears without one. */
const CAPTIONS = {
  // 'luna-01.jpg': 'Her favorite windowsill, 2015',
  // 'luna-03.jpg': 'The day we brought her home',
};

/* ============================================================
   PHOTOS — MANUAL MODE (optional)
   ------------------------------------------------------------
   If you'd rather hand-pick exactly which photos appear and in
   what order instead of using the folder above, list them here.
   As soon as this list has anything in it, it's used instead of
   automatic mode.
   ============================================================ */

const PHOTOS = [
  // { src: 'images/luna-01.jpg', caption: 'Her favorite windowsill, 2015' },
  // { src: 'images/luna-02.jpg', caption: '' },
  // { src: 'images/luna-03.jpg', caption: 'The day we brought her home' },
];