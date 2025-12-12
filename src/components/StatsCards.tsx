import { TrendingUp, Users, Scissors, Target } from 'lucide-react';
import { formatCurrency } from '../utils/dataProcessors';
import type { Transaction } from '../types';

interface StatsCardsProps {
  transactions: Transaction[];
}

export function StatsCards({ transactions }: StatsCardsProps) {
  const ingresos = transactions.filter((t) => t.tipo === 'Ingreso');
  const totalIngresos = ingresos.reduce((sum, t) => sum + t.monto, 0);
  const totalGastos = transactions
    .filter((t) => t.tipo === 'Gasto')
    .reduce((sum, t) => sum + t.monto, 0);

  const serviciosRealizados = ingresos.length;
  const barberos = new Set(ingresos.map((t) => t.barbero).filter(Boolean)).size;
  const promedioServicio = serviciosRealizados > 0 ? totalIngresos / serviciosRealizados : 0;
  const margenBruto = totalIngresos > 0 ? ((totalIngresos - totalGastos) / totalIngresos) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Promedio Servicio</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
              <TrendingUp className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-display tracking-wide">{formatCurrency(promedioServicio)}</p>
          <p className="text-xs text-blue-400/80 mt-1 font-medium">{serviciosRealizados} servicios totales</p>
        </div>
      </div>

      <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Barberos Activos</h3>
            <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all">
              <Users className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-display tracking-wide">{barberos}</p>
          <p className="text-xs text-purple-400/80 mt-1 font-medium">Profesionales en turno</p>
        </div>
      </div>

      <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Servicios</h3>
            <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-all">
              <Scissors className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-display tracking-wide">{serviciosRealizados}</p>
          <p className="text-xs text-green-400/80 mt-1 font-medium">Cortes finalizados</p>
        </div>
      </div>

      <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-barber-gold/30 hover:border-barber-gold/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-24 h-24 bg-barber-gold/10 rounded-full blur-2xl group-hover:bg-barber-gold/20 transition-all"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Margen Bruto</h3>
            <div className="p-2 bg-barber-gold/10 rounded-lg group-hover:bg-barber-gold/20 transition-all">
              <Target className="w-5 h-5 text-barber-gold group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-display tracking-wide">{margenBruto.toFixed(1)}%</p>
          <p className="text-xs text-barber-gold/80 mt-1 font-medium">Rentabilidad operativa</p>
        </div>
      </div>
    </div>
  );
}
