# VixVoxWave website

The static marketing, privacy, support, and comic-story site for
[VixVoxWave](https://vixvoxwave.com).

The project uses JavaScript, React, and the Next.js App Router with a complete
static export. AWS Amplify publishes the generated `out/` directory.

## Local development

Use Node 24:

```bash
nvm install
nvm use
npm ci
npm run dev
```

## Validation

```bash
npm run check
```

The check lints the repository, runs tests and content validation, creates the
static export, and inspects the built pages for required routes and SEO.

## Publishing boundary

The `main` branch is assumed to deploy automatically to
`https://vixvoxwave.com`. Do not commit, push, merge, deploy, or approve a comic
without explicit product-owner approval. Read [AGENTS.md](AGENTS.md) and
[PROJECT_PLAN.md](PROJECT_PLAN.md) before changing the site.
