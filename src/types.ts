type BaseMeta = {
  title: string;
  description: string;
  ogImage?: string;
};

type ArticleMeta = BaseMeta & {
  date: string;
};

type HomeMeta = BaseMeta & {
  date?: never;
};

type Meta = ArticleMeta | HomeMeta;

type BlogPostingParams = {
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
};

export type { Meta, ArticleMeta, HomeMeta, BlogPostingParams };
