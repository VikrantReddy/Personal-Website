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
        text: `Welcome to the Portfolio OS.\n\nI am your Curator. This space is a living archive of work, thoughts, and technical logic. Instead of browsing a static grid, tell me what you're looking for, or choose a prompt below to begin the exploration.`,
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
