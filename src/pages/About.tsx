import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen w-full bg-surface">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-accent">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              About SciComm
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              Bridging the gap between complex scientific research and public understanding through engaging, accessible communication.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section with Interactive Cards */}
      <section className="w-full py-24 bg-surface">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-accent">Our Mission</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600">
                  At SciComm, we believe that scientific knowledge should be accessible to everyone. Our platform serves as a bridge between researchers and the public, translating complex scientific concepts into engaging, understandable content.
                </p>
                <p className="text-lg text-gray-600">
                  Through articles, videos, and interactive content, we're making science more approachable and inspiring the next generation of scientists and science enthusiasts.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Person working on scientific content"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section with Hover Effects */}
      <section className="w-full py-24 bg-accent/5">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-accent text-center mb-16"
          >
            Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Editor-in-Chief",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
                description: "Ph.D. in Molecular Biology with 10+ years of science communication experience."
              },
              {
                name: "Michael Rodriguez",
                role: "Content Director",
                image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
                description: "Award-winning science journalist and digital content strategist."
              },
              {
                name: "Dr. James Wilson",
                role: "Scientific Advisor",
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
                description: "Research scientist and public engagement specialist."
              }
            ].map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-accent mb-2">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Animated Icons */}
      <section className="w-full py-24 bg-surface">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-accent text-center mb-16"
          >
            Get in Touch
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email",
                content: "contact@scicomm.com"
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Phone",
                content: "+1 (555) 123-4567"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Location",
                content: "San Francisco, CA"
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-accent mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;