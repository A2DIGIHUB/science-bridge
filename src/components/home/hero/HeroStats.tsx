import { motion } from 'framer-motion';

const stats = [
  { value: "1000+", label: "Research Articles", description: "Curated tech content" },
  { value: "50K+", label: "Active Learners", description: "Growing community" },
  { value: "100+", label: "Expert Contributors", description: "Industry leaders" },
  { value: "24/7", label: "Community Support", description: "Always available" }
];

const HeroStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            {stat.value}
          </div>
          <div className="text-[#D6BCFA] font-medium mt-1">{stat.label}</div>
          <div className="text-sm text-[#D6BCFA]/60 mt-1">{stat.description}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroStats;