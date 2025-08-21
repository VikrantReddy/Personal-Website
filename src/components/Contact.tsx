import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Zap, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "I'll get back to you within 24 hours.",
    });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 matrix-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-glow">
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              Let's Build Something
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to turn your ideas into reality? Let's discuss your project and 
            create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary mr-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Quick Response</h3>
                </div>
                <p className="text-muted-foreground">
                  I typically respond within 2-4 hours during business days. 
                  For urgent projects, I'm available for immediate consultation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent mr-4">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Free Consultation</h3>
                </div>
                <p className="text-muted-foreground">
                  Let's discuss your project requirements, timeline, and budget. 
                  I provide detailed project estimates and technical recommendations.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">What I Can Help With:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  API Development & Microservices Architecture
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Database Design & Performance Optimization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Cloud Infrastructure & DevOps Setup
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Legacy System Modernization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Performance Auditing & Scaling
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Mail className="w-6 h-6 text-primary mr-3" />
                Start Your Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-input border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="bg-input border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Project Type</label>
                    <Input
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      placeholder="e.g., API Development, System Architecture, Performance Optimization"
                      className="bg-input border-border focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Project Details</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      className="bg-input border-border focus:border-primary transition-colors min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full btn-cyber text-lg py-3">
                    Send Message
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. I'll review your project details and get back to you within 24 hours.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};