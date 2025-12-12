import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/dataProcessors';
import { ChartCard } from './ChartCard';
import type { BarberStats } from '../types';

interface BarberIncomeChartProps {
  data: BarberStats[];
}

export function BarberIncomeChart({ data }: BarberIncomeChartProps) {
  return (
    <ChartCard title="Ingresos por Barbero" accent="red">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis
            dataKey="barbero"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#374151' }}
          />
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            axisLine={{ stroke: '#374151' }}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '12px',
              color: '#f3f4f6'
            }}
            labelStyle={{ color: '#f3f4f6', fontWeight: 'bold' }}
          />
          <Legend
            wrapperStyle={{ color: '#9ca3af' }}
            iconType="circle"
          />
          <Bar
            dataKey="totalIngresos"
            fill="url(#colorIngresos)"
            name="Total Ingresos"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="promedio"
            fill="url(#colorPromedio)"
            name="Promedio por Servicio"
            radius={[8, 8, 0, 0]}
          />
          <defs>
            <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#b91c1c" stopOpacity={0.7}/>
            </linearGradient>
            <linearGradient id="colorPromedio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.7}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((barber, index) => (
          <div
            key={barber.barbero}
            className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-barber-red/50 transition-all group"
          >
            <div className="absolute top-2 right-2 text-3xl font-black text-gray-800/20">#{index + 1}</div>
            <p className="font-bold text-white text-lg mb-1">{barber.barbero}</p>
            <p className="text-sm text-gray-400 mb-2">{barber.servicios} servicios</p>
            <p className="text-2xl font-black text-barber-gold">{formatCurrency(barber.totalIngresos)}</p>
            <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-barber-red to-barber-gold rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((barber.totalIngresos / Math.max(...data.map(d => d.totalIngresos))) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
