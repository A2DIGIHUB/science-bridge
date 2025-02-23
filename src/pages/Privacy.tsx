import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4"
      >
        <h1 className="text-4xl font-bold text-accent mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            At Science Bridge, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name and email address when you subscribe to our newsletter</li>
            <li>Contact information when you reach out to us</li>
            <li>Usage data and preferences when you interact with our website</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Send you updates and newsletters</li>
            <li>Respond to your inquiries</li>
            <li>Analyze website usage to improve user experience</li>
          </ul>

          <h2>Data Protection</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services that collect, monitor, and analyze user data to help us improve our services. These third-party service providers have their own privacy policies addressing how they use such information.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@sciencebridge.org.
          </p>

          <p className="text-sm text-accent/60 mt-8">
            Last updated: February 2024
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
