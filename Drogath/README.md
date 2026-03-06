# Drogath's Forge — QR Code Landing Page

A minimal static one-page site used as the destination for a printed QR code.
Visitors land here and click the anvil to be taken to the TCGplayer shop.

---

## Project structure

```
Drogath/
├── index.html                          ← page markup
├── styles.css                          ← all layout, hotspot position, animations
├── 0D36AF25-88AC-46EC-975D-4750ED364046.PNG  ← full-screen background image
├── .gitignore
└── README.md
```

---

## How the hotspot works

The clickable anvil area is an absolutely-positioned `<a>` tag layered over the
background image. Its position and size are set using **CSS custom properties
(variables)** at the top of `styles.css` inside the `:root` block:

```css
:root {
  --hs-left:   42%;   /* horizontal center of anvil */
  --hs-top:    62%;   /* vertical center of anvil   */
  --hs-width:  16%;   /* width of clickable area    */
  --hs-height: 14%;   /* height of clickable area   */
}
```

All four values are **percentages of the viewport**, so the hotspot scales
correctly on every screen size. `transform: translate(-50%, -50%)` is applied
so that `left`/`top` refer to the *center* of the hotspot rather than its
top-left corner — this makes centering over the anvil intuitive.

### To fine-tune the hotspot position

1. Open the page in Chrome or Firefox.
2. Press **F12** to open DevTools.
3. In the Elements panel, select `.anvil-hotspot`.
4. In the Styles panel, live-edit `left`, `top`, `width`, and `height`.
5. Once the box sits perfectly over the anvil, copy the values back into the
   `:root` block in `styles.css`.

---

## Replacing the image

1. Add the new image file to the `Drogath/` folder.
2. Open `styles.css`.
3. Find the `.scene` rule and update the `background-image` filename:
   ```css
   background-image: url("YOUR-NEW-FILENAME.png");
   ```
4. Commit and push — Vercel will redeploy automatically.

---

## GitHub setup — step-by-step

### 1. Create a new repository on GitHub

Go to https://github.com/new and create a **public** (or private) repo named
`drogath` (or any name you prefer). Do **not** initialise it with a README.

### 2. Initialise the local repository

Run these commands from inside the `Drogath/` folder:

```bash
cd ~/Desktop/Drogath

git init
git add .
git commit -m "Initial commit: Drogath QR code landing page"

# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

git branch -M main
git push -u origin main
```

### 3. Verify

Open your GitHub repo in a browser — all files should be visible under the
`main` branch.

---

## Vercel deployment — step-by-step

### Option A: Vercel dashboard (easiest)

1. Go to https://vercel.com and sign in with your GitHub account.
2. Click **"Add New… → Project"**.
3. Find and import your `drogath` repository.
4. Leave all settings at their defaults (Framework Preset: **Other**).
5. Click **Deploy**.

Vercel will assign a URL like `https://drogath.vercel.app`.
Every future push to `main` triggers an automatic redeploy.

### Option B: Vercel CLI

```bash
npm install -g vercel   # one-time install
cd ~/Desktop/Drogath
vercel                  # follow the prompts; link to your GitHub repo
```

### Custom domain (optional)

1. In the Vercel dashboard, open your project → **Settings → Domains**.
2. Add your domain and follow the DNS instructions.
3. Point your QR code at the Vercel URL or your custom domain.

---

## Updating the shop URL

The destination URL lives only in `index.html` on the `<a>` tag inside the
`.anvil-hotspot` element:

```html
<a
  class="anvil-hotspot"
  href="https://www.tcgplayer.com/search/all/product?seller=169de1d6&view=grid"
  ...
>
```

Change the `href` value, commit, and push to update the destination.

---

## Hiding the hint text

To remove the "Tap the anvil to enter the shop" line, either:

- Delete the `<p class="hint">` element from `index.html`, or
- Add `display: none;` to the `.hint` rule in `styles.css`.
