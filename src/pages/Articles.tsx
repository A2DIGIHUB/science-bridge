import { useState, useEffect } from 'react';
import ArticleHero from '../components/articles/ArticleHero';
import ArticleCategories from '../components/articles/ArticleCategories';
import ArticleFilters from '../components/articles/ArticleFilters';
import ArticleGrid from '../components/articles/ArticleGrid';
import ArticlesToolbar from '../components/articles/ArticlesToolbar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Articles = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSort = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1); // Reset to first page when sorting
  };

  return (
    <div className="min-h-screen w-full bg-surface pt-16">
      <ArticleHero />
      
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col space-y-8">
          <ArticleCategories />
          
          <ArticlesToolbar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSearch={handleSearch}
            onSortChange={handleSort}
          />
          
          <ArticleFilters />
          
          <ArticleGrid viewMode={viewMode} />

          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;