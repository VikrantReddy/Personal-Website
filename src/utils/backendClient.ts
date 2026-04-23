const BACKEND_URL = 'http://localhost:8000';
const MODEL = 'neural-chat';
const MAX_TOKENS = 512;

// Generate session ID (persists for the session)
let sessionId = '';

function getOrCreateSessionId(): string {
  if (!sessionId) {
    sessionId = crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}`;
  }
  return sessionId;
}

export async function* streamChat(
  userMessage: string,
  previousMessages?: Array<{ role: 'user' | 'assistant'; content: string }>
): AsyncGenerator<string, void, unknown> {
  try {
    // Build messages array with history
    const messages = previousMessages ? [...previousMessages] : [];
    messages.push({ role: 'user', content: userMessage });

    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: getOrCreateSessionId(),
        messages: messages,
        model: MODEL,
        max_tokens: MAX_TOKENS,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }

    // Consume SSE stream
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
      const lines = buffer.split('\n');

      // Keep the last incomplete line in the buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'chunk' && data.text) {
              yield data.text;
            } else if (data.type === 'done') {
              return;
            } else if (data.type === 'error') {
              throw new Error(data.error);
            }
          } catch (e) {
            // Ignore parse errors for keep-alive lines
          }
        }
      }
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
