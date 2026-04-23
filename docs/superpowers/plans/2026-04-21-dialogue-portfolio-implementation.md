# Dialogue Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the multi-section portfolio website with a single chat-based interface where users query "The Curator" about projects, skills, and contact information.

**Architecture:** Build a stateful React component that manages chat history, routes user queries via keyword matching to portfolio content, and renders rich components (project grids, skill bars, contact cards) as curator responses. All data is static/client-side with no backend required.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, shadcn/ui, React Router, Lucide icons

---

## File Structure

**New Files to Create:**
- `src/types/portfolio.ts` — Type definitions for portfolio data
- `src/utils/portfolioData.ts` — Static portfolio content (bio, projects, skills, contact)
- `src/utils/queryRouter.ts` — Keyword extraction and routing logic
- `src/hooks/useChat.ts` — Chat state management hook
- `src/components/ChatInterface/index.tsx` — Main chat container
- `src/components/ChatInterface/MessageBubble.tsx` — Individual message component
- `src/components/ChatInterface/ChatInput.tsx` — Input and send button
- `src/components/ChatInterface/RichContent.tsx` — Projects grid, skills, contact rendering
- `src/components/ChatInterface/SuggestedPrompts.tsx` — Clickable prompt buttons
- `src/utils/__tests__/queryRouter.test.ts` — Routing logic tests

**Files to Modify:**
- `src/pages/Index.tsx` — Replace with new chat-based index page

---

## Task Breakdown

### Task 1: Define TypeScript Types

**Files:**
- Create: `src/types/portfolio.ts`

- [ ] **Step 1: Write type definitions file**

```typescript
// src/types/portfolio.ts

export interface Stat {
  label: string;
  value: string;
}

export interface Bio {
  name: string;
  title: string;
  tagline: string;
  stats: Stat[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  metrics: string[];
  icon: string; // Store as string, render with Lucide
  color: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number; // 0-100
}

export interface ServiceItem {
  responseTime: string;
  consultationNote: string;
}

export interface Contact {
  services: string[]; // List of what you can help with
  serviceInfo: ServiceItem;
}

export interface PortfolioData {
  bio: Bio;
  projects: Project[];
  skills: Skill[];
  contact: Contact;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
  contentType: 'text' | 'projects' | 'skills' | 'contact' | 'bio' | 'fallback';
  data?: any;
}
```

- [ ] **Step 2: Verify no syntax errors**

Run: `npx tsc --noEmit src/types/portfolio.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/types/portfolio.ts
git commit -m "types: add portfolio and chat message type definitions"
```

---

### Task 2: Create Static Portfolio Data

**Files:**
- Create: `src/utils/portfolioData.ts`

- [ ] **Step 1: Write portfolio data**

```typescript
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
```

- [ ] **Step 2: Verify data structure matches types**

Run: `npx tsc --noEmit src/utils/portfolioData.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/utils/portfolioData.ts
git commit -m "data: add static portfolio content"
```

---

### Task 3: Implement Query Routing Logic with Tests

**Files:**
- Create: `src/utils/queryRouter.ts`
- Create: `src/utils/__tests__/queryRouter.test.ts`

- [ ] **Step 1: Write routing test file**

```typescript
// src/utils/__tests__/queryRouter.test.ts

import { routeQuery } from '../queryRouter';

describe('queryRouter', () => {
  it('should route "projects" keyword to projects content type', () => {
    const result = routeQuery('show me your projects');
    expect(result.contentType).toBe('projects');
  });

  it('should route "skills" keyword to skills content type', () => {
    const result = routeQuery('what are your skills?');
    expect(result.contentType).toBe('skills');
  });

  it('should route "expertise" keyword to skills content type', () => {
    const result = routeQuery('tell me about your expertise');
    expect(result.contentType).toBe('skills');
  });

  it('should route "contact" keyword to contact content type', () => {
    const result = routeQuery('how can I contact you?');
    expect(result.contentType).toBe('contact');
  });

  it('should route "work with" keyword to contact content type', () => {
    const result = routeQuery('how can I work with you?');
    expect(result.contentType).toBe('contact');
  });

  it('should route "about" keyword to bio content type', () => {
    const result = routeQuery('tell me about yourself');
    expect(result.contentType).toBe('bio');
  });

  it('should route "background" keyword to bio content type', () => {
    const result = routeQuery('what is your background?');
    expect(result.contentType).toBe('bio');
  });

  it('should return fallback for unmatched input', () => {
    const result = routeQuery('random unrelated text');
    expect(result.contentType).toBe('fallback');
  });

  it('should be case insensitive', () => {
    const result = routeQuery('SHOW ME YOUR PROJECTS');
    expect(result.contentType).toBe('projects');
  });

  it('should extract suggested prompts for fallback', () => {
    const result = routeQuery('invalid query');
    expect(result.suggestedPrompts).toBeDefined();
    expect(result.suggestedPrompts.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run: `npm run test -- src/utils/__tests__/queryRouter.test.ts`
Expected: FAIL with "routeQuery is not exported"

- [ ] **Step 3: Write routing implementation**

```typescript
// src/utils/queryRouter.ts

export interface RouteResult {
  contentType: 'projects' | 'skills' | 'contact' | 'bio' | 'fallback';
  suggestedPrompts?: string[];
}

const SUGGESTED_PROMPTS = [
  'Show me your latest projects',
  'Tell me about yourself',
  'What are your key skills?',
  'How can I work with you?'
];

const KEYWORD_MAP: Record<string, RouteResult['contentType']> = {
  project: 'projects',
  work: 'projects',
  portfolio: 'projects',
  skill: 'skills',
  expertise: 'skills',
  technical: 'skills',
  stack: 'skills',
  contact: 'contact',
  email: 'contact',
  hire: 'contact',
  help: 'contact',
  'work with': 'contact',
  about: 'bio',
  bio: 'bio',
  background: 'bio',
  who: 'bio'
};

export function routeQuery(userInput: string): RouteResult {
  const lowerInput = userInput.toLowerCase().trim();

  // Check for keyword matches
  for (const [keyword, contentType] of Object.entries(KEYWORD_MAP)) {
    if (lowerInput.includes(keyword)) {
      return { contentType };
    }
  }

  // No match found, return fallback with suggestions
  return {
    contentType: 'fallback',
    suggestedPrompts: SUGGESTED_PROMPTS
  };
}
```

- [ ] **Step 4: Run tests and verify they pass**

Run: `npm run test -- src/utils/__tests__/queryRouter.test.ts`
Expected: PASS (all tests)

- [ ] **Step 5: Commit**

```bash
git add src/utils/queryRouter.ts src/utils/__tests__/queryRouter.test.ts
git commit -m "feat: add query routing logic with keyword matching"
```

---

### Task 4: Create useChat Hook

**Files:**
- Create: `src/hooks/useChat.ts`

- [ ] **Step 1: Write chat hook**

```typescript
// src/hooks/useChat.ts

import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/portfolio';
import { routeQuery } from '@/utils/queryRouter';
import { portfolioData } from '@/utils/portfolioData';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '0',
        sender: 'agent',
        text: `Welcome to the Gravity OS.\n\nI am Vikrant's Agent. This space is a living archive of work, thoughts, and technical logic. Instead of browsing a static grid, tell me what you're looking for, or choose a prompt below to begin the exploration.`,
        timestamp: new Date(),
        contentType: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(
    async (userInput: string) => {
      if (!userInput.trim()) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: userInput,
        timestamp: new Date(),
        contentType: 'text'
      };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      // Simulate delay for natural feel
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Route the query
      const route = routeQuery(userInput);

      let agentMessage: ChatMessage;

      switch (route.contentType) {
        case 'projects':
          agentMessage = {
            id: Date.now().toString(),
            sender: 'agent',
            text: 'Accessing the repository... I\'ve retrieved our latest high-impact projects that define our current trajectory.',
            timestamp: new Date(),
            contentType: 'projects',
            data: portfolioData.projects
          };
          break;

        case 'skills':
          agentMessage = {
            id: Date.now().toString(),
            sender: 'agent',
            text: 'Here\'s an overview of my technical skills and expertise, crafted through years of solving real-world challenges.',
            timestamp: new Date(),
            contentType: 'skills',
            data: portfolioData.skills
          };
          break;

        case 'contact':
          agentMessage = {
            id: Date.now().toString(),
            sender: 'agent',
            text: 'I\'m available to discuss your project and help bring your ideas to reality. Here\'s how we can work together:',
            timestamp: new Date(),
            contentType: 'contact',
            data: portfolioData.contact
          };
          break;

        case 'bio':
          agentMessage = {
            id: Date.now().toString(),
            sender: 'agent',
            text: `I'm ${portfolioData.bio.name}, a ${portfolioData.bio.title}. ${portfolioData.bio.tagline}`,
            timestamp: new Date(),
            contentType: 'bio',
            data: portfolioData.bio
          };
          break;

        case 'fallback':
        default:
          agentMessage = {
            id: Date.now().toString(),
            sender: 'agent',
            text: 'I didn\'t quite catch that. Try asking about my projects, skills, background, or how to work with me.',
            timestamp: new Date(),
            contentType: 'fallback',
            data: { suggestedPrompts: route.suggestedPrompts }
          };
          break;
      }

      setMessages((prev) => [...prev, agentMessage]);
      setLoading(false);
    },
    []
  );

  return {
    messages,
    loading,
    sendMessage,
    messagesEndRef
  };
}
```

- [ ] **Step 2: Verify no syntax errors**

Run: `npx tsc --noEmit src/hooks/useChat.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useChat.ts
git commit -m "feat: add useChat hook for chat state management"
```

---

### Task 5: Create Message Bubble Component

**Files:**
- Create: `src/components/ChatInterface/MessageBubble.tsx`

- [ ] **Step 1: Write message bubble component**

```typescript
// src/components/ChatInterface/MessageBubble.tsx

