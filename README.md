# jimmysam.ca

Jimmy Sam's personal site. Next.js 16 (App Router), React 19, MDX, deployed on Vercel.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # lint, typecheck, and production build
```

## Where things live

| Path | What |
|---|---|
| `app/page.tsx` | Homepage: intro, Work, Side quests, Writing |
| `content/projects.tsx` | Project pages: copy, facts, links, and images |
| `app/project/[slug]` | Project page template |
| `app/writing/<slug>/page.mdx` | Posts, written in MDX |
| `components/post/` | Animated figures used in posts |
| `components/Clouds.tsx` | The halftone cloud background (WebGL) |
| `components/Peek.tsx` | Hover previews on the homepage |

## Add a project

1. Put its images in `content/projects/<slug>/`.
2. Add an entry to `PROJECTS` in `content/projects.tsx`.
3. Add a row to `SIDE_QUESTS` or `WORK` in `app/page.tsx` that links to `/project/<slug>`, and a preview image in `content/previews/` plus a pane in `components/Peek.tsx`.

## Add a post

Create `app/writing/<slug>/page.mdx` with a `metadata` export, then add it to the Writing list on the homepage and to `app/sitemap.ts`.

## Copy

Short, plain sentences. No em dashes.
