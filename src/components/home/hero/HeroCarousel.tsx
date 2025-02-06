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
    src: "/lovable-uploads/821f2a41-9b51-48f0-96d6-612acee521ed.png",
    alt: "Technology and science communication",
    caption: "Bridging Technology and Science"
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Scientist analyzing data",
    caption: "Advancing Research Through Data Analysis"
  },
  {
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    alt: "Scientific collaboration",
    caption: "Fostering Scientific Collaboration"
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    alt: "Innovation in robotics",
    caption: "Pushing Boundaries in Technology"
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
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </motion.div>
  );
};

export default HeroCarousel;