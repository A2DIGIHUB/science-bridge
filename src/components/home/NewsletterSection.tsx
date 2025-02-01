import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="section-title">Join 10,000+ Science Enthusiasts</h2>
            <p className="section-subtitle">
              Get the latest scientific discoveries delivered to your inbox
            </p>
            <form className="mt-8 sm:flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-96 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button type="submit" className="mt-3 sm:mt-0 sm:ml-3 button-primary w-full sm:w-auto">
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-xs text-accent/40">
              By subscribing, you agree to our Privacy Policy and Terms of Service
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;