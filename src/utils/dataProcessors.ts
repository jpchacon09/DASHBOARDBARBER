import { format, parseISO, isToday, isWithinInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import type {
  Transaction,
  DailySummary,
  BarberStats,
  CategoryExpense,
  DayOfWeekStats,
  FilterOptions,
} from '../types';

export function filterTransactions(
  transactions: Transaction[],
  filters: FilterOptions
): Transaction[] {
  return transactions.filter((t) => {
    if (filters.fechaInicio && filters.fechaFin) {
      try {
        const transactionDate = parseISO(t.fecha);
        const start = parseISO(filters.fechaInicio);
        const end = parseISO(filters.fechaFin);

        if (!isWithinInterval(transactionDate, { start, end })) {
          return false;
        }
      } catch (e) {
        return false;
      }
    }

    if (filters.barbero && t.barbero !== filters.barbero) {
      return false;
    }

    if (filters.tipo && filters.tipo !== 'Todos' && t.tipo !== filters.tipo) {
      return false;
    }

    if (filters.categoria && t.categoria !== filters.categoria) {
      return false;
    }

    if (filters.montoMin !== undefined && t.monto < filters.montoMin) {
      return false;
    }

    if (filters.montoMax !== undefined && t.monto > filters.montoMax) {
      return false;
    }

    return true;
  });
}

export function getTodaySummary(transactions: Transaction[]): DailySummary {
  const today = transactions.filter((t) => {
    try {
      return isToday(parseISO(t.fecha));
    } catch {
      return false;
    }
  });

  const ingresos = today
    .filter((t) => t.tipo === 'Ingreso')
    .reduce((sum, t) => sum + t.monto, 0);

  const gastos = today
    .filter((t) => t.tipo === 'Gasto')
    .reduce((sum, t) => sum + t.monto, 0);

  return {
    fecha: format(new Date(), 'yyyy-MM-dd'),
    ingresos,
    gastos,
    neto: ingresos - gastos,
  };
}

export function getDailySummaries(transactions: Transaction[]): DailySummary[] {
  const summaryMap = new Map<string, DailySummary>();

  transactions.forEach((t) => {
    const fecha = t.fecha;

    if (!summaryMap.has(fecha)) {
      summaryMap.set(fecha, {
        fecha,
        ingresos: 0,
        gastos: 0,
        neto: 0,
      });
    }

    const summary = summaryMap.get(fecha)!;

    if (t.tipo === 'Ingreso') {
      summary.ingresos += t.monto;
    } else {
      summary.gastos += t.monto;
    }

    summary.neto = summary.ingresos - summary.gastos;
  });

  return Array.from(summaryMap.values()).sort((a, b) => a.fecha.localeCompare(b.fecha));
}

export function getBarberStats(transactions: Transaction[]): BarberStats[] {
  const statsMap = new Map<string, BarberStats>();

  transactions
    .filter((t) => t.tipo === 'Ingreso' && t.barbero)
    .forEach((t) => {
      const barbero = t.barbero!;

      if (!statsMap.has(barbero)) {
        statsMap.set(barbero, {
          barbero,
          totalIngresos: 0,
          servicios: 0,
          promedio: 0,
        });
      }

      const stats = statsMap.get(barbero)!;
      stats.totalIngresos += t.monto;
      stats.servicios += 1;
    });

  const result = Array.from(statsMap.values());
  result.forEach((stat) => {
    stat.promedio = stat.totalIngresos / stat.servicios;
  });

  return result.sort((a, b) => b.totalIngresos - a.totalIngresos);
}

export function getCategoryExpenses(transactions: Transaction[]): CategoryExpense[] {
  const expenseMap = new Map<string, number>();

  const gastos = transactions.filter((t) => t.tipo === 'Gasto');
  const total = gastos.reduce((sum, t) => sum + t.monto, 0);

  gastos.forEach((t) => {
    const categoria = t.categoria || 'Sin categoría';
    expenseMap.set(categoria, (expenseMap.get(categoria) || 0) + t.monto);
  });

  const result = Array.from(expenseMap.entries()).map(([categoria, amount]) => ({
    categoria,
    total: amount,
    percentage: (amount / total) * 100,
  }));

  return result.sort((a, b) => b.total - a.total);
}

export function getCategoryIncome(transactions: Transaction[]): CategoryExpense[] {
  const incomeMap = new Map<string, number>();

  const ingresos = transactions.filter((t) => t.tipo === 'Ingreso');
  const total = ingresos.reduce((sum, t) => sum + t.monto, 0);

  ingresos.forEach((t) => {
    const categoria = t.categoria || t.servicio || 'Sin categoría';
    incomeMap.set(categoria, (incomeMap.get(categoria) || 0) + t.monto);
  });

  const result = Array.from(incomeMap.entries()).map(([categoria, amount]) => ({
    categoria,
    total: amount,
    percentage: (amount / total) * 100,
  }));

  return result.sort((a, b) => b.total - a.total);
}

export function getDayOfWeekStats(transactions: Transaction[]): DayOfWeekStats[] {
  const daysMap = new Map<string, { ingresos: number; servicios: number }>();

  const dayOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  transactions
    .filter((t) => t.tipo === 'Ingreso')
    .forEach((t) => {
      try {
        const date = parseISO(t.fecha);
        const dayName = format(date, 'EEEE', { locale: es });
        const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

        if (!daysMap.has(capitalizedDay)) {
          daysMap.set(capitalizedDay, { ingresos: 0, servicios: 0 });
        }

        const stats = daysMap.get(capitalizedDay)!;
        stats.ingresos += t.monto;
        stats.servicios += 1;
      } catch (e) {
        console.error('Error parsing date:', t.fecha);
      }
    });

  const result = dayOrder.map((dia) => ({
    dia,
    ingresos: daysMap.get(dia)?.ingresos || 0,
    servicios: daysMap.get(dia)?.servicios || 0,
  }));

  return result;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getUniqueValues<T extends keyof Transaction>(
  transactions: Transaction[],
  field: T
): string[] {
  const values = new Set<string>();

  transactions.forEach((t) => {
    const value = t[field];
    if (value && typeof value === 'string') {
      values.add(value);
    }
  });

  return Array.from(values).sort();
}
