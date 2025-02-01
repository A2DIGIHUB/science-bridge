import { Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

const VideoSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center">Latest Science Videos</h2>
        <p className="section-subtitle text-center mb-12">
          Watch our curated collection of science explainers and discoveries
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Understanding Black Holes",
              thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
              duration: "5:20"
            },
            {
              title: "AI in Healthcare",
              thumbnail: "https://images.unsplash.com/photo-1576086213369-97a306d36557",
              duration: "7:15"
            },
            {
              title: "Climate Change Explained",
              thumbnail: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51",
              duration: "6:45"
            }
          ].map((video, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" className="text-white border-white hover:bg-white/20">
                  <Play className="mr-2" />
                  Watch Now
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-medium">{video.title}</h3>
                <span className="text-white/80 text-sm">{video.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;