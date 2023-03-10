export type ValueOf<T> = T[keyof T];

const TAG_SLUGS = {
  All: "all",
  Tech: "tech",
  Update: "update",
  Playlist: "playlist",
  Ikigomi: "ikigomi",
  Sento: "sento",
  Link: "link",
  ProductDev: "product-dev",
  Sauna: "sauna",
  Items: "items",
  Notion: "notion",
  Solana: "solana",
  Polygon: "polygon",
  Solidity: "solidity",
} as const;

export type TagSlug = ValueOf<typeof TAG_SLUGS>;

type TagData = {
  slug: string;
  name: string;
  emoji: string;
};

const TAG_DATA: Record<TagSlug, TagData> = {
  [TAG_SLUGS.Tech]: {
    name: "ζθ‘",
    emoji: "π»",
    slug: TAG_SLUGS.Tech,
  },
  [TAG_SLUGS.Update]: {
    name: "γ’γγγγΌγ",
    emoji: "π",
    slug: TAG_SLUGS.Update,
  },
  [TAG_SLUGS.Playlist]: {
    name: "γγ¬γ€γͺγΉγ",
    emoji: "π§",
    slug: TAG_SLUGS.Playlist,
  },
  [TAG_SLUGS.Ikigomi]: {
    name: "ζζ°θΎΌγΏ",
    emoji: "β",
    slug: TAG_SLUGS.Ikigomi,
  },
  [TAG_SLUGS.Sento]: {
    name: "ι­ζΉ―",
    emoji: "β¨οΈ",
    slug: TAG_SLUGS.Sento,
  },
  [TAG_SLUGS.Sauna]: {
    name: "γ΅γ¦γ",
    emoji: "π§ββοΈ",
    slug: TAG_SLUGS.Sauna,
  },
  [TAG_SLUGS.Link]: {
    name: "ε€ι¨γͺγ³γ―",
    emoji: "π",
    slug: TAG_SLUGS.Link,
  },
  [TAG_SLUGS.ProductDev]: {
    name: "γγ­γγ―γιηΊ",
    emoji: "π ",
    slug: TAG_SLUGS.ProductDev,
  },
  [TAG_SLUGS.Items]: {
    name: "γ’γ€γγ ",
    emoji: "β¨",
    slug: TAG_SLUGS.Items,
  },
  [TAG_SLUGS.Notion]: {
    name: "Notion",
    emoji: "π",
    slug: TAG_SLUGS.Notion,
  },
  [TAG_SLUGS.Solidity]: {
    name: "Solidity",
    emoji: "π ",
    slug: TAG_SLUGS.Solidity,
  },
  [TAG_SLUGS.Polygon]: {
    name: "Polygon",
    emoji: "βοΈ",
    slug: TAG_SLUGS.Polygon,
  },
  [TAG_SLUGS.Solana]: {
    name: "Solana",
    emoji: "πΎ",
    slug: TAG_SLUGS.Solana,
  },
  [TAG_SLUGS.All]: {
    name: "All",
    emoji: "π΄",
    slug: TAG_SLUGS.All,
  },
} as const;

export const getTagDataBySlug = (slug: TagSlug): TagData => TAG_DATA[slug];
