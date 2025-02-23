import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleHero from '../components/articles/ArticleHero';
import ArticleCategories from '../components/articles/ArticleCategories';
import ArticleFilters from '../components/articles/ArticleFilters';
import ArticleGrid from '../components/articles/ArticleGrid';
import ArticlesToolbar from '../components/articles/ArticlesToolbar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '../services/api';

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = 9;
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';
  const category = searchParams.get('category') || '';
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const author = searchParams.get('author') || '';
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';
  const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid';

  const { data: articlesData } = useQuery({
    queryKey: ['articles', { page, limit, search, sort, category, tags, author, dateFrom, dateTo }],
    queryFn: () => articlesApi.getArticles({ 
      page, 
      limit, 
      search, 
      sort, 
      category, 
      tags,
      author,
      dateRange: dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined
    }),
  });

  const totalPages = articlesData ? Math.ceil(articlesData.total / limit) : 0;

  const handleSearch = (query: string) => {
    setSearchParams(prev => {
      prev.set('search', query);
      prev.set('page', '1');
      return prev;
    });
  };

  const handleSort = (sortValue: string) => {
    setSearchParams(prev => {
      prev.set('sort', sortValue);
      prev.set('page', '1');
      return prev;
    });
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setSearchParams(prev => {
      prev.set('view', mode);
      return prev;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams(prev => {
      prev.set('category', category);
      prev.set('page', '1');
      return prev;
    });
  };

  const handleTagsChange = (tags: string[]) => {
    setSearchParams(prev => {
      prev.set('tags', tags.join(','));
      prev.set('page', '1');
      return prev;
    });
  };

  const handleAuthorChange = (author: string) => {
    setSearchParams(prev => {
      prev.set('author', author);
      prev.set('page', '1');
      return prev;
    });
  };

  const handleDateRangeChange = (range: { from: string; to: string }) => {
    setSearchParams(prev => {
      prev.set('dateFrom', range.from);
      prev.set('dateTo', range.to);
      prev.set('page', '1');
      return prev;
    });
  };

  return (
    <div className="min-h-screen w-full bg-surface">
      <ArticleHero />
      
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <ArticleCategories 
                selectedCategory={category}
                onCategoryChange={handleCategoryChange}
              />
              
              <ArticleFilters 
                selectedTags={tags}
                selectedAuthor={author}
                selectedDateRange={
                  dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined
                }
                onTagsChange={handleTagsChange}
                onAuthorChange={handleAuthorChange}
                onDateRangeChange={handleDateRangeChange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <ArticlesToolbar
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              onSearch={handleSearch}
              onSortChange={handleSort}
              currentSearch={search}
              currentSort={sort}
            />
            
            <div className="mt-6">
              <ArticleGrid 
                viewMode={viewMode}
                page={page}
                limit={limit}
                search={search}
                sort={sort}
                category={category}
                tags={tags}
                author={author}
                dateRange={
                  dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined
                }
              />
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(page - 1)}
                        className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum)}
                          isActive={pageNum === page}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(page + 1)}
                        className={page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;