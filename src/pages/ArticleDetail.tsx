import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ThumbsUp, Share2, Bookmark } from 'lucide-react';

// This would typically come from an API or database
const getArticleBySlug = (slug: string) => {
  const articles = {
    'future-of-quantum-computing': {
      id: 1,
      title: "The Future of Quantum Computing",
      content: `
        <p>Quantum computing represents a fundamental shift in how we process information. Unlike classical computers that use bits (0s and 1s), quantum computers leverage quantum bits or qubits, which can exist in multiple states simultaneously thanks to the principles of quantum mechanics.</p>
        <h2>Recent Breakthroughs</h2>
        <p>Recent advances in quantum computing have brought us closer to achieving quantum supremacy - the point at which quantum computers can solve problems that classical computers practically cannot.</p>
        <h2>Practical Applications</h2>
        <p>The implications of quantum computing span across multiple industries:</p>
        <ul>
          <li>Cryptography and security</li>
          <li>Drug discovery and development</li>
          <li>Climate modeling and weather prediction</li>
          <li>Financial modeling and optimization</li>
        </ul>
      `,
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
    'understanding-crispr-technology': {
      id: 2,
      title: "Understanding CRISPR Technology",
      content: `
        <p>CRISPR gene editing technology has revolutionized our ability to modify DNA with precision and efficiency never before possible.</p>
        <h2>How CRISPR Works</h2>
        <p>At its core, CRISPR uses a protein called Cas9 that acts like molecular scissors, capable of cutting DNA at specific locations.</p>
        <h2>Medical Applications</h2>
        <p>The potential applications in medicine are vast:</p>
        <ul>
          <li>Treating genetic disorders</li>
          <li>Developing new cancer therapies</li>
          <li>Creating disease-resistant crops</li>
          <li>Advancing biotechnology research</li>
        </ul>
      `,
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
    'black-holes-new-discoveries': {
      id: 3,
      title: "Black Holes: New Discoveries",
      content: `
        <p>Recent observations have revealed fascinating new details about black holes, challenging our understanding of these cosmic phenomena.</p>
        <h2>Event Horizon Observations</h2>
        <p>The Event Horizon Telescope has provided unprecedented views of black holes, allowing scientists to study their properties in detail.</p>
        <h2>Implications for Physics</h2>
        <p>These discoveries have significant implications for:</p>
        <ul>
          <li>General relativity</li>
          <li>Quantum mechanics</li>
          <li>The nature of spacetime</li>
          <li>The evolution of galaxies</li>
        </ul>
      `,
      excerpt: "Recent observations have revealed fascinating new details about black holes...",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
      category: "Space",
      tags: ["Astronomy", "Physics"],
      author: "Dr. Michael Brown",
      date: "2024-02-13",
      readTime: "6 min",
      likes: 312,
      views: 1567,
    }
  };
  
  return articles[slug as keyof typeof articles];
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || '');

  if (!article) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold">Article not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4"
      >
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            {article.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-accent mb-4">{article.title}</h1>
          <div className="flex items-center justify-between text-sm text-accent/60 mb-6">
            <div className="flex items-center gap-4">
              <span>{article.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="hover:text-primary transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="aspect-[2/1] rounded-lg overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mt-8 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-accent/60 hover:text-primary transition-colors">
                <ThumbsUp className="h-5 w-5" />
                <span>{article.likes}</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="button-primary">
                Share Article
              </button>
            </div>
          </div>
        </footer>
      </motion.article>
    </div>
  );
};

export default ArticleDetail;