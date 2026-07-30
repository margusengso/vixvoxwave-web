# VixVoxWave web agent guide

Read this file before changing the website.

## Product boundary

- This repository is the public marketing, legal, support, and comic-story
  website. It is not a second implementation of the Expo app.
- Keep the site independently buildable. Never import from the sibling
  `VixVoxWave` repository, add it as a dependency, or copy private app data,
  diagnostics, recordings, transcripts, credentials, or build links.
- Public app claims must be supported by the reviewed website content and the
  current app behavior. A fictional comic is not product evidence.

## Architecture

- Use JavaScript/JSX only. Do not add TypeScript or a TypeScript toolchain.
- Keep the Next.js App Router build fully static with `output: 'export'` and
  `trailingSlash: true`.
- Do not add API routes, server actions, SSR, a database, authentication, a
  contact form, analytics, advertising, cookies, remote fonts, or third-party
  embeds without a separately approved privacy and architecture change.
- Every public story must be generated into initial HTML with a unique title,
  description, canonical URL, structured data, and an optional text version
  containing a long description and exact panel transcript.
- Canonical story URLs use `/stories/{sequence}/{descriptive-slug}/`. Sequence
  numbers never change after publication; slugs remain descriptive and stable.

## Human gates

- New or edited comics begin as drafts. They must not be marked approved or
  included in a release until the product owner explicitly approves the image,
  story copy, transcript, accessibility text, disclosure, and metadata.
- Never commit, push, merge, deploy, publish, or change AWS/domain settings
  without explicit product-owner approval for that action.
- `main` is assumed to deploy automatically to `https://vixvoxwave.com`.
  Treat a commit or push to `main` as a production-impacting action.
- App Store and Google Play calls to action remain neutral, disabled, and
  clearly marked “Soon available” until real store listings exist.

## Quality bar

- Target WCAG 2.2 AA: semantic landmarks, correct heading order, keyboard
  focus, adequate contrast, reduced-motion support, and 320 px reflow.
- A complex comic requires concise alt text plus a native, keyboard-accessible
  disclosure containing its long description and exact panel transcript. Keep
  that disclosure collapsed by default so it does not interrupt the visual
  story experience.
- Do not fabricate creator names, publication dates, testimonials, ratings,
  prices, store availability, app screens, or detection capabilities.
- Run `npm run check` before every handoff. Keep `amplify.yml` aligned with the
  static `out/` artifact.
