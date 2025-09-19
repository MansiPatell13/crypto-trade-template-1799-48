import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact/ContactForm";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "support@bullseye.ai",
      description: "Send us an email anytime"
    },
    {
      icon: MapPin,
      title: "Office",
      details: "Bullseye HQ, Bengaluru, India",
      description: "Our headquarters"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-20"
      >
        <div className="container px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-normal mb-6 tracking-tight">
              Get in <span className="text-gradient font-medium">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-xl p-8"
            >
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                  Choose the best way to reach us. We're here to help with any questions about our platform, features, or your account.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="glass glass-hover rounded-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-white mb-1">{info.details}</p>
                        <p className="text-gray-400 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 relative"
          >
            <div 
              className="absolute inset-0 opacity-40 rounded-2xl"
              style={{
                backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to start trading?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of traders who trust Bullseye for their trading needs.
              </p>
              <Button size="lg" className="button-gradient">
                Start Trading Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;