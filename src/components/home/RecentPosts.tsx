import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const posts = [
  {
    id: 1,
    title: "Understanding Dark Matter: New Discoveries",
    excerpt: "Recent observations have shed new light on the mysterious nature of dark matter...",
    date: "2024-02-20",
    readTime: "6 min",
    category: "Physics",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
  },
  {
    id: 2,
    title: "The Future of Renewable Energy",
    excerpt: "Breakthrough technologies are reshaping how we think about sustainable power...",
    date: "2024-02-19",
    readTime: "5 min",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"
  },
  {
    id: 3,
    title: "AI in Medical Diagnosis",
    excerpt: "How artificial intelligence is revolutionizing the way doctors detect diseases...",
    date: "2024-02-18",
    readTime: "4 min",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557"
  }
];

const RecentPosts = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
      <div className="space-y-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover md:h-full"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-accent/60 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-accent/40">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;