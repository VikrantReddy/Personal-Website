import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Backend Developer & Problem Solver';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
        setShowCursor(false);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('skills');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative mysterious-bg">
      {/* Subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-accent/30 rounded-full ${
              i % 3 === 0 ? 'elegant-float' : i % 3 === 1 ? 'elegant-float-delay-1' : 'elegant-float-delay-2'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-bold mb-4 text-elegant">
              <span className="text-primary">
                Vikrant Reddy<span className="text-accent text-accent-glow">.</span>
              </span>
            </h1>
          </div>
          
          <div className="text-2xl md:text-3xl mb-8 font-mono text-accent min-h-[2.5rem]">
            {text}
            {showCursor && <span className="professional-typing"></span>}
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
            I specialize in building <span className="text-accent font-medium">high-performance systems</span>, 
            architecting <span className="text-primary font-medium">scalable solutions</span>, and 
            delivering <span className="text-steel-blue font-medium">enterprise-grade applications</span> that drive business success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="btn-professional px-10 py-4 text-lg font-medium"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground px-10 py-4 text-lg font-medium transition-all duration-300 hover:shadow-glow-steel"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Portfolio
            </Button>
          </div>

          {/* Professional stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">100M+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Requests Handled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-steel-blue mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Uptime Achieved</div>
            </div>
          </div>
        </div>

        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          onClick={scrollToNextSection}
        >
          <ChevronDown className="w-6 h-6 text-accent" />
        </div>
      </div>
    </section>
  );
};