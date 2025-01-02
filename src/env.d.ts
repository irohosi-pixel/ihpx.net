interface Meta {
  title?: string;
  description: string;
  image?: string;
  breadcrumb?: {
    href: string;
    title: string;
  }[];
  is404?: boolean;
}

interface Post {
  id: string;
  body?: string;
  collection: 'blog';
  data: PostMeta;
  rendered?: RenderedContent;
  filePath?: string;
}

interface PostMeta {
  title: string;
  pubDate: Date;
  updDate?: Date;
  description?: string;
  author: string;
  image?: {
    url: string;
    alt: string;
  };
  category?: string;
  tags?: string[];
  ignore?: boolean;
}
