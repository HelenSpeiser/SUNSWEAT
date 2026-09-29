# SUNSWEAT website

Static website (HTML, CSS and a little vanilla JavaScript), built from the Claude Design prototypes in `../project/`. No framework, no build step, no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder with any static server:

```sh
cd site
python3 -m http.server 8000   # then visit http://localhost:8000
```

To deploy, upload the contents of `site/` to any static host (Netlify, Vercel, S3, a regular web server, etc.).

## Pages

| File | Page | Page styles |
| --- | --- | --- |
| `index.html` | Home | in `styles.css` |
| `the-method.html` | The Method | `the-method.css` |
| `classes.html` | Classes | `classes.css` |
| `new-here.html` | New Here | `new-here.css` |
| `pricing.html` | Pricing | `pricing.css` |
| `about.html` | About | `about.css` |

- `styles.css`: shared styles (brand colours and fonts, header, gold buttons, hero and wave divider, scrolling band, footer) plus the homepage sections. Every page loads it first, then its own CSS file.
- `main.js`: the phone menu toggle (every page) and the scroll "bloom" reveal. Elements with `data-bloom="rise"` rise into place and elements with `data-bloom="open"` open from a circle as they scroll into view. The reveal is used on Home and The Method.
- `assets/`: images, logos and the brand fonts (MADE Mirage, Avenir Next). Check that the font licences cover web use before launch.

## Phones and tablets

The designs covered desktop only, so small-screen layouts were added with the client's approval, inside `@media` blocks at the end of each CSS file. Desktop is unchanged. At 860px and below, the nav folds into a menu button that opens a dropdown on the right. At 760px and below, multi-column sections stack into one column.

## Still to do before launch

- **Class schedule:** `classes.html` has an empty `#schedule` section, whose container is marked `data-schedule-embed`. Paste the booking provider's embed code there.
- **Contact form:** the form on `about.html` is visual only and needs a form handler or service.
- **Rhonda's photo:** it's a labelled placeholder on `about.html`.
- **Placeholder links:** the social links (Instagram, Facebook, TikTok) and Privacy Policy / Terms of Service in the footer point to `#`.
