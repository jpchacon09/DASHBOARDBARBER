import { useState, useMemo } from 'react';
import { RefreshCw, Download, AlertCircle } from 'lucide-react';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import {
  getTodaySummary,
  getDailySummaries,
  getBarberStats,
  getCategoryExpenses,
  getCategoryIncome,
  getDayOfWeekStats,
  filterTransactions,
  getUniqueValues,
} from './utils/dataProcessors';
import { DailySummaryCard } from './components/DailySummaryCard';
import { BarberIncomeChart } from './components/BarberIncomeChart';
import { DailyTrendChart } from './components/DailyTrendChart';
import { DayOfWeekChart } from './components/DayOfWeekChart';
import { ExpenseDistributionChart } from './components/ExpenseDistributionChart';
import { AdvancedFilters } from './components/AdvancedFilters';
import { TransactionTable } from './components/TransactionTable';
import { StatsCards } from './components/StatsCards';
import { TopServicesChart } from './components/TopServicesChart';
import type { FilterOptions } from './types';

function App() {
  const { data, loading, error, lastUpdate, refresh } = useGoogleSheets(true, 30000);
  const [filters, setFilters] = useState<FilterOptions>({ tipo: 'Todos' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredData = useMemo(() => filterTransactions(data, filters), [data, filters]);

  const todaySummary = useMemo(() => getTodaySummary(data), [data]);
  const dailySummaries = useMemo(() => getDailySummaries(filteredData), [filteredData]);
  const barberStats = useMemo(() => getBarberStats(filteredData), [filteredData]);
  const expenseDistribution = useMemo(() => getCategoryExpenses(filteredData), [filteredData]);
  const incomeDistribution = useMemo(() => getCategoryIncome(filteredData), [filteredData]);
  const dayOfWeekStats = useMemo(() => getDayOfWeekStats(filteredData), [filteredData]);

  const barberos = useMemo(() => getUniqueValues(data, 'barbero'), [data]);
  const categorias = useMemo(() => getUniqueValues(data, 'categoria'), [data]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const exportData = () => {
    const csv = [
      ['Fecha', 'Tipo', 'Barbero', 'Monto', 'Categoría', 'Descripción'].join(','),
      ...filteredData.map((t) =>
        [
          t.fecha,
          t.tipo,
          t.barbero || '',
          t.monto,
          t.categoria,
          t.descripcion || t.servicio || '',
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barberia-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading && data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-barber-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 bg-barber-card rounded-2xl p-6 shadow-barber-lg border border-barber-red/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-6xl font-bold text-barber-white mb-2 tracking-wider">
                💈 BARBERÍA DASHBOARD
              </h1>
              <p className="text-barber-silver text-sm">
                Última actualización:{' '}
                <span className="text-barber-gold font-semibold">
                  {lastUpdate ? lastUpdate.toLocaleString('es-CO') : 'Nunca'}
                </span>
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-6 py-3 bg-barber-red-gradient hover:shadow-barber disabled:opacity-50 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'ACTUALIZANDO...' : 'ACTUALIZAR'}
              </button>
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-6 py-3 bg-barber-gold-gradient hover:shadow-barber-gold text-barber-black rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <Download className="w-5 h-5" />
                EXPORTAR
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-semibold text-red-800">Error al cargar los datos</p>
              <p className="text-sm text-red-600">{error}</p>
              <p className="text-xs text-red-500 mt-1">
                Usando datos de ejemplo. Configura tu API key en el archivo .env
              </p>
            </div>
          </div>
        )}

        {/* Resumen Diario */}
        <DailySummaryCard summary={todaySummary} />

        {/* Estadísticas Generales */}
        <StatsCards transactions={filteredData} />

        {/* Filtros Avanzados */}
        <AdvancedFilters
          onFilterChange={setFilters}
          barberos={barberos}
          categorias={categorias}
          transactions={data}
        />

        {/* Gráficos - Primera Fila */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BarberIncomeChart data={barberStats} />
          <DailyTrendChart data={dailySummaries} />
        </div>

        {/* Gráficos - Segunda Fila */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DayOfWeekChart data={dayOfWeekStats} />
          <TopServicesChart transactions={filteredData} />
        </div>

        {/* Gráficos de Distribución */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {expenseDistribution.length > 0 && (
            <ExpenseDistributionChart data={expenseDistribution} title="Distribución de Gastos" />
          )}
          {incomeDistribution.length > 0 && (
            <ExpenseDistributionChart data={incomeDistribution} title="Distribución de Ingresos" />
          )}
        </div>

        {/* Tabla de Transacciones */}
        <TransactionTable transactions={filteredData} maxRows={20} />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Dashboard conectado a Google Sheets - Actualización automática cada 30 segundos
          </p>
          <p className="mt-1">
            Total de registros: {filteredData.length} de {data.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
