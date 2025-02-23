import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ThumbsUp, Share2, Bookmark } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articlesApi } from '../services/api';
import { Spinner } from '../components/ui/spinner';
import { toast } from 'react-hot-toast';

const ArticleDetail = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesApi.getArticleBySlug(slug || ''),
    enabled: !!slug,
  });

  const likeMutation = useMutation({
    mutationFn: articlesApi.likeArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', slug] });
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: articlesApi.bookmarkArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', slug] });
    },
  });

  const handleLike = async () => {
    if (!article) return;
    try {
      await likeMutation.mutateAsync(article.id);
      toast.success(article.isLiked ? 'Removed like' : 'Article liked!');
    } catch (error) {
      toast.error('Failed to like article');
    }
  };

  const handleBookmark = async () => {
    if (!article) return;
    try {
      await bookmarkMutation.mutateAsync(article.id);
      toast.success(article.isBookmarked ? 'Removed from bookmarks' : 'Article bookmarked!');
    } catch (error) {
      toast.error('Failed to bookmark article');
    }
  };

  const handleShare = async () => {
    if (!article) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share article');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold">Article not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4"
      >
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            {article.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-accent mb-4">{article.title}</h1>
          <div className="flex items-center justify-between text-sm text-accent/60 mb-6">
            <div className="flex items-center gap-4">
              <span>{article.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="hover:text-primary transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button 
                onClick={handleBookmark}
                className={`transition-colors ${article.isBookmarked ? 'text-primary' : 'hover:text-primary'}`}
              >
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="aspect-[2/1] rounded-lg overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mt-8 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 transition-colors ${
                  article.isLiked ? 'text-primary' : 'text-accent/60 hover:text-primary'
                }`}
              >
                <ThumbsUp className="h-5 w-5" />
                <span>{article.likes}</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="button-primary"
              >
                Share Article
              </button>
            </div>
          </div>
        </footer>
      </motion.article>
    </div>
  );
};

export default ArticleDetail;