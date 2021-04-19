# Courseware As Code

A simple, intuitive, SEO-aware, Courseware As Code template repository for
education everywhere.

### What's inside?

- Statically generated HTML lecture pages!
- Downloadable PDF lecture files!
- PDF slides generation!
- Markdown + LaTeX support for math blocks `$$`!
- Tutorials and examples to get started!
- Features are config-enabled
- Each source has its own styling. The static HTML uses `styling/index.sass` and
  Tailwind, printing lecture notes to PDF uses `styling/print.css`, and printing
  slides uses `styling/slide.css`
- Upcoming: Contentful course content management

### How?

- Static pages are generated using NextJS
- Code is linted and formatted using ESLint and Prettier respectively
- Support for Markdown sources uses @next/mdx
- Support for Markdown LaTeX math blocks uses remark-math
- PDF generation uses Puppeteer after building pages to navigate and PDF them
- All lib functions are tested using Jest
- Website accessibility testing is done using axe-core

### Getting started

Getting started is simple. This is getting started locally. To get started with production (deployment) read
[Deploying](#deploying). Before you do that you need to `use this template` to
create a repository of your own based on this repository.

1. Clone the repo
2. Run `npm install`
3. Create a local .env file with suitable values (check [example.env](./example.env))
4. Start the development server `npm run dev`

> These variables **must remain secret**, otherwise attackers will be able to
> use them.

### Deploying

You'll need to setup the environemnt variables in the deployment you're using,
as well as the CI/CD yourself. The recommended host is Vercel since they support
NextJS out of the box and all you need is to link the repository. If you'd like
to build the demo (this repo) just click the button below!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FKL13NT%2Fcourseware-as-code&project-name=courseware-as-code&repo-name=courseware-as-code)


### Enabling Contentful CMS

Enabling Contentful is as easy as setting the `CONTENTFUL_ACCESS_KEY`
environment variable. The build pipeline loads content from Contentful
automatically if this
variable is set.