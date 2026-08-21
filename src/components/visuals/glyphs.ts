/**
 * Stroked 24x24 glyph geometry for the product visuals.
 *
 * Deliberately separate from `src/lib/icons.ts`: that set is the site's own
 * interface, audited and used at reading sizes. These are chrome inside a
 * depiction of an application screen, drawn at 12-16px, and they should be
 * free to change without touching the site's icon list.
 */
export const GLYPHS = {
  sparkle: ["m12 3.5 2.1 5.6 5.6 2.1-5.6 2.1L12 19l-2.1-5.7-5.6-2.1 5.6-2.1z"],
  pulse: ["M3 12h3.6l2.6-6.4 4 12.8 2.6-6.4H21"],
  box: ["m12 3 8 4.4v9.2L12 21l-8-4.4V7.4z", "M4 7.4 12 12l8-4.6", "M12 12v9"],
  file: [
    "M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z",
    "M13.5 3v5.5H19",
  ],
  check: ["m5.5 12.4 4.3 4.3L18.5 8"],
  clock: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 7.4V12l3.2 1.9"],
  alert: ["M12 7.5v5.6", "M12 16.6v.6"],
  chevronDown: ["m6 9.5 6 6 6-6"],
} as const;

export type GlyphName = keyof typeof GLYPHS;
