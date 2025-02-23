import { Article, ArticlesResponse } from '../types/article';
import { mockArticles } from '../mocks/mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const articlesApi = {
  getArticles: async (params: {
    page: number;
    limit: number;
    sort?: string;
    search?: string;
    category?: string;
    tags?: string[];
    author?: string;
    dateRange?: {
      from: string;
      to: string;
    };
  }): Promise<ArticlesResponse> => {
    await delay(500); // Simulate network delay

    let filteredArticles = [...mockArticles];

    // Apply search filter
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (params.category) {
      filteredArticles = filteredArticles.filter(article =>
        article.category.toLowerCase() === params.category?.toLowerCase()
      );
    }

    // Apply tags filter
    if (params.tags && params.tags.length > 0) {
      filteredArticles = filteredArticles.filter(article =>
        params.tags?.some(tag => article.tags.includes(tag))
      );
    }

    // Apply author filter
    if (params.author) {
      filteredArticles = filteredArticles.filter(article =>
        article.author.toLowerCase() === params.author?.toLowerCase()
      );
    }

    // Apply date range filter
    if (params.dateRange) {
      const fromDate = new Date(params.dateRange.from);
      const toDate = new Date(params.dateRange.to);
      filteredArticles = filteredArticles.filter(article => {
        const articleDate = new Date(article.date);
        return articleDate >= fromDate && articleDate <= toDate;
      });
    }

    // Apply sorting
    switch (params.sort) {
      case 'oldest':
        filteredArticles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'most_liked':
        filteredArticles.sort((a, b) => b.likes - a.likes);
        break;
      case 'most_viewed':
        filteredArticles.sort((a, b) => b.views - a.views);
        break;
      default: // newest
        filteredArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // Apply pagination
    const start = (params.page - 1) * params.limit;
    const paginatedArticles = filteredArticles.slice(start, start + params.limit);

    return {
      articles: paginatedArticles,
      total: filteredArticles.length,
      page: params.page,
      limit: params.limit,
    };
  },

  getFeaturedArticle: async (): Promise<Article> => {
    await delay(300); // Simulate network delay
    
    // Get the most liked article as the featured one
    const featuredArticle = [...mockArticles]
      .sort((a, b) => b.likes - a.likes)
      [0];
    
    return featuredArticle;
  },

  getArticleBySlug: async (slug: string): Promise<Article> => {
    await delay(300);
    const article = mockArticles.find(a => a.slug === slug);
    if (!article) throw new Error('Article not found');
    return article;
  },

  likeArticle: async (articleId: number): Promise<void> => {
    await delay(500);
    const article = mockArticles.find(a => a.id === articleId);
    if (article) {
      article.isLiked = !article.isLiked;
      article.likes += article.isLiked ? 1 : -1;
    }
  },

  bookmarkArticle: async (articleId: number): Promise<void> => {
    await delay(500);
    const article = mockArticles.find(a => a.id === articleId);
    if (article) {
      article.isBookmarked = !article.isBookmarked;
    }
  },
};

export default articlesApi;
