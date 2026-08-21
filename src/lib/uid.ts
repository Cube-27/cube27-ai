/**
 * Build-deterministic unique ids.
 *
 * Inline SVG puts gradients, filters and clip paths in a document-wide id
 * namespace, so a component that renders twice on one page would have its
 * second instance silently reference the first one's defs. A counter keeps
 * every instance distinct without reaching for randomness, which would change
 * the output on every build and make diffs unreadable.
 */
let n = 0;

export const uid = (prefix: string): string => `${prefix}${++n}`;
