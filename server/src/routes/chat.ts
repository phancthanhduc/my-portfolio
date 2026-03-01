import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const chatRouter = Router();

const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

// Get system prompt from portfolio context (simplified for now)
function getSystemPrompt(): string {
  return `You are an AI assistant for Duc Phan's portfolio website.
Help visitors learn about his work, skills, and projects.

About: Full Stack Developer with 8+ years experience in React, TypeScript, Node.js, Go.

Projects include: drprompt (AI Prompt Platform), SPSOFT Portal, BeautyPay, Minno BOM Core, CER OMS, DW Tech API, DW Tech Admin, DW Tech Customer Portal, VXCoin Exchange, Film Site.

Skills: React/Next.js (90%), TypeScript (90%), Node.js/NestJS (85%), Go (75%), Tailwind CSS/MUI (85%), PostgreSQL/Redis (80%), Docker/AWS (75%), AI Integration (80%).

Be friendly, concise, and helpful.`;
}

// Send message
chatRouter.post('/message', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    // Get API key from settings
    const apiKeySetting = await prisma.setting.findUnique({
      where: { key: 'gemini_api_key' }
    });

    if (!apiKeySetting?.value) {
      return res.status(400).json({ error: 'API key not configured' });
    }

    const apiKey = apiKeySetting.value;

    // Build conversation history
    const conversationHistory = history || [];
    const conversationText = conversationHistory
      .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const fullPrompt = `System: ${getSystemPrompt()}

Conversation so far:
${conversationText}

User: ${message}

Assistant:`;

    const response = await fetch(
      `${API_BASE_URL}/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
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
      return res.status(500).json({ error: errorData.error?.message || 'API error' });
    }

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      const reply = data.candidates[0].content.parts[0].text;
      return res.json({ reply });
    }

    res.status(500).json({ error: 'No response generated' });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
