import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '../utils/dataProcessors';
import { ChartCard } from './ChartCard';
import type { Transaction } from '../types';

interface TopServicesChartProps {
  transactions: Transaction[];
}

const COLORS = ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e'];

export function TopServicesChart({ transactions }: TopServicesChartProps) {
  const serviceMap = new Map<string, { count: number; total: number }>();

  transactions
    .filter((t) => t.tipo === 'Ingreso' && (t.servicio || t.categoria))
    .forEach((t) => {
      const service = t.servicio || t.categoria;
      if (!serviceMap.has(service)) {
        serviceMap.set(service, { count: 0, total: 0 });
      }
      const stats = serviceMap.get(service)!;
      stats.count += 1;
      stats.total += t.monto;
    });

  const data = Array.from(serviceMap.entries())
    .map(([servicio, stats]) => ({
      servicio,
      cantidad: stats.count,
      total: stats.total,
      promedio: stats.total / stats.count,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <ChartCard title="Top Servicios Rentables" accent="gold">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#374151' }}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <YAxis
            dataKey="servicio"
            type="category"
            tick={{ fill: '#e5e7eb', fontSize: 13, fontWeight: 500 }}
            width={120}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              border: '1px solid rgba(75, 85, 99, 0.4)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
            }}
            itemStyle={{ color: '#fbbf24' }}
            labelStyle={{ color: '#e5e7eb', marginBottom: '8px', fontWeight: 'bold' }}
          />
          <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={32}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-3">
        {data.map((item, index) => (
          <div key={item.servicio} className="flex items-center justify-between text-sm group hover:bg-white/5 p-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${index === 0 ? 'bg-barber-gold text-black' : 'bg-gray-800 text-gray-400'}`}>
                {index + 1}
              </span>
              <span className="text-gray-300 font-medium">{item.servicio}</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-barber-gold">{formatCurrency(item.total)}</p>
              <p className="text-xs text-gray-500">{item.cantidad} cortes realizados</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
