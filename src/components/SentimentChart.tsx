import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const SentimentChart = ({ data }: { data: Array<{ sentiment: string; value: number }> }) => {
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })));

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepValues = data.map(d => d.value / steps);
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setAnimatedData(prev => 
        prev.map((d, i) => ({
          ...d,
          value: currentStep === steps ? data[i].value : d.value + stepValues[i]
        }))
      );

      if (currentStep === steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="glass-card p-6 rounded-xl h-[400px] animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Sentiment Analysis</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={animatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sentiment" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};