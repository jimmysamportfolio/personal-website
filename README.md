# jimmy.s

Personal portfolio site for Jimmy Sam. Built with Next.js 16, MDX, Tailwind CSS, and Framer Motion. 

## Getting Started

This project uses **pnpm** as its package manager.

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

- `content/` — Project pages written in MDX
- `components/` — React components
- `app/` — Next.js App Router pages
- `public/projects/` — Project images and videos
- `constants/` — Tag definitions and configuration

## Adding a Project

Create a new `.mdx` file in `content/` with metadata (title, role, description, tags, image) and markdown content. The project will automatically appear on the homepage.

## Deploy

Deploy with [Vercel](https://vercel.com):

```bash
pnpm build
```

## Credits

Portfolio template originally built by [Ethan Hansen](https://github.com/ethan-t-hansen). Customized and adapted by Jimmy Sam.
