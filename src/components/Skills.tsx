import { Card, CardContent } from '@/components/ui/card';

const skills = [
  { name: 'Node.js', category: 'Backend', level: 95 },
  { name: 'Python', category: 'Backend', level: 90 },
  { name: 'PostgreSQL', category: 'Database', level: 88 },
  { name: 'Docker', category: 'DevOps', level: 85 },
  { name: 'AWS', category: 'Cloud', level: 82 },
  { name: 'Redis', category: 'Cache', level: 80 },
  { name: 'GraphQL', category: 'API', level: 78 },
  { name: 'Kubernetes', category: 'DevOps', level: 75 },
];

const categories = ['Backend', 'Database', 'DevOps', 'Cloud', 'Cache', 'API'];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 matrix-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-glow">
            <span className="bg-gradient-electric bg-clip-text text-transparent">
              Technical Arsenal
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Crafted through years of solving real-world challenges and building production-grade systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill, index) => (
            <Card 
              key={skill.name} 
              className="skill-badge group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-lg font-semibold mb-2">{skill.name}</div>
                <div className="text-sm text-accent mb-4">{skill.category}</div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-cyber transition-all duration-1000 group-hover:animate-pulse"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{skill.level}%</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 text-primary">Core Specializations</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <div
                key={category}
                className="px-6 py-3 border border-primary/30 rounded-lg bg-card/50 backdrop-blur-sm
                         hover:border-primary hover:shadow-glow-cyan transition-all duration-300
                         text-foreground font-medium"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};