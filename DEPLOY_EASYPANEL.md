# 🚀 Despliegue en EasyPanel

## Pasos para desplegar el dashboard en EasyPanel

### 1. Preparar el repositorio

Primero, sube tu código a GitHub:

```bash
cd /Users/jpchacon/Desktop/DASHBOARD_BARBER/barber-dashboard

# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Dashboard barbería completo"

# Agregar repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/barber-dashboard.git

# Push
git push -u origin main
```

### 2. Configurar en EasyPanel

1. **Crear nueva aplicación:**
   - Ve a tu panel de EasyPanel
   - Clic en "New Service" o "Create App"
   - Selecciona "From Git Repository"

2. **Conectar repositorio:**
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio `barber-dashboard`
   - Branch: `main`

3. **Configuración del build:**
   - **Build Method:** Docker
   - **Dockerfile path:** `Dockerfile` (ya está creado)
   - **Port:** 80

4. **Variables de entorno:**
   Agrega estas variables en EasyPanel:

   ```
   VITE_GOOGLE_API_KEY=AIzaSyBD6S8zTScYhJfoxuE1KxpgftkyYcf_oeY
   VITE_SPREADSHEET_ID=1bs6Keuy9pbcDvunVM15SzSlVKVEDwGVuKwy6HQqN2a0
   VITE_SHEET_NAME=DATA
   VITE_SHEET_RANGE=A:Z
   ```

5. **Deploy:**
   - Clic en "Deploy"
   - Espera a que termine el build (toma 3-5 minutos)

### 3. Configurar dominio (Opcional)

1. En EasyPanel, ve a tu aplicación
2. Sección "Domains"
3. Agrega tu dominio personalizado o usa el subdominio de EasyPanel

---

## 📝 Notas Importantes

### Actualizar la API Key en producción

Cuando despliegues, necesitas configurar las variables de entorno en EasyPanel.

**IMPORTANTE:** No incluyas tu API key en el código que subes a GitHub.

### Actualización automática

EasyPanel puede configurarse para:
- **Auto-deploy:** Cada vez que hagas push a GitHub
- **Manual deploy:** Solo cuando tú lo actives

### Build del proyecto

El Dockerfile:
1. Instala dependencias
2. Compila el proyecto (`npm run build`)
3. Sirve los archivos estáticos con Nginx
4. Optimiza para producción

---

## 🔧 Si tienes problemas

### Error en el build:

Si el build falla, verifica:
1. Que todas las variables de entorno estén configuradas
2. Que el Dockerfile esté en la raíz del proyecto
3. Los logs en EasyPanel

### El dashboard no carga:

1. Verifica que el puerto sea 80
2. Revisa las variables de entorno
3. Asegúrate de que la Google Sheets API esté habilitada

### Los datos no se actualizan:

1. Verifica que el Google Sheet sea público
2. Comprueba la API key
3. Revisa la consola del navegador (F12)

---

## 🎯 Comandos útiles

### Build local del Docker:
```bash
docker build -t barber-dashboard .
```

### Probar localmente:
```bash
docker run -p 8080:80 \
  -e VITE_GOOGLE_API_KEY=tu_api_key \
  barber-dashboard
```

Luego abre: http://localhost:8080

---

## 📊 Después del deploy

Una vez desplegado:

1. ✅ Tu dashboard estará accesible 24/7
2. ✅ Se actualizará con los datos de Google Sheets en tiempo real
3. ✅ n8n seguirá funcionando sin cambios
4. ✅ Podrás acceder desde cualquier dispositivo

---

## 💡 Tips

- Usa HTTPS (EasyPanel lo proporciona automáticamente)
- Configura un dominio personalizado para mejor branding
- El dashboard se actualiza solo cada 30 segundos
- No necesitas reiniciar nada cuando n8n agrega datos

---

¿Listo para desplegar? Sigue los pasos y tu dashboard estará en la nube en minutos.
