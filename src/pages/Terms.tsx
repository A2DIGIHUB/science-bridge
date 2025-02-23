import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4"
      >
        <h1 className="text-4xl font-bold text-accent mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to Science Bridge. By accessing our website, you agree to these terms of service. Please read them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Science Bridge's website for personal, non-commercial transitory viewing only.
          </p>
          <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on Science Bridge's website are provided on an 'as is' basis. Science Bridge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall Science Bridge or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Science Bridge's website.
          </p>

          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on Science Bridge's website could include technical, typographical, or photographic errors. Science Bridge does not warrant that any of the materials on its website are accurate, complete, or current.
          </p>

          <h2>6. Links</h2>
          <p>
            Science Bridge has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Science Bridge of the site.
          </p>

          <h2>7. Modifications</h2>
          <p>
            Science Bridge may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <p className="text-sm text-accent/60 mt-8">
            Last updated: February 2024
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
