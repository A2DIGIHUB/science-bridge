import { Mail, MapPin, Phone } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen w-full bg-secondary pt-24">
      {/* Hero Section */}
      <section className="w-full bg-accent text-white py-16">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up">About SciComm</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl animate-fade-up delay-100">
            Bridging the gap between complex scientific research and public understanding through engaging, accessible communication.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-16 bg-surface">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <h2 className="text-3xl font-bold text-accent">Our Mission</h2>
              <p className="text-lg text-gray-600">
                At SciComm, we believe that scientific knowledge should be accessible to everyone. Our platform serves as a bridge between researchers and the public, translating complex scientific concepts into engaging, understandable content.
              </p>
              <p className="text-lg text-gray-600">
                Through articles, videos, and interactive content, we're making science more approachable and inspiring the next generation of scientists and science enthusiasts.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden animate-fade-up delay-100">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Person working on scientific content"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-accent mb-12 text-center">Our Team</h2>
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
              <div 
                key={member.name}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-accent">{member.name}</h3>
                  <p className="text-primary-light mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 bg-surface">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-accent mb-12 text-center">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email",
                content: "contact@scicomm.com"
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Phone",
                content: "+1 (555) 123-4567"
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Location",
                content: "San Francisco, CA"
              }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-accent mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;