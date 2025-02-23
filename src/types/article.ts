export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  likes: number;
  views: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
}

export interface ArticleFilters {
  search?: string;
  category?: string;
  tags?: string[];
  sort?: 'newest' | 'oldest' | 'most_liked' | 'most_viewed';
}
