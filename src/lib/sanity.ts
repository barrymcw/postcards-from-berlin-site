// src/lib/sanity.ts
//
// Read-only Sanity client for the live site. No token needed here — the
// dataset is public, so this only ever reads published content, never
// drafts. This is deliberately separate from the write-access scripts
// used for content migration (import-blog.mjs etc.), which live outside
// the Astro project entirely.

import {createClient} from '@sanity/client';

export const sanityClient = createClient({
  projectId: '4xawi0co', // same project ID used everywhere else
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // fine for a public read-only client; fast, cached responses
});
