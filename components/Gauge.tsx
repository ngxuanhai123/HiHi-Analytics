import React from 'react';

interface GaugeProps {
  score: number;
  label: string;
  delay?: number;
}

const Gauge: React.FC<GaugeProps> = ({ score, label, delay = 0 }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = "text-green-500";
  if (score < 50) colorClass = "text-red-500";
  else if (score < 90) colorClass = "text-orange-500";

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-24 h-24">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-700"
          />
          {/* Progress Circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000 ease-out`}
            style={{ 
              transitionDelay: `${delay}ms`,
            }}
          />
        </svg>
        {/* Score Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colorClass}`}>
            {score}
          </span>
        </div>
      </div>
      <span className="mt-3 text-sm font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

export default Gauge;