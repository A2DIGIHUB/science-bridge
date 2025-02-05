import { Clock, ThumbsUp, Share2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    slug: 'future-of-quantum-computing',
    title: "The Future of Quantum Computing",
    excerpt: "Exploring the latest breakthroughs in quantum computing and their implications...",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    category: "Physics",
    tags: ["Quantum", "Technology"],
    author: "Dr. Sarah Smith",
    date: "2024-02-15",
    readTime: "5 min",
    likes: 234,
    views: 1205,
  },
  {
    id: 2,
    slug: 'understanding-crispr-technology',
    title: "Understanding CRISPR Technology",
    excerpt: "A deep dive into how CRISPR gene editing is revolutionizing medicine...",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69",
    category: "Health",
    tags: ["Genetics", "Medicine"],
    author: "Prof. John Doe",
    date: "2024-02-14",
    readTime: "7 min",
    likes: 189,
    views: 892,
  },
  {
    id: 3,
    slug: 'black-holes-new-discoveries',
    title: "Black Holes: New Discoveries",
    excerpt: "Recent observations have revealed fascinating new details about black holes...",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
    category: "Space",
    tags: ["Astronomy", "Physics"],
    author: "Dr. Michael Brown",
    date: "2024-02-13",
    readTime: "6 min",
    likes: 312,
    views: 1567,
  },
];

const ArticleGrid = ({ viewMode }: { viewMode: 'grid' | 'list' }) => {
  return (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {articles.map((article) => (
        <article
          key={article.id}
          className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
            viewMode === 'list' ? 'flex' : ''
          } animate-fade-in`}
        >
          <Link 
            to={`/articles/${article.slug}`}
            className={`block ${viewMode === 'list' ? 'w-1/3' : ''}`}
          >
            <div className="aspect-video relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          
          <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
            <div className="flex gap-2 mb-3">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            
            <Link to={`/articles/${article.slug}`}>
              <h3 className="text-xl font-bold text-accent mb-2 hover:text-primary transition-colors">
                {article.title}
              </h3>
            </Link>
            <p className="text-accent/60 mb-4">{article.excerpt}</p>
            
            <div className="flex items-center justify-between text-sm text-accent/40">
              <div className="flex items-center gap-4">
                <span>{article.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-1 hover:text-primary transition-colors flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{article.likes}</span>
                </button>
                <button className="p-1 hover:text-primary transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="p-1 hover:text-primary transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleGrid;