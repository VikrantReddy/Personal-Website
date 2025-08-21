import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Server, Database, Zap } from 'lucide-react';

const projects = [
  {
    title: 'HyperScale API Gateway',
    description: 'High-performance microservices gateway handling 100M+ requests/day with sub-10ms latency',
    tech: ['Node.js', 'Redis', 'Docker', 'AWS Lambda'],
    metrics: ['100M+ requests/day', '99.99% uptime', '<10ms latency'],
    icon: <Server className="w-6 h-6" />,
    color: 'steel-blue',
    github: '#',
    demo: '#'
  },
  {
    title: 'Real-time Analytics Engine',
    description: 'Distributed system processing terabytes of data with real-time dashboard and ML insights',
    tech: ['Python', 'Apache Kafka', 'PostgreSQL', 'Kubernetes'],
    metrics: ['5TB+ data/hour', '1M+ events/sec', '50+ ML models'],
    icon: <Database className="w-6 h-6" />,
    color: 'deep-blue',
    github: '#',
    demo: '#'
  },
  {
    title: 'AutoScale Infrastructure',
    description: 'Intelligent auto-scaling solution that reduced infrastructure costs by 60% while improving performance',
    tech: ['Go', 'Terraform', 'Prometheus', 'AWS ECS'],
    metrics: ['60% cost reduction', '40% faster deploys', '99.9% reliability'],
    icon: <Zap className="w-6 h-6" />,
    color: 'slate',
    github: '#',
    demo: '#'
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-elegant">
            <span className="gradient-professional">
              Project Showcase
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real systems that solve real problems. Each project represents months of research, 
            development, and optimization to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="group hover:shadow-deep transition-all duration-500 bg-card/80 backdrop-blur-sm
                        border-border hover:border-accent/30 overflow-hidden relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div 
                className={`absolute top-0 left-0 right-0 h-1 bg-${project.color} opacity-0 
                           group-hover:opacity-100 transition-opacity duration-300`}
              />
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-${project.color}/10 text-${project.color}`}>
                    {project.icon}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-base">{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-accent mb-2">Key Metrics</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {project.metrics.map((metric, i) => (
                      <div 
                        key={i} 
                        className="text-sm bg-primary/5 px-3 py-1 rounded border border-primary/20"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-accent mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground
                                  border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="btn-professional">
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};