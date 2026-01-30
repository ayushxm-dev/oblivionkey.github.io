# Deploying to GitHub Pages

## 1. One-time setup on GitHub

1. Push this repo to GitHub (e.g. **`ayush61-netizen/ash-oblivionkey.github.io`**).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. No need to create a branch or add a `gh-pages` branch; the workflow deploys for you.

## 2. Deploy

- Pushing to the `main` branch runs the workflow and deploys the site.
- After the workflow finishes, the site is available at **https://ayush61-netizen.github.io/ash-oblivionkey.github.io/**.

If your default branch is `master` instead of `main`, either rename it to `main` on GitHub or change `branches: ["main"]` in `.github/workflows/pages.yml` to `["master"]`.

## 3. Social preview (og:image / twitter:image)

All six HTML files use absolute URLs for `og:image` and `twitter:image`:

`https://ayush61-netizen.github.io/ash-oblivionkey.github.io/assets/images/Photograph_01.jpeg`

Link previews (LinkedIn, Twitter, etc.) will work when the site is live at **https://ayush61-netizen.github.io/ash-oblivionkey.github.io/**.

## 4. Optional: custom domain

In **Settings → Pages**, you can set a custom domain and HTTPS. After the first deploy, your Pages URL is fixed; then add the domain and follow GitHub’s DNS instructions.
