import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      id: "markets-supported",
      question: "What markets does Bullseye support?",
      answer: "Currently India & USA, more coming soon."
    },
    {
      id: "change-market",
      question: "Can I change my default market later?",
      answer: "Yes, in Profile Settings."
    },
    {
      id: "free-to-use",
      question: "Is Bullseye free to use?",
      answer: "Yes, core features are free; premium features coming later."
    },
    {
      id: "financial-advice",
      question: "Does Bullseye provide financial advice?",
      answer: "No, only insights & analysis."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Frequently Asked <span className="text-gradient font-medium">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about Bullseye's features, account management, and trading platform.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="search"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass border-white/10"
              />
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No FAQs found matching "{searchTerm}". Try different keywords.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <AccordionItem 
                        value={faq.id} 
                        className="glass rounded-lg px-6 border-white/10"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="font-medium text-white pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-gray-400 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            )}
          </div>

          {/* Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="inline-block">
                  <button className="button-gradient px-6 py-3 rounded-full font-medium">
                    Contact Support
                  </button>
                </a>
                <a href="mailto:support@bullseye.com" className="inline-block">
                  <button className="border border-white/20 px-6 py-3 rounded-full font-medium hover:bg-white/5 transition-colors">
                    Email Us
                  </button>
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;