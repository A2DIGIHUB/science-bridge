import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Post } from '../../types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { formatDistanceToNow } from 'date-fns';
import { BlogFilter } from './BlogFilter';
import { Pencil } from 'lucide-react';

export function BlogList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    categories: [] as string[],
    tags: [] as string[]
  });

  const fetchPosts = useCallback(async () => {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          author:authors(*),
          category:categories(*),
          tags:posts_tags(tag:tags(*))
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content->>'body'.ilike.%${filters.search}%`);
      }

      if (filters.categories.length > 0) {
        query = query.in('category_id', filters.categories);
      }

      if (filters.tags.length > 0) {
        query = query.in('id', (sb) =>
          sb.from('posts_tags')
            .select('post_id')
            .in('tag_id', filters.tags)
        );
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

  if (error) return (
    <div className="flex justify-center p-8">
      <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Science Blog</h1>
        {isAuthor && (
          <Button onClick={() => navigate('/blog/create')} className="flex items-center">
            <Pencil className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <BlogFilter onFilterChange={setFilters} />
        </aside>

        <main className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="space-y-4">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <Card className="p-8 text-center">
              <CardHeader>
                <CardTitle>No posts found</CardTitle>
                <CardDescription>
                  Try adjusting your filters or check back later for new content.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {posts.map((post) => (
                <Card 
                  key={post.id} 
                  className="group cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
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
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {post.content?.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      {post.category && (
                        <Badge variant="secondary" className="group-hover:bg-secondary/80">
                          {post.category.name}
                        </Badge>
                      )}
                      {post.tags?.map(({ tag }) => (
                        <Badge key={tag.id} variant="outline" className="group-hover:bg-accent">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
