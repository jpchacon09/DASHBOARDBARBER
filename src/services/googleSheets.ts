import axios from 'axios';
import type { Transaction } from '../types';

const SPREADSHEET_ID = '1bs6Keuy9pbcDvunVM15SzSlVKVEDwGVuKwy6HQqN2a0';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
const RANGE = 'DATA!A:Z'; // Hoja DATA con todas las columnas

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private cache: Transaction[] = [];
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 30000; // 30 segundos

  private constructor() {}

  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  async fetchData(forceRefresh = false): Promise<Transaction[]> {
    const now = Date.now();

    // Retornar cache si es válido y no es forzado
    if (!forceRefresh && this.cache.length > 0 && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.cache;
    }

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      const response = await axios.get(url);

      if (!response.data.values || response.data.values.length === 0) {
        return [];
      }

      const rows = response.data.values;
      const headers = rows[0];

      // Mapear los datos a la estructura Transaction
      const transactions: Transaction[] = rows.slice(1).map((row: any[]) => {
        const transaction: any = {};

        headers.forEach((header: string, index: number) => {
          const value = row[index];
          const headerLower = header.toLowerCase();

          if (headerLower.includes('fecha')) {
            transaction.fecha = value;
          } else if (headerLower.includes('tipo')) {
            // Normalizar tipo a formato esperado (Ingreso/Gasto)
            const tipoNormalizado = value?.toString().toLowerCase();
            if (tipoNormalizado?.includes('ingreso')) {
              transaction.tipo = 'Ingreso';
            } else if (tipoNormalizado?.includes('gasto')) {
              transaction.tipo = 'Gasto';
            } else {
              transaction.tipo = value;
            }
          } else if (headerLower.includes('barbero')) {
            transaction.barbero = value?.toString().trim();
          } else if (headerLower.includes('monto') || headerLower.includes('valor')) {
            transaction.monto = parseFloat(value?.toString().replace(/[^0-9.-]/g, '') || '0');
          } else if (headerLower.includes('categoria') || headerLower.includes('categoría')) {
            transaction.categoria = value;
          } else if (headerLower.includes('descripcion') || headerLower.includes('descripción') || headerLower.includes('observacion')) {
            transaction.descripcion = value;
          } else if (headerLower.includes('servicio')) {
            transaction.servicio = value;
          }
        });

        return transaction as Transaction;
      }).filter((t: Transaction) => t.fecha && t.monto); // Filtrar filas incompletas

      this.cache = transactions;
      this.lastFetch = now;

      return transactions;
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);

      // Si hay error pero tenemos cache, retornar cache
      if (this.cache.length > 0) {
        return this.cache;
      }

      throw error;
    }
  }

  clearCache() {
    this.cache = [];
    this.lastFetch = 0;
  }

  // Método para usar datos de prueba si no hay API key configurada
  async getMockData(): Promise<Transaction[]> {
    const mockData: Transaction[] = [
      {
        fecha: '2024-12-01',
        tipo: 'Ingreso',
        barbero: 'Juan Pérez',
        monto: 35000,
        categoria: 'Corte',
        servicio: 'Corte + Barba',
      },
      {
        fecha: '2024-12-01',
        tipo: 'Ingreso',
        barbero: 'Carlos López',
        monto: 25000,
        categoria: 'Corte',
        servicio: 'Corte Classic',
      },
      {
        fecha: '2024-12-01',
        tipo: 'Gasto',
        monto: 50000,
        categoria: 'Insumos',
        descripcion: 'Productos de peluquería',
      },
      {
        fecha: '2024-12-02',
        tipo: 'Ingreso',
        barbero: 'Juan Pérez',
        monto: 40000,
        categoria: 'Corte',
        servicio: 'Corte Premium',
      },
      {
        fecha: '2024-12-02',
        tipo: 'Gasto',
        monto: 30000,
        categoria: 'Servicios',
        descripcion: 'Luz y agua',
      },
    ];

    return mockData;
  }
}

export const sheetsService = GoogleSheetsService.getInstance();
