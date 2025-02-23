import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Post } from '../../types/supabase';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            author:authors(*),
            category:categories(*),
            tags:posts_tags(tag:tags(*))
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchPost();
  }, [slug]);

  if (loading) return <div className="flex justify-center p-8">Loading post...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!post) return <div className="p-4">Post not found</div>;

  return (
    <article className="container mx-auto p-4 max-w-4xl">
      <header className="space-y-8 mb-8">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author?.avatar_url} />
            <AvatarFallback>{post.author?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author?.name}</p>
            <p className="text-sm text-muted-foreground">{post.author?.credentials}</p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">{post.category?.name}</Badge>
          {post.tags?.map(({ tag }) => (
            <Badge key={tag.id} variant="outline">
              {tag.name}
            </Badge>
          ))}
        </div>

        {post.published_at && (
          <p className="text-sm text-muted-foreground">
            Published on {format(new Date(post.published_at), 'MMMM d, yyyy')}
          </p>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content?.body || ''}
        </ReactMarkdown>
      </div>

      {post.content?.references && post.content.references.length > 0 && (
        <footer className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">References</h2>
          <ul className="list-disc pl-5 space-y-2">
            {post.content.references.map((ref, index) => (
              <li key={index}>{ref}</li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
