# Blog posts: build and deployment guide

This site uses Gatsby to statically generate individual blog post pages from the StashDog API at build time, and it renders the blog index client‑side at runtime.

If you publish a new post in the backend, it will appear in the `/blog` index immediately (no rebuild needed). However, the post’s canonical page at `/blog/<slug>` is generated during the Gatsby build. To make that permalink live, you must run a new build and deploy.

## How it works

- Source of truth: Blog posts live in the API (`GATSBY_API_BASE_URL` defaulting to `https://api.stashdog.io`).
- Build-time page creation: During `gatsby build`, the site fetches all posts with `published: true` and creates a static page for each at `/blog/<slug>` using `src/templates/blog-post.js`.
- Runtime index: The `/blog` page (`src/pages/blog.js`) fetches posts client‑side from the API. In development, you can toggle “Include drafts.” In production, it shows only `published: true` posts.
- Content format: `post.content` can be Markdown or raw HTML. Markdown is converted with `marked` and sanitized in the browser.

Key files
- `gatsby-node.js`: Fetches published posts and calls `createPage` for each.
- `src/templates/blog-post.js`: Renders a single post, handles Markdown/HTML, SEO tags, and JSON‑LD.
- `src/pages/blog.js`: Blog index with filters and client‑side fetching.
- `src/utils/api.js`: API/GraphQL helpers used by the index page.
- `firebase.json`: Firebase Hosting config (serves `public/`).

URL structure
- Blog index: `/blog`
- Post page: `/blog/<slug>`

## Authoring a post (backend)

Create a post in the backend with at least these fields:
- `title` (string)
- `slug` (string; unique across posts — becomes the URL path)
- `content` (Markdown or HTML)
- `excerpt` (short teaser for cards and SEO fallback)
- `featuredImageUrl` (optional, full URL)
- `tags` (array of strings; kebab‑case recommended, used for filters e.g. `"tutorial"`, `"moving-relocation"`)
- `metaDescription` (optional; improves SEO)
- `published` (boolean; must be true to generate the static page)

Notes
- Duplicate slugs will collide at build time. Keep `slug` unique.
- Drafts (`published: false`) can appear on the index only in development (toggle shown in dev), not in production.

## Local preview

1) Start the dev server

```
yarn develop
# or
npm run develop
```

- Visit `http://localhost:8000/blog`.
- In development, a “Published” toggle lets you include drafts in the index.
- Individual post pages (`/blog/<slug>`) are only created for `published: true` posts (this is true in both dev and prod). To preview a draft’s detail page locally, temporarily set it to `published: true` in the backend, or ship a preview build to a temporary channel (see Deploy preview).

2) Test a production build locally (optional)

```
yarn build && yarn serve
# or
npm run build && npx gatsby serve
```

Visit the served URL (defaults to `http://localhost:9000/`).

## Build and deploy

Quick path

```
yarn deploy
# or
npm run deploy
```

What this does:
- Runs `gatsby build` (outputs to `public/`).
- Deploys the `public/` directory to Firebase Hosting (`firebase.json` controls rewrites/headers).

Alternative scripted deploy

```
./deploy.sh
```

The script ensures Firebase CLI is installed/logged in, cleans previous builds, installs deps if needed, builds, and deploys.

Deploy preview (temporary channel)

```
yarn deploy-preview
# or
npm run deploy-preview
```

This creates a temporary Firebase Hosting channel URL you can share for review. Remember: preview also builds from currently published posts in the backend.

## Environment variables

The site will work with defaults, but you can point to a different API by setting:
- `GATSBY_API_BASE_URL` (e.g. `https://staging-api.stashdog.io`)

For analytics (optional in production):
- `GATSBY_FIREBASE_*` variables are used by `src/hooks/useFirebase.js` for Firebase Analytics. Missing values won’t block the build; analytics events will no‑op in dev.

Recommended: place env vars in `.env.development` and `.env.production`. Gatsby exposes only variables prefixed with `GATSBY_` to the browser.

## Typical workflows

Publishing a new post to production
1. Create/edit the post in the backend and set `published: true`.
2. Verify it appears on `/blog` in local dev (optional).
3. Run `yarn deploy` (or `npm run deploy`).
4. Validate `/blog/<slug>` loads and renders as expected.

Updating an existing post
1. Edit in the backend and keep `published: true`.
2. Re‑deploy to update the static post page.
   - The `/blog` index will reflect changes immediately via client‑side fetch, but the post detail page won’t update until you rebuild.

Previewing drafts
- Use `yarn deploy-preview` to build from currently published content to a temporary URL.
- Draft detail pages are not generated unless `published: true`.

## Troubleshooting

- I can see my new post on `/blog`, but `/blog/<slug>` 404s
  - Rebuild and deploy. Static post pages are generated only during `gatsby build` from `published: true` posts.

- Build fails with a network/API error
  - Check API health and CORS. Ensure `GATSBY_API_BASE_URL` is correct and reachable from your build environment. The build queries `${GATSBY_API_BASE_URL}/graphql`.

- My image doesn’t show
  - `featuredImageUrl` should be an absolute URL. Verify it’s publicly accessible.

- Drafts aren’t visible locally
  - The index shows a “Published” toggle only when running `gatsby develop`. Detail pages for drafts aren’t generated; temporarily set `published: true` for a full-page preview.

- Cache/CDN seems to serve an old version
  - Firebase sets long cache headers for assets and shorter cache for HTML (1 hour). Re‑deploying produces new asset file names (content‑hashed). Hard refresh if needed.

## Reference

Build scripts (`package.json`):
- `build`: `gatsby build`
- `deploy`: `gatsby build && firebase deploy`
- `deploy-preview`: `gatsby build && firebase hosting:channel:deploy preview`

Hosting config: `firebase.json` (serves `public/`, rewrites all routes to `/index.html`, sets cache headers).
