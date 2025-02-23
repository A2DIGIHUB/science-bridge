import { motion } from 'framer-motion';
import { Heart, Globe, Rocket, Brain, Microscope, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '../../services/api';

interface ArticleCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  {
    id: 'health',
    name: 'Health & Medicine',
    icon: Heart,
    color: 'bg-rose-500',
    description: 'Medical breakthroughs and healthcare innovations'
  },
  {
    id: 'climate',
    name: 'Climate & Environment',
    icon: Globe,
    color: 'bg-emerald-500',
    description: 'Environmental science and climate research'
  },
  {
    id: 'space',
    name: 'Space & Astronomy',
    icon: Rocket,
    color: 'bg-indigo-500',
    description: 'Space exploration and astronomical discoveries'
  },
  {
    id: 'ai',
    name: 'AI & Technology',
    icon: Brain,
    color: 'bg-violet-500',
    description: 'Artificial intelligence and technological advances'
  },
  {
    id: 'physics',
    name: 'Physics & Quantum',
    icon: Microscope,
    color: 'bg-blue-500',
    description: 'Physics research and quantum mechanics'
  },
  {
    id: 'latest',
    name: 'Latest Research',
    icon: BookOpen,
    color: 'bg-amber-500',
    description: 'Recent scientific publications and findings'
  }
];

const ArticleCategories = ({ selectedCategory, onCategoryChange }: ArticleCategoriesProps) => {
  // Get article count for each category
  const { data: categoryCounts } = useQuery({
    queryKey: ['categoryCounts'],
    queryFn: async () => {
      const response = await articlesApi.getArticles({ page: 1, limit: 100 });
      const counts: Record<string, number> = {};
      response.articles.forEach(article => {
        counts[article.category] = (counts[article.category] || 0) + 1;
      });
      return counts;
    },
  });

  return (
    <div className="overflow-x-auto">
      <nav className="flex flex-nowrap gap-4 pb-4 min-w-full">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const Icon = category.icon;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`relative flex-shrink-0 group ${
                isSelected ? 'scale-[1.02]' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`
                relative flex flex-col items-center w-32 p-4 rounded-xl
                ${isSelected 
                  ? 'bg-white shadow-lg ring-2 ring-primary' 
                  : 'bg-white/50 hover:bg-white hover:shadow-md'
                }
                transition-all duration-200
              `}>
                <div className={`
                  p-3 rounded-lg ${category.color} text-white
                  transform transition-transform group-hover:scale-110
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <h3 className="mt-3 text-sm font-medium text-accent line-clamp-1">
                  {category.name}
                </h3>
                
                {categoryCounts && categoryCounts[category.id] && (
                  <span className="mt-1 text-xs text-accent/60">
                    {categoryCounts[category.id]} articles
                  </span>
                )}
              </div>

              {/* Tooltip */}
              <div className="
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2
                bg-accent text-white text-sm rounded-lg whitespace-nowrap
                opacity-0 group-hover:opacity-100 transition-opacity
                pointer-events-none z-10
              ">
                {category.description}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full
                  border-8 border-transparent border-t-accent">
                </div>
              </div>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default ArticleCategories;