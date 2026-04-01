import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, User, Bot, RefreshCw, Languages, Sparkles, Sprout } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { cn } from "@/src/lib/utils";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "bot",
    content: "Namaste! I am your KrishiAI Assistant. How can I help you with your farming today? You can ask me about crop advice, disease help, or fertilizer tips.",
    timestamp: new Date()
  }
];

const suggestedQueries = [
  "How to grow wheat in Punjab?",
  "Treatment for leaf spot in rice",
  "Best fertilizer for sugarcane",
  "Current government schemes for farmers"
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: text,
        config: {
          systemInstruction: `You are KrishiAI, an expert agricultural assistant. 
          Provide helpful, accurate, and practical advice to farmers. 
          Keep responses concise and easy to understand. 
          If the user asks in Hindi, respond in Hindi. 
          Current language preference: ${language === "hi" ? "Hindi" : "English"}.`
        }
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response.text || "I'm sorry, I couldn't process that request. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "Oops! Something went wrong. Please check your connection and try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 h-[calc(100vh-120px)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Bot size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KrishiAI Assistant</h1>
            <div className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-wider">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online & Ready to Help
            </div>
          </div>
        </div>

        <button 
          onClick={() => setLanguage(l => l === "en" ? "hi" : "en")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
        >
          <Languages size={18} className="text-primary" />
          {language === "en" ? "English" : "हिन्दी"}
        </button>
      </div>

      <div className="flex-grow bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.role === "user" ? "bg-gray-900 text-white" : "bg-primary/10 text-primary"
              )}>
                {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === "user" 
                  ? "bg-gray-900 text-white rounded-tr-none" 
                  : "bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100"
              )}>
                {msg.content}
                <div className={cn(
                  "text-[10px] mt-2 font-medium opacity-50",
                  msg.role === "user" ? "text-right" : "text-left"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 max-w-[85%]"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                <Bot size={20} />
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 bg-primary rounded-full"
                ></motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-primary rounded-full"
                ></motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-primary rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        {messages.length < 3 && (
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-wrap gap-2">
            {suggestedQueries.map((query) => (
              <button
                key={query}
                onClick={() => handleSend(query)}
                className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm flex items-center gap-2 group"
              >
                <Sparkles size={12} className="text-primary group-hover:scale-110 transition-transform" />
                {query}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-[10px] text-center text-gray-400 mt-4 font-medium flex items-center justify-center gap-1">
            <Sprout size={10} />
            KrishiAI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
