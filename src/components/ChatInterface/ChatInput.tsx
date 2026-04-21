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
