# GitHub Pages deploy failure – diagnosis

## Errors you’re seeing

1. **Get Pages site failed. Error: Not Found**  
   The Pages API returns 404 because no Pages site exists for this repo yet.

2. **Create Pages site failed. Error: Resource not accessible by integration**  
   The workflow token cannot create a Pages site; only a person with repo admin can enable it in the UI.

## Root cause

**The repo’s Pages source is not set to “GitHub Actions”.**

Until that is set once in **Settings → Pages**, the workflow will always fail at the **Setup Pages** step (`actions/configure-pages`). There is no way to fix this from the workflow file alone.

- Docs: [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow): *“To configure your site to publish with GitHub Actions … Under ‘Build and deployment’, under ‘Source’, select **GitHub Actions**.”*
- Docs: [Using custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages): *“To start using custom workflows you must first **enable them** for your current repository.”* (That “enable” step is choosing **GitHub Actions** as the source in Settings → Pages.)

## Workflow check (your file is correct)

| Requirement | Your workflow | Status |
|-------------|----------------|--------|
| Permissions | `contents: read`, `pages: write`, `id-token: write` | OK |
| Job uses `environment: github-pages` | Yes | OK |
| Step: checkout | `actions/checkout@v4` | OK |
| Step: configure Pages | `actions/configure-pages@v5` | OK (fails only until Source is set) |
| Step: upload artifact | `actions/upload-pages-artifact@v4` with `path: "."` | OK |
| Step: deploy | `actions/deploy-pages@v4` with `id: deployment` | OK |
| `index.html` at repo root | Present | OK |

Your `.github/workflows/pages.yml` matches GitHub’s “single job, no build” pattern. The only missing piece is the one-time setting in the repo.

## Fix (do this once)

1. Open: **https://github.com/ayushxm-dev/oblivionkey.github.io**
2. Click **Settings** (repo top bar).
3. Left sidebar → **Pages** (under “Code and automation”).
4. Under **“Build and deployment”**:
   - **Source** → choose **“Static HTML”** (Deploy static files without a build) or **“GitHub Actions”** if shown.
   - Click **Save** if there is a save button, and wait a few seconds.
5. The workflow now uses `enablement: true` in the Setup Pages step, so it may try to enable Pages automatically. If it still fails, add a **Personal Access Token (PAT)** with **repo** scope as a repository secret named **PAGES_TOKEN** (Settings → Secrets and variables → Actions → New repository secret); then re-run the workflow.

After that, the next run of “Deploy to GitHub Pages” (on push to `main` or from Actions → “Run workflow”) should succeed, and the site will be at:

**https://ayushxm-dev.github.io/oblivionkey.github.io/**

## If you don’t see “GitHub Actions” as a source

- You must have **Admin** (or **Maintain**) permission on the repo.
- If this is an organization repo, the org may restrict who can change the Pages source; an org admin may need to do step 4 or relax the restriction.

## Summary

| What | Status |
|------|--------|
| Workflow file | Correct; no code change needed |
| Repo structure (root `index.html`, `path: "."`) | Correct |
| **Pages source = “GitHub Actions”** | **Must be set once in Settings → Pages** |

The failure is due to that single missing setting, not to a bug in the workflow or the project layout.
