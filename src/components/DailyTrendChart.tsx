import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { formatCurrency } from '../utils/dataProcessors';
import { ChartCard } from './ChartCard';
import type { DailySummary } from '../types';

interface DailyTrendChartProps {
  data: DailySummary[];
}

export function DailyTrendChart({ data }: DailyTrendChartProps) {
  return (
    <ChartCard title="Tendencia de Rendimiento" accent="blue">
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
          <XAxis
            dataKey="fecha"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#374151' }}
            tickLine={false}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
            dy={10}
          />
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip
            itemStyle={{ color: '#fff' }}
            cursor={{ stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '5 5' }}
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              border: '1px solid rgba(75, 85, 99, 0.4)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
            }}
            labelStyle={{ color: '#e5e7eb', marginBottom: '8px', fontWeight: 600 }}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
          <Area
            type="monotone"
            dataKey="ingresos"
            fill="url(#colorIngresos)"
            stroke="#10b981"
            name="Ingresos Totales"
            strokeWidth={2}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="gastos"
            fill="url(#colorGastos)"
            stroke="#ef4444"
            name="Gastos Operativos"
            strokeWidth={2}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="neto"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Balance Neto"
            dot={false}
            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#1f2937', strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
