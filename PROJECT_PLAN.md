# VixVoxWave website project plan

Last updated: 2026-07-30

## Outcome

Build a fast, accessible, English-language public site at
`https://vixvoxwave.com` that:

- explains the local-first VixVoxWave app truthfully;
- provides accessible privacy and support information;
- presents neutral, disabled App Store and Google Play availability cards;
- publishes an ordered collection of human-reviewed comic stories;
- gives every story substantive initial HTML, unique SEO, a permanent
  descriptive URL, and an optional text version containing its transcript and
  long description;
- remains a static JavaScript React project deployed by the existing AWS
  Amplify connection.

No mobile native build is required for website-only work.

## Owner decisions recorded in this task

| Decision | Recorded value |
| --- | --- |
| Existing repository | `vixvoxwave-web` |
| Canonical origin | `https://vixvoxwave.com` |
| Public support email | `support.vixvoxwave@gmail.com` |
| Initial language | English |
| Story archive | `/stories/` |
| Story URL | `/stories/{sequence}/{descriptive-slug}/` |
| First story | `/stories/1/haunted-house/` |
| First story source | Owner-supplied `comic_1.jpeg` |
| Store state | App Store and Google Play are not yet available |
| Analytics | None at launch |
| Publication gate | Human approval is required for every comic |
| Source-control gate | Human approval is required before every commit |
| Comic accessibility UI | Text description and transcript are collapsed by default |
| Website brand assets | Use the transparent `D-128` logo in the header/footer, the owner-approved `D-127` app icon for the hero and Apple touch icon, and the transparent, tightly fitted `D-129` capped-fox micro mark for browser favicons |

The earlier mobile-repository plans assumed that this repository did not yet
exist and proposed dated `/comics/` paths. The owner’s 2026-07-30 instruction
supersedes those assumptions for this repository. The underlying safeguards
remain: static HTML, permanent canonicals, provenance, accessibility,
truthful claims, and human-controlled publication.

## Release 1 — landing, legal, and Story 1

Status markers: `[ ]` planned, `[>]` active, `[x]` complete, `[!]` blocked.

- [x] `WEB-0` Audit the starter, current app behavior, source plans, hosting
  contract, and supplied comic.
- [x] `WEB-1` Replace the client-only Vite starter with a JavaScript-only
  statically exported Next.js site without changing the existing repository or
  AWS connection.
- [x] `WEB-2` Build the one-page landing experience: app description, how it
  works, privacy summary, first-story feature, contact, and disabled store
  availability cards.
- [x] `WEB-3` Add `/stories/`, `/stories/1/haunted-house/`, `/privacy/`,
  `/support/`, and a true static 404.
- [x] `WEB-4` Add Story 1 content, responsive derivatives, unique metadata,
  canonical, `ComicStory` JSON-LD, an optional accessible text version, and a
  clear fictional/illustrative disclosure.
- [x] `WEB-5` Add `robots.txt`, `sitemap.xml`, repository/content checks, built
  HTML checks, and one required `npm run check`.
- [x] `WEB-6` Complete the initial-release human review of app claims, privacy
  copy, Story 1 copy, visual rights, accessibility text, metadata, and the
  complete diff.
- [x] `WEB-7` Publish the initial release from `main`; the product owner
  confirmed the commit is published.
- [!] `WEB-8` Commit and publish the `D-129` transparent-favicon correction.
  Blocked until the product owner explicitly approves this exact new commit.

## Release 1 implementation evidence

- `npm run check` passed on 2026-07-30 with lint, four content tests, Story 1
  asset/content validation, the production static export, and checks against
  five public pages plus the 404, robots, and sitemap outputs.
- `npm audit --audit-level=moderate` reported zero known vulnerabilities.
- Next.js generated Story 1 as static HTML at
  `/stories/1/haunted-house/`; all other release routes are static.
- The product owner subsequently published the initial release. The current
  `D-129` favicon correction remains uncommitted; no push, deployment, AWS
  setting, or domain setting was changed for this correction.
- No new comic was generated. The supplied Story 1 image was copied and
  resized for the web, while the separate generated social-preview card remains
  pending owner review.
- The header/footer now uses a transparent 192 px derivative of `D-128`
  `assets/logo.png`, rendered slightly larger at 50 px desktop and 44 px on
  compact screens. Its eyes, brows, and open smile match the approved `D-127`
  icon expression without introducing the icon's opaque blue-black field.
- The hero icon and Apple touch icon remain deterministic derivatives of the
  owner-approved `D-127` app icon source. Browser favicons use the existing
  dedicated capped-fox micro mark with only its uniform background removed and
  padding reduced; explicit 16, 32, and 48 px PNGs plus a multi-size ICO avoid
  stale browser fallback behavior.
- Local static-browser verification loaded every declared favicon reference and
  confirmed the browser requested the new multi-size `/favicon.ico` with HTTP
  200. The 256 px source and all PNG derivatives use RGBA with transparent
  corners and no hidden RGB under fully transparent pixels.
- Local-browser review at 1280 × 720 and 390 × 844 confirms clean transparent
  header/footer blending, balanced wordmark spacing, exact 50/44 px sizing, and
  no console errors.

## Comic publishing workflow

1. Create one new content record with the next immutable sequence number and a
   descriptive slug.
2. Keep the record in `draft` while the image and page are prepared.
3. Record source, rights, prompt/provenance, asset hashes, and any product claim
   references. Never use private recordings, transcripts, or diagnostics.
4. Produce responsive image derivatives without changing the story content.
5. Write unique story copy, title, description, short alt, panel transcript,
   long description, content note, and fictional/AI disclosure as applicable.
   Present the transcript and long description inside the collapsed accessible
   text-version disclosure.
6. Run the full site check and inspect the generated HTML.
7. Human-review the image, text accuracy, rights, continuity, accessibility,
   claims, metadata, and page order.
8. Only after approval, change the story state to `approved`.
9. Request separate approval for the code commit. Do not publish, merge, or
   deploy without it.
10. After the owner publishes, verify the canonical page, archive order,
    previous/next links, image, sitemap, and production 404.

Skipped publication days are allowed. Sequence numbers describe story order,
not a promise of daily publication.

## Next releases

- `WEB-8`: formalize the brand/character/continuity/claim/reference controls
  and create explicit-only site/comic repository skills after the owner updates
  the comic-creation guides.
- `WEB-9`: add deterministic AVIF/OG generation, feed output, richer negative
  content tests, browser accessibility tests, and performance budgets.
- `WEB-10`: reconcile controller identity, legal address, AWS log policy,
  Gmail support retention, store disclosures, purchases, and platform links
  immediately before the first production/store release.
- `WEB-11`: add real App Store/Google Play links and unmodified official badges
  only when the corresponding listings or approved pre-registration pages
  exist.

## Open owner/legal items before publication

- Controller/publisher legal name, postal address, and country.
- Whether the support address is also the formal privacy/incident contact.
- Code license and separate brand/copy/comic license.
- Confirmation that the owner controls the rights needed to publish Story 1.
- Final review of the privacy-policy legal bases, processor wording, email
  retention criteria, age/audience policy, and complaint jurisdiction.
- Verification of the existing Amplify region, domain redirects, access-log
  settings, security headers, and rollback path.
- Human approval of the first page and exact code commit.
