type Frontmatter = {
  title: string;
  date: string;
  description?: string;
  dek?: string;
  ogImage?: string;
};

type Meta = {
  title: string;
  description: string;
  ogImage?: string;
  date?: string;
};

export type { Frontmatter, Meta };
