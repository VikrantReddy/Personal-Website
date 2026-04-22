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

    // Parse JSON response (not streaming)
    const data = await response.json();

    if (!data.message || !data.message.content) {
      throw new Error('Invalid response format from backend');
    }

    // Yield the response word-by-word for UI streaming effect
    const responseText = data.message.content;
    const words = responseText.split(' ');

    for (const word of words) {
      if (word.trim()) {
        yield word + ' ';
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
