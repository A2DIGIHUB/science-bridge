import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Tables } from '../../types/supabase';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { ImageUpload } from './ImageUpload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from 'react-hot-toast';

interface FormData {
  title: string;
  content: string;
  category_id: string;
  cover_image: string;
}

export function BlogCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Tables<'categories'>[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    category_id: '',
    cover_image: '',
  });

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Get the author record
      const { data: author } = await supabase
        .from('authors')
        .select('id')
        .eq('credentials', user.email)
        .single();

      if (!author) throw new Error('No author found');

      // Create the slug
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      // Create the post
      const { data: post, error } = await supabase
        .from('posts')
        .insert({
          title: formData.title,
          content: {
            body: formData.content,
            excerpt: formData.content.substring(0, 150) + '...'
          },
          author_id: author.id,
          category_id: formData.category_id,
          status: 'published' as const,
          cover_image: formData.cover_image,
          slug,
          published_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      if (!post) throw new Error('Failed to create post');

      toast.success('Post created successfully!');
      navigate(`/blog/${post.slug}`);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">
            Share your knowledge with the community
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cover_image">Cover Image</Label>
            <ImageUpload
              onImageUploaded={(url) => 
                setFormData(prev => ({ ...prev, cover_image: url }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) =>
                setFormData(prev => ({ ...prev, category_id: value }))
              }
              required
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
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              className="min-h-[300px]"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/blog')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}
