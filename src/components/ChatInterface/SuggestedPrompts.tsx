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
    <div className="flex flex-wrap gap-2 items-center">
      <span className="font-label text-[10px] uppercase tracking-widest text-outline bg-surface-container/40 px-3 py-1.5 rounded w-full md:w-auto">Suggestions:</span>
      {prompts.map((prompt) => (
        <Button
          key={prompt}
          onClick={() => onPromptClick(prompt)}
          className="px-4 py-2 bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/20 rounded-full font-label text-xs text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 shadow-sm h-auto"
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
