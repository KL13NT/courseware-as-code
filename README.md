# Courseware As Code - Education Made Easy(ier)

A simple, intuitive, SEO-aware, Courseware As Code template repository for
education everywhere. This template allows you to generate a fully functional
and deploy-able website built using NextJS alongside generated PDF lectures and
slides from simple Markdown files!

### Why?

I'm a student. A tired student. I'm tired of having to deal with outdated
knowledge in the courses I'm enrolled in. I'm tired of having no way of
contributing to the course I'm taking, nor a say in whatever content is
presented to me.

This repository, despite not providing solid solutions to
these problems, remains a positive attempt at providing an easier way for
teachers and courseware maintainers to update courseware, and a straight-forward
method to build a truly positive community led by students and teachers alike.

### What's inside?

- Statically generated HTML lecture pages!
- Downloadable PDF lecture files!
- PDF slides generation!
- Markdown + LaTeX  = ❤️
- Add more pages to your website without having to go outside of your Markdown
  comfort-zone with MDX! 😍
- Tutorials and examples to get started!
- Complete control using configuration `site.config.js`
- Upcoming: Contentful course content management

### How?

- Static pages are generated using NextJS
- Code is linted and formatted using ESLint and Prettier respectively
- Support for NextJS Markdown pages uses @next/mdx
- Support for Markdown LaTeX math blocks uses remark-math
- PDF generation (lectures and slides) uses Puppeteer
- All lib functions are tested using Jest

### Upcoming features

- More control over what each page of a lecture contains
- More customization
- Contentful support
- Other CMS's support


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

### Contributing

I'm open to all kinds of contributions. If you want to:

```
🤔 Suggest a feature
🐛 Report an issue
📖 Improve documentation
👩‍💻 Contribute to the code
```

You are more than welcome. Before contributing, kindly check the
[guidelines](CONTRIBUTING.md).

There are also specific guidelines for each role:
- [Student](#contributing-as-a-student)
- [Teacher](#contributing-as-a-teacher)
- [Developer](#contributing-as-a-developer)

### Contributing as a Student

If you're a student trying to contribute to a course's courseware what you want
to look for is the `collections` folder. This folder contains all input Markdown
documents that go into making lectures and slides. You can help by fixing typos,
adding better explanation, adding useful resources that helped you, or even
adding whole lectures! How cool is that! 😄

### Contributing as a Teacher

As a teacher you'll most probably be responsible for this repo, given you're
responsible for the course as well. Your role dictates transparency and fairness
in managing your course. This shows in terms of this repository and is
represented by your welcoming of student contribution to making courseware
better. There's not much to say here. You can use the developer guidelines at
your own repository scale.

### Contributing as a Developer

If you're a developer willing to contribute to this project you're always more
than welcome to do so. There's a complete [contribution guide](CONTRIBUTING.md)
to help you get started, and the code is fairly documented to allow further
modifications/extensions.