import { useState } from 'react';
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import ArticleHero from '../components/articles/ArticleHero';
import ArticleGrid from '../components/articles/ArticleGrid';
import ArticleCategories from '../components/articles/ArticleCategories';
import ArticleFilters from '../components/articles/ArticleFilters';

const Articles = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <ArticleHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <div className="flex items-center gap-2 border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <ArticleCategories />
          
          {showFilters && <ArticleFilters />}
          
          <ArticleGrid viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
};

export default Articles;