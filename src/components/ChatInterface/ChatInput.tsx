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
    <form onSubmit={handleSubmit} className="bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/20 p-4 rounded-2xl shadow-lg flex items-center gap-3">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about my work, process, or availability..."
        disabled={disabled}
        className="flex-grow bg-transparent border-none focus:ring-0 font-body text-base md:text-lg text-on-surface placeholder:text-outline-variant px-4 py-4"
      />
      <Button
        type="submit"
        disabled={disabled || !input.trim()}
        className="bg-primary text-on-primary h-12 w-12 rounded-lg flex items-center justify-center hover:scale-95 transition-transform shrink-0 p-0 flex-shrink-0"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
}
