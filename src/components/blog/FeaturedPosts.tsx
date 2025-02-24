import { useNavigate } from 'react-router-dom';
import type { Post } from '../../types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const navigate = useNavigate();
  const featuredPosts = posts.slice(0, 3); // Get first 3 posts as featured

  if (featuredPosts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredPosts.map((post, index) => (
        <Card 
          key={post.id}
          className={`group cursor-pointer overflow-hidden bg-card/50 backdrop-blur hover:bg-card transition-colors ${
            index === 0 ? 'md:col-span-2 md:row-span-2' : ''
          }`}
          onClick={() => navigate(`/blog/${post.slug}`)}
        >
          {/* Post Image */}
          <div className={`relative ${index === 0 ? 'h-96' : 'h-48'} overflow-hidden`}>
            <img 
              src={post.cover_image || 'https://source.unsplash.com/random/800x600/?science'} 
              alt={post.title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-primary/10">
                {post.category?.name}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {post.published_at && formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
              </span>
            </div>

            <CardTitle className={`group-hover:text-primary transition-colors line-clamp-2 ${
              index === 0 ? 'text-3xl' : 'text-xl'
            }`}>
              {post.title}
            </CardTitle>

            <CardDescription className="line-clamp-2">
              {post.content?.excerpt}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author?.avatar_url} />
                  <AvatarFallback>{post.author?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post.author?.name}</span>
              </div>
              <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
