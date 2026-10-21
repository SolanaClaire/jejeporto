# JEJE Portfolio

A static portfolio landing page built from a Figma design, using plain HTML, CSS and a little JavaScript. No build step and no dependencies.

## Structure

```
jeje-portfolio/
├── index.html      # page markup
├── css/
│   └── style.css   # layout, colours, animations
├── js/
│   └── script.js   # scaling, carousel drag/arrows, scroll animations, button ripple
└── README.md
```

## Features

- Pixel-positioned 1440px layout that scales down on narrow screens
- Fixed navbar with animated link underlines
- Scroll reveal animations (respects `prefers-reduced-motion`)
- Story carousel: drag with the mouse, swipe, or use the arrow buttons
- Card hover "giggle" and animated pink buttons

## Run locally

Open `index.html` in a browser, or use the VS Code **Live Server** extension.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Fonts

Lilita One, Amaranth and Ubuntu are loaded from Google Fonts, so an internet connection is needed to display them.
