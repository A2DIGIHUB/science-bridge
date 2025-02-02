import { useState } from 'react';
import { Microscope, Heart, Globe, Rocket, Brain, Flask } from 'lucide-react';

const categories = [
  { id: 'physics', label: 'Physics', icon: Flask },
  { id: 'health', label: 'Health & Medicine', icon: Heart },
  { id: 'climate', label: 'Climate & Environment', icon: Globe },
  { id: 'space', label: 'Space & Astronomy', icon: Rocket },
  { id: 'ai', label: 'AI & Technology', icon: Brain },
  { id: 'research', label: 'Latest Research', icon: Microscope },
];

const ArticleCategories = () => {
  const [activeCategory, setActiveCategory] = useState('physics');

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveCategory(id)}
          className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
            activeCategory === id
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-white hover:bg-primary/5'
          }`}
        >
          <Icon className={`h-6 w-6 mb-2 ${activeCategory === id ? 'text-white' : 'text-primary'}`} />
          <span className="text-sm font-medium text-center">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ArticleCategories;