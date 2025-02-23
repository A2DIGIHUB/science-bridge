import { Post } from '../../types/supabase';
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const navigate = useNavigate();
  const featuredPosts = posts.slice(0, 3);

  if (featuredPosts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {featuredPosts.map((post, index) => (
        <Card 
          key={post.id}
          className={`group relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] ${
            index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
          }`}
          onClick={() => navigate(`/blog/${post.slug}`)}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${post.cover_image || 'https://source.unsplash.com/random/800x600/?science'})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </div>

          {/* Content */}
          <CardContent className="relative h-full flex flex-col justify-end p-6 min-h-[400px] text-white">
            <div className="space-y-4">
              {/* Category & Date */}
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-primary/80 hover:bg-primary">
                  {post.category?.name}
                </Badge>
                <span className="text-sm opacity-80">
                  {post.published_at && formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                </span>
              </div>

              {/* Title */}
              <h2 className={`font-bold leading-tight group-hover:text-primary-foreground transition-colors ${
                index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'
              }`}>
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="line-clamp-2 text-sm md:text-base opacity-90">
                {post.content?.excerpt}
              </p>

              {/* Author & Tags */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-2">
                  <img 
                    src={post.author?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + post.author?.name}
                    alt={post.author?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{post.author?.name}</span>
                </div>
                <div className="flex gap-2">
                  {post.tags?.slice(0, 2).map(({ tag }) => (
                    <Badge key={tag.id} variant="outline" className="border-white/20 text-white/90">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
