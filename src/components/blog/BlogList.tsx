import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Post, Tables } from '../../types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { formatDistanceToNow } from 'date-fns';
import { BlogFilter } from './BlogFilter';
import { FeaturedPosts } from './FeaturedPosts';
import { Pencil, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

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
  const [activeTab, setActiveTab] = useState('all');

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
        .eq('status', 'published' as const)
        .order('published_at', { ascending: false });

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content->>'body'.ilike.%${filters.search}%`);
      }

      if (filters.categories.length > 0) {
        query = query.in('category_id', filters.categories as string[]);
      }

      if (filters.tags.length > 0) {
        const { data: postIds } = await supabase
          .from('posts_tags')
          .select('post_id')
          .in('tag_id', filters.tags as string[]);

        if (postIds) {
          query = query.in('id', postIds.map(p => p.post_id));
        }
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
      if (user?.email) {
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

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    return post.category?.name.toLowerCase() === activeTab;
  });

  const categories = Array.from(new Set(posts.map(post => post.category?.name))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Science Bridge Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the latest discoveries, innovations, and breakthroughs in science and technology.
          </p>
          {isAuthor && (
            <Button 
              onClick={() => navigate('/blog/create')} 
              className="mt-6"
              size="lg"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          )}
        </div>

        {/* Featured Posts */}
        {!loading && !filters.search && filters.categories.length === 0 && filters.tags.length === 0 && (
          <FeaturedPosts posts={posts} />
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <BlogFilter onFilterChange={setFilters} />
            
            {/* Popular Tags Section */}
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {Array.from(new Set(posts.flatMap(post => post.tags?.map(t => t.tag)))).slice(0, 8).map(tag => (
                  <Badge 
                    key={tag?.id} 
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      tags: [...prev.tags, tag?.id || '']
                    }))}
                  >
                    {tag?.name}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Category Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category?.toLowerCase() || ''}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Posts Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
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
            ) : filteredPosts.length === 0 ? (
              <Card className="p-8 text-center bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>No posts found</CardTitle>
                  <CardDescription>
                    Try adjusting your filters or check back later for new content.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="group cursor-pointer overflow-hidden bg-card/50 backdrop-blur hover:bg-card transition-colors"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    {/* Post Image */}
                    <div className="relative h-48 overflow-hidden">
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

                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
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
                            <AvatarImage src={post.author?.avatar_url || undefined} />
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
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
