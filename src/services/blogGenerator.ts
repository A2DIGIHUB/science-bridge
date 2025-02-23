import { Configuration, OpenAIApi } from 'openai';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { z } from 'zod';
import { blogService } from './blog';

const blogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.object({
    excerpt: z.string(),
    body: z.string(),
    references: z.array(z.string())
  }),
  metadata: z.object({
    readTime: z.number()
  }),
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.array(z.string())
  }),
  categorization: z.object({
    category: z.string(),
    tags: z.array(z.string()),
    scienceField: z.string()
  })
});

type BlogPostInput = z.infer<typeof blogPostSchema>;

const openai = new OpenAIApi(
  new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
  })
);

export const blogGenerator = {
  async generatePost(topic: string, scienceField: string, authorId: string): Promise<BlogPostInput> {
    // Generate content using OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a scientific writer creating accurate, engaging blog posts. 
            Format your response in markdown with the following sections:
            # Title
            ## Excerpt
            ## Content
            ## References
            ## Keywords
            ## Category
            ## Tags`
        },
        {
          role: "user",
          content: `Write a blog post about ${topic} in the field of ${scienceField}.
            Make it engaging and accessible while maintaining scientific accuracy.
            Include relevant scientific references.`
        }
      ]
    });

    const content = completion.data.choices[0].message?.content;
    if (!content) throw new Error("Failed to generate content");

    // Parse the markdown content
    const parsed = await this.parseContent(content);
    
    // Validate the structure
    const validated = blogPostSchema.parse(parsed);

    // Create the post in Supabase
    const post = await blogService.createPost({
      title: validated.title,
      slug: validated.slug,
      content: {
        excerpt: validated.content.excerpt,
        body: validated.content.body,
        references: validated.content.references
      },
      author_id: authorId,
      status: 'draft',
      published_at: null
    });

    return validated;
  },

  private async parseContent(content: string): Promise<BlogPostInput> {
    // Parse markdown content
    const parsed = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .process(content);

    // Extract sections from the markdown AST
    const sections = this.extractSections(parsed);

    // Generate slug from title
    const slug = sections.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = sections.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    return {
      title: sections.title,
      slug,
      content: {
        excerpt: sections.excerpt,
        body: sections.content,
        references: sections.references
      },
      metadata: {
        readTime
      },
      seo: {
        metaTitle: sections.title,
        metaDescription: sections.excerpt,
        keywords: sections.keywords
      },
      categorization: {
        category: sections.category,
        tags: sections.tags,
        scienceField: sections.scienceField
      }
    };
  },

  private extractSections(parsed: any) {
    // Implementation to extract sections from markdown AST
    // This is a simplified version - you'd want to properly parse the AST
    return {
      title: '',
      excerpt: '',
      content: '',
      references: [],
      keywords: [],
      category: '',
      tags: [],
      scienceField: ''
    };
  }
};
