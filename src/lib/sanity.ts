// src/lib/sanity.ts
//
// Read-only Sanity client for the live site. No token needed here — the
// dataset is public, so this only ever reads published content, never
// drafts. This is deliberately separate from the write-access scripts
// used for content migration (import-blog.mjs etc.), which live outside
// the Astro project entirely.

import {createClient} from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'YOUR_PROJECT_ID_HERE', // same project ID used everywhere else
  dataset: 'production',
  apiVersion: '2024-01-01',
  // Deliberately false, not true. This is a static build — every query
  // here runs once per deploy, not once per visitor, so the CDN's speed
  // benefit barely matters. What does matter: the CDN has a brief
  // propagation delay after publishing (documented by Sanity, typically
  // under a minute), and if a build happens to run inside that window,
  // the *stale* cached response gets permanently baked into the static
  // site until the next rebuild — not just delayed, genuinely wrong
  // until someone notices and triggers another build. Querying the API
  // directly avoids that risk entirely, at a cost that doesn't matter
  // here (a handful of slightly slower requests during each build).
  useCdn: false,
});
