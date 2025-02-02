import ArticleHero from '../components/articles/ArticleHero';
import ArticleCategories from '../components/articles/ArticleCategories';
import ArticleFilters from '../components/articles/ArticleFilters';
import ArticleGrid from '../components/articles/ArticleGrid';
import { useState } from 'react';

const Articles = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-surface">
      <ArticleHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8">
          <ArticleCategories />
          <ArticleFilters />
          <ArticleGrid viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
};

export default Articles;