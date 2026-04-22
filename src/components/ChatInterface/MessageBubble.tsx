import { ChatMessage } from '@/types/portfolio';
import { Bot } from 'lucide-react';

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
      className={`flex ${isAgent ? 'flex-col items-start' : 'flex-col items-end'} gap-1 mb-5`}
    >
      {isAgent && (
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
            <Bot className="w-3 h-3" />
          </div>
          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-outline">
            The Curator
          </span>
          <span className="font-label text-[10px] text-outline ml-auto">{timeString}</span>
        </div>
      )}

      <div
        className={`${
          message.error
            ? 'bg-error-container border border-error rounded-lg max-w-[85%]'
            : isAgent
            ? 'bg-surface-container-low border-l-4 border-accent rounded-lg max-w-[85%]'
            : 'bg-surface-container-lowest border border-outline-variant/10 shadow-sm rounded-lg rounded-br-none max-w-[75%]'
        } px-5 py-3 text-sm font-body`}
      >
        <p className={message.error ? 'text-on-error-container leading-relaxed' : isAgent ? 'text-on-surface leading-relaxed' : 'text-on-surface-variant'} style={{ whiteSpace: 'pre-wrap' }}>
          {typeof message.text === 'string' ? message.text : String(message.text)}
        </p>
      </div>

      {!isAgent && (
        <span className="font-label text-[10px] text-outline mt-1">{timeString}</span>
      )}
    </div>
  );
}
