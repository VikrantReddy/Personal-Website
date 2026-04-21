import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MessageBubbleProps {
  message: string;
  isAgent: boolean;
  timestamp?: Date;
  className?: string;
}

export function MessageBubble({
  message,
  isAgent,
  timestamp,
  className
}: MessageBubbleProps) {
  const formattedTime = timestamp
    ? new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(timestamp)
    : '';

  return (
    <div
      className={cn(
        'flex gap-3 mb-4 animate-in fade-in-50 slide-in-from-bottom-2',
        isAgent ? 'justify-start' : 'justify-end',
        className
      )}
    >
      {isAgent && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
        </div>
      )}

      <div
        className={cn(
          'max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg',
          isAgent
            ? 'bg-surface-container-low text-on-surface rounded-bl-none'
            : 'bg-primary-container text-on-primary-container rounded-br-none'
        )}
      >
        <p className="text-sm lg:text-base leading-relaxed break-words">
          {message}
        </p>
        {formattedTime && (
          <p
            className={cn(
              'text-xs mt-1 opacity-70',
              isAgent ? 'text-on-surface-variant' : 'text-on-primary-container'
            )}
          >
            {formattedTime}
          </p>
        )}
      </div>

      {!isAgent && (
        <div className="flex-shrink-0 mt-1 w-8 h-8" />
      )}
    </div>
  );
}
