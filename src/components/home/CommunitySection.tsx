import { MessageSquare, Users, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CommunitySection = () => {
  const discussions = [
    {
      title: "Latest Research on Dark Matter",
      author: "Dr. Sarah Chen",
      replies: 24,
      views: 1200
    },
    {
      title: "Quantum Computing Breakthroughs",
      author: "Prof. James Wilson",
      replies: 18,
      views: 890
    },
    {
      title: "Climate Change Solutions",
      author: "Dr. Michael Brown",
      replies: 32,
      views: 1500
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center">Join the Discussion</h2>
        <p className="section-subtitle text-center mb-12">
          Connect with scientists and enthusiasts from around the world
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="glass-panel p-6 rounded-xl text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Ask a Scientist</h3>
            <p className="text-accent/60 mb-4">Get expert answers to your science questions</p>
            <Button variant="outline">Ask Now</Button>
          </div>

          <div className="glass-panel p-6 rounded-xl text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Share Your Research</h3>
            <p className="text-accent/60 mb-4">Present your findings to the community</p>
            <Button variant="outline">Submit Research</Button>
          </div>

          <div className="glass-panel p-6 rounded-xl text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Join Groups</h3>
            <p className="text-accent/60 mb-4">Connect with like-minded enthusiasts</p>
            <Button variant="outline">Browse Groups</Button>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">Trending Discussions</h3>
          <div className="space-y-6">
            {discussions.map((discussion, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-accent/5 rounded-lg transition-colors">
                <div>
                  <h4 className="font-medium mb-1">{discussion.title}</h4>
                  <p className="text-sm text-accent/60">Started by {discussion.author}</p>
                </div>
                <div className="text-sm text-accent/60">
                  <span className="mr-4">{discussion.replies} replies</span>
                  <span>{discussion.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;