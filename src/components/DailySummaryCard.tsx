import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { formatCurrency } from '../utils/dataProcessors';
import type { DailySummary } from '../types';

interface DailySummaryCardProps {
  summary: DailySummary;
}

export function DailySummaryCard({ summary }: DailySummaryCardProps) {
  const isPositive = summary.neto >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Ingresos */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Ingresos Hoy</span>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-4xl font-black text-white mb-2 font-display tracking-tight">{formatCurrency(summary.ingresos)}</p>
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-green-500/30 rounded-full">
              <div className="h-full w-2/3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400">Total</span>
          </div>
        </div>
      </div>

      {/* Gastos */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-red-500/30 hover:border-red-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Gastos Hoy</span>
            <div className="p-2 bg-red-500/10 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
          </div>
          <p className="text-4xl font-black text-white mb-2 font-display tracking-tight">{formatCurrency(summary.gastos)}</p>
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-red-500/30 rounded-full">
              <div className="h-full w-2/3 bg-red-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400">Total</span>
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className={`group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border ${isPositive ? 'border-blue-500/30 hover:border-blue-500/60' : 'border-orange-500/30 hover:border-orange-500/60'} transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]`}>
        <div className={`absolute top-0 right-0 w-32 h-32 ${isPositive ? 'bg-blue-500/5' : 'bg-orange-500/5'} rounded-full blur-3xl group-hover:${isPositive ? 'bg-blue-500/10' : 'bg-orange-500/10'} transition-all`}></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className={`${isPositive ? 'text-blue-400' : 'text-orange-400'} text-xs font-bold uppercase tracking-wider`}>Balance Neto</span>
            <div className={`p-2 ${isPositive ? 'bg-blue-500/10' : 'bg-orange-500/10'} rounded-lg`}>
              <Activity className={`w-5 h-5 ${isPositive ? 'text-blue-400' : 'text-orange-400'}`} />
            </div>
          </div>
          <p className="text-4xl font-black text-white mb-2 font-display tracking-tight">{formatCurrency(summary.neto)}</p>
          <div className="flex items-center gap-2">
            <div className={`h-1 w-12 ${isPositive ? 'bg-blue-500/30' : 'bg-orange-500/30'} rounded-full`}>
              <div className={`h-full w-2/3 ${isPositive ? 'bg-blue-500' : 'bg-orange-500'} rounded-full`}></div>
            </div>
            <span className="text-xs text-gray-400">{isPositive ? 'Ganancia' : 'Pérdida'}</span>
          </div>
        </div>
      </div>

      {/* Margen */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-all"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Margen</span>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="text-4xl font-black text-white mb-2 font-display tracking-tight">
            {summary.ingresos > 0
              ? `${((summary.neto / summary.ingresos) * 100).toFixed(1)}%`
              : '0%'}
          </p>
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-yellow-500/30 rounded-full">
              <div className="h-full w-2/3 bg-yellow-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400">Rentabilidad</span>
          </div>
        </div>
      </div>
    </div>
  );
}
