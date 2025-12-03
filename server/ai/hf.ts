/**
 * Hugging Face Inference API wrapper
 * Provides a simple interface to call HF models via the Inference API
 */

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

interface HFInferenceResponse {
  generated_text?: string;
  [key: string]: any;
}

/**
 * Call the Hugging Face Inference API with a given prompt.
 * Supports both simple text-generation and chat-style models.
 *
 * @param model - Model ID on Hugging Face (e.g., "meta-llama/Llama-2-7b-chat")
 * @param prompt - The input prompt
 * @param apiKey - Hugging Face API token
 * @returns The generated text response
 */
export async function askHuggingFace(
  model: string,
  prompt: string,
  apiKey: string
): Promise<string> {
  // If model string contains a provider suffix (e.g. "model:novita") or
  // if the HF router is preferred, call the router chat completions API
  const useRouter = model.includes(":") || process.env.HF_USE_ROUTER === "1";

  try {
    if (useRouter) {
      // Build chat messages from the single prompt string: we expect prompt to
      // already include system + history formatting OR be the current user text.
      // We'll send a minimal chat payload: system + user.
      const systemMessage = prompt.split("\n\n")[0] || "";
      const userContent = prompt;

      const routerUrl = `https://router.huggingface.co/v1/chat/completions`;
      const body = {
        model,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userContent },
        ],
        // Optional: adjust generation parameters
        max_tokens: 512,
        temperature: 0.7,
      } as any;

      // Debug: log outgoing router request (without API key), truncated
      try {
        const preview = { model, messages: body.messages };
        console.debug("HF router request ->", routerUrl, JSON.stringify(preview).slice(0, 200));
      } catch (e) {
        /* ignore preview errors */
      }

      const resp = await fetch(routerUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const txt = await resp.text().catch(() => "(no body)");
        console.debug("HF router response error:", resp.status, resp.statusText, txt.slice ? txt.slice(0, 1000) : txt);
        const err: any = new Error(`HF Inference API error: ${resp.status}`);
        err.status = resp.status;
        err.statusText = resp.statusText;
        err.body = txt;
        throw err;
      }

      const data = await resp.json();
      // Expect OpenAI-like response: { choices: [ { message: { content: '...' } } ] }
      const content = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.message || null;
      if (!content) {
        console.warn("Unexpected HF router response:", data);
        throw new Error("HF router returned unexpected response format");
      }
      try {
        const outPreview = typeof content === "string" ? content.slice(0, 1000) : JSON.stringify(content).slice(0, 1000);
        console.debug("HF router response OK (truncated):", outPreview);
      } catch (e) {
        /* ignore preview errors */
      }
      return typeof content === "string" ? content : JSON.stringify(content);
    }

    // Fallback to legacy inference endpoint for simple text-generation
    const url = `https://api-inference.huggingface.co/models/${model}`;
    // Debug: log outgoing legacy inference request (without API key), truncated
    try {
      const preview = { url, inputs: String(prompt).slice(0, 200) };
      console.debug("HF inference request ->", url, JSON.stringify(preview));
    } catch (e) {
      /* ignore preview errors */
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "(no body)");
      console.debug("HF inference response error:", response.status, response.statusText, String(errorBody).slice(0, 1000));
      if (response.status === 503) {
        console.log("Model loading, retrying in 2 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return askHuggingFace(model, prompt, apiKey);
      }
      const err: any = new Error(`HF Inference API error: ${response.status}`);
      err.status = response.status;
      err.statusText = response.statusText;
      err.body = errorBody;
      throw err;
    }

    const data: any = await response.json();
    let generatedText: string | null = null;
    if (typeof data?.generated_text === "string") {
      generatedText = data.generated_text;
    } else if (Array.isArray(data) && data.length > 0) {
      if (typeof data[0]?.generated_text === "string") {
        generatedText = data[0].generated_text;
      }
    }
    if (!generatedText) {
      console.warn("Unexpected HF response format:", data);
      throw new Error("HF model returned unexpected response format");
    }
    try {
      console.debug("HF inference response OK (truncated):", generatedText.slice(0, 500));
    } catch (e) {
      /* ignore */
    }
    if (generatedText.includes(prompt)) {
      const idx = generatedText.indexOf(prompt);
      generatedText = generatedText.substring(idx + prompt.length).trim();
    }
    return generatedText || "I'm here to help.";
  } catch (err: any) {
    console.error("HF Inference error:", err);
    throw err;
  }
}

/**
 * Format chat history + user message into a prompt for the HF model
 * Uses a simple chat format: "User: ...\nAssistant: ..." pattern
 *
 * @param userMessage - The current user message
 * @param history - Previous chat history
 * @returns Formatted prompt string
 */
export function formatChatPrompt(
  userMessage: string,
  history: ChatHistoryItem[] = []
): string {
  const systemPrompt = `You are Fusion Mining's support assistant for a B2B mining investment and trading platform. Answer clearly and professionally. Keep responses concise and to the point (brief by default, ~1-3 short sentences or <=100 words). Only provide more detailed explanations when the user asks for them. Explain platform features, help with navigation, and give high-level guidance about mining investment, but do not give personalized legal, tax, or investment advice. If a question needs a human, say you'll connect them to an admin.`;

  let prompt = systemPrompt + "\n\n";

  // Add conversation history
  for (const msg of history) {
    if (msg.role === "user") {
      prompt += `User: ${msg.content}\n`;
    } else if (msg.role === "assistant") {
      prompt += `Assistant: ${msg.content}\n`;
    }
  }

  // Add current user message
  prompt += `User: ${userMessage}\nAssistant:`;

  return prompt;
}
