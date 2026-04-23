import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/portfolio';
import { streamChat } from '@/utils/backendClient';

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
        text: `Welcome to the Portfolio OS.\n\nI am Gravity OS. This space is a living archive of work, thoughts, and technical logic. Instead of browsing a static grid, tell me what you're looking for, or choose a prompt below to begin the exploration.`,
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

      // Create empty agent message that will be filled as stream arrives
      const agentMessageId = (Date.now() + 1).toString();
      const agentMessage: ChatMessage = {
        id: agentMessageId,
        sender: 'agent',
        text: '',
        timestamp: new Date(),
        contentType: 'text',
        error: false
      };

      setMessages((prev) => [...prev, agentMessage]);

      try {
        // Stream response from backend
        // Convert previous messages to backend format (exclude current user message)
        const previousMessages = messages
          .filter((msg) => msg.id !== userMessage.id) // Don't include the message we just added
          .map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          }));

        for await (const chunk of streamChat(userInput, previousMessages)) {
          // Character-by-character typing effect
          for (const char of chunk) {
            await new Promise(resolve => setTimeout(resolve, 15));
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === agentMessageId
                  ? { ...msg, text: msg.text + char }
                  : msg
              )
            );
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === agentMessageId
              ? {
                  ...msg,
                  text: `Sorry, I encountered an issue: ${errorMessage}. Please try again.`,
                  error: true
                }
              : msg
          )
        );
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  return {
    messages,
    loading,
    sendMessage,
    messagesEndRef
  };
}
