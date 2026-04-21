import { useCallback } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { RichContent } from './RichContent';
import { SuggestedPrompts } from './SuggestedPrompts';

const INITIAL_PROMPTS = [
  'Show me your latest projects',
  'Tell me about yourself',
  'What are your key skills?',
  'How can I work with you?'
];

export function ChatInterface() {
  const { messages, loading, sendMessage, messagesEndRef } = useChat();

  const handlePromptClick = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
    },
    [sendMessage]
  );

  const showInitialPrompts =
    messages.length === 1 && messages[0].sender === 'agent';

  return (
    <div className="flex flex-col h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-200">
            Portfolio OS
          </span>
        </div>
      </header>

      {/* Chat Canvas */}
      <main className="flex-1 overflow-y-auto px-4 md:px-12 py-8 space-y-4 custom-scrollbar">
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble message={message} />
            {message.contentType !== 'text' && (
              <div className="ml-10 mb-6">
                <RichContent
                  message={message}
                  onPromptClick={handlePromptClick}
                />
              </div>
            )}
          </div>
        ))}

        {showInitialPrompts && (
          <div className="mt-8">
            <SuggestedPrompts
              prompts={INITIAL_PROMPTS}
              onPromptClick={handlePromptClick}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 bg-surface border-t border-outline-variant px-4 md:px-12 py-4">
        <ChatInput onSend={sendMessage} disabled={loading} />
      </footer>
    </div>
  );
}
