import { CalendarDays, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const RecentPosts = () => {
  const navigate = useNavigate();

  const { data: posts } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          slug,
          content,
          published_at,
          category:categories(name),
          author:authors(name, avatar_url)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .range(2, 4); // Skip the first 2 (featured) posts and get the next 3

      if (error) throw error;
      return data;
    }
  });

  if (!posts?.length) return null;

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
            onClick={() => navigate(`/blog/${post.slug}`)}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={post.content?.cover_image || `https://source.unsplash.com/random/800x600/?${post.category?.name.toLowerCase()}`}
                  alt={post.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {post.category?.name}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {post.published_at && formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.content?.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author?.avatar_url}
                      alt={post.author?.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-sm font-medium">{post.author?.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </div>
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