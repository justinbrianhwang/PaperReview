# Paper Reviews

A bilingual (English / Korean) static site for structured paper reviews, hosted on GitHub Pages.

## Features

- Bilingual support with language toggle (EN/KO)
- Paper cards with thumbnail images, tags, and search
- Detailed review pages with figures, tables, and structured analysis
- Responsive dark theme

## Structure

```
├── index.html          # Main page (paper list)
├── paper.html          # Individual review page
├── style.css           # Styles
├── script.js           # Rendering + language logic
├── papers/
│   └── data.js         # All paper review data
└── images/
    └── {paper-id}/     # Per-paper images and figures
```

## Adding a Paper

Add a new object to the `PAPERS` array in `papers/data.js` with both `en` and `ko` fields. Place images in `images/{paper-id}/`.

## Live Site

[https://justinbrianhwang.github.io/PaperReview/](https://justinbrianhwang.github.io/PaperReview/)
