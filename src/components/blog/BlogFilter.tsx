import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Search, X } from 'lucide-react';

interface BlogFilterProps {
  onFilterChange: (filters: {
    search: string;
    categories: string[];
    tags: string[];
  }) => void;
}

export function BlogFilter({ onFilterChange }: BlogFilterProps) {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFilters() {
      const [categoriesData, tagsData] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('tags').select('*').order('name')
      ]);

      if (categoriesData.data) setCategories(categoriesData.data);
      if (tagsData.data) setTags(tagsData.data);
    }

    fetchFilters();
  }, []);

  useEffect(() => {
    onFilterChange({
      search,
      categories: selectedCategories,
      tags: selectedTags
    });
  }, [search, selectedCategories, selectedTags, onFilterChange]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Search</h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Categories</h3>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategories([])}
              className="h-8 px-2 text-muted-foreground"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategories.includes(category.id) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90"
              onClick={() => toggleCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Tags</h3>
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTags([])}
              className="h-8 px-2 text-muted-foreground"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={selectedTags.includes(tag.id) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90"
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>

      {(search || selectedCategories.length > 0 || selectedTags.length > 0) && (
        <div className="pt-2">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            <X className="mr-2 h-4 w-4" />
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
