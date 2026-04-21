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
