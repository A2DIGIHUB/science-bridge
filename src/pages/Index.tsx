import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturedArticles from '../components/home/FeaturedArticles';
import NewsletterSection from '../components/home/NewsletterSection';
import RecentPosts from '../components/home/RecentPosts';
import PopularTags from '../components/home/PopularTags';
import CommunitySection from '../components/home/CommunitySection';
import QuizSection from '../components/home/QuizSection';
import VideoSection from '../components/home/VideoSection';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-surface">
      <main>
        <HeroSection />
        
        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-12"
          >
            <FeaturedArticles />
          </motion.div>

          {/* Interactive Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
            {/* Main Content */}
            <motion.div 
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <RecentPosts />
              <QuizSection />
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="lg:col-span-4 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-24 space-y-8">
                <PopularTags />
                <NewsletterSection />
              </div>
            </motion.div>
          </div>

          {/* Engagement Sections */}
          <VideoSection />
          <CommunitySection />
        </div>
      </main>
    </div>
  );
};

export default Index;