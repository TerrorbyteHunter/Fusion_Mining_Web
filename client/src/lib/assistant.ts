export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
  ts?: string;
};

export async function sendToAssistant(
  message: string,
  history: ChatHistoryItem[] = []
): Promise<string> {
  const resp = await fetch("/api/assistant/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message, history }),
  });

  const data = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    const err: any = new Error(data?.message || "Assistant request failed");
    err.status = resp.status;
    // Some server responses include retryDelay for rate-limit errors
    if (data && data.retryDelay) err.retryDelay = data.retryDelay;
    throw err;
  }

  return data.reply as string;
}


