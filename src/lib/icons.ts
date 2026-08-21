/**
 * Stroked 24x24 icon geometry. Kept as data so the icon set is a single
 * auditable list and unknown names fail at build time.
 */
export const ICONS = {
  layers: ["m12 3 9 5-9 5-9-5 9-5", "m3 13 9 5 9-5"],
  sliders: ["M4 7h16", "M4 17h16"],
  gauge: ["M4 18a8 8 0 1 1 16 0", "M12 18l4.2-6.6"],
  shield: ["M12 3l7 3v5c0 4.6-2.9 8.2-7 10-4.1-1.8-7-5.4-7-10V6l7-3z"],
  loop: ["M4.6 15A8 8 0 1 1 12 20", "M4 20v-5h5"],
  check: ["M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z", "m8 12.4 2.9 2.9L16.4 9"],
  pulse: ["M3 12h3.6l2.6-6.4 4 12.8 2.6-6.4H21"],
  arrowUpRight: ["M7 17 17 7", "M9.2 7H17v7.8"],
  arrowRight: ["M4 12h15", "m13.4 6.4 5.6 5.6-5.6 5.6"],
  chevronDown: ["m6 9.5 6 6 6-6"],
  menu: ["M4 8.5h16", "M4 15.5h16"],
  close: ["M6.5 6.5l11 11", "M17.5 6.5l-11 11"],
} as const;

export type IconName = keyof typeof ICONS;

/** Extra circle geometry that cannot be expressed as a path in this set. */
export const ICON_DOTS: Partial<Record<IconName, readonly [number, number][]>> =
  {
    sliders: [
      [9, 7],
      [15, 17],
    ],
  };
