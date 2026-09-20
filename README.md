# Fariel Agiansyah — Portfolio

Personal portfolio website for M Fariel Agiansyah, focused on visual design, web design, creative development, and selected digital projects.

## Goal
Build a simple, modern, professional portfolio that feels intentionally designed rather than like a generic template. V1 is the foundation. Real images, final copy, links, case studies, and additional features can be added later.

## Stack
- React 19
- Vite
- JavaScript / JSX
- CSS
- GitHub

Icons are isolated in src/components/icon.jsx so the icon system can later be replaced with Lucide, Heroicons, Feather, or another library.

## Structure
- src/components: reusable UI
- src/data/projects.js: project/content source
- src/pages: page-level sections and project detail
- src/App.jsx: lightweight history-based routing
- src/index.css: global visual system
- public/images: future project assets

## Design direction
Minimal, editorial, modern, professional, typography-led, and web-designer oriented.

Keep:
- generous whitespace
- strong typography
- neutral/off-white surfaces
- dark text
- subtle borders
- restrained accent color
- subtle motion and hover states
- responsive layouts
- reduced-motion support

Avoid:
- excessive gradients
- excessive rounded cards
- emoji-heavy UI
- noisy animations
- generic AI-template aesthetics
- unnecessary dependencies

## Routes
- /
- /works
- /about
- /contact
- /works/:slug

The app currently uses a small native history router. Do not add React Router unless the site grows enough to justify it.

## Project data
Projects are data-driven through src/data/projects.js. Each project has id, slug, title, category, year, description, role, stack, image, featured, liveUrl, and githubUrl.

Images are intentionally blank in V1. Never invent project screenshots or artwork.

Current starting projects:
1. Internary: internship management dashboard.
2. IndiHome Yogya: visual and promotional social media work.
3. Personal Design Archive: placeholder for future selected design work.

## AI continuation instructions
READ THIS README BEFORE CHANGING THE REPOSITORY. DO NOT RESTART FROM A BLANK VITE TEMPLATE.

This repository is a living personal portfolio. Inspect the existing implementation first. Preserve the architecture and visual direction unless the user explicitly requests a redesign.

When extending:
1. Keep project content in src/data/projects.js.
2. Keep reusable UI in src/components/.
3. Keep page sections in src/pages/.
4. Avoid unnecessary dependencies.
5. Preserve responsive behavior and accessibility.
6. Preserve reduced-motion support.
7. Use subtle animation rather than decorative motion.
8. Keep image placeholders until real assets are provided.
9. Run npm run build and npm run lint after substantial changes.
10. Do not replace working architecture merely to use a different coding style.

The portfolio should evolve incrementally. If a feature conflicts with the existing visual system, explain the trade-off and implement the smallest maintainable change.

## Intentional V1 placeholders
- project images
- galleries
- real contact email
- social links
- CV link
- final personal copy
- favicon/brand assets
- detailed case studies
- final icon library
- SEO/Open Graph metadata

## Future ideas
Possible later additions: project case studies, image lightboxes, category filters, CV download, social links, contact form, SEO/Open Graph metadata, analytics, or a CMS.

## Local development
npm install
npm run dev
npm run build
npm run lint
npm run preview

Do not commit node_modules/.

## Deployment
This is a Vite SPA. Vercel, Netlify, or GitHub Pages can host it. Client-side routes need an index.html fallback on the hosting platform.

## Continuation brief
This is the personal portfolio of M Fariel Agiansyah. It is a React + Vite portfolio focused on visual design, web design, creative development, and selected projects. The visual language is minimal, editorial, modern, professional, typography-focused, and restrained. Avoid generic AI-template aesthetics, excessive gradients, excessive rounded cards, emoji-heavy UI, and unnecessary dependencies. Read README.md and inspect the existing code before making changes. Keep project data in src/data/projects.js, reusable UI in src/components/, and page sections in src/pages/. V1 intentionally uses image placeholders. Current routes are /, /works, /about, /contact, and /works/:slug using a lightweight native history router. Improve the existing system instead of replacing it from zero unless there is a technical reason. Preserve responsive behavior, accessibility, subtle animation, and reduced-motion support.

Status: V1 foundation / active development
