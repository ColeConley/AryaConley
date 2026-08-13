# Luna's Memorial Site

A single-page, scrollable photo memorial. Everything you'd want to change lives in **`content.js`**.

## Adding photos

1. Drop your image files into the `images` folder (jpg, png, or webp all work — jpg/webp will load fastest).
2. Open `content.js` and add one line per photo to the `PHOTOS` list near the bottom:

   ```js
   const PHOTOS = [
     { src: 'images/luna-01.jpg', caption: 'Her favorite windowsill, 2015' },
     { src: 'images/luna-02.jpg', caption: '' },
     { src: 'images/luna-03.jpg', caption: 'The day we brought her home' },
   ];
   ```

   - `caption` is optional. Leave it as `''` if you don't want text under a photo.
   - Photos appear in the order you list them.
   - You can add as many as you like — the gallery lays itself out automatically.

3. Save, refresh the page, and they'll appear.

**Tip:** if your photos are very large (many phones shoot 4000px+ images), the page will load faster if you resize them to around 1600px on the longest side first. Any free tool (Preview on Mac, Photos on Windows, or a site like squoosh.app) can do this in bulk.

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
