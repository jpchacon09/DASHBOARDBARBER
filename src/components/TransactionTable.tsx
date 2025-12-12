import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../utils/dataProcessors';
import type { Transaction } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
  maxRows?: number;
}

export function TransactionTable({ transactions, maxRows = 10 }: TransactionTableProps) {
  const displayTransactions = transactions.slice(0, maxRows);

  return (
    <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl p-6 border border-gray-800 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-3">
          <span className="w-1 h-6 bg-barber-gold rounded-full"></span>
          Últimas Transacciones ({transactions.length})
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">Fecha</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">Tipo</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">Barbero</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">Categoría</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">Descripción</th>
              <th className="text-right py-4 px-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {displayTransactions.map((transaction, index) => (
              <tr
                key={index}
                className="group hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-2 text-sm text-gray-300 font-medium whitespace-nowrap">{transaction.fecha}</td>
                <td className="py-4 px-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${transaction.tipo === 'Ingreso'
                        ? 'bg-green-500/10 text-green-400 border-green-500/20 group-hover:border-green-500/40'
                        : 'bg-red-500/10 text-red-400 border-red-500/20 group-hover:border-red-500/40'
                      } transition-colors`}
                  >
                    {transaction.tipo === 'Ingreso' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {transaction.tipo}
                  </span>
                </td>
                <td className="py-4 px-2 text-sm text-gray-300">
                  {transaction.barbero ? (
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                        {transaction.barbero.charAt(0)}
                      </span>
                      {transaction.barbero}
                    </span>
                  ) : <span className="text-gray-600">-</span>}
                </td>
                <td className="py-4 px-2 text-sm text-gray-400">{transaction.categoria}</td>
                <td className="py-4 px-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                  {transaction.descripcion || transaction.servicio || '-'}
                </td>
                <td
                  className={`py-4 px-2 text-sm font-bold text-right font-mono ${transaction.tipo === 'Ingreso' ? 'text-green-400' : 'text-red-400'
                    }`}
                >
                  {transaction.tipo === 'Gasto' && '-'}{formatCurrency(transaction.monto)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
