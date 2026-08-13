# Param Rice — Website

Premium homepage for **Param Rice**, a Bangalore-headquartered rice mill.
Plain HTML/CSS/JS — no build step, no dependencies, no npm install.
That means you can push this straight to GitHub and publish it in minutes.

## Publish it with GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `param-rice`) and upload every file in this folder,
   **keeping the folder structure** (`index.html` at the root, `css/` and `js/` beside it).
   - Easiest way: on the repo page, click **Add file → Upload files**, drag in this whole folder.
   - Or with git:
     ```bash
     git init
     git add .
     git commit -m "Param Rice website"
     git branch -M main
     git remote add origin https://github.com/<your-username>/param-rice.git
     git push -u origin main
     ```
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`, then **Save**.
4. GitHub gives you a live URL within a minute or two, typically:
   `https://<your-username>.github.io/param-rice/`

No server, no build pipeline — GitHub just serves the static files.

## File structure

```
param-rice/
├── index.html          → page structure (all sections)
├── css/
│   └── styles.css      → the whole design system (colours, type, layout, responsive rules)
├── js/
│   ├── data.js          → EDIT THIS for content: phone/WhatsApp/social, products, copy
│   └── main.js          → rendering + interaction logic (cart, search, filters, drawers)
├── assets/
│   └── IMAGE-CREDITS.md → photo credits for the current placeholder photography
└── README.md
```

## What to edit first

Almost everything you'll want to change lives in **`js/data.js`**:

- `brandConfig` — phone number, WhatsApp number, email, Instagram/Facebook/YouTube URLs.
  Everything on the site (floating buttons, footer, bulk section, WhatsApp pre-filled
  messages) reads from this one object.
- `products` — add, remove or edit rice varieties. Only the pack sizes you list appear
  on the site, so add real pricing/pack sizes as you finalise them.
- `siteImages` — swap any of these Unsplash URLs for your own photography once you have
  real mill/product photos. You can point them at a local path too, e.g.
  `"assets/brand/mill.jpg"` — just add that file under `assets/` and reference it.
- `journeySteps`, `qualitySteps`, `whyPoints`, `recipes` — copy for those sections.

You generally won't need to touch `index.html` or the JS logic just to update content.

## Logo

Your supplied Param Rice logo is now the site's actual logo — used in the header,
mobile menu, footer, and as the favicon/touch icon. It lives at
`assets/brand/param-rice-logo.png`, cleaned up from your original file (background
removed and made transparent, tightly cropped) so it sits cleanly on both the dark
header and the ivory sections. Extra sizes for favicons live alongside it
(`favicon-32.png`, `favicon-64.png`, `logo-192.png`, `logo-512.png`) — replace all of
these with a new export if you ever update the artwork, keeping the same filenames.

## Current photography

The site currently uses five licensed Unsplash photos (paddy field, rice grains,
a harvesting shot, a biryani bowl and a banana-leaf plate) as placeholders — see
`assets/IMAGE-CREDITS.md`. They're free for commercial use under the Unsplash License,
but were chosen as **stand-ins**, not as final brand photography. Replace them with real
Param Rice mill and product photography as soon as it's available — that's what points
36–48 of the original brief asked for, and it will make the biggest visual difference.

Remaining product cards (Sona Masoori, Raw Rice, Boiled Rice, etc.) use a subtle original
grain-pattern illustration rather than a stock photo, since no accurately-licensed photo
of *that specific product* existed to source — swap those in as you photograph each pack.

## What's implemented vs. what's next

**Working now:** responsive layout (320px–4K), product search/filter, cart with quantity
controls and subtotal, demo checkout, "Order via WhatsApp" (builds a message from the
cart), bulk enquiry form (demo submit), floating call/WhatsApp bar, scroll-reveal
animation, reduced-motion support.

**Not yet built** (this is the homepage only, from the original brief's much larger
15-page spec): individual product detail pages, a real payment gateway, a backend for
orders/enquiries, recipe detail pages, and the policy pages (shipping/terms/privacy/refund)
linked in the footer are currently placeholders (`href="#"`).

## No attribution required, but…

The Unsplash License doesn't require photo credit, but `assets/IMAGE-CREDITS.md` lists
photographers as good practice — keep or remove it as you prefer once you're using your
own photography.
