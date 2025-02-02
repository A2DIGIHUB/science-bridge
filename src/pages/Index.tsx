import HeroSection from '../components/home/HeroSection';
import FeaturedArticles from '../components/home/FeaturedArticles';
import VideoSection from '../components/home/VideoSection';
import QuizSection from '../components/home/QuizSection';
import EventsSection from '../components/home/EventsSection';
import CommunitySection from '../components/home/CommunitySection';
import NewsletterSection from '../components/home/NewsletterSection';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-secondary pt-16">
      <main className="w-full">
        <HeroSection />
        <FeaturedArticles />
        <VideoSection />
        <QuizSection />
        <EventsSection />
        <CommunitySection />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default Index;