import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const EventsSection = () => {
  const events = [
    {
      title: "NASA's Mars Mission Livestream",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      location: "Online",
      type: "Webinar"
    },
    {
      title: "AI & Ethics Seminar",
      date: "March 20, 2024",
      time: "10:00 AM EST",
      location: "MIT Campus",
      type: "Conference"
    },
    {
      title: "Medical Tech Innovations 2024",
      date: "March 25, 2024",
      time: "9:00 AM EST",
      location: "Virtual Event",
      type: "Summit"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center">Upcoming Events</h2>
        <p className="section-subtitle text-center mb-12">
          Join us for exciting science events and conferences
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <div key={index} className="glass-panel p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="tag">{event.type}</span>
                <Button variant="ghost" size="sm">
                  Save
                </Button>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-accent/60">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-accent/60">
                  <Clock className="w-4 h-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-accent/60">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
              </div>
              
              <Button className="w-full mt-6">
                Register Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;