import { motion } from 'framer-motion';

const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[#1A1F2C]" />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] via-[#1A1F2C]/95 to-[#1A1F2C]/90"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(155, 135, 245, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(214, 188, 250, 0.1) 0%, transparent 50%)`
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239b87f5' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
};

export default HeroBackground;