import { ChatMessage } from '@/types/portfolio';
import { SmartToy } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAgent = message.sender === 'agent';
  const timeString = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      className={`flex ${isAgent ? 'flex-col items-start' : 'flex-col items-end'} gap-2 mb-6`}
    >
      {isAgent && (
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <SmartToy className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-tertiary">
            The Curator
          </span>
          <span className="text-tertiary text-[10px] font-label">{timeString}</span>
        </div>
      )}

      <div
        className={`${
          isAgent
            ? 'bg-surface-container-low rounded-xl rounded-tl-none max-w-[85%]'
            : 'bg-primary-container rounded-xl rounded-tr-none max-w-[75%]'
        } p-4 text-sm`}
      >
        <p className={isAgent ? 'text-on-surface-variant' : 'text-on-primary-container'}>
          {message.text}
        </p>
      </div>

      {!isAgent && (
        <span className="text-tertiary text-[10px] font-label">{timeString}</span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify component renders without errors**

Run: `npx tsc --noEmit src/components/ChatInterface/MessageBubble.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ChatInterface/MessageBubble.tsx
git commit -m "feat: add message bubble component"
```

---

### Task 6: Create Chat Input Component

**Files:**
- Create: `src/components/ChatInterface/ChatInput.tsx`

- [ ] **Step 1: Write chat input component**

```typescript
// src/components/ChatInterface/ChatInput.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 pb-4">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about my work, skills, or how to collaborate..."
        disabled={disabled}
        className="flex-1 bg-surface-container-lowest border-outline-variant"
      />
      <Button
        type="submit"
        disabled={disabled || !input.trim()}
        size="icon"
        className="bg-primary hover:bg-primary-container"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Verify component renders without errors**

Run: `npx tsc --noEmit src/components/ChatInterface/ChatInput.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ChatInterface/ChatInput.tsx
git commit -m "feat: add chat input component"
```

---

### Task 7: Create Suggested Prompts Component

**Files:**
- Create: `src/components/ChatInterface/SuggestedPrompts.tsx`

- [ ] **Step 1: Write suggested prompts component**

```typescript
// src/components/ChatInterface/SuggestedPrompts.tsx

import { Button } from '@/components/ui/button';

interface SuggestedPromptsProps {
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}

export function SuggestedPrompts({
  prompts,
  onPromptClick
}: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center my-4">
      {prompts.map((prompt) => (
        <Button
          key={prompt}
          onClick={() => onPromptClick(prompt)}
          variant="outline"
          className="border-outline-variant hover:bg-primary/10 text-on-surface"
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify component renders without errors**

Run: `npx tsc --noEmit src/components/ChatInterface/SuggestedPrompts.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ChatInterface/SuggestedPrompts.tsx
git commit -m "feat: add suggested prompts component"
```

---

### Task 8: Create Rich Content Renderer

**Files:**
- Create: `src/components/ChatInterface/RichContent.tsx`

- [ ] **Step 1: Write rich content renderer**

```typescript
// src/components/ChatInterface/RichContent.tsx

import { ChatMessage } from '@/types/portfolio';
import { Project, Skill, Contact, Bio } from '@/types/portfolio';
import * as LucideIcons from 'lucide-react';
import { SuggestedPrompts } from './SuggestedPrompts';

interface RichContentProps {
  message: ChatMessage;
  onPromptClick: (prompt: string) => void;
}

function getIconComponent(iconName: string) {
  const icon = (LucideIcons as any)[iconName];
  return icon || null;
}

function ProjectCard({ project }: { project: Project }) {
  const IconComponent = getIconComponent(project.icon);

  return (
    <div className="bg-surface-container-highest rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          {IconComponent && (
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5" />
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-tertiary mb-2 uppercase">Key Metrics</h4>
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((metric, i) => (
              <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded border border-primary/20">
                {metric}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-tertiary mb-2 uppercase">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground border border-border">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsDisplay({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category}>
          <h4 className="text-sm font-semibold text-tertiary mb-3 uppercase">{category}</h4>
          <div className="space-y-3">
            {skills
              .filter((s) => s.category === category)
              .map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactDisplay({ contact }: { contact: Contact }) {
  return (
    <div className="space-y-4">
      <div className="bg-surface-container-highest rounded-xl p-6">
        <h4 className="text-sm font-semibold text-tertiary mb-2 uppercase">Quick Response</h4>
        <p className="text-sm text-on-surface-variant">
          Typically respond within {contact.serviceInfo.responseTime}.
        </p>
      </div>

      <div className="bg-surface-container-highest rounded-xl p-6">
        <h4 className="text-sm font-semibold text-tertiary mb-2 uppercase">Services</h4>
        <ul className="space-y-2">
          {contact.services.map((service, i) => (
            <li key={i} className="text-sm text-on-surface-variant flex items-start">
              <span className="mr-2">•</span>
              {service}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BioDisplay({ bio }: { bio: Bio }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {bio.stats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-highest rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RichContent({
  message,
  onPromptClick
}: RichContentProps) {
  switch (message.contentType) {
    case 'projects':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {(message.data as Project[]).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      );

    case 'skills':
      return (
        <div className="max-w-2xl">
          <SkillsDisplay skills={message.data as Skill[]} />
        </div>
      );

    case 'contact':
      return (
        <div className="max-w-2xl">
          <ContactDisplay contact={message.data as Contact} />
        </div>
      );

    case 'bio':
      return (
        <div className="max-w-2xl">
          <BioDisplay bio={message.data as Bio} />
        </div>
      );

    case 'fallback':
      return (
        <div className="max-w-2xl">
          <SuggestedPrompts
            prompts={message.data?.suggestedPrompts || [
              'Show me your latest projects',
              'Tell me about yourself',
              'What are your key skills?',
              'How can I work with you?'
            ]}
            onPromptClick={onPromptClick}
          />
        </div>
      );

    default:
      return null;
  }
}
```

- [ ] **Step 2: Verify component renders without errors**

Run: `npx tsc --noEmit src/components/ChatInterface/RichContent.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ChatInterface/RichContent.tsx
git commit -m "feat: add rich content renderer for projects, skills, contact"
```

---

### Task 9: Create Main Chat Interface Component

**Files:**
- Create: `src/components/ChatInterface/index.tsx`

- [ ] **Step 1: Write main chat interface**

```typescript
// src/components/ChatInterface/index.tsx

import { useCallback } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { RichContent } from './RichContent';
import { SuggestedPrompts } from './SuggestedPrompts';

const INITIAL_PROMPTS = [
  'Show me your latest projects',
  'Tell me about yourself',
  'What are your key skills?',
  'How can I work with you?'
];

export function ChatInterface() {
  const { messages, loading, sendMessage, messagesEndRef } = useChat();

  const handlePromptClick = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
    },
    [sendMessage]
  );

  const showInitialPrompts =
    messages.length === 1 && messages[0].sender === 'agent';

  return (
    <div className="flex flex-col h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-200">
            Portfolio OS
          </span>
        </div>
      </header>

      {/* Chat Canvas */}
      <main className="flex-1 overflow-y-auto px-4 md:px-12 py-8 space-y-4 custom-scrollbar">
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble message={message} />
            {message.contentType !== 'text' && (
              <div className="ml-10 mb-6">
                <RichContent
                  message={message}
                  onPromptClick={handlePromptClick}
                />
              </div>
            )}
          </div>
        ))}

        {showInitialPrompts && (
          <div className="mt-8">
            <SuggestedPrompts
              prompts={INITIAL_PROMPTS}
              onPromptClick={handlePromptClick}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 bg-surface border-t border-outline-variant px-4 md:px-12 py-4">
        <ChatInput onSend={sendMessage} disabled={loading} />
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Verify component renders without errors**

Run: `npx tsc --noEmit src/components/ChatInterface/index.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ChatInterface/index.tsx
git commit -m "feat: add main chat interface component"
```

---

### Task 10: Update Index Page

**Files:**
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Replace Index.tsx with chat interface**

```typescript
// src/pages/Index.tsx

import { ChatInterface } from '@/components/ChatInterface';

export default function Index() {
  return <ChatInterface />;
}
```

- [ ] **Step 2: Verify no syntax errors**

Run: `npx tsc --noEmit src/pages/Index.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/Index.tsx
git commit -m "feat: replace index page with chat interface"
```

---

### Task 11: Add Custom Scrollbar Styles

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add custom scrollbar CSS**

Open `src/index.css` and add at the end:

```css
/* Custom scrollbar for chat canvas */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #dfe3e4;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #c1c6d6;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "style: add custom scrollbar styling for chat canvas"
```

---

### Task 12: Test the Chat Interface in Browser

**Files:**
- No files to modify

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: Dev server starts on `http://localhost:5173` (or similar)

- [ ] **Step 2: Open browser and test**

Navigate to `http://localhost:5173`

**Test Cases:**
- [ ] Welcome message appears with suggested prompts
- [ ] Click "Show me your latest projects" — projects grid appears
- [ ] Click "What are your key skills?" — skills with progress bars appear
- [ ] Click "How can I work with you?" — contact info appears
- [ ] Type "about" in input and send — bio with stats appears
- [ ] Type random text and send — fallback message with suggested prompts appears
- [ ] Message bubbles are styled correctly (agent left, user right)
- [ ] Timestamps display correctly
- [ ] Chat scrolls to bottom on new messages
- [ ] No console errors

- [ ] **Step 3: Verify responsive design**

Resize browser to mobile width (375px)
- [ ] Layout adapts, no overflow
- [ ] Input area is accessible
- [ ] Messages are readable

---

## Success Criteria

✓ Chat interface renders without errors  
✓ All keyword routes trigger appropriate content  
✓ Rich content (projects, skills, contact) displays correctly  
✓ Responsive on mobile, tablet, desktop  
✓ Messaging UX feels natural and guided  
✓ No console errors or accessibility issues
