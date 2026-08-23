// src/lib/video.ts
//
// Resolves a Sanity `file` field (used for our video fields) into a
// direct, playable URL. Sanity doesn't provide a URL builder for file
// assets the way it does for images — the reference looks like
// "file-<id>-<extension>", so this does the same lookup by hand.

const PROJECT_ID = '4xawi0co';
const DATASET = 'production';

export function fileUrl(
  field: {file?: {asset?: {_ref?: string}}} | null | undefined
): string | null {
  const ref = field?.file?.asset?._ref;
  if (!ref) return null;
  const match = ref.match(/^file-([a-zA-Z0-9]+)-(\w+)$/);
  if (!match) return null;
  const [, id, extension] = match;
  return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${id}.${extension}`;
}
