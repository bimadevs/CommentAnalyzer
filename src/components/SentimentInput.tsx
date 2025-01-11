import { useState } from "react";
import { Send } from "lucide-react";

export const SentimentInput = ({ onAnalyze }: { onAnalyze: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          className="w-full min-h-[120px] p-4 pr-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none glass-card"
        />
        <button
          type="submit"
          className="absolute bottom-4 right-4 p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
          disabled={!text.trim()}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};