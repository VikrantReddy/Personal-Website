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
          <span className="text-tertiary text-[10px]">{timeString}</span>
        </div>
      )}

      <div
        className={`${
          isAgent
            ? 'bg-surface-container-low rounded-xl rounded-tl-none max-w-[85%]'
            : 'bg-primary-container rounded-xl rounded-tr-none max-w-[75%]'
        } p-4 text-sm`}
      >
        <p className={isAgent ? 'text-on-surface-variant' : 'text-on-primary-container'} style={{ whiteSpace: 'pre-wrap' }}>
          {typeof message.text === 'string' ? message.text : String(message.text)}
        </p>
      </div>

      {!isAgent && (
        <span className="text-tertiary text-[10px]">{timeString}</span>
      )}
    </div>
  );
}
