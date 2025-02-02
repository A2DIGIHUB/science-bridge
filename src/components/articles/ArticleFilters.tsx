import { Calendar, Tag, User } from 'lucide-react';

const ArticleFilters = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Tag className="h-4 w-4" />
            Tags
          </label>
          <select className="w-full rounded-md border border-gray-300 p-2">
            <option value="">Select tags...</option>
            <option value="quantum">Quantum Physics</option>
            <option value="crispr">CRISPR</option>
            <option value="blackholes">Black Holes</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <User className="h-4 w-4" />
            Author
          </label>
          <select className="w-full rounded-md border border-gray-300 p-2">
            <option value="">Select author...</option>
            <option value="dr-smith">Dr. Smith</option>
            <option value="prof-jones">Prof. Jones</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4" />
            Date Range
          </label>
          <select className="w-full rounded-md border border-gray-300 p-2">
            <option value="">Select range...</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArticleFilters;