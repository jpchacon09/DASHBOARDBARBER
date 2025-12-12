import { useState } from 'react';
import { Search, Filter, X, Calendar, User, DollarSign, Tag } from 'lucide-react';
import type { FilterOptions, Transaction } from '../types';

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  barberos: string[];
  categorias: string[];
  transactions: Transaction[];
}

export function AdvancedFilters({ onFilterChange, barberos, categorias }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    tipo: 'Todos',
  });

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterOptions = { tipo: 'Todos' };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== '' && value !== 'Todos'
  );

  return (
    <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-xl border border-gray-800 shadow-xl mb-6 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-gray-300 hover:text-white font-semibold transition-colors w-full"
        >
          <div className="p-2 bg-barber-gold/10 rounded-lg">
            <Filter className="w-5 h-5 text-barber-gold" />
          </div>
          <span className="uppercase tracking-wide text-sm">Filtros Avanzados</span>
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-barber-gold text-black text-xs font-bold rounded-full">
              Activos
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tipo de transacción */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <Search className="w-3 h-3" />
                Tipo
              </label>
              <div className="relative">
                <select
                  value={filters.tipo || 'Todos'}
                  onChange={(e) => handleFilterChange('tipo', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-barber-gold/50 focus:border-barber-gold/50 appearance-none transition-all hover:bg-gray-800"
                >
                  <option value="Todos">Todos</option>
                  <option value="Ingreso">Ingresos</option>
                  <option value="Gasto">Gastos</option>
                </select>
              </div>
            </div>

            {/* Barbero */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <User className="w-3 h-3" />
                Barbero
              </label>
              <select
                value={filters.barbero || ''}
                onChange={(e) => handleFilterChange('barbero', e.target.value || undefined)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-barber-gold/50 focus:border-barber-gold/50 appearance-none transition-all hover:bg-gray-800"
              >
                <option value="">Todos</option>
                {barberos.map((barbero) => (
                  <option key={barbero} value={barbero}>
                    {barbero}
                  </option>
                ))}
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <Tag className="w-3 h-3" />
                Categoría
              </label>
              <select
                value={filters.categoria || ''}
                onChange={(e) => handleFilterChange('categoria', e.target.value || undefined)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-barber-gold/50 focus:border-barber-gold/50 appearance-none transition-all hover:bg-gray-800"
              >
                <option value="">Todas</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha inicio */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <Calendar className="w-3 h-3" />
                Fecha Inicio
              </label>
              <input
                type="date"
                value={filters.fechaInicio || ''}
                onChange={(e) => handleFilterChange('fechaInicio', e.target.value || undefined)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-barber-gold/50 focus:border-barber-gold/50 transition-all hover:bg-gray-800 color-scheme-dark"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {/* Fecha fin */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <Calendar className="w-3 h-3" />
                Fecha Fin
              </label>
              <input
                type="date"
                value={filters.fechaFin || ''}
                onChange={(e) => handleFilterChange('fechaFin', e.target.value || undefined)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-barber-gold/50 focus:border-barber-gold/50 transition-all hover:bg-gray-800"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {/* Monto mínimo */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <DollarSign className="w-3 h-3" />
                Monto Mínimo
              </label>
              <input
                type="number"
                value={filters.montoMin || ''}
                onChange={(e) =>
                  handleFilterChange('montoMin', e.target.value ? parseFloat(e.target.value) : undefined)
                }
                placeholder="0"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-barber-gold/50 focus:border-barber-gold/50 transition-all hover:bg-gray-800 placeholder-gray-600"
              />
            </div>

            {/* Monto máximo */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <DollarSign className="w-3 h-3" />
                Monto Máximo
              </label>
              <input
                type="number"
                value={filters.montoMax || ''}
                onChange={(e) =>
                  handleFilterChange('montoMax', e.target.value ? parseFloat(e.target.value) : undefined)
                }
                placeholder="∞"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-barber-gold/50 focus:border-barber-gold/50 transition-all hover:bg-gray-800 placeholder-gray-600"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end pt-4 border-t border-gray-800">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-6 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-lg transition-colors border border-red-500/30"
              >
                <X className="w-4 h-4" />
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
