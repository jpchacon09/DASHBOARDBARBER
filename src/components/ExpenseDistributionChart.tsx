import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/dataProcessors';
import { ChartCard } from './ChartCard';
import type { CategoryExpense } from '../types';

interface ExpenseDistributionChartProps {
  data: CategoryExpense[];
  title: string;
}

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6'];

export function ExpenseDistributionChart({ data, title }: ExpenseDistributionChartProps) {
  return (
    <ChartCard title={title.replace('Distribución de ', '')} accent="red">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            dataKey="total"
            paddingAngle={5}
          >
            {data.map((_item, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="rgba(0,0,0,0.5)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              border: '1px solid rgba(75, 85, 99, 0.4)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
            }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div key={item.categoria} className="flex items-center justify-between text-sm group hover:bg-white/5 p-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ backgroundColor: COLORS[index % COLORS.length], boxShadow: `0 0 10px ${COLORS[index % COLORS.length]}80` }}
              />
              <span className="text-gray-300 font-medium">{item.categoria}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-white block">{formatCurrency(item.total)}</span>
              <span className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
