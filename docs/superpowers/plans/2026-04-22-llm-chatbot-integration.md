# LLM Chatbot Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace local query routing with direct backend integration to Ollama LLM via MCP Server, enabling streaming LLM-powered responses in the chatbot.

**Architecture:** Frontend sends user messages to `http://localhost:8000/chat`, receives streamed responses from the LLM (which has access to portfolio context stored on backend), and displays text appearing word-by-word. All conversation history managed locally on frontend.

**Tech Stack:** React hooks, TypeScript, ReadableStream API, async generators, MCP Server (backend)

---

## Task 1: Create Backend Client Utility

**Files:**
- Create: `src/utils/backendClient.ts`

**Objective:** Build a streaming HTTP client that connects to the MCP Server `/chat` endpoint and yields text chunks as they arrive.

- [ ] **Step 1: Create the backendClient.ts file with streaming function**

Create `src/utils/backendClient.ts`:

```typescript
const BACKEND_URL = 'http://localhost:8000';

export async function* streamChat(userMessage: string): AsyncGenerator<string, void, unknown> {
  try {
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      
      // Split on newlines to yield individual chunks
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep the last incomplete line in buffer
      
      for (const line of lines) {
        if (line.trim()) {
          yield line.trim();
        }
      }
    }

    // Yield any remaining buffer
    if (buffer.trim()) {
      yield buffer.trim();
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to connect to backend: ${errorMessage}`);
  }
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}
```

- [ ] **Step 2: Verify the file was created**

Run: `ls -la src/utils/backendClient.ts`
Expected: File exists

- [ ] **Step 3: Check TypeScript compilation**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add src/utils/backendClient.ts
git commit -m "feat: add streaming backend client for LLM integration"
```

---

## Task 2: Update ChatMessage Type (If Needed)

**Files:**
- Modify: `src/types/portfolio.ts`

**Objective:** Simplify ChatMessage type to remove contentType variants since all responses will be text from now on.

- [ ] **Step 1: Read current ChatMessage type**

Run: `grep -A 20 "type ChatMessage" src/types/portfolio.ts`

Expected output shows current type definition. Take note of the structure.

- [ ] **Step 2: Simplify the ChatMessage type**

In `src/types/portfolio.ts`, find the ChatMessage type definition and update it to:

```typescript
export type ChatMessage = {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
  contentType: 'text'; // Always 'text' now
  data?: never; // Remove data field since LLM handles all responses
  error?: boolean; // Add error flag for failed requests
};
```

Keep any other types in the file unchanged.

- [ ] **Step 3: Verify no breaking changes in existing code**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add src/types/portfolio.ts
git commit -m "refactor: simplify ChatMessage type for LLM integration"
```

---

## Task 3: Update useChat Hook - Remove Local Routing

**Files:**
- Modify: `src/hooks/useChat.ts`

**Objective:** Replace the local `routeQuery` logic and hardcoded responses with direct backend integration. Keep message state management and history unchanged.

- [ ] **Step 1: Remove unused imports and add new ones**

In `src/hooks/useChat.ts`, update the imports section:

```typescript
import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/portfolio';
import { streamChat } from '@/utils/backendClient';
```

Remove the lines that import `routeQuery` and `portfolioData`:
```typescript
// DELETE these lines:
// import { routeQuery } from '@/utils/queryRouter';
// import { portfolioData } from '@/utils/portfolioData';
```

- [ ] **Step 2: Replace sendMessage callback with backend integration**

In `src/hooks/useChat.ts`, replace the entire `sendMessage` callback (lines 30-116) with:

```typescript
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
        for await (const chunk of streamChat(userInput)) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === agentMessageId
                ? { ...msg, text: msg.text + chunk }
                : msg
            )
          );
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
    []
  );
```

- [ ] **Step 3: Verify the complete hook still compiles**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 4: Test locally - check if hook logic is correct**

The hook should now:
- Accept user input
- Add user message to state
- Create empty agent message
- Stream from backend and update agent message text
- Handle errors gracefully

Visually inspect the code. No test runner needed yet—this is integration testing.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useChat.ts
git commit -m "feat: integrate backend LLM streaming into useChat hook"
```

---

## Task 4: Add Error Handling Styling

**Files:**
- Modify: `src/components/ChatInterface/MessageBubble.tsx`

**Objective:** Display error messages with distinct styling when `error: true` flag is set on a message.

- [ ] **Step 1: Read current MessageBubble component**

Run: `cat src/components/ChatInterface/MessageBubble.tsx`

Take note of how it renders messages and what props it accepts.

- [ ] **Step 2: Add error styling to MessageBubble**

In `src/components/ChatInterface/MessageBubble.tsx`, find the component function and add error state styling. Update the message text rendering to include error styling:

```typescript
<div
  className={cn(
    'rounded-lg px-4 py-3 max-w-xl',
    message.sender === 'user'
      ? 'bg-primary text-on-primary ml-auto'
      : message.error
      ? 'bg-error/20 text-error border border-error'
      : 'bg-secondary-container text-on-secondary-container'
  )}
>
  {message.text}
</div>
```

If `error-related` classes don't exist in your tailwind config, use these fallbacks:
- `bg-red-100 text-red-900 border border-red-300` (light mode)

- [ ] **Step 3: Verify TypeScript still compiles**

Run: `npm run build`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/ChatInterface/MessageBubble.tsx
git commit -m "style: add error message styling to MessageBubble"
```

---

## Task 5: Manual Testing - Verify Full Integration

**Objective:** Test the complete integration with actual backend calls.

- [ ] **Step 1: Ensure backend is running**

Run: `docker-compose ps`

Expected: Both `ollama` and `mcp-portfolio-server` containers show `Up` status.

If not running: `docker-compose up -d`

- [ ] **Step 2: Start the frontend dev server**

Run: `npm run dev`

Expected: Vite dev server starts on `http://localhost:5173` (or similar)

- [ ] **Step 3: Open the app in browser**

Navigate to `http://localhost:5173`

Expected: Chat interface loads with welcome message

- [ ] **Step 4: Send a test message**

Type "Tell me about yourself" and hit send.

Expected:
- User message appears immediately
- Loading spinner shows
- Agent message appears with streaming text (word-by-word)
- Loading spinner disappears
- No errors in browser console

**Visual verification:**
- Text should appear gradually (streaming effect)
- Messages should be properly formatted
- Conversation history should be visible

- [ ] **Step 5: Send another message**

Type "What are your latest projects?" and hit send.

Expected: Same behavior as step 4

- [ ] **Step 6: Test error handling (optional)**

Stop the Docker containers: `docker-compose down`

Send another message.

Expected: 
- Error message appears: "Sorry, I encountered an issue: ... Please try again."
- Error message has distinct red styling
- No crash or blank screen

Start containers again: `docker-compose up -d`

- [ ] **Step 7: Commit test results (no code changes)**

Run:
```bash
git add -A
git commit -m "test: verify LLM integration with manual testing"
```

---

## Task 6: Clean Up Unused Code (Optional)

**Files:**
- Unused: `src/utils/queryRouter.ts` (local routing logic)
- Unused: `src/utils/portfolioData.ts` (used by old routing)
- Modify: `src/components/ChatInterface/RichContent.tsx` (no longer needed)

**Objective:** Remove local routing and portfolio data utilities since they're no longer used.

- [ ] **Step 1: Verify nothing imports queryRouter or portfolioData**

Run: `grep -r "queryRouter\|portfolioData" src/`

Expected: No matches (since we removed imports in Task 3)

- [ ] **Step 2: Delete unused files**

Run:
```bash
rm src/utils/queryRouter.ts
rm src/utils/portfolioData.ts
```

- [ ] **Step 3: Check RichContent component**

Run: `grep -l "RichContent" src/**/*.tsx`

If it's still used in ChatInterface, keep it. If not used anywhere, it's safe to delete but not required.

For now, leave it as-is to be safe.

- [ ] **Step 4: Verify build still works**

Run: `npm run build`

Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: remove unused local routing and portfolio data utilities"
```

---

## Summary

**What was built:**
1. ✅ Streaming HTTP client (`backendClient.ts`) that connects to MCP Server
2. ✅ Updated `useChat` hook to use backend instead of local routing
3. ✅ Simplified ChatMessage type for LLM responses
4. ✅ Error handling and styling for failed requests
5. ✅ Removed unused local routing logic

**What works now:**
- User messages sent to backend `/chat` endpoint
- Responses streamed word-by-word in real-time
- Conversation history maintained locally
- Graceful error handling with user-friendly messages
- All existing UI components work unchanged

**Verification:**
- Manual testing confirms streaming responses work
- Error handling displays properly
- No breaking changes to existing code

---

## Testing Checklist (Manual)

- [ ] Backend running (docker-compose up -d)
- [ ] Frontend dev server running (npm run dev)
- [ ] User can send message
- [ ] Response streams word-by-word
- [ ] Multiple messages work
- [ ] Error message shows if backend is down
- [ ] No console errors
- [ ] Conversation history persists in state

---

## Git Log Verification

After all tasks, run:
```bash
git log --oneline -10
```

Expected commits:
```
feat: remove unused local routing and portfolio data utilities
test: verify LLM integration with manual testing
style: add error message styling to MessageBubble
feat: integrate backend LLM streaming into useChat hook
refactor: simplify ChatMessage type for LLM integration
feat: add streaming backend client for LLM integration
```
