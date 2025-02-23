import { Search, Grid, List } from 'lucide-react';

interface ArticlesToolbarProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
  currentSearch: string;
  currentSort: string;
}

const ArticlesToolbar = ({ 
  viewMode, 
  onViewModeChange, 
  onSearch, 
  onSortChange,
  currentSearch,
  currentSort
}: ArticlesToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search articles..."
          value={currentSearch}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      <div className="flex items-center gap-4">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most_liked">Most Liked</option>
          <option value="most_viewed">Most Viewed</option>
        </select>

        <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid'
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded ${
              viewMode === 'list'
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlesToolbar;