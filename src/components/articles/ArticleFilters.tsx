import { useState } from 'react';
import { Calendar, Tag, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '../../services/api';

interface ArticleFiltersProps {
  selectedTags: string[];
  selectedAuthor?: string;
  selectedDateRange?: { from: string; to: string };
  onTagsChange: (tags: string[]) => void;
  onAuthorChange?: (author: string) => void;
  onDateRangeChange?: (range: { from: string; to: string }) => void;
}

const ArticleFilters = ({
  selectedTags,
  selectedAuthor,
  selectedDateRange,
  onTagsChange,
  onAuthorChange,
  onDateRangeChange,
}: ArticleFiltersProps) => {
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  // Fetch all available tags from articles
  const { data: allTags } = useQuery({
    queryKey: ['articleTags'],
    queryFn: async () => {
      const response = await articlesApi.getArticles({ page: 1, limit: 100 });
      const tags = new Set<string>();
      response.articles.forEach(article => {
        article.tags.forEach(tag => tags.add(tag));
      });
      return Array.from(tags).sort();
    },
  });

  // Fetch all authors
  const { data: authors } = useQuery({
    queryKey: ['articleAuthors'],
    queryFn: async () => {
      const response = await articlesApi.getArticles({ page: 1, limit: 100 });
      const authors = new Set<string>();
      response.articles.forEach(article => {
        authors.add(article.author);
      });
      return Array.from(authors).sort();
    },
  });

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleAuthorSelect = (author: string) => {
    onAuthorChange?.(author);
    setIsAuthorOpen(false);
  };

  const handleDateRangeSelect = (range: { from: string; to: string }) => {
    onDateRangeChange?.(range);
    setIsDateOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-accent mb-4">Filters</h2>
      
      <div className="space-y-6">
        {/* Tags Section */}
        <div>
          <button
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            className="flex items-center gap-2 text-accent/80 hover:text-primary transition-colors"
          >
            <Tag className="h-4 w-4" />
            <span className="font-medium">Tags</span>
          </button>
          
          <AnimatePresence>
            {isTagsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                  {allTags?.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-accent/5 text-accent/80 hover:bg-accent/10'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedTags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleTagToggle(tag)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Author Section */}
        <div className="relative">
          <button
            onClick={() => setIsAuthorOpen(!isAuthorOpen)}
            className="flex items-center gap-2 text-accent/80 hover:text-primary transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="font-medium">Author</span>
          </button>
          
          <AnimatePresence>
            {isAuthorOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-accent/10 py-1"
              >
                {authors?.map(author => (
                  <button
                    key={author}
                    onClick={() => handleAuthorSelect(author)}
                    className={`w-full px-4 py-2 text-left hover:bg-accent/5 transition-colors ${
                      selectedAuthor === author ? 'text-primary font-medium' : 'text-accent/80'
                    }`}
                  >
                    {author}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date Range Section */}
        <div className="relative">
          <button
            onClick={() => setIsDateOpen(!isDateOpen)}
            className="flex items-center gap-2 text-accent/80 hover:text-primary transition-colors"
          >
            <Calendar className="h-4 w-4" />
            <span className="font-medium">Date Range</span>
          </button>
          
          <AnimatePresence>
            {isDateOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-accent/10 p-4"
              >
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-accent/60 block mb-1">From</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 rounded-lg border border-accent/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      value={selectedDateRange?.from}
                      onChange={(e) => handleDateRangeSelect({ 
                        from: e.target.value, 
                        to: selectedDateRange?.to || '' 
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-accent/60 block mb-1">To</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 rounded-lg border border-accent/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      value={selectedDateRange?.to}
                      onChange={(e) => handleDateRangeSelect({ 
                        from: selectedDateRange?.from || '', 
                        to: e.target.value 
                      })}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ArticleFilters;