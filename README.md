# Dashboard Profesional para Barbería

Dashboard moderno y profesional conectado a Google Sheets para gestión de ingresos y gastos de tu barbería.

## Características

### Visualizaciones en Tiempo Real
- 📊 **Resumen Diario**: Ingresos, gastos, balance y margen del día
- 💇 **Ingresos por Barbero**: Estadísticas individuales de cada barbero
- 📈 **Tendencias Diarias**: Gráfico de ingresos y gastos por día
- 📅 **Análisis Semanal**: Ingresos por día de la semana
- 🎯 **Top Servicios**: Los servicios más rentables
- 🥧 **Distribución**: Gráficos de distribución de gastos e ingresos

### Funcionalidades
- 🔄 **Actualización Automática**: Cada 30 segundos sincroniza con Google Sheets
- 🔍 **Filtros Avanzados**: Por fecha, barbero, categoría, tipo y monto
- 📥 **Exportación**: Descarga datos en formato CSV
- 📱 **Responsive**: Funciona en desktop, tablet y móvil
- ⚡ **Rápido**: Interfaz optimizada con caché inteligente

## Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Google Sheets API

#### Paso 1: Crear proyecto en Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. En el menú lateral, ve a **APIs y servicios > Biblioteca**
4. Busca "Google Sheets API" y habilítala

#### Paso 2: Crear API Key
1. Ve a **APIs y servicios > Credenciales**
2. Haz clic en **+ CREAR CREDENCIALES**
3. Selecciona **Clave de API**
4. Copia la clave generada

#### Paso 3: Configurar restricciones (Recomendado)
1. Haz clic en la clave recién creada
2. En **Restricciones de la aplicación**, selecciona **Referentes HTTP**
3. Añade tu dominio: `http://localhost:5173/*` (desarrollo)
4. En **Restricciones de la API**, selecciona **Restringir clave**
5. Selecciona **Google Sheets API**
6. Guarda

### 3. Configurar el proyecto

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` y añade tu API key:

```env
VITE_GOOGLE_API_KEY=tu_api_key_aqui
```

### 4. Configurar tu Google Sheet

#### Opción A: Usar el Sheet existente
El proyecto ya está configurado para usar tu sheet:
`https://docs.google.com/spreadsheets/d/1bs6Keuy9pbcDvunVM15SzSlVKVEDwGVuKwy6HQqN2a0`

Asegúrate de que el sheet sea **público** o **accesible con el enlace**:
1. Abre tu Google Sheet
2. Haz clic en **Compartir**
3. En **Acceso general**, selecciona **Cualquier persona con el enlace**
4. Permisos: **Lector**

#### Opción B: Usar otro Sheet
Si quieres usar otro spreadsheet, edita el archivo `src/services/googleSheets.ts` línea 4.

### 5. Estructura esperada del Google Sheet

El dashboard espera las siguientes columnas (el orden puede variar):

| Fecha | Tipo | Barbero | Monto | Categoría | Descripción | Servicio |
|-------|------|---------|-------|-----------|-------------|----------|
| 2024-12-01 | Ingreso | Juan Pérez | 35000 | Corte | Corte + Barba | Corte Premium |
| 2024-12-01 | Gasto | - | 50000 | Insumos | Productos | - |

**Columnas importantes:**
- **Fecha**: Formato YYYY-MM-DD o DD/MM/YYYY
- **Tipo**: "Ingreso" o "Gasto"
- **Barbero**: Nombre del barbero (solo para ingresos)
- **Monto**: Número sin formato (ej: 35000)
- **Categoría**: Tipo de servicio o gasto
- **Descripción/Servicio**: Detalles adicionales

### 6. Iniciar el proyecto

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Modo de Desarrollo (Sin API Key)

Si no tienes una API key configurada, el dashboard usará datos de ejemplo automáticamente. Esto es útil para:
- Probar la interfaz
- Desarrollo
- Demostración

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Despliegue

### Vercel (Recomendado)
1. Sube tu proyecto a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Añade las variables de entorno en Vercel:
   - `VITE_GOOGLE_API_KEY`
4. Deploy

### Netlify
1. Sube tu proyecto a GitHub
2. Conecta con [Netlify](https://netlify.com)
3. Añade las variables de entorno
4. Deploy

## Personalización

### Cambiar colores
Edita `tailwind.config.js` para personalizar los colores del dashboard.

### Ajustar intervalo de actualización
En `src/App.tsx` línea 27, cambia el valor de `refreshInterval`:

```typescript
const { data, loading, error } = useGoogleSheets(true, 30000); // 30 segundos
```

### Añadir nuevos gráficos
1. Crea un componente en `src/components/`
2. Importa y usa en `src/App.tsx`
3. Usa los procesadores de datos en `src/utils/dataProcessors.ts`

## Integración con n8n

Tu configuración actual de n8n que añade filas al Google Sheet funcionará perfectamente. El dashboard:
- ✅ Detecta automáticamente nuevas filas
- ✅ Actualiza los gráficos cada 30 segundos
- ✅ Mantiene caché para mejor rendimiento
- ✅ Maneja errores de conexión

## Soporte

Si encuentras problemas:
1. Verifica que la API key esté correctamente configurada
2. Asegúrate de que el Google Sheet sea público
3. Revisa la consola del navegador para errores
4. Verifica que los nombres de columnas coincidan

## Tecnologías

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Recharts** - Gráficos
- **Lucide React** - Iconos
- **date-fns** - Manejo de fechas
- **Axios** - HTTP client

## Licencia

MIT

---

Desarrollado para gestión profesional de barberías 💈
