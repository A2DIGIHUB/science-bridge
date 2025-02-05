import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturedArticles from '../components/home/FeaturedArticles';
import VideoSection from '../components/home/VideoSection';
import QuizSection from '../components/home/QuizSection';
import EventsSection from '../components/home/EventsSection';
import CommunitySection from '../components/home/CommunitySection';
import NewsletterSection from '../components/home/NewsletterSection';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-secondary pt-16">
      <main className="w-full">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.div variants={fadeInUp}>
            <HeroSection />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <FeaturedArticles />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <VideoSection />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <QuizSection />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <EventsSection />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <CommunitySection />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <NewsletterSection />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;