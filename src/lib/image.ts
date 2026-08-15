// src/lib/image.ts
//
// Turns a Sanity image reference into an actual URL, with two presets
// matching the crop policies already established across the design:
//   - croppedUrl: for header/hero images, which are deliberately cropped
//     to a consistent band (landing page category rows, gallery/blog
//     header images, blog index thumbnails).
//   - uncroppedUrl: for gallery grid images and blog inline/imageGrid
//     images, which must NOT be cropped — each one is a piece of
//     artwork in its own right, not a thumbnail pointing at something
//     else (this was a deliberate, explicit decision made early in the
//     design — see the gallery grid vs. header image distinction).

import {createImageUrlBuilder} from '@sanity/image-url';
import {sanityClient} from './sanity';
import type {SanityImageSource} from '@sanity/image-url/lib/types/types';

const builder = createImageUrlBuilder(sanityClient);

export function croppedUrl(source: SanityImageSource, width: number, height: number) {
  return builder.image(source).width(width).height(height).fit('crop').auto('format').url();
}

// No width/height/fit forced — lets the browser (via srcset in the
// component that uses this) request an appropriately-sized version
// without ever cropping the image's own aspect ratio.
export function uncroppedUrl(source: SanityImageSource, maxWidth: number) {
  return builder.image(source).width(maxWidth).auto('format').url();
}
