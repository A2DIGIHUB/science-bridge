import Navigation from '../components/Navigation';
import HeroSection from '../components/home/HeroSection';
import FeaturedArticles from '../components/home/FeaturedArticles';
import NewsletterSection from '../components/home/NewsletterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Navigation />
      <HeroSection />
      <FeaturedArticles />
      <NewsletterSection />
    </div>
  );
};

export default Index;