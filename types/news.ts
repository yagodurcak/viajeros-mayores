export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: {
    name: string;
  };
  createdAt: string;
  readTime: number;
  imageUrl: string;
  featured?: boolean;
}

export interface NewsFilters {
  search?: string;
  category?: string | 'all';
}
