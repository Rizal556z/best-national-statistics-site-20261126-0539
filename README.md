[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Rizal556z/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Rizal556z/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# Kavaria Statistics — National Statistics Office

An original national statistics site for the fictional Republic of Kavaria,
built for the [make.fun bounty “Make the best national statistics site”](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

The site runs offline in a browser from static files, on a desktop and on a
phone, with no network request. It has ten sections — overview, population,
economy, health, education, regions, labour, prices, data downloads and
about — each reached by a link, with real figures in place and every control
doing what it says: year selectors, economy tabs, region search and sorting,
site search, and CSV downloads. Charts are drawn with plain canvas and SVG-free
JavaScript; there are no libraries and no external resources.

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Or open `app/index.html` directly in a browser.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts` library.

## Layout

- `app/index.html` — page shell, header navigation and footer
- `app/style.css` — the site's design
- `app/data.js` — every published figure, with sources
- `app/charts.js` — plain-canvas line, bar, horizontal-bar and donut charts
- `app/views.js` — the ten pages
- `app/main.js` — hash router and page controls
- `screenshots/` — real renders of the site in a browser
- `main.ts` — the entry program
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged

## Licence

MIT — see [LICENSE](LICENSE).
