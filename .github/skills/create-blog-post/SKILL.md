---
name: create-blog-post
description: 'Create and publish a StashDog blog post in brand voice. Use when asked to write a blog post, create SEO content, draft a StashDog article, generate a hero image, publish to Supabase blog_posts, or retrigger the GitHub deploy workflow.'
argument-hint: 'Topic, keyword, or short blog brief'
---

# Create Blog Post

Create a StashDog blog post from a topic or brief, ground it in product context, generate a matching hero image, publish it into Supabase `content.blog_posts`, and retrigger the Gatsby/Firebase deploy workflow.

Use this skill when the user asks for any of the following:
- Write or publish a StashDog blog post
- Create SEO content for stashdog.io
- Draft an article in the StashDog brand voice
- Generate a hero image for a blog post
- Push a new post to Supabase and redeploy the site

## Inputs

The user should ideally provide:
- A topic, target keyword, or short brief
- Whether the result should be a draft-for-review or directly published
- Any required angle, audience, or CTA

If any of those are missing, ask only for the missing decision that blocks publishing.

## Sources Of Truth

Start by grounding in repo context before writing:
1. Read [pipeline reference](./references/stashdog-blog-pipeline.md).
2. Read relevant product and brand pages in `src/pages/` and supporting docs in `docs/`.
3. Use repo facts conservatively: blog pages are built from Supabase during Gatsby build.
4. Treat the attached n8n flow as implementation reference for sequence and review logic, not as the preferred publishing path.

## Procedure

1. Clarify the publishing mode.
If the user did not specify, ask whether they want a draft only or a published post.

2. Gather StashDog context.
Read only the files needed to anchor claims about the product, audience, and messaging. Prefer nearby product pages and docs over broad repo exploration.

3. Draft the article.
Write a complete markdown post with:
- A clear, search-oriented title
- A stable slug
- A concise excerpt
- A meta description under typical search snippet length
- Body content that reflects the StashDog voice: practical, specific, lightly opinionated, and grounded in real household inventory problems

4. Check brand and factual quality before publishing.
Disconfirm weak claims against the repo context. Remove or soften anything the repo does not support.

5. Generate the hero image.
Prefer the live publish pipeline's generated image path unless the user explicitly asks for a different style. If a custom visual direction is requested, include an `image_prompt` that still fits the StashDog brand.

6. Publish to Supabase.
Use the live blog publishing path documented in the reference file so the post lands in `content.blog_posts` with its hero image uploaded to Supabase Storage.

7. Retrigger deployment.
Trigger the GitHub workflow named `Deploy to Firebase Hosting on merge` after publishing so Gatsby rebuilds against the new Supabase content.

8. Report the result.
Return the title, slug, publish status, and any deploy trigger details. If publishing was skipped, return the draft content and the blocker.

## Decision Points

- Draft vs publish:
If the user wants review first, stop after producing the article package unless they explicitly ask you to publish.

- Research depth:
If the topic depends on external facts, gather only the minimum external evidence needed. Keep product claims anchored to the repo.

- Image mode:
Use the default generated image path unless the user asks for `svg`, `none`, or a custom prompt.

## Completion Checks

Before considering the task complete, verify:
- The post includes `title`, `content`, `slug`, `excerpt`, and `meta description`
- The content matches StashDog positioning and does not invent unsupported product details
- The publish request targets the live Supabase pipeline, not the legacy n8n JSON
- The post is stored in `content.blog_posts`
- The GitHub deploy workflow was triggered, or the reason it was not triggered is stated clearly

## Notes

- Prefer the live Supabase Edge Function over legacy n8n publishing.
- Use the n8n workflow only as a behavioral reference for content generation, optional review, tagging, and image sequencing.
- If credentials or environment access are unavailable, still produce the fully publishable article package and say exactly what remains to be run.