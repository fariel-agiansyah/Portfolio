# Fariel Agiansyah — Personal Web

A personal website that grew out of a portfolio: work archive, diary, experiments, current focus, about page, and contact space.

## Stack
- React 19
- Vite 8
- Tailwind CSS 4 via `@tailwindcss/vite`
- CSS variables for the visual system
- Native history-based routing
- GitHub

## Routes
- `/`
- `/works`
- `/works/:slug`
- `/diary`
- `/lab`
- `/about`
- `/now`
- `/contact`

## Product direction

This is intentionally more than a portfolio. The sidebar makes it feel like a personal workspace rather than a static landing page.

- **Home:** identity, photo area, current status, and quick entry points.
- **Works:** visual design, web, content, and product projects.
- **Diary:** build logs, reflections, notes, and future journal entries.
- **Lab:** unfinished experiments and ideas.
- **About:** education, experience, tools, and working philosophy.
- **Now:** a living snapshot of current focus.
- **Contact:** external contact points and work CTA.

## Visual direction

Rounded, editorial, creative, blue-accented, interactive, and restrained.

The current system includes:
- rounded cards and panels
- blue accent instead of an all-blue interface
- subtle gradients
- light/dark mode
- fixed desktop sidebar
- mobile top bar and bottom navigation
- custom thin scrollbar
- hover movement and border transitions
- diary modal popup
- search and category filtering on Works and Diary
- automatic pagination for growing project/diary archives
- responsive layouts
- reduced-motion support
- Inter + Space Grotesk + Poppins typography system
- Google Fonts loaded from index.html to keep PostCSS/Tailwind parsing clean

Avoid generic AI-template aesthetics, excessive emoji, noisy animation, and effects that compete with the actual work.

## Personal context currently represented

M. Fariel Agiansyah is a Communication Science student at Universitas Tidar with a DKV background from SMK Negeri 1 Magelang.

Relevant experience represented in the site includes:
- Telkomsel HCOT internship work
- IndiHome Yogya social-media and promotional design
- HMIK Untidar business division leadership
- REDICATOR
- Nirkala Production as DoP

The site also represents a broad creative/technical workflow around visual design, social media, content production, web development, photography, videography, editing, motion, content planning, copywriting, Photoshop, Illustrator, Figma, HTML, CSS, JavaScript, React, Vite, and Supabase.

## Diary and Supabase

The Diary currently uses local seed content in `src/data/diary.js`.

**Supabase is not required yet.**

A local data file is simpler and more reliable while the Diary is still a public static feature.

Supabase becomes useful when Diary needs:
- create/edit/delete entries from an admin interface
- authentication
- private drafts
- syncing content across devices
- image/file uploads through Storage
- categories/tags stored in a database
- scheduled publishing
- comments or reactions

When that stage arrives, use Supabase Auth + Postgres + Storage with RLS. Do not add a database just to render four static diary cards. Humanity has suffered enough from unnecessary CRUD dashboards.

## Responsive design

Tailwind CSS 4 is installed through the Vite plugin and is available for utility-based component work. The current visual system also uses a focused custom CSS layer for the portfolio's typography, theme variables, scrollbar, rounded surfaces, and responsive breakpoints.

The responsive experience uses:
- desktop fixed sidebar
- mobile top bar
- mobile bottom navigation
- one-column mobile project/diary layouts
- responsive hero/photo layout
- touch-friendly controls

## Content architecture

- `src/data/projects.js`: project data
- `src/data/diary.js`: diary seed content
- `src/components/`: reusable UI
- `src/pages/`: route pages
- `src/index.css`: theme, typography, responsive visual system, scrollbar, motion, search/pagination UI
- `src/components/sidebar.jsx`: desktop sidebar, mobile top bar, mobile bottom navigation, theme toggle
- `src/components/project-grid.jsx`: project search, category filtering, pagination
- `src/pages/diary.jsx`: diary search, category filtering, pagination, modal reader
- `src/App.jsx`: lightweight routing

## Development

```
npm install
npm run dev
npm run build
npm run lint
```

Do not commit `node_modules/`.

## AI continuation instructions

Read this README and inspect the existing implementation before changing the project. This is a living personal website, not a disposable Vite demo.

Preserve:
1. rounded UI and responsive behavior
2. blue accent without making everything blue
3. light/dark mode
4. desktop sidebar + mobile navigation
5. subtle hover/motion and reduced-motion support
6. data-driven project and diary content
7. accessibility and maintainable components
8. Tailwind as the responsive/utility foundation
9. the distinction between public content and future private/admin content

Do not restart from a blank template or replace working architecture merely for stylistic reasons.

## Future features

Potential next additions, in roughly natural product order:
- real profile/project images
- project case-study galleries and lightbox
- CV / Resume page
- Skills / toolkit page
- Gallery / visual archive
- social links
- real contact email/form
- Diary search/filter
- Supabase-powered private editor
- authentication and admin dashboard
- image storage
- analytics
- SEO/Open Graph metadata
- RSS/feed for Diary

## Recent update

The latest visual and interaction pass focused on making the site feel like a consistent personal workspace instead of a collection of disconnected pages.

### Typography
- **Inter** is the primary UI/body font.
- **Space Grotesk** is used for large headings and display text.
- **Poppins** is used for compact labels, metadata, navigation, and supporting UI.
- Fonts are loaded in index.html, not from a late CSS @import, because Tailwind/PostCSS requires CSS imports to appear before other declarations.

### Theme and layout
- Light mode colors were refined for clearer surface/border contrast.
- Dark mode remains the current visual reference.
- The hero name layout was adjusted so "Fariel Agiansyah." does not collide with the profile/photo panel.
- Desktop keeps a fixed sidebar. Mobile switches to a top bar plus bottom navigation.
- The sidebar includes theme switching, availability status, current focus, and navigation state.

### Search and pagination
- Works supports keyword search across title, category, description, role, and stack.
- Works supports category filtering.
- Diary supports keyword search across title, category, excerpt, body, and tags.
- Diary supports category filtering.
- Pagination is data-driven and only appears when the filtered collection exceeds the page size.

### Troubleshooting note
If the local sidebar suddenly renders as plain text while the main page remains styled, check git status first. The repository's current src/index.css contains the sidebar layout rules. A locally modified or stale src/index.css can produce a partially styled page.

For a local copy that should exactly match origin/main, after confirming there are no CSS changes worth keeping:

    git restore src/index.css
    git pull origin main
    npm run dev

Do not use git restore . blindly because it can discard unrelated local work.

Status: personal website V2 / active development
