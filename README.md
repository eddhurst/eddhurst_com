# Edd Hurst, I Imagine

Personal portfolio for Edd Hurst. It's plain HTML, CSS and a little vanilla JavaScript. There's no framework, build step, package manager or server runtime.

```
index.html        Homepage
projects.html     Side projects and experiments
sculpture.html    Stone carving gallery (with lightbox)
privacy.html      Universal privacy policy for all Edd Hurst projects
css/              styles.css (tokens, base, layout) · components.css · responsive.css
js/               main.js (footer, social links, project list) · gallery.js (gallery + lightbox)
data/             site-config.js · projects.js · sculptures.js
fonts/            Self-hosted fonts (Archivo, Atkinson Hyperlegible, JetBrains Mono, all OFL)
images/           favicon, projects/, sculptures/
.github/workflows/deploy.yml   GitHub Pages deployment
```

All paths are relative, so the site works at a custom domain and under a `username.github.io/repo/` URL.

## Run locally

Opening `index.html` directly in a browser works. To match how it runs in production, serve the folder with any static server instead:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Update project information

Edit `data/projects.js`. Each entry is one object: `name`, `description`, `category` and `technologies` are required. `image`, `imageAlt`, `liveUrl`, `githubUrl` and `featured` are optional. Entries with `featured: true` appear on the homepage, and `featuredProjectCount` in `site-config.js` sets how many. Put thumbnails in `images/projects/`.

The current entries are marked placeholders (`placeholder: true`). Replace or delete them.

## Add sculpture photographs

1. Put photographs in `images/sculptures/`. Use JPEG or WebP, roughly 2000px on the long edge.
2. In `data/sculptures.js`, replace the placeholder entries with `image`, `width`, `height`, `alt`, `title`, `material`, `year` and an optional `description`. Remove `placeholder: true`.
3. In `sculpture.html`, delete the "Placeholder images" notice (`<div class="notice">`).
4. In `index.html`, change the image in the "A different kind of making" section and remove its placeholder tag.

Write alt text that describes the object itself: its form, the stone and the finish.

## Update social links

Set the URLs in `data/site-config.js` under `social`. While a URL is empty, the footer shows that link as "coming soon".

## Edit the privacy policy

The policy is written directly in `privacy.html` so it works without JavaScript and is easy for Google Play to read. Before publishing:

- Replace `[Add a dedicated contact email address]` in section 9.
- Update "Last updated" whenever the policy changes.
- Review the policy every time a project adds a library, SDK, permission or external API that could process personal data. Check hosting logs too. The policy must match what each project actually does.
- Each Android app still needs its own accurate **Data safety** form in Google Play Console. Base it on that app's real behaviour and the SDKs it includes.

Public URL for Play Console and app listings: `https://eddhurst.github.io/privacy.html`

## Enable GitHub Pages deployment

1. Push this repository to GitHub. Name it `eddhurst.github.io` so the site is served from `https://eddhurst.github.io/`.
2. Go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` copies the site files and publishes them. You can also run it by hand from the **Actions** tab.

## Configure a custom domain

1. Create a file called `CNAME` in the repository root containing only the domain, for example `eddhurst.com`. The workflow includes it automatically.
2. At your DNS provider, add `A` records for the apex domain pointing to GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and/or a `CNAME` record for `www` pointing to `eddhurst.github.io`.
3. Under **Settings → Pages**, enter the domain and turn on **Enforce HTTPS** once the certificate is ready.

If you use a custom domain, keep `https://eddhurst.github.io/privacy.html` working. GitHub redirects it automatically, but update the policy URL in Play Console if you prefer the custom domain.
