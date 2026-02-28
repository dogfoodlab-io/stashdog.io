# Public Schema Declutter: Client Migration Guide

This is the **living client-facing migration guide** for the public schema declutter program.

Use this document to track each phase, required client changes, and rollout dates. Every schema move must add/update a section here before merge.

## Migration Policy (Required for every phase)

For each database move, we must document:

1. **What moved** (table/view/function + old/new schema)
2. **Who is affected** (mobile app, edge functions, internal scripts, BI, SQL clients)
3. **What clients must change** (code-level examples)
4. **Cutover sequence** (deploy order)
5. **Rollback plan**
6. **Verification checklist**

## How clients should query non-public schemas

### Supabase JS

```ts
const { data, error } = await supabase
  .schema('content')
  .from('blog_posts')
  .select('*')
```

### Supabase REST (this repo helper)

Use schema profile headers (`Accept-Profile`, `Content-Profile`) via `apiRequest`:

```js
apiRequest('/blog_posts?select=*', { schema: 'content' })
```

### SQL / RPC calls

- Prefer schema-qualified references (for example `content.blog_posts`).
- Keep public RPC names only when explicitly marked as stable API contract.

## Phase A.1 (Implemented): Blog domain moved to content schema

### Summary

Moved blog domain objects out of `public`:

- `public.blog_posts` -> `content.blog_posts`
- `public.blog_tags` -> `content.blog_tags`
- `public.blog_tags_by_category` -> `content.blog_tags_by_category`

### Migration artifact

- `supabase/migrations/20260228130000_schema_declutter_phase_a_blog_to_content.sql`

### Code updates shipped (this repo)

- `src/utils/api.js` now supports schema-qualified Supabase REST access via `apiRequest(..., { schema: 'content' })`.
- Blog reads in this repository currently go through backend GraphQL (`/graphql`) and do not directly query `blog_posts`/`blog_tags` through Supabase JS or raw PostgREST table endpoints.

### Required client updates

If any client currently queries blog tables directly from public, update to schema-qualified access:

- Replace `.from('blog_posts')` with `.schema('content').from('blog_posts')`
- Replace `.from('blog_tags')` with `.schema('content').from('blog_tags')`

For raw SQL:

- Replace `SELECT ... FROM public.blog_posts` with `SELECT ... FROM content.blog_posts`
- Replace `SELECT ... FROM public.blog_tags` with `SELECT ... FROM content.blog_tags`

For Supabase REST:

- Add schema profile headers (or pass `{ schema: 'content' }` to this repo's `apiRequest`) when reading/writing moved blog tables.

### Compatibility notes

- Public RPC signatures remain available for:
  - `public.update_blog_tag_usage_count(...)`
  - `public.get_recommended_tags_for_post(...)`
- Their internals now reference `content.blog_tags`.

### Deploy order

1. Apply migration
2. Deploy edge functions that query moved tables
3. Deploy app/client updates that use schema-qualified table access
4. Run verification checklist

### Verification checklist

- [ ] Blog image upload succeeds
- [ ] Blog post read/update by slug succeeds
- [ ] Blog tags list/read succeeds
- [ ] Public published-post reads remain available as intended
- [ ] RLS behavior for author/admin paths is unchanged

### Rollback

If rollback is needed:

1. Revert function code that schema-qualifies `content`
2. Apply reverse migration to move blog objects back to `public`
3. Re-run verification checklist

---

## Template for next phases

Copy this section for every subsequent move.

### Phase X.Y: <domain> moved to <schema>

#### Summary

- `<old_schema>.<object>` -> `<new_schema>.<object>`

#### Migration artifact

- `<migration file link>`

#### Affected services

- `<edge function(s)>`
- `<app clients>`
- `<scripts/tests>`

#### Required client updates

- `<supabase js changes>`
- `<sql/rpc changes>`

#### Deploy order

1. `<step>`
2. `<step>`
3. `<step>`

#### Verification checklist

- [ ] `<check 1>`
- [ ] `<check 2>`

#### Rollback

1. `<step>`
2. `<step>`
