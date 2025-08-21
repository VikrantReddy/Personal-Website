import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 DEV. Built with React, TypeScript, and lots of ☕
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-accent">Ready to build something amazing?</span> Let's connect.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;