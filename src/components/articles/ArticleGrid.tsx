import { Clock, ThumbsUp, Share2, Bookmark, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articlesApi } from '../../services/api';
import { Article } from '../../types/article';
import { Spinner } from '../ui/spinner';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ArticleGridProps {
  viewMode: 'grid' | 'list';
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  category?: string;
  tags?: string[];
  author?: string;
  dateRange?: {
    from: string;
    to: string;
  };
}

const ArticleGrid = ({ 
  viewMode, 
  page, 
  limit, 
  search, 
  sort, 
  category, 
  tags,
  author,
  dateRange 
}: ArticleGridProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['articles', { page, limit, search, sort, category, tags, author, dateRange }],
    queryFn: () => articlesApi.getArticles({ page, limit, search, sort, category, tags, author, dateRange }),
  });

  const likeMutation = useMutation({
    mutationFn: articlesApi.likeArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: articlesApi.bookmarkArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  const handleLike = async (articleId: number) => {
    try {
      await likeMutation.mutateAsync(articleId);
      toast.success('Article liked!');
    } catch (error) {
      toast.error('Failed to like article');
    }
  };

  const handleBookmark = async (articleId: number) => {
    try {
      await bookmarkMutation.mutateAsync(articleId);
      toast.success('Article bookmarked!');
    } catch (error) {
      toast.error('Failed to bookmark article');
    }
  };

  const handleShare = async (article: Article) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.origin + '/articles/' + article.slug,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.origin + '/articles/' + article.slug
        );
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share article');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-red-500 text-lg font-medium mb-2">Error loading articles</div>
        <button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ['articles'] })}
          className="text-sm text-accent hover:text-primary transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {data?.articles.map((article, index) => (
        <motion.article
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
            viewMode === 'list' ? 'flex' : ''
          }`}
        >
          <Link 
            to={`/articles/${article.slug}`}
            className={`block overflow-hidden ${viewMode === 'list' ? 'w-1/3' : ''}`}
          >
            <div className="aspect-video relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
          
          <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
            <div className="flex gap-2 mb-3 flex-wrap">
              {article.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-accent/5 text-accent rounded-full text-sm hover:bg-accent/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <Link to={`/articles/${article.slug}`}>
              <h3 className="text-xl font-bold text-accent mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <p className="text-accent/60 mb-4 line-clamp-2">{article.excerpt}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-accent/60">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1 text-accent/60">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleLike(article.id)}
                  className={`p-1.5 rounded-full transition-all flex items-center gap-1.5 hover:bg-accent/5 ${
                    article.isLiked ? 'text-primary' : 'text-accent/60 hover:text-primary'
                  }`}
                  title="Like article"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{article.likes}</span>
                </button>
                <button 
                  onClick={() => handleShare(article)}
                  className="p-1.5 rounded-full text-accent/60 hover:text-primary hover:bg-accent/5 transition-all"
                  title="Share article"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleBookmark(article.id)}
                  className={`p-1.5 rounded-full transition-all ${
                    article.isBookmarked ? 'text-primary' : 'text-accent/60 hover:text-primary'
                  } hover:bg-accent/5`}
                  title="Bookmark article"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default ArticleGrid;