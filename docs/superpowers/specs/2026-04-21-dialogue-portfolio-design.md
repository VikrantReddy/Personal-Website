# Dialogue Portfolio — Chat-Based Personal Website Design

**Date:** 2026-04-21  
**Project:** Personal Website Redesign  
**Status:** Design Approved

## Overview

Transform the existing multi-section portfolio (Hero, Projects, Skills, Contact) into a single, cohesive **chat-based portfolio interface**. Users interact with "The Curator" — an AI agent persona — who responds to queries about your work, skills, and contact information. The experience mirrors the reference design "The Dialogue Portfolio" with a conversational UX that feels more engaging than traditional portfolio grids.

## Key Design Decisions

- **Full Replacement:** The chat interface becomes the entire website (replaces existing Index page)
- **Client-Side Only:** Uses keyword-based routing with no backend required; suggested prompts guide users
- **Reuse Existing Content:** Portfolio data extracted from current components (Hero, Projects, Skills, Contact)
- **Visual Consistency:** Matches the reference design's slate/blue palette, typography, and message bubble layout

## Architecture

### Components

1. **Header (TopAppBar)**
   - Fixed sticky header at top
   - "Portfolio OS" branding on left
   - Navigation links hidden on mobile, visible on md+ breakpoint
   - Icon buttons on right (search, settings, theme toggle)
   - Semi-transparent with backdrop blur

2. **Chat Canvas (Main Content)**
   - Flex container, grows to fill remaining space
   - Overflow-y auto with custom scrollbar
   - Messages rendered in chronological order
   - Padding/margins follow the reference design

3. **Message Components**
   - **Agent Message:** Styled left-aligned, background `surface-container-low`, rounded with no top-left radius
   - **User Message:** Right-aligned, background `primary-container`, rounded with no top-right radius
   - Both include avatar/icon and timestamp labels
   - Message max-width constraints for readability

4. **Rich Content Renderer**
   - **Projects Grid:** Asymmetric bento layout (3-col + 2-col split) with project cards, images, tech badges
   - **Skills Display:** Progress bars with skill name, category, and proficiency level
   - **Contact Info:** Cards listing response time, services, consultation details
   - **Suggested Prompts:** Button grid that users can click to trigger pre-written queries

5. **Input Area (Sticky Footer)**
   - Text input field with placeholder
   - Send button (icon or text)
   - Contained within viewport, scrolls above chat canvas on mobile
   - Focus states and disabled states for loading

### Data Structure

#### Portfolio Data Object
```typescript
interface PortfolioData {
  bio: {
    name: string;
    title: string;
    tagline: string;
    stats: { label: string; value: string }[];
  };
  projects: {
    title: string;
    description: string;
    tech: string[];
    metrics: string[];
    icon: ReactNode;
    color: string;
  }[];
  skills: {
    name: string;
    category: string;
    level: number; // 0-100
  }[];
  contact: {
    responseTime: string;
    services: string[];
    consultationNote: string;
  };
}
```

#### Message History
```typescript
interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
  contentType: 'text' | 'projects' | 'skills' | 'contact' | 'mixed';
  data?: any; // For rich content (projects, skills, etc.)
}
```

## Query Routing Logic

**Keyword-based pattern matching:** Extract keywords from user input and route to pre-written curator responses.

### Routing Map

| User Input Keywords | Response Type | Content Delivered |
|---|---|---|
| "project", "work", "portfolio" | Projects | Rich bento grid with all 3 projects |
| "skill", "expertise", "technical", "stack" | Skills | Skills table with categories and proficiency |
| "contact", "email", "work with", "hire", "help" | Contact | Contact info cards + services list |
| "about", "bio", "background", "who are you" | Bio | Narrative bio + stats |
| No match / unrecognized | Fallback | "I didn't quite catch that. Try asking about my projects, skills, or how to work with me." + suggested prompts |

### Suggested Prompts (On Load & Fallback)
- "Show me your latest projects"
- "Tell me about yourself"
- "What are your key skills?"
- "How can I work with you?"

## UI & Styling

### Design System Alignment

- **Color Palette:** Slate/blue tones from reference design (primary #575f75, surface #f9f9f9, etc.)
- **Typography:** Manrope for headlines, Inter for body, Space Grotesk for labels (from reference)
- **Roundness:** Consistent `rounded-xl` for message bubbles and cards
- **Elevation:** Tonal layering (no heavy shadows), subtle borders and background shifts

### Message Bubble Styling

- **Agent Messages:** 
  - Background: `surface-container-low` (#f2f4f4)
  - Rounded: `rounded-xl rounded-tl-none`
  - Max-width: 85%
  - Avatar: Small circular badge with icon and label

- **User Messages:**
  - Background: `primary-container` (#dae2fd)
  - Rounded: `rounded-xl rounded-tr-none`
  - Max-width: 75%
  - Aligned right (self-end)

### Rich Content Styling

- **Projects Grid:** Asymmetric 2-column layout (3-col-span + 2-col-span on md+)
- **Skills:** Horizontal progress bars with inline labels
- **Contact:** Card-based layout with icons and supporting text

### Responsive Behavior

- **Mobile:** Single column, wider padding, full-width messages
- **Tablet:** 2-column layout where applicable, adjusted widths
- **Desktop:** Full layout as designed, centered content with max-width constraints

## User Flows

### Initial Load
1. User lands on page
2. Curator's welcome message appears with intro text
3. Suggested prompts displayed as clickable buttons below
4. Input field ready for user text or prompt selection

### User Query Flow
1. User types query or clicks a suggested prompt
2. Input submitted, message added to chat history as user message
3. Client-side keyword extraction runs on input
4. Matching curator response queued and rendered
5. Chat scrolls to latest message
6. Input clears, ready for next query

### Fallback Flow
1. User input doesn't match any keywords
2. Curator responds with confusion message
3. Suggested prompts re-displayed
4. User can try again or click a prompt

## Technical Implementation Details

### State Management
- `messages`: Array of ChatMessage objects
- `loading`: Boolean for send state
- `portfolioData`: Static object with all content (no API calls)

### Event Handlers
- `handleSendMessage()`: Extract input, validate, add to history, route query
- `handlePromptClick()`: Simulate user input with prompt text
- `handleScroll()`: Keep chat scrolled to bottom on new messages

### Keyword Extraction
Simple substring matching on lowercased input:
```
if (input.includes('project')) → triggerProjectsResponse()
if (input.includes('skill')) → triggerSkillsResponse()
// etc.
```

### Performance Considerations
- All data is static/local; no API latency
- Message history kept in memory; no persistence required
- Lazy rendering of rich content (grids, progress bars) only when in view

## Constraints & Scope

- **No Backend:** Client-side only, keyword-based logic
- **No Persistence:** Chat history lost on page refresh (by design)
- **No Dynamic Content:** Portfolio data is hardcoded; updates require code changes
- **Suggested Prompts Only:** Users can type freely, but unmatched queries trigger fallback (not semantic understanding)

## Success Criteria

✓ Chat interface renders without errors  
✓ All keyword routes trigger appropriate content  
✓ Rich content (projects, skills, contact) displays pixel-perfect to reference  
✓ Responsive on mobile, tablet, desktop  
✓ Messaging UX feels natural and guided  
✓ Loading states appear (even if instant on client-side)  
✓ No console errors or accessibility issues  

## Future Enhancements (Out of Scope)

- Persistence: Save chat history to localStorage
- Backend: Real semantic understanding with LLM-powered responses
- Dynamic content: CMS integration for updating portfolio data without code
- Analytics: Track which queries users ask most
