// The core concept of Scale: every post is tagged with the scale of impact
// it discusses, so the feed shows how climate issues cascade from the
// planetary level all the way down to a single neighborhood.

export const SCALES = [
  {
    key: "Global",
    emoji: "🌍",
    blurb: "Planet-wide systems — warming trends, ocean currents, treaties.",
  },
  {
    key: "National",
    emoji: "🏛️",
    blurb: "Country-level policy, emissions, drought and wildfire trends.",
  },
  {
    key: "Regional",
    emoji: "🏙️",
    blurb: "Watersheds, coastlines, agriculture shifts across a region.",
  },
  {
    key: "Local",
    emoji: "📍",
    blurb: "Your city, your block — air quality, flooding, community action.",
  },
];

export const SCALE_KEYS = SCALES.map((s) => s.key);

export const scaleMeta = (key) =>
  SCALES.find((s) => s.key === key) || SCALES[0];
