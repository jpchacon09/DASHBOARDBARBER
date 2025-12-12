# Estructura del Google Sheet

## 📋 Formato Esperado

Tu Google Sheet debe tener la siguiente estructura:

### Primera Fila (Encabezados):

```
Fecha | Tipo | Barbero | Monto | Categoría | Descripción | Servicio
```

### Datos de Ejemplo:

| Fecha | Tipo | Barbero | Monto | Categoría | Descripción | Servicio |
|-------|------|---------|-------|-----------|-------------|----------|
| 2024-12-01 | Ingreso | Juan Pérez | 35000 | Corte | Cliente nuevo | Corte + Barba |
| 2024-12-01 | Ingreso | Carlos López | 25000 | Corte | Cliente regular | Corte Classic |
| 2024-12-01 | Gasto | | 50000 | Insumos | Compra mensual | Productos de peluquería |
| 2024-12-02 | Ingreso | Juan Pérez | 40000 | Corte | Cliente VIP | Corte Premium |
| 2024-12-02 | Ingreso | María García | 30000 | Barba | Primera vez | Arreglo de Barba |
| 2024-12-02 | Gasto | | 30000 | Servicios | Pago mensual | Luz y agua |
| 2024-12-03 | Ingreso | Carlos López | 45000 | Corte | Fin de semana | Corte + Diseño |
| 2024-12-03 | Ingreso | Juan Pérez | 35000 | Corte | Regular | Corte Clásico |
| 2024-12-03 | Gasto | | 20000 | Insumos | Reposición | Navajas y tijeras |

## 📊 Descripción de las Columnas

### 1. Fecha (Obligatorio)
- **Formato recomendado**: YYYY-MM-DD (ej: 2024-12-11)
- **También acepta**: DD/MM/YYYY (ej: 11/12/2024)
- **Ejemplos válidos**:
  - 2024-12-11
  - 11/12/2024
  - 2024-12-01

### 2. Tipo (Obligatorio)
- **Valores válidos**:
  - `Ingreso` (con mayúscula)
  - `Gasto` (con mayúscula)
- **NO usar**: ingresos, gastos, INGRESO, etc.

### 3. Barbero (Opcional, recomendado para ingresos)
- Nombre del barbero que realizó el servicio
- **Solo para ingresos**
- Dejar vacío para gastos
- **Ejemplos**:
  - Juan Pérez
  - Carlos
  - María García

### 4. Monto (Obligatorio)
- **Solo números** (sin símbolos de pesos, puntos ni comas)
- **Ejemplos válidos**:
  - 35000
  - 50000
  - 125000
- **NO usar**:
  - $35.000
  - 35,000
  - $ 35000

### 5. Categoría (Obligatorio)
- Tipo de servicio (para ingresos) o tipo de gasto
- **Para Ingresos**: Corte, Barba, Tinte, etc.
- **Para Gastos**: Insumos, Servicios, Arriendo, etc.
- **Ejemplos**:
  - Corte
  - Insumos
  - Servicios
  - Arriendo

### 6. Descripción (Opcional)
- Detalles adicionales sobre la transacción
- **Ejemplos**:
  - Cliente nuevo
  - Compra mensual
  - Pago de luz
  - Cliente VIP

### 7. Servicio (Opcional)
- Nombre específico del servicio prestado
- **Solo para ingresos**
- **Ejemplos**:
  - Corte + Barba
  - Corte Classic
  - Corte Premium
  - Arreglo de Barba

## ✅ Ejemplos Válidos

### Ingreso:
```
Fecha: 2024-12-11
Tipo: Ingreso
Barbero: Juan Pérez
Monto: 35000
Categoría: Corte
Descripción: Cliente regular
Servicio: Corte + Barba
```

### Gasto:
```
Fecha: 2024-12-11
Tipo: Gasto
Barbero: (vacío)
Monto: 50000
Categoría: Insumos
Descripción: Compra mensual productos
Servicio: (vacío)
```

## ❌ Errores Comunes

### ❌ Monto con formato:
```
Monto: $35.000  ← MAL
Monto: 35000    ← BIEN
```

### ❌ Tipo en minúsculas:
```
Tipo: ingreso  ← MAL
Tipo: Ingreso  ← BIEN
```

### ❌ Fecha con formato incorrecto:
```
Fecha: 11 de diciembre  ← MAL
Fecha: 2024-12-11       ← BIEN
```

## 🔄 Integración con n8n

Si estás usando n8n para agregar filas automáticamente, asegúrate de que envía los datos en este formato:

```json
{
  "Fecha": "2024-12-11",
  "Tipo": "Ingreso",
  "Barbero": "Juan Pérez",
  "Monto": 35000,
  "Categoría": "Corte",
  "Descripción": "Cliente regular",
  "Servicio": "Corte + Barba"
}
```

## 📱 Vista del Google Sheet

Tu Google Sheet debería verse así:

```
┌──────────────┬─────────┬──────────────┬─────────┬───────────┬─────────────────┬──────────────┐
│ Fecha        │ Tipo    │ Barbero      │ Monto   │ Categoría │ Descripción     │ Servicio     │
├──────────────┼─────────┼──────────────┼─────────┼───────────┼─────────────────┼──────────────┤
│ 2024-12-01   │ Ingreso │ Juan Pérez   │ 35000   │ Corte     │ Cliente nuevo   │ Corte + Barba│
│ 2024-12-01   │ Gasto   │              │ 50000   │ Insumos   │ Compra mensual  │              │
│ 2024-12-02   │ Ingreso │ Carlos López │ 25000   │ Corte     │ Cliente regular │ Corte Classic│
└──────────────┴─────────┴──────────────┴─────────┴───────────┴─────────────────┴──────────────┘
```

## 🔧 Ajustes Opcionales

### Si tus columnas están en otro orden:

Edita `src/services/googleSheets.ts` (líneas 47-63). El sistema detecta automáticamente las columnas por su nombre, no por su posición.

### Si tienes columnas adicionales:

No hay problema, el dashboard solo usa las columnas que necesita e ignora el resto.

### Si faltan algunas columnas:

**Obligatorias**: Fecha, Tipo, Monto, Categoría
**Opcionales**: Barbero, Descripción, Servicio

## 📌 Tips

1. **Mantén la primera fila**: Los nombres de columnas deben estar en la fila 1
2. **Consistencia**: Usa siempre el mismo formato
3. **Sin espacios extra**: Evita espacios al inicio o final
4. **Mayúsculas en Tipo**: Siempre "Ingreso" o "Gasto"
5. **Números limpios**: Solo dígitos en Monto

## 🎯 Validación Rápida

Para verificar que tu sheet está bien configurado:

1. Primera fila tiene los nombres de columnas ✅
2. Columna "Tipo" solo tiene "Ingreso" o "Gasto" ✅
3. Columna "Monto" solo tiene números ✅
4. Fechas en formato YYYY-MM-DD o DD/MM/YYYY ✅

---

Si sigues esta estructura, el dashboard funcionará perfectamente con tus datos.
