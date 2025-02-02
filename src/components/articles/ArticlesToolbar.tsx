import { useState } from 'react';
import { Search, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';

interface ArticlesToolbarProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
}

const ArticlesToolbar = ({ viewMode, onViewModeChange, onSearch, onSortChange }: ArticlesToolbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
      <div className="relative w-full md:w-auto flex-grow md:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
          <option value="trending">Trending</option>
        </select>

        <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlesToolbar;