# LLM-Powered Chatbot Integration Design

**Date:** 2026-04-22  
**Status:** Ready for Implementation  
**Approach:** Direct Backend Integration (Approach A)

---

## Overview

Replace the local query routing logic with direct calls to the Ollama LLM via the MCP Server backend. The chatbot will send user messages to `http://localhost:8000/chat`, receive streamed responses from the LLM (powered by portfolio context stored on the backend), and display text appearing word-by-word in the UI.

---

## Architecture

### High-Level Flow

```
User Input
    ↓
ChatInterface Component
    ↓
useChat Hook (updated)
    ↓
backendClient.ts (new utility)
    ↓
POST /chat → MCP Server @ localhost:8000
    ↓
Ollama LLM + Portfolio Context
    ↓
Streaming Response (text chunks)
    ↓
Frontend streams text into message state
    ↓
MessageBubble updates in real-time
```

### What Changes

- **Remove:** Local `routeQuery()` logic and hardcoded portfolio responses
- **Replace with:** Direct HTTP calls to backend `/chat` endpoint
- **Keep:** All UI components, message state management, conversation history
- **Add:** Streaming response parser, error handling for API failures

---

## Components & Data Flow

### 1. Modified `useChat.ts` Hook

**Responsibilities:**
- Manage messages state (user + agent messages)
- Handle loading/streaming state
- Make POST request to backend with current user message
- Parse streaming response and update agent message in real-time
- Maintain conversation history locally
- Handle errors gracefully

**Key Changes:**
- Remove `routeQuery()` and all switch cases for content types
- Replace with async call to `backendClient.streamChat()`
- Messages now always have `contentType: 'text'` (no more 'projects', 'skills', etc.)
- Add error state to show API failure messages
- Remove artificial 500ms delay

**Message structure** (simplified):
```typescript
{
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
  contentType: 'text';
  error?: boolean; // true if API call failed
}
```

### 2. New `src/utils/backendClient.ts`

**Responsibilities:**
- Handle HTTP connection to MCP Server
- Send user message, receive streaming response
- Parse ReadableStream into text tokens
- Handle connection errors, timeouts

**Key Function:**
```typescript
async function* streamChat(userMessage: string): AsyncGenerator<string>
```

Returns an async generator that yields text chunks as they arrive from the server. Frontend consumes this to update message text in real-time.

**Error Handling:**
- Network errors (no connection, timeout)
- HTTP errors (500, 503, etc.)
- Malformed responses
- Throw descriptive error messages that useChat catches

### 3. ChatInterface & MessageBubble (No Changes)

Existing components work as-is. The hook change is backward compatible—messages still have `id`, `sender`, `text`, `timestamp`, `contentType`.

---

## Request/Response Format

### Request (Frontend → Backend)

**Endpoint:** `POST http://localhost:8000/chat`

**Body:**
```json
{
  "message": "Show me your latest projects"
}
```

### Response (Backend → Frontend)

**Type:** Server-Sent Events (SSE) or streaming text

The backend streams text chunks. Each chunk is a portion of the LLM response. Frontend consumes chunks and appends to message text.

Example chunks:
```
"I've "
"retrieved "
"your "
"latest "
"projects "
"from "
"the "
"repository."
```

Frontend displays these progressively: "I've" → "I've retrieved" → "I've retrieved your" → etc.

---

## Implementation Details

### Streaming Implementation in useChat

1. When user sends message, create an empty agent message with `text: ''`
2. Call `backendClient.streamChat(userMessage)` which returns an async generator
3. Loop through yielded chunks, append each to agent message text
4. Update state after each chunk (triggers re-render)
5. On completion, mark `loading: false`

### Error Handling

- **Connection refused:** "Backend service is not running. Please start the server."
- **Timeout:** "Request took too long. Please try again."
- **Streaming interrupted:** "Response was interrupted. Please try again."
- **Other API errors:** "An error occurred. Please try again."

Display error in chat as an agent message with `text: "<error message>"` and `error: true` for styling.

### Configuration

**Backend URL:** Hardcoded to `http://localhost:8000` (can be moved to env var if needed)

**Timeout:** 30 seconds for initial connection + streaming

**Chunk parsing:** Assume backend sends plain text chunks (one per line or chunked by the streaming protocol)

---

## Files to Create/Modify

### Create:
- `src/utils/backendClient.ts` — Streaming HTTP client for backend

### Modify:
- `src/hooks/useChat.ts` — Remove local routing, add streaming integration
- `src/types/portfolio.ts` — Simplify ChatMessage type (if needed)

### No Changes:
- All UI components (ChatInterface, MessageBubble, ChatInput, etc.)
- App.tsx, routing, other pages
- package.json (no new dependencies)

---

## Error Scenarios & Handling

| Scenario | Handling |
|----------|----------|
| Backend not running | Show error message: "Backend service unavailable. Please ensure the server is running." |
| Network timeout | Show error: "Request timed out. Please try again." |
| Invalid response format | Show error: "Received invalid response. Please try again." |
| User closes tab mid-stream | Stream cleanup (browser handles) |
| User sends message before previous response completes | Queue message or disable input until previous request finishes (via `loading` state) |

---

## Testing Checklist

- [ ] User sends message, receives streamed response word-by-word
- [ ] Multiple messages in conversation work correctly
- [ ] Conversation history persists locally in state
- [ ] Backend unavailable → shows error message
- [ ] Network timeout → shows error message
- [ ] Streaming can be interrupted (user sends new message)
- [ ] Page refresh clears conversation (expected behavior)
- [ ] Loading spinner shows during streaming
- [ ] Chat input disabled while streaming (already in place)

---

## Future Enhancements (Out of Scope)

- Persistence (save conversations to localStorage or backend database)
- Multi-turn memory (store conversation history on backend for context)
- Model selection UI (choose between different Ollama models)
- Rate limiting / usage tracking
- Response regeneration / editing

---

## Success Criteria

1. ✅ User messages sent to backend `/chat` endpoint
2. ✅ Responses streamed and displayed word-by-word
3. ✅ Conversation history maintained locally
4. ✅ Graceful error handling (no crashes)
5. ✅ No breaking changes to existing UI components
6. ✅ Fast implementation (< 1 hour)
