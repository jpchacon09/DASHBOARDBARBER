# Guía de Configuración Rápida

## 🚀 Inicio Rápido

El dashboard ya está funcionando en: http://localhost:5173

Por defecto está usando **datos de ejemplo** porque no tiene configurada la API key de Google.

## 📋 Para conectar con tu Google Sheet real:

### Paso 1: Hacer el Google Sheet público

1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1bs6Keuy9pbcDvunVM15SzSlVKVEDwGVuKwy6HQqN2a0
2. Haz clic en el botón **"Compartir"** (arriba a la derecha)
3. En **"Acceso general"**, cambia a: **"Cualquier persona con el enlace"**
4. Asegúrate de que el permiso sea **"Lector"**
5. Guarda los cambios

### Paso 2: Obtener una API Key de Google

1. Ve a: https://console.cloud.google.com/
2. Si no tienes un proyecto, crea uno nuevo:
   - Haz clic en el selector de proyectos (arriba)
   - Clic en "NUEVO PROYECTO"
   - Ponle un nombre (ej: "Dashboard Barberia")
   - Clic en "CREAR"

3. Habilita la API de Google Sheets:
   - En el menú lateral, ve a: **APIs y servicios > Biblioteca**
   - Busca: "Google Sheets API"
   - Haz clic en el resultado
   - Clic en **"HABILITAR"**

4. Crea una API Key:
   - Ve a: **APIs y servicios > Credenciales**
   - Clic en **"+ CREAR CREDENCIALES"**
   - Selecciona: **"Clave de API"**
   - Se generará una clave automáticamente
   - **Copia la clave** (algo como: AIzaSyC...)

5. (Opcional pero recomendado) Restringir la clave:
   - Haz clic en la clave que acabas de crear
   - En **"Restricciones de la aplicación"**:
     - Selecciona: **"Referentes HTTP (sitios web)"**
     - Añade: `http://localhost:5173/*`
     - Añade: `https://tu-dominio.com/*` (cuando despliegues)
   - En **"Restricciones de la API"**:
     - Selecciona: **"Restringir clave"**
     - Marca solo: **"Google Sheets API"**
   - Clic en **"GUARDAR"**

### Paso 3: Configurar el proyecto

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Abre el archivo `.env` con tu editor de texto

3. Reemplaza `tu_api_key_aqui` con la API key que copiaste:
```env
VITE_GOOGLE_API_KEY=AIzaSyC...tu_clave_real_aqui
```

4. Guarda el archivo

5. Recarga la página del navegador (http://localhost:5173)

¡Listo! Ahora deberías ver tus datos reales del Google Sheet.

## 📊 Estructura del Google Sheet

El dashboard detecta automáticamente las columnas, pero espera encontrar estos campos:

### Columnas necesarias:
- **Fecha**: La fecha de la transacción (formato: 2024-12-01 o 01/12/2024)
- **Tipo**: "Ingreso" o "Gasto"
- **Monto**: El valor numérico (ej: 35000)
- **Categoría**: Tipo de servicio o gasto

### Columnas opcionales:
- **Barbero**: Nombre del barbero (solo para ingresos)
- **Descripción**: Detalles adicionales
- **Servicio**: Nombre del servicio prestado

### Ejemplo de estructura:

| Fecha | Tipo | Barbero | Monto | Categoría | Descripción |
|-------|------|---------|-------|-----------|-------------|
| 2024-12-10 | Ingreso | Juan | 35000 | Corte | Corte + Barba |
| 2024-12-10 | Gasto | | 50000 | Insumos | Productos |
| 2024-12-10 | Ingreso | Carlos | 25000 | Corte | Corte Classic |

**Importante:**
- La primera fila debe tener los nombres de las columnas
- Los datos comienzan en la segunda fila
- El orden de las columnas puede variar

## 🔄 Integración con n8n

Tu flujo actual de n8n que añade filas al Google Sheet **funcionará automáticamente**:

1. n8n añade una nueva fila al Sheet
2. El dashboard detecta el cambio en 30 segundos (o inmediatamente si presionas "Actualizar")
3. Los gráficos se actualizan con los nuevos datos

No necesitas hacer ningún cambio en tu flujo de n8n.

## ❓ Solución de Problemas

### No veo mis datos, solo datos de ejemplo
- ✅ Verifica que el archivo `.env` existe y tiene tu API key
- ✅ Asegúrate de que el Google Sheet es público
- ✅ Revisa la consola del navegador (F12) para ver errores
- ✅ Recarga la página después de crear el archivo `.env`

### Error de permisos
- ✅ Verifica que el Sheet tenga acceso "Cualquier persona con el enlace"
- ✅ Asegúrate de que la API de Google Sheets esté habilitada

### Las columnas no se detectan bien
- ✅ Verifica que la primera fila tenga los nombres de columnas
- ✅ Edita `src/services/googleSheets.ts` línea 5 para ajustar el rango (ej: `Sheet1!A:H`)

### Error de API key
- ✅ Verifica que la clave no tenga espacios antes/después
- ✅ Asegúrate de que la Google Sheets API esté habilitada
- ✅ Revisa las restricciones de la clave

## 📞 Contacto

Si tienes problemas, revisa:
1. La consola del navegador (F12 > Console)
2. El archivo README.md
3. Los comentarios en el código

---

¡Disfruta de tu nuevo dashboard! 💈
