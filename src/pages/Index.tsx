import { ArrowRight, Calendar, MessageSquare, Search, Moon, Sun, Youtube, Headphones, BarChart2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredArticles = [
  {
    title: "Quantum Computing Breakthrough",
    description: "Recent advances in quantum computing are paving the way for revolutionary changes in computational power...",
    tags: ["Physics", "Technology"],
    readingTime: "5 min",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    title: "AI in Medical Research",
    description: "Artificial intelligence is transforming how we approach medical research and drug discovery...",
    tags: ["AI", "Medicine"],
    readingTime: "4 min",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "Climate Change Impact",
    description: "New studies reveal unprecedented changes in global weather patterns and their implications...",
    tags: ["Environment", "Climate"],
    readingTime: "6 min",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  }
];

const upcomingEvents = [
  {
    title: "NASA's Mars Mission Livestream",
    date: "March 15, 2024",
    type: "Webinar",
    icon: "🛰️"
  },
  {
    title: "AI & Ethics Seminar",
    date: "March 20, 2024",
    type: "Conference",
    icon: "🧠"
  },
  {
    title: "Medical Tech Innovations 2025",
    date: "March 25, 2024",
    type: "Workshop",
    icon: "🏥"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent animate-fade-up">
              Unlock the Wonders of Science
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-accent/60 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Your gateway to simplified science, research insights, and the latest discoveries
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Button className="button-primary">
                Explore Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                Try AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Featured Articles</h2>
          <p className="section-subtitle text-center mb-12">
            The latest breakthroughs in science and technology
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="article-card overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    {article.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent/40">{article.readingTime} read</span>
                    <button className="text-primary hover:text-primary-dark font-medium text-sm">
                      Read More
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video & Podcast Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Watch & Listen</h2>
          <p className="section-subtitle text-center mb-12">
            Explore our multimedia content
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Youtube className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Latest Videos</h3>
              </div>
              <div className="aspect-video bg-accent/5 rounded-lg flex items-center justify-center">
                <p className="text-accent/40">Video Player Placeholder</p>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Headphones className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Featured Podcasts</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-accent/5 rounded-lg">
                  <h4 className="font-medium">The Science Hour</h4>
                  <p className="text-sm text-accent/60">Latest episode: Understanding Dark Matter</p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg">
                  <h4 className="font-medium">Tech Insights</h4>
                  <p className="text-sm text-accent/60">Latest episode: Future of AI</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Calendar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Upcoming Events</h2>
          <p className="section-subtitle text-center mb-12">
            Join our science community events
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{event.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-accent/60 text-sm">{event.date}</p>
                    <span className="inline-block mt-2 text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {event.type}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel rounded-2xl p-8 sm:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="section-title">Join 10,000+ Science Enthusiasts</h2>
              <p className="section-subtitle">
                Get the latest scientific discoveries delivered to your inbox
              </p>
              <form className="mt-8 sm:flex justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-96 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button type="submit" className="mt-3 sm:mt-0 sm:ml-3 button-primary w-full sm:w-auto">
                  Subscribe
                </Button>
              </form>
              <p className="mt-4 text-xs text-accent/40">
                By subscribing, you agree to our Privacy Policy and Terms of Service
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;