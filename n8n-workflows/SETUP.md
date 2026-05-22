# Blog Publishing Pipeline

## Supabase Edge Function — `publish-blog-post` (LIVE)

```
POST https://gmchczeyburroiyzefie.supabase.co/functions/v1/publish-blog-post
```

### Authentication

Pass the **service_role JWT** as a Bearer token:

```
Authorization: Bearer <service_role_jwt>
```

### Input Schema

```json
{
  "title": "Required — blog post title",
  "content": "Required — full markdown content",
  "slug": "Optional — auto-generated from title",
  "excerpt": "Optional — auto-generated from content",
  "tags": ["array", "of", "tags"],
  "meta_description": "Optional — max 155 chars",
  "author_id": "Optional — defaults to Raz",
  "image_style": "generated",
  "image_prompt": "Optional — custom prompt for image generation"
}
```

**Required fields:** `title`, `content`

**Defaults:**

| Field | Default |
|---|---|
| `slug` | Auto-generated from title |
| `excerpt` | First 200 chars of content |
| `tags` | `["stashdog"]` |
| `meta_description` | Truncated excerpt (155 chars) |
| `author_id` | Raz's UUID |
| `image_style` | `"generated"` |

### Image Generation

Controlled via the `image_style` field:

| Value | Behavior |
|---|---|
| `"generated"` (default) | Real image via **Gemini 2.5 Flash Image Preview** (`google/gemini-2.5-flash-image-preview`) through OpenRouter. Falls back to SVG if generation fails. |
| `"svg"` | LLM-generated SVG via Gemini 2.5 Flash. Brand-styled: dark bg, yellow accent, glass-morphism. |
| `"none"` | Skip image generation entirely. |

Use `"generate_image": false` as shorthand for `"image_style": "none"`.

The optional `image_prompt` field overrides the default StashDog brand prompt — useful for custom hero images.

**Environment variables used:**
- `OPENROUTER_API_KEY` — Required for image generation (already set in Supabase secrets)
- `SUPABASE_SERVICE_ROLE_KEY` — Auto-set by Supabase runtime
- `BLOG_PIPELINE_KEY` — Optional custom auth key (falls back to service role)

### Pipeline Steps

1. Validates & normalizes input
2. Generates hero image (real image or SVG, based on `image_style`)
3. Uploads image to Supabase Storage (`blog-assets` bucket)
4. Inserts into `content.blog_posts` with `published: true`
5. Updates `marketing_content` status → published (if matching title exists)
6. Logs to `marketing_activities`
7. Returns post ID, URL, and image URL

### Example

```bash
SERVICE_KEY="<your-service-role-jwt>"

curl -X POST "https://gmchczeyburroiyzefie.supabase.co/functions/v1/publish-blog-post" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "How to Create a Home Inventory",
    "content": "# Guide\n\nFull markdown here...",
    "tags": ["home inventory", "how-to"],
    "image_style": "generated"
  }'
```

### After Publishing

The post is in Supabase but won't appear on stashdog.io until a Gatsby rebuild:

```bash
cd stashdog.io && gatsby build && firebase deploy --only hosting
```

### Wolf Pack Integration

Agents call this endpoint directly via HTTP with the service_role Bearer token. No n8n dependency.

## Legacy: n8n Workflow

The `publish-blog-post.json` file contains an equivalent n8n workflow (not imported — API key is read-only). The edge function is the recommended approach.
