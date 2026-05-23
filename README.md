# Workshop Management — Marketing Site

Next.js 14 marketing site for Workshop Management (Infoney). Built with the App Router,
TypeScript, Tailwind CSS, and `next-themes` for light/dark mode.

## Quick start

```bash
cd website
npm install
npm run dev
```

Open http://localhost:3000

## Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint (requires `next lint` setup if extending) |

## Structure

```
website/
├── app/
│   ├── layout.tsx        # Root layout, fonts, ThemeProvider, metadata
│   ├── page.tsx          # Section composition
│   └── globals.css       # Tailwind base + custom utilities
├── components/
│   ├── Navbar.tsx        # Floating glass navbar
│   ├── Hero.tsx          # Headline + dashboard preview
│   ├── DashboardPreview.tsx
│   ├── ValueProps.tsx
│   ├── Features.tsx      # Bento feature grid
│   ├── HowItWorks.tsx    # 5-step process row
│   ├── Personas.tsx
│   ├── Screenshots.tsx   # Tabbed screen gallery
│   ├── TechStack.tsx
│   ├── Roadmap.tsx
│   ├── FAQ.tsx           # Accordion
│   ├── CTA.tsx           # Install snippet
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── Logo.tsx
│   ├── CodeBlock.tsx
│   ├── SectionHeader.tsx
│   └── Icons.tsx         # Inline SVG icon set
├── tailwind.config.ts    # Brand palette, fonts, animations
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Brand

| Token | Value |
| --- | --- |
| Primary | `#006D77` (brand-600) |
| Font | Inter (loaded via `next/font/google`) |
| Theme | Light + dark, persisted via `next-themes` |

The full teal scale lives in `tailwind.config.ts` under `theme.extend.colors.brand`.

## Deploy

Any Next.js host works. Easiest paths:

- **Vercel** — `vercel` from the `website/` directory
- **Netlify** — connect repo, set base directory to `website/`
- **Self-host** — `npm run build && npm run start`
