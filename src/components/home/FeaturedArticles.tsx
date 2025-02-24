import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const FeaturedArticles = () => {
  const navigate = useNavigate();
  
  const { data: featuredPosts } = useQuery({
    queryKey: ['featuredPosts'],
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
        .limit(2);

      if (error) throw error;
      return data;
    }
  });

  if (!featuredPosts?.length) return null;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {featuredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onClick={() => navigate(`/blog/${post.slug}`)}
            className="cursor-pointer"
          >
            <Card className="article-card h-full">
              <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                <img 
                  src={post.content?.cover_image || `https://source.unsplash.com/random/800x600/?${post.category?.name.toLowerCase()}`}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  <span className="tag">{post.category?.name}</span>
                </div>
                <CardTitle className="text-2xl hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.content?.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {post.published_at && formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;