import { GoogleGenerativeAI } from "@google/generative-ai";

// Support both GEMINI_API (your current .env) and GEMINI_API_KEY
const apiKey = process.env.GEMINI_API || process.env.GEMINI_API_KEY;

let genAI: any = null;
let model: any = null;

if (apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    // Use the model name from Google AI Studio (matches their code examples)
    model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });
  } catch (err) {
    console.warn("Failed to initialize Google Generative AI client, falling back to local assistant:", err);
    genAI = null;
    model = null;
  }
} else {
  console.warn("GEMINI API key not provided; using local assistant fallback.");
}

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

function localFallbackReply(userMessage: string, history: ChatHistoryItem[] = []): string {
  // Simple, deterministic fallback: short help + echo suggestion.
  const hints = [
    "You can ask about: marketplace listings, projects, seller verification, or account settings.",
    "Try: 'How do I verify my seller account?' or 'How do I create a listing?'.",
  ];

  // Keep replies concise to avoid flooding the UI.
  return `I don't have access to the AI assistant right now. ${hints.join(" ")}\n\nYou asked: ${userMessage}`;
}

export async function askSupportBot(
  userMessage: string,
  history: ChatHistoryItem[] = []
): Promise<string> {
  const systemPrompt = `You are Fusion Mining's support assistant for a B2B mining investment and trading platform. Answer clearly and professionally. Do not provide legal, tax, or investment advice. If a question needs a human, say you'll connect them to an admin.`;

  const contents = [
    { role: "user" as const, parts: [{ text: systemPrompt }] },
    ...history.map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
    { role: "user" as const, parts: [{ text: userMessage }] },
  ];

  // If the model isn't available (no API key or init failure), return a local fallback.
  if (!model) {
    return localFallbackReply(userMessage, history);
  }

  try {
    const result = await model.generateContent({ contents });
    return result.response.text();
  } catch (err: any) {
    // If the provider returns a quota/rate-limit error, log and fall back.
    console.error("Generative AI error — falling back to local assistant:", err);
    try {
      // If the error contains retry info, attach it to the thrown error so the
      // caller can decide to surface 429, but we prefer graceful fallback.
      if (err?.status === 429) {
        // Return a helpful rate-limit style message.
        return `The assistant is currently rate limited. Please try again shortly.`;
      }
    } catch (inner) {
      console.error("Error inspecting generative AI error:", inner);
    }

    return localFallbackReply(userMessage, history);
  }
}


