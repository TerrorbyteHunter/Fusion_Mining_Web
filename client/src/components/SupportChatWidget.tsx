import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { sendToAssistant, type ChatHistoryItem } from "@/lib/assistant";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function SupportChatWidget() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [isSending, setIsSending] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const ts = new Date().toISOString();
    const newHistory: ChatHistoryItem[] = [
      ...history,
      { role: "user", content: trimmed, ts },
    ];

    setHistory(newHistory);
    setInput("");
    setIsSending(true);

    try {
      const reply = await sendToAssistant(trimmed, newHistory);
      setHistory([
        ...newHistory,
        { role: "assistant", content: reply || "I'm here to help.", ts: new Date().toISOString() },
      ]);
    } catch (error) {
      console.error("Assistant error:", error);
      const maybe: any = error;
      if (maybe && maybe.status === 429) {
        const retry = maybe.retryDelay || "soon";
        toast({
          title: "Assistant rate limit reached",
          description: `Please try again after ${retry}.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Assistant unavailable",
          description: "Please try again in a moment or contact support directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  // Auto-scroll to latest message when history changes or while sending
  useEffect(() => {
    try {
      if (messagesRef.current) {
        messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
      }
    } catch (e) {
      /* ignore */
    }
  }, [history, isSending, isOpen]);

  const stripBold = (text: string) => {
    try {
      // remove markdown bold markers **like this**
      return String(text).replace(/\*\*(.*?)\*\*/gs, "$1");
    } catch (e) {
      return text;
    }
  };

  // Robot variants - pick one by setting ROBOT_VARIANT to 1, 2 or 3
  const ROBOT_VARIANT = 3;

  const BotVariant1 = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg viewBox="0 0 100 120" className={className}>
      <rect x="25" y="15" width="50" height="45" rx="6" fill="currentColor" />
      <circle cx="38" cy="32" r="5" fill="white" />
      <circle cx="62" cy="32" r="5" fill="white" />
      <rect x="20" y="65" width="60" height="45" rx="5" fill="currentColor" />
      <rect x="35" y="80" width="30" height="4" rx="2" fill="white" />
    </svg>
  );

  const BotVariant2 = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="40" fill="currentColor" />
      <circle cx="38" cy="42" r="3" fill="white" />
      <circle cx="62" cy="42" r="3" fill="white" />
      <path d="M 38 58 Q 50 65 62 58" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );

  // Larger, full-bodied robot (variant 3) - designed to peek out when partially clipped
  const BotVariant3 = ({ className = "w-14 h-14" }: { className?: string }) => (
    <svg viewBox="0 0 140 160" className={className}>
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <g fill="url(#g1)">
        <rect x="30" y="20" width="80" height="60" rx="10" />
        <rect x="40" y="90" width="60" height="48" rx="10" />
      </g>
      <g fill="#fff">
        <circle cx="55" cy="42" r="6" />
        <circle cx="85" cy="42" r="6" />
        <rect x="60" y="100" width="20" height="6" rx="3" />
      </g>
      <g stroke="#fff" strokeWidth="3">
        <line x1="45" y1="18" x2="45" y2="8" strokeLinecap="round" />
        <circle cx="45" cy="6" r="2" fill="#fff" />
        <line x1="95" y1="18" x2="95" y2="8" strokeLinecap="round" />
        <circle cx="95" cy="6" r="2" fill="#fff" />
      </g>
    </svg>
  );

  const BotIcon = ({ className = "w-12 h-12" }: { className?: string }) => {
    if (ROBOT_VARIANT === 1) return <BotVariant1 className={className} />;
    if (ROBOT_VARIANT === 2) return <BotVariant2 className={className} />;
    return <BotVariant3 className={className} />;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 max-w-[95vw] rounded-xl border bg-background shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white">
            <div className="flex items-center gap-2">
              <BotIcon />
              <div>
                <div className="font-semibold text-sm">Fusion Assistant</div>
                <div className="text-xs opacity-80">B2B Support Bot</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-primary-foreground/80"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div ref={messagesRef} className="flex-1 max-h-[70vh] overflow-y-auto px-4 py-3 space-y-3 text-sm">
            {history.length === 0 && (
              <div className="text-muted-foreground text-sm">
                Hello, what question do you have for me today?
              </div>
            )}
            {history.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="mr-2 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-700">AI</div>
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{stripBold(msg.content)}</ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  )}
                  {msg.ts && (
                    <div className="text-[10px] opacity-70 mt-1 text-right">
                      {new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="ml-2 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white">U</div>
                  </div>
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start gap-2">
                <div className="flex-shrink-0 opacity-60 animate-bounce">
                  <BotIcon />
                </div>
                <div className="rounded-lg px-3 py-2 bg-muted rounded-bl-none flex items-center gap-1">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-600 chat-dot" style={{ animationDelay: '0s' }} />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-600 chat-dot" style={{ animationDelay: '0.12s' }} />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-600 chat-dot" style={{ animationDelay: '0.24s' }} />
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-2">
            <div className="flex items-end gap-2">
              <Textarea
                rows={2}
                className="flex-1 resize-none text-sm"
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button
                size="icon"
                className="shrink-0"
                onClick={handleSend}
                disabled={!input.trim() || isSending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="relative h-14 rounded-full bg-white text-blue-600 shadow-lg px-8 py-3 flex items-center gap-3 transition-all duration-200 hover:shadow-xl"
        >
          <span className="text-sm font-semibold">Ask me</span>
          <div className="flex-shrink-0 text-blue-600">
            <BotIcon className="w-10 h-10" />
          </div>
        </button>
      )}
    </div>
  );
}


