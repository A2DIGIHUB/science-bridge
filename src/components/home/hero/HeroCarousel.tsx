
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Data analysis visualization",
    caption: "Data-Driven Insights"
  },
  {
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    alt: "Scientific collaboration",
    caption: "Collaborative Innovation"
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    alt: "Robotics innovation",
    caption: "Future of Tech"
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    alt: "Technology innovation",
    caption: "Next-Gen Technology"
  }
];

const HeroCarousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-lg font-medium">{image.caption}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 bg-white/10 hover:bg-white/20 border-0" />
        <CarouselNext className="hidden md:flex -right-12 bg-white/10 hover:bg-white/20 border-0" />
      </Carousel>
    </motion.div>
  );
};

export default HeroCarousel;
