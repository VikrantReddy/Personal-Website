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
    <div className="bg-surface-container-high rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition-all">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          {IconComponent && (
            <div className="flex items-center gap-2">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
        <h3 className="font-headline text-lg font-bold text-on-surface mb-2">{project.title}</h3>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span key={i} className="bg-secondary-container text-on-secondary-container font-label text-[10px] px-3 py-1 rounded-full uppercase">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsDisplay({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="space-y-5">
      {categories.map((category) => (
        <div key={category}>
          <h4 className="font-label text-sm font-semibold text-outline mb-3 uppercase">{category}</h4>
          <div className="space-y-3">
            {skills
              .filter((s) => s.category === category)
              .map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-sm font-medium text-on-surface">{skill.name}</span>
                    <span className="font-label text-[10px] text-on-surface-variant">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2">
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
      <div className="bg-surface-container-highest rounded-lg p-5">
        <h4 className="font-label text-sm font-semibold text-outline mb-2 uppercase">Quick Response</h4>
        <p className="font-body text-sm text-on-surface-variant">
          Typically respond within {contact.serviceInfo.responseTime}.
        </p>
      </div>

      <div className="bg-surface-container-highest rounded-lg p-5">
        <h4 className="font-label text-sm font-semibold text-outline mb-3 uppercase">Services</h4>
        <ul className="space-y-2">
          {contact.services.map((service, i) => (
            <li key={i} className="font-body text-sm text-on-surface-variant flex items-start">
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
      <p className="font-body text-sm text-on-surface leading-relaxed mb-4">{bio.bio}</p>
      <div className="grid grid-cols-3 gap-4">
        {bio.stats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-highest rounded-md p-4 text-center">
            <div className="font-headline text-2xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-wide">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {(message.data as Project[]).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      );

    case 'skills':
      return (
        <div className="w-full">
          <SkillsDisplay skills={message.data as Skill[]} />
        </div>
      );

    case 'contact':
      return (
        <div className="w-full">
          <ContactDisplay contact={message.data as Contact} />
        </div>
      );

    case 'bio':
      return (
        <div className="w-full">
          <BioDisplay bio={message.data as Bio} />
        </div>
      );

    case 'fallback':
      return (
        <div className="w-full">
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
