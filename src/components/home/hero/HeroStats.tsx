import { motion } from 'framer-motion';

const stats = [
  { value: "1000+", label: "Research Articles" },
  { value: "50K+", label: "Active Learners" },
  { value: "100+", label: "Expert Contributors" },
  { value: "24/7", label: "Community Support" }
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
        <div key={index} className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="text-4xl font-bold text-[#9b87f5]"
          >
            {stat.value}
          </motion.div>
          <div className="text-sm text-[#D6BCFA]/60 mt-1">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

export default HeroStats;