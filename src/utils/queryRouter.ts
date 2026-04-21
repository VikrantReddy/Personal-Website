export interface RouteResult {
  contentType: 'projects' | 'skills' | 'contact' | 'bio' | 'fallback';
  suggestedPrompts?: string[];
}

const SUGGESTED_PROMPTS = [
  'Show me your latest projects',
  'Tell me about yourself',
  'What are your key skills?',
  'How can I work with you?'
];

const KEYWORD_MAP: Record<string, RouteResult['contentType']> = {
  project: 'projects',
  work: 'projects',
  portfolio: 'projects',
  skill: 'skills',
  expertise: 'skills',
  technical: 'skills',
  stack: 'skills',
  contact: 'contact',
  email: 'contact',
  hire: 'contact',
  help: 'contact',
  'work with': 'contact',
  about: 'bio',
  bio: 'bio',
  background: 'bio',
  who: 'bio'
};

export function routeQuery(userInput: string): RouteResult {
  const lowerInput = userInput.toLowerCase().trim();

  // Check for keyword matches
  for (const [keyword, contentType] of Object.entries(KEYWORD_MAP)) {
    if (lowerInput.includes(keyword)) {
      return { contentType };
    }
  }

  // No match found, return fallback with suggestions
  return {
    contentType: 'fallback',
    suggestedPrompts: SUGGESTED_PROMPTS
  };
}
