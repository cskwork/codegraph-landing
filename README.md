# CodeGraph — Unofficial Landing Page

A static landing page that explains how [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) works in detail — built from the public README and deployed via GitHub Pages.

> **Not affiliated** with CodeGraph or Anthropic. All trademarks belong to their respective owners.

## Live

Once Pages is enabled on this repo, the site is served at:

```
https://<owner>.github.io/<repo-name>/
```

## Stack

Three files, no build step:

- `index.html` — content + structure
- `styles.css` — dark theme, gradient accents, responsive layout
- `script.js` — install-tab switcher, copy buttons, scroll reveal, canvas graph background

`.nojekyll` is included so GitHub Pages serves the files as-is without Jekyll processing.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## License

The page itself is MIT — see CodeGraph's own [MIT license](https://github.com/colbymchenry/codegraph/blob/main/LICENSE) for the project this page documents.
