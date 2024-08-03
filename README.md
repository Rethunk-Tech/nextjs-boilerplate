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

### First-Time Setup

If this is your first time using NodeJS, you'll need to install Yarn to use this project:

(You only need to do this once per system you develop on.)

```bash
npm install -g yarn
```

Then, we can clone the repository into a path of your choosing:

```bash
git clone https://github.com/Rethunk-Tech/nextjs-boilerplate.git project-name
cd project-name
```

Finally, install the dependencies using yarn.

```bash
cd project-name
yarn install
```

### Running the Dev Server

You can run the server locally with the following command:

```bash
yarn run dev -p 9000
```

### With Docker

Or, you can use Docker to run the server within containers:

1. Install [Docker Compose](https://docs.docker.com/compose/install/)

1. Enable [BuildKit for Docker](https://docs.docker.com/develop/develop-images/build_enhancements/#to-enable-buildkit-builds). (It's faster and has cache.)

1. "Up" the composition (specifying `--build` to force a re-build):

    ```bash
    docker-compose up --build
    ```

Open [http://localhost:9000](http://localhost:9000) with your browser to see the result.

#### Debugging

If you need to debug something inside the container, you can get a shell using:

```bash
docker-compose run --rm -u 0 nextjs sh
```

## Developing with this Boilerplate

First, open `http://localhost:9000/` in a browser, and open `pages/index.tsx` in your preferred editor. Side-by-side the windows as shown below for the most convenient developing experience! (Even better with more monitors.)

Any changes made to a file in `pages` will automatically update in the browser as long as the dev server is running.

You can start editing the page by modifying `pages/index.tsx`.

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
