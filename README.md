# Next.JS Boilerplate

[![CodeQL Analysis Workflow Status](https://github.com/Rethunk-Tech/nextjs-boilerplate/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Rethunk-Tech/nextjs-boilerplate/actions)
[![Cypress Workflow Status](https://github.com/Rethunk-Tech/nextjs-boilerplate/actions/workflows/cypress-ubuntu.yml/badge.svg)](https://github.com/Rethunk-Tech/nextjs-boilerplate/actions)
[![License](https://badgen.net/badge/License/CC-BY-NC-SA-2.0/blue)](https://github.com/Rethunk-Tech/nextjs-boilerplate/blob/main/LICENSE.txt)

This is an opinionated [Next.js](https://nextjs.org/) boilerplate, with:

- Fully typed with [TypeScript](https://www.typescriptlang.org/).
- Style/Theme engine and Icons from [Material UI](https://mui.com/).
- Code style is enforced by React [ESLint](https://eslint.org/) rules.
- End-to-End Testing with [Cypress](https://www.cypress.io/).

## Getting Started

### Without Docker

Run the development server:

```bash
yarn run dev -p 9000
```

### With Docker

1. Install [Docker Compose](https://docs.docker.com/compose/install/)

1. Enable [BuildKit for Docker](https://docs.docker.com/develop/develop-images/build_enhancements/#to-enable-buildkit-builds). (It's faster and has cache.)

1. Up the composition:

    ```bash
    docker-compose up
    ```

Open [http://localhost:9000](http://localhost:9000) with your browser to see the result.

#### Debugging

If you need to debug something inside the container, you can get a shell using:

```bash
docker-compose run --rm -u 0 nextjs sh
```

## Using this Boilerplate

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:9000/api/hello](http://localhost:9000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

### TypeScript

- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - learn about TypeScript features.
- [TypeScript Tutorial](https://www.typescripttutorial.net/) - assumes you know JavaScript already.

### Next.JS

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js/)

### Material UI

- [Material UI Components](https://mui.com/material-ui/) - index of Material UI components.
- [Getting Started with Material UI](https://mui.com/material-ui/getting-started/learn/) - learning resources for Material UI.
- [Material UI GitHub Repository](https://github.com/mui/material-ui)

### Cypress E2E Testing

- [Cypress: Writing Your First Test](https://docs.cypress.io/guides/getting-started/writing-your-first-test) - Get started with Cypress testing.
- [Cypress GitHub Repository](https://github.com/cypress-io/cypress)

## Contributing

Consider using [Gitmoji](htpps://gitmoji.dev) in your commit messages.

Here are some we use:

||Code|Meaning
|-|-|-|
| :bug: | `:bug:` | Fix a bug
| :green_heart: | `:green_heart:` | Fix CI Build
| :rotating_light: | `:rotating_light:` | Fix linter warnings
| :zap: | `:zap:` | Improve performance
| :sparkles: | `:sparkles:` | Introduce new feature
| :recycle: | `:recycle:` | Refactor code
| :fire: | `:fire:` | Remove code or files
| :see_no_evil: | `:see_no_evil:` | Update a .gitignore file
| :construction_worker: | `:construction_worker:` | Update CI build system
| :bulb: | `:bulb:` | Update comments in code
| :memo: | `:memo:` | Update documentation
| :arrow_up: | `:arrow_up:` | Upgrade dependency