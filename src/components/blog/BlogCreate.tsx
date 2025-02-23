import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { MultiSelect } from '../ui/multi-select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'react-hot-toast';

export function BlogCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    selectedTags: [] as string[],
  });

  useEffect(() => {
    async function fetchMetadata() {
      const [categoriesData, tagsData] = await Promise.all([
        supabase.from('categories').select('*'),
        supabase.from('tags').select('*')
      ]);

      if (categoriesData.data) setCategories(categoriesData.data);
      if (tagsData.data) setTags(tagsData.data);
    }

    fetchMetadata();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to create a post');

      // Get the author record for the current user
      const { data: authorData, error: authorError } = await supabase
        .from('authors')
        .select('id')
        .eq('credentials', user.email)
        .single();

      if (authorError || !authorData) {
        throw new Error('Author profile not found');
      }

      // Create the post
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          title: formData.title,
          slug,
          content: {
            body: formData.content,
            excerpt: formData.content.substring(0, 200) + '...'
          },
          author_id: authorData.id,
          category_id: formData.categoryId,
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (postError) throw postError;

      // Add tags
      if (formData.selectedTags.length > 0) {
        const tagConnections = formData.selectedTags.map(tagId => ({
          post_id: post.id,
          tag_id: tagId,
        }));

        const { error: tagsError } = await supabase
          .from('posts_tags')
          .insert(tagConnections);

        if (tagsError) throw tagsError;
      }

      toast.success('Blog post created successfully!');
      navigate(`/blog/${slug}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <MultiSelect
                options={tags.map(tag => ({ label: tag.name, value: tag.id }))}
                selected={formData.selectedTags}
                onChange={(selected) => setFormData({ ...formData, selectedTags: selected })}
                placeholder="Select tags"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="min-h-[400px] font-mono"
                placeholder="Write your blog post in Markdown format..."
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
