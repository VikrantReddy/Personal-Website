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
      <header className="sticky top-0 z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl flex justify-between items-center px-6 lg:px-0 py-6 border-b border-outline-variant/20">
        <div className="max-w-2xl w-full mx-auto flex items-center gap-4 lg:px-6">
          <span className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-surface">
            CURATOR
          </span>
        </div>
      </header>

      {/* Chat Canvas */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-0 py-8 space-y-3 custom-scrollbar pb-64">
        <div className="max-w-2xl mx-auto w-full lg:px-6">
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
            <div className="mt-8 mb-4">
              <SuggestedPrompts
                prompts={INITIAL_PROMPTS}
                onPromptClick={handlePromptClick}
              />
            </div>
          )}

          {loading && (
            <div className="flex items-start gap-3 mt-4">
              <div className="text-lg text-on-surface/40 font-body">Curator</div>
              <div className="flex gap-1 pt-1">
                <div className="w-2 h-2 bg-on-surface/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-on-surface/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-on-surface/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-6 lg:px-0 pb-6 md:pb-8 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto lg:px-6">
          <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
      </footer>
    </div>
  );
}
