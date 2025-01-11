import { useEffect, useState } from "react";

export const SentimentScore = ({ score }: { score: number }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepValue = score / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setAnimatedScore((prev) => {
        const next = prev + stepValue;
        return currentStep === steps ? score : next;
      });

      if (currentStep === steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score]);

  const getColor = (score: number) => {
    if (score > 0.6) return "text-green-500";
    if (score > 0.3) return "text-blue-500";
    return "text-red-500";
  };

  return (
    <div className="glass-card p-6 rounded-xl animate-fade-in">
      <h3 className="text-lg font-semibold mb-2">Sentiment Score</h3>
      <div className={`text-4xl font-bold ${getColor(animatedScore)}`}>
        {(animatedScore * 100).toFixed(1)}%
      </div>
    </div>
  );
};