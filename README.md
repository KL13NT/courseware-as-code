# MDX Tailwind NextJS Starter
A simple, intuitive, SEO-aware, and accessibility in mind.

### What's inside?
- MDX support for pages
- npm scripts setup with `export` and normal modes
- Tailwind setup with Purging and Next default postcss config
- `unstable_runtimeJS` option in `index` and `404` pages to strip out next's js
  bundles for smaller output bundles
- `axe-core/react` for React accessibility testing while in development mode
- SEO component instead of having to install seo libraries with favicons
- `/public` folder setup
- Sass default styling
- Prettier setup
- ESLint with `jsx-ally` and `react` plugins
- Netlify `build` and `output` configuration for instant static deployment
- `.nvmrc` configured with LTS NodeJS for full ICU support on supported CI's

### Getting started
1. Generate a new repo using this repo (this repo is a template)
2. Clone the repo to your local machine
3. Run `yarn` or `npm install`
4. Start the development server `yarn dev` or `npm run dev`
