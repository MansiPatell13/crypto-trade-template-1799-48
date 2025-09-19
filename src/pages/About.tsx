import { motion } from "framer-motion";
import { Target, Users, Award, Calendar, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const About = () => {
  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to democratize trading analytics"
    },
    {
      year: "2022",
      title: "10K+ Users",
      description: "Reached our first major milestone of active traders"
    },
    {
      year: "2024",
      title: "Advanced AI",
      description: "Launched AI-powered market prediction features"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image: "/api/placeholder/150/150",
      linkedin: "#"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder", 
      image: "/api/placeholder/150/150",
      linkedin: "#"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      image: "/api/placeholder/150/150",
      linkedin: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About
              <span className="text-gradient"> Bullseye</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Bullseye helps investors and traders stay on top of stock market news, 
              price changes, and trends with real-time insights. Designed for both 
              professionals and beginners, Bullseye simplifies complex financial 
              data into actionable insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Democratize financial intelligence with AI-powered tools.
              </p>
              
              <h2 className="text-3xl font-bold mb-6 mt-8">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Smarter decisions, faster.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8">
                <Target className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-4">Why Bullseye?</h3>
                <p className="text-muted-foreground">
                  Because every trader deserves precision, security, and the tools 
                  to hit their financial targets with confidence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg">
              Key milestones in building the future of trading
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-primary text-lg">{milestone.year}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg">
              The passionate people behind Bullseye
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{member.role}</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Ready to Start Trading?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join our beta program and be among the first to experience 
              the future of trading analytics.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="button-gradient">
                Join Our Beta
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;