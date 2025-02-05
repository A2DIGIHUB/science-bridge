import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

const tags = [
  { name: 'Physics', count: 42 },
  { name: 'Biology', count: 38 },
  { name: 'Technology', count: 35 },
  { name: 'Space', count: 31 },
  { name: 'Medicine', count: 28 },
  { name: 'Environment', count: 25 },
  { name: 'Chemistry', count: 22 },
  { name: 'AI', count: 20 },
];

const PopularTags = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Popular Tags</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <motion.button
            key={tag.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface hover:bg-primary/5 transition-colors"
          >
            <span className="text-sm font-medium">{tag.name}</span>
            <span className="text-xs text-accent/40">{tag.count}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;