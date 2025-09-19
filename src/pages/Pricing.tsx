import { motion } from "framer-motion";
import { PricingSection } from "@/components/pricing/PricingSection";

const Pricing = () => {
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
            Simple <span className="text-gradient font-medium">Pricing</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your trading needs. Start free and upgrade as you grow.
          </p>
        </div>
        
        <PricingSection />
      </motion.div>
    </div>
  );
};

export default Pricing;