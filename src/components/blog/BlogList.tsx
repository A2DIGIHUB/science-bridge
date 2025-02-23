import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Post } from '../../types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';

export function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            author:authors(*),
            category:categories(*),
            tags:posts_tags(tag:tags(*))
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    async function checkAuthorStatus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('authors')
          .select('*')
          .eq('credentials', user.email)
          .single();
        
        setIsAuthor(!!data);
      }
    }
    
    checkAuthorStatus();
  }, []);

  if (loading) return <div className="flex justify-center p-8">Loading posts...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        {isAuthor && (
          <Button onClick={() => navigate('/blog/create')}>
            Create New Post
          </Button>
        )}
      </div>
      
      {posts.map((post) => (
        <Link key={post.id} to={`/blog/${post.slug}`}>
          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.author?.avatar_url} />
                  <AvatarFallback>{post.author?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.published_at && formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {post.content?.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{post.category?.name}</Badge>
                {post.tags?.map(({ tag }) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
