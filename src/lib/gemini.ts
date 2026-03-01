/**
 * Gemini API Service
 * Simple fetch-based wrapper for Google Gemini API
 */

import { generateSystemPrompt } from '../data/portfolio-context';

const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatHistory {
  messages: Message[];
}

let chatHistory: ChatHistory = {
  messages: []
};

/**
 * Get API key from environment variable
 */
function getApiKey(): string | undefined {
  return import.meta.env.VITE_GEMINI_API_KEY;
}

/**
 * Build the prompt with context
 */
function buildPrompt(userMessage: string): string {
  const systemPrompt = generateSystemPrompt();
  return `System: ${systemPrompt}

Conversation so far:
${chatHistory.messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')}

User: ${userMessage}

Assistant:`;
}

/**
 * Send a message to Gemini and get response
 */
export async function sendMessage(message: string): Promise<string> {
  const apiKey = getApiKey();

  if (!apiKey) {
    return 'Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your environment variables.';
  }

  // Add user message to history
  chatHistory.messages.push({ role: 'user', content: message });

  try {
    const response = await fetch(
      `${API_BASE_URL}/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: buildPrompt(message)
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return `Sorry, I encountered an error: ${errorData.error?.message || 'Unknown error'}`;
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const assistantResponse = data.candidates[0].content.parts[0].text;
      chatHistory.messages.push({ role: 'model', content: assistantResponse });
      return assistantResponse;
    }

    return 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

/**
 * Clear chat history
 */
export function clearChat(): void {
  chatHistory = { messages: [] };
}

/**
 * Check if API is configured
 */
export function isApiConfigured(): boolean {
  return !!getApiKey();
}
