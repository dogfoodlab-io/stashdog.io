# StashDog Blog Pipeline Reference

This repository already documents the live blog publishing path in `n8n-workflows/SETUP.md`.

## Preferred Publish Path

Use the Supabase Edge Function `publish-blog-post`.

What it does:
- Accepts `title` and `content`, with optional `slug`, `excerpt`, `tags`, `meta_description`, `author_id`, `image_style`, and `image_prompt`
- Generates the hero image
- Uploads the image to Supabase Storage
- Inserts the post into `content.blog_posts`
- Returns the post URL and image URL

## Relevant Repo Facts

- Gatsby blog pages are created from Supabase content at build time.
- The deploy workflow is `.github/workflows/firebase-hosting-merge.yml`.
- That workflow supports `workflow_dispatch`, so it can be retriggered manually after publishing.

## Legacy Reference Flow

The attached `Create Blog SubFlow.json` shows the older multi-step behavior:
- Optional research
- Prompted copywriting agent with StashDog KB grounding
- Create draft post
- Generate hero image
- Tag post
- Optional human review through Discord
- Update draft or approve publication
- Trigger static rebuild workflow

Use that sequence as inspiration for task order and review branching, but prefer the live edge function when actually publishing.

## Publishing Payload Shape

Minimum useful payload:

```json
{
  "title": "How to Create a Home Inventory",
  "content": "# Markdown content",
  "slug": "how-to-create-a-home-inventory",
  "excerpt": "Short summary",
  "tags": ["home inventory", "organization"],
  "meta_description": "Search snippet text",
  "image_style": "generated"
}
```

## Practical Writing Constraints

- Keep product claims aligned with actual stashdog.io behavior and docs.
- Write for household inventory and organization use cases, not generic productivity software.
- Favor concrete, useful advice over generic SEO filler.