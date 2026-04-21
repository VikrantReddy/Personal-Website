// src/utils/portfolioData.ts

import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  bio: {
    name: 'Vikrant Reddy',
    title: 'Backend Developer & Problem Solver',
    tagline: 'I specialize in building high-performance systems, architecting scalable solutions, and delivering enterprise-grade applications that drive business success.',
    stats: [
      { label: 'Years Experience', value: '5+' },
      { label: 'Requests Handled', value: '100M+' },
      { label: 'Uptime Achieved', value: '99.9%' }
    ]
  },
  projects: [
    {
      title: 'HyperScale API Gateway',
      description: 'High-performance microservices gateway handling 100M+ requests/day with sub-10ms latency',
      tech: ['Node.js', 'Redis', 'Docker', 'AWS Lambda'],
      metrics: ['100M+ requests/day', '99.99% uptime', '<10ms latency'],
      icon: 'Server',
      color: 'steel-blue'
    },
    {
      title: 'Real-time Analytics Engine',
      description: 'Distributed system processing terabytes of data with real-time dashboard and ML insights',
      tech: ['Python', 'Apache Kafka', 'PostgreSQL', 'Kubernetes'],
      metrics: ['5TB+ data/hour', '1M+ events/sec', '50+ ML models'],
      icon: 'Database',
      color: 'deep-blue'
    },
    {
      title: 'AutoScale Infrastructure',
      description: 'Intelligent auto-scaling solution that reduced infrastructure costs by 60% while improving performance',
      tech: ['Go', 'Terraform', 'Prometheus', 'AWS ECS'],
      metrics: ['60% cost reduction', '40% faster deploys', '99.9% reliability'],
      icon: 'Zap',
      color: 'slate'
    }
  ],
  skills: [
    { name: 'Python', category: 'Backend', level: 95 },
    { name: 'AI for Development', category: 'Misc', level: 88 },
    { name: 'Node.js', category: 'Backend', level: 85 },
    { name: 'Docker', category: 'DevOps', level: 85 },
    { name: 'Google Cloud', category: 'Cloud', level: 82 },
    { name: 'Redis', category: 'Cache', level: 80 },
    { name: 'Kubernetes', category: 'DevOps', level: 75 },
    { name: 'React', category: 'Frontend', level: 75 }
  ],
  contact: {
    services: [
      'API Development & Microservices Architecture',
      'Database Design & Performance Optimization',
      'Cloud Infrastructure & DevOps Setup',
      'Legacy System Modernization',
      'Performance Auditing & Scaling'
    ],
    serviceInfo: {
      responseTime: '2-4 hours during business days',
      consultationNote: 'Free consultation available. I provide detailed project estimates and technical recommendations.'
    }
  }
};
