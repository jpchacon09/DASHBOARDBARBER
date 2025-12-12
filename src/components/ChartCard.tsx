import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  accent?: 'red' | 'gold' | 'blue' | 'green' | 'purple';
}

const accentColors = {
  red: 'border-red-500/30 hover:border-red-500/50',
  gold: 'border-yellow-500/30 hover:border-yellow-500/50',
  blue: 'border-blue-500/30 hover:border-blue-500/50',
  green: 'border-green-500/30 hover:border-green-500/50',
  purple: 'border-purple-500/30 hover:border-purple-500/50',
};

const accentGlow = {
  red: 'group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]',
  gold: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]',
  blue: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
  green: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]',
  purple: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
};

export function ChartCard({ title, children, accent = 'red' }: ChartCardProps) {
  return (
    <div className={`group relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl p-6 border ${accentColors[accent]} transition-all duration-300 backdrop-blur-sm ${accentGlow[accent]}`}>
      {/* Decorative corner */}
      <div className="absolute top-0 left-0 w-2 h-16 bg-gradient-to-b from-barber-red/50 to-transparent rounded-tl-2xl"></div>
      <div className="absolute top-0 left-0 w-16 h-2 bg-gradient-to-r from-barber-red/50 to-transparent rounded-tl-2xl"></div>

      {/* Title */}
      <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-3">
        <span className="w-1 h-6 bg-barber-red rounded-full"></span>
        {title}
      </h2>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
