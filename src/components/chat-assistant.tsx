"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircle, X, Phone, Bot, ChevronRight } from "lucide-react";
import { CHAT_NODES, getChatNode, type ChatOption } from "@/lib/chatbot/flows";
import { SITE } from "@/lib/utils";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

let msgCounter = 0;
function nextId() {
  msgCounter += 1;
  return `msg-${msgCounter}`;
}

export function ChatAssistant() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [nodeId, setNodeId] = useState("root");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMarketplace = pathname === "/marketplace" || pathname.startsWith("/marketplace/");

  const node = getChatNode(nodeId);

  const appendBot = useCallback((texts: string[]) => {
    setMessages((prev) => [
      ...prev,
      ...texts.map((text) => ({ id: nextId(), role: "bot" as const, text })),
    ]);
  }, []);

  const appendUser = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
  }, []);

  const goToNode = useCallback(
    (id: string, userLabel?: string) => {
      const target = getChatNode(id);
      if (userLabel) appendUser(userLabel);
      setNodeId(id);
      appendBot(target.messages);
    },
    [appendBot, appendUser]
  );

  useEffect(() => {
    if (open && messages.length === 0) {
      appendBot(CHAT_NODES.root.messages);
    }
  }, [open, messages.length, appendBot]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, nodeId]);

  function handleOption(option: ChatOption) {
    if (option.type === "node") {
      goToNode(option.nodeId, option.label);
      return;
    }
    if (option.type === "link") {
      appendUser(option.label);
      appendBot([`Taking you to: ${option.label}`]);
      setOpen(false);
      router.push(option.href);
      return;
    }
    if (option.type === "call") {
      appendUser(option.label);
      window.location.href = `tel:${SITE.phone}`;
      return;
    }
    if (option.type === "whatsapp") {
      appendUser(option.label);
      window.open(`https://wa.me/${SITE.whatsapp}`, "_blank", "noopener,noreferrer");
    }
  }

  function optionStyle(option: ChatOption) {
    if (option.type === "call") {
      return "border-brand-500 bg-brand-600 text-white hover:bg-brand-500";
    }
    if (option.type === "whatsapp") {
      return "border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-500";
    }
    if (option.type === "node" && option.nodeId === "root") {
      return "border-[hsl(var(--border))] bg-[hsl(var(--muted))]/60 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]";
    }
    return "border-brand-200 bg-brand-50 text-brand-800 hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-200 dark:hover:bg-brand-950/60";
  }

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col items-end gap-3",
        isMarketplace
          ? "bottom-[5.5rem] right-3 pb-[env(safe-area-inset-bottom)] sm:bottom-[4.75rem] sm:right-6"
          : "bottom-3 right-3 pb-[env(safe-area-inset-bottom)] sm:bottom-6 sm:right-6"
      )}
    >
      {open && (
        <div
          className="flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl"
          role="dialog"
          aria-label="Chat assistant"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-3.5 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <Bot size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold">OCB Assistant</p>
              <p className="truncate text-xs text-white/85">Battery help · Nagpur</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 transition hover:bg-white/20"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex max-h-[min(50vh,320px)] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  msg.role === "bot"
                    ? "self-start rounded-bl-md bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]"
                    : "self-end rounded-br-md bg-brand-600 text-white"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3">
            <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Choose an option
            </p>
            <div className="flex max-h-[min(32vh,220px)] flex-col gap-1.5 overflow-y-auto">
              {node.options.map((option, i) => (
                <button
                  key={`${node.id}-${i}`}
                  type="button"
                  onClick={() => handleOption(option)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left text-sm font-semibold transition",
                    optionStyle(option)
                  )}
                >
                  <span className="flex items-center gap-2">
                    {option.type === "call" && <Phone size={15} />}
                    {option.type === "whatsapp" && <WhatsAppIcon className="h-4 w-4" />}
                    {option.label}
                  </span>
                  {option.type === "link" && <ChevronRight size={15} className="opacity-60" />}
                </button>
              ))}
            </div>

            {/* Persistent call strip */}
            <div className="mt-3 flex gap-2">
              <a
                href={`tel:${SITE.phone}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white transition hover:bg-brand-500"
              >
                <Phone size={14} />
                Call us
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-500"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <div className="relative">
        {!open && (
          <span className="pointer-events-none absolute -right-1 -top-2 z-10 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            Help
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/30 transition hover:scale-105 hover:shadow-xl hover:shadow-brand-600/40"
          aria-label={open ? "Close assistant" : "Open assistant"}
          aria-expanded={open}
        >
          {!open && (
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-20" />
          )}
          {open ? <X size={24} /> : <MessageCircle size={26} />}
        </button>
      </div>
    </div>
  );
}
