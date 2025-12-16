# Configuración para EasyPanel

## ⚠️ IMPORTANTE: Configuración de Build Arguments

**Las variables VITE_* DEBEN configurarse como BUILD ARGUMENTS, NO como Environment Variables.**

Vite incluye las variables de entorno durante el BUILD, no en runtime. Por eso necesitas configurarlas como Build Arguments en EasyPanel.

### Cómo configurar Build Arguments en EasyPanel:

1. Ve a tu servicio en EasyPanel
2. Haz clic en **Settings** o **Configure**
3. Busca la sección **Build** o **Docker**
4. Encuentra **Build Arguments** (puede aparecer como "Args" o "Build args")
5. Agrega estas variables:

```
VITE_GOOGLE_API_KEY=AIzaSyBD6S8zTScYhJfoxuE1KxpgftkyYcf_oeY
VITE_SPREADSHEET_ID=1bs6Keuy9pbcDvunVM15SzSlVKVEDwGVuKwy6HQqN2a0
VITE_SHEET_NAME=DATA
VITE_SHEET_RANGE=A:Z
```

**NOTA:** En EasyPanel, los Build Arguments pueden estar en:
- **Pestaña "Build"** → sección "Build Arguments"
- **Pestaña "Advanced"** → sección "Docker Build Args"
- O en la configuración general bajo "Build settings"

## Configuración del Servicio

- **Build Method**: Dockerfile
- **Dockerfile Path**: Dockerfile (o ./Dockerfile)
- **Port**: 80
- **CPU**: 0.5 vCPU (recomendado)
- **Memory**: 512 MB (recomendado)

## Deploy

1. Asegúrate de que los **Build Arguments** estén configurados (ver arriba)
2. Click en "Rebuild" o "Redeploy"
3. Espera 3-5 minutos para que complete el build
4. Verifica los logs durante el build para confirmar que las variables se están pasando
5. El servicio debería iniciar correctamente

## Verificar que las variables se incluyeron en el build

Después del deploy, puedes verificar en la consola del navegador:

```javascript
// Abre la consola del navegador (F12) y ejecuta:
console.log(import.meta.env.VITE_GOOGLE_API_KEY)
```

Si muestra `undefined`, significa que las variables NO se configuraron como Build Arguments.

## Troubleshooting

### El dashboard muestra datos de ejemplo (mock data)

**Problema:** El código detecta que no hay API key y usa datos de prueba.

**Solución:**
1. Verifica que configuraste las variables como **Build Arguments** (no Environment Variables)
2. Haz un **Rebuild** completo (no solo Redeploy)
3. Revisa los logs del build para confirmar que Docker recibe los ARG

### El dashboard está en blanco o con error

**Problema:** Error de permisos de Google Sheets API

**Solución:**
1. Verifica que el spreadsheet sea público o que la API key tenga permisos
2. Abre el Google Sheet y confirma que la hoja se llama "DATA"
3. Revisa la consola del navegador (F12) para ver errores específicos

### Diferencias entre local y producción

**Local:** Vite lee automáticamente el archivo `.env` durante desarrollo

**Producción (EasyPanel):**
- El archivo `.env` NO se incluye en el build (está en `.dockerignore`)
- Las variables deben pasarse como **Build Arguments** al Dockerfile
- Dockerfile las recibe como `ARG` y las convierte en `ENV` durante el build

## Comandos útiles para debugging

Si tienes acceso a la terminal del contenedor en EasyPanel:

```bash
# Ver archivos compilados
ls -la /usr/share/nginx/html

# Ver configuración de nginx
cat /etc/nginx/conf.d/default.conf
```
