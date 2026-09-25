type BaseMeta = {
  title: string;
  description: string;
  ogImage?: string;
};

type ArticleMeta = BaseMeta & {
  date: Date;
};

type HomeMeta = BaseMeta & {
  date?: never;
};

type Meta = ArticleMeta | HomeMeta;

type BlogPostingParams = {
  title: string;
  description: string;
  date: Date;
  url: string;
  image?: string;
};

export type { ArticleMeta, BlogPostingParams, HomeMeta, Meta };
