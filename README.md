[README (2).md](https://github.com/user-attachments/files/26560753/README.2.md)
# Holidae 🌍

A responsive holiday booking website prototype built with HTML, CSS and JavaScript.

## About

Holidae is a front-end prototype for a holiday booking company. The site is designed mobile-first, reflecting the company's own data — 78% of users browse on mobile and 52% book on desktop.

## Features

- Responsive layout using CSS media queries (breakpoints at 768px and 900px)
- Live booking calculator with real-time price breakdown
- Scroll-triggered animations using Intersection Observer API
- Mobile hamburger navigation menu
- Lazy-loaded destination photography via Unsplash CDN
- Six destination cards, featured banner, photo gallery

## Files

| File | Purpose |
|---|---|
| `holidae.html` | Complete self-contained site (HTML + CSS + JS in one file) |
| `holidae_HTML.html` | HTML structure only |
| `holidae_CSS.css` | Stylesheet with all responsive rules |
| `holidae_JS.js` | JavaScript for menu, calculator and animations |

## How to run

No installation needed. Just open `holidae.html` in any browser.

```bash
# Clone the repo
git clone https://github.com/yourusername/holidae.git

# Open in browser
open holidae.html
```

## Built with

- HTML5 (semantic elements, viewport meta tag)
- CSS3 (custom properties, Flexbox, Grid, media queries)
- Vanilla JavaScript (no frameworks)
- [Google Fonts](https://fonts.google.com) — Playfair Display + Outfit
- [Unsplash](https://unsplash.com) — photography (requires internet connection)

## Responsive breakpoints

| Breakpoint | Layout |
|---|---|
| `> 900px` | 3-column card grid, side-by-side booking panel |
| `768px – 900px` | 2-column card grid, stacked booking panel |
| `< 768px` | Single column, hamburger menu, stacked search form |

## Limitations

This is a front-end prototype only. There is no backend — the search form does not filter results and the Book Now button does not process real bookings.

---

Made for a web development assignment · 2026
