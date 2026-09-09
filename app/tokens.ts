export type TokenInfo = {
  slug: string;
  name: string;
};

export const TOKENS: TokenInfo[] = [
  { slug: "blackrock-buidl", name: "BlackRock BUIDL" },
  { slug: "ondo-yield-assets", name: "Ondo Yield Assets" },
  { slug: "circle-usyc", name: "Circle USYC" },
  { slug: "centrifuge-protocol", name: "Centrifuge Protocol" },
  { slug: "realt-tokens", name: "RealT Tokens" },
  { slug: "tether-gold", name: "Tether Gold" },
  { slug: "wisdomtree", name: "WisdomTree" },
  { slug: "hastra", name: "Hastra" },
];

export function getNameBySlug(slug: string): string | undefined {
  return TOKENS.find((t) => t.slug === slug)?.name;
}

export function getSlugByName(name: string): string | undefined {
  return TOKENS.find((t) => t.name === name)?.slug;
}