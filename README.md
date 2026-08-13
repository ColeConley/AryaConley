# Luna's Memorial Site

A single-page, scrollable photo memorial. Everything you'd want to change lives in **`content.js`**.

## Adding photos (automatic — recommended)

Once this is set up, adding photos is just: drop the file in `images`, push to GitHub, done. No editing required.

1. Open `content.js` and fill in the `REPO` section near the top with your GitHub username and this repository's name:

   ```js
   const REPO = {
     owner:  'yourusername',
     name:   'your-repo-name',
     branch: 'main',
     path:   'images',
   };
   ```

2. Drop your image files into the `images` folder (jpg, png, webp, or gif — jpg/webp load fastest).
3. Push to GitHub. The site fetches the current contents of the `images` folder each time it loads, so any photo that's in there just appears — nothing else to touch.

**Order:** photos are sorted by filename, so name them like `01-luna.jpg`, `02-luna.jpg`, `03-luna.jpg` if you care about the order. Otherwise they just sort alphabetically.

**Captions (optional):** if you want a caption under a specific photo, add it to the `CAPTIONS` object in `content.js`:

   ```js
   const CAPTIONS = {
     'luna-01.jpg': 'Her favorite windowsill, 2015',
     'luna-03.jpg': 'The day we brought her home',
   };
   ```

   Any photo not listed there just appears without a caption.

This works because the repo is public (which it needs to be for GitHub Pages on a free plan anyway) — the page asks GitHub's public API what's in the folder, no login required. It's plenty for a personal site; if you ever got unusually high traffic, GitHub's API has a light rate limit for this, though for a memorial site that's very unlikely to matter.

**Tip:** if your photos are very large (many phones shoot 4000px+ images), the page will load faster if you resize them to around 1600px on the longest side first. Any free tool (Preview on Mac, Photos on Windows, or a site like squoosh.app) can do this in bulk.

## Adding photos (manual — optional)

If you'd rather hand-pick exactly which photos show and in what order instead of relying on the folder, list them in the `PHOTOS` array in `content.js`:

```js
const PHOTOS = [
  { src: 'images/luna-01.jpg', caption: 'Her favorite windowsill, 2015' },
  { src: 'images/luna-02.jpg', caption: '' },
];
```

As soon as `PHOTOS` has anything in it, it's used instead of the automatic folder-based mode.

## Editing the text

Also in `content.js`, near the top:

- `hero-name` — her name
- `hero-dates` — birth–passing years
- `hero-epitaph` — the line under her name
- `message-text` — the short passage under the hero
- `closing-line` / `closing-signature` — the farewell at the very bottom

## Publishing with GitHub Pages

1. Create a new GitHub repository and add these files (`index.html`, `style.css`, `script.js`, `content.js`, the `images` folder) to it — either by pushing with git or uploading them through the GitHub web interface.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to "Deploy from a branch," choose your main branch and the `/ (root)` folder, then save.
4. GitHub will give you a URL (usually `https://yourusername.github.io/repo-name`) within a minute or two.
5. To point your own domain at it: in the same Pages settings, add your domain under "Custom domain," then add a `CNAME` record (or `A` records, per GitHub's instructions) at your domain registrar pointing to GitHub Pages.

## Files

```
index.html    the page structure
style.css     all visual styling
script.js     builds the gallery + powers the click-to-enlarge viewer
content.js    <- the only file you should need to edit day to day
images/       your photos go here
```