import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/dataProcessors';
import { ChartCard } from './ChartCard';
import type { DayOfWeekStats } from '../types';

interface DayOfWeekChartProps {
  data: DayOfWeekStats[];
}

export function DayOfWeekChart({ data }: DayOfWeekChartProps) {
  const bestDay = data.reduce((max, day) => day.ingresos > max.ingresos ? day : max);
  const totalServices = data.reduce((sum, day) => sum + day.servicios, 0);

  return (
    <ChartCard title="Rendimiento Semanal" accent="purple">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIngresosPurple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
          <XAxis
            dataKey="dia"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#374151' }}
            tickLine={false}
            tickFormatter={(value) => value.substring(0, 3)}
            dy={10}
          />
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              border: '1px solid rgba(75, 85, 99, 0.4)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
            }}
            itemStyle={{ color: '#c4b5fd' }}
            labelStyle={{ color: '#e5e7eb', marginBottom: '8px', fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
          <Bar
            dataKey="ingresos"
            fill="url(#colorIngresosPurple)"
            name="Ingresos Totales"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          <span className="text-gray-400">Mejor día:</span>
          <span className="font-bold text-white uppercase">{bestDay.dia}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500/50"></span>
          <span className="text-gray-400">Servicios:</span>
          <span className="font-bold text-white">{totalServices}</span>
        </div>
      </div>
    </ChartCard>
  );
}
