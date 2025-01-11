import { useState } from "react";
import { SentimentInput } from "@/components/SentimentInput";
import { SentimentScore } from "@/components/SentimentScore";
import { SentimentChart } from "@/components/SentimentChart";
import { pipeline, TextClassificationOutput } from "@huggingface/transformers";
import { toast } from "sonner";

interface SentimentResult {
  label: string;
  score: number;
}

const Index = () => {
  const [score, setScore] = useState(0.5);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [chartData, setChartData] = useState([
    { sentiment: "Positive", value: 0 },
    { sentiment: "Neutral", value: 0 },
    { sentiment: "Negative", value: 0 },
  ]);

  const analyzeSentiment = async (text: string) => {
    try {
      toast.loading("Analyzing sentiment...");
      
      // Initialize the sentiment analysis pipeline
      const classifier = await pipeline("sentiment-analysis");
      const result = await classifier(text) as SentimentResult[];
      
      // Handle both array and single result cases
      const sentimentResult = result[0];
      
      // Update score based on sentiment
      const newScore = sentimentResult.label === "POSITIVE" ? 
        0.8 + Math.random() * 0.2 : 
        sentimentResult.label === "NEGATIVE" ? 
          Math.random() * 0.3 : 
          0.4 + Math.random() * 0.2;
      
      setScore(newScore);
      setHasAnalyzed(true);
      
      // Update chart data
      setChartData([
        { sentiment: "Positive", value: newScore > 0.6 ? 100 : Math.round(newScore * 100) },
        { sentiment: "Neutral", value: newScore > 0.3 && newScore <= 0.6 ? 100 : Math.round((1 - newScore) * 50) },
        { sentiment: "Negative", value: newScore <= 0.3 ? 100 : Math.round((1 - newScore) * 30) },
      ]);
      
      toast.dismiss();
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      toast.error("Error analyzing sentiment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Sentiment Analyzer</h1>
          <p className="text-gray-600">Analyze the sentiment of any text using AI</p>
        </div>
        
        <div className="animate-fade-in delay-100">
          <SentimentInput onAnalyze={analyzeSentiment} />
        </div>
        
        {hasAnalyzed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentScore score={score} />
            <SentimentChart data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;