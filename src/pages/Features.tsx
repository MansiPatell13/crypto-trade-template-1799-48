import { motion } from "framer-motion";
import { FeaturesSection } from "@/components/features/FeaturesSection";

const Features = () => {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-20"
      >
        <div className="container px-4 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 tracking-tight">
            Platform <span className="text-gradient font-medium">Features</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Discover all the powerful tools and features that make Bullseye the ultimate trading platform for both beginners and professionals.
          </p>
        </div>
        
        <FeaturesSection />
      </motion.div>
    </div>
  );
};

export default Features;