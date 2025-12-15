# Configuración para EasyPanel

## Variables de Entorno Requeridas

En EasyPanel, configura estas variables de entorno:

```
VITE_GOOGLE_API_KEY=AIzaSyBD6S8zTScYhJfoxuE1KxpgftkyYcf_oeY
VITE_SPREADSHEET_ID=1bs6Keuy9pbcDvunVM15SzSlVKVEDwGVuKwy6HQqN2a0
VITE_SHEET_NAME=DATA
VITE_SHEET_RANGE=A:Z
NODE_ENV=production
```

## Configuración del Servicio

- **Build Method**: Dockerfile
- **Dockerfile Path**: Dockerfile
- **Port**: 80
- **CPU**: 0.5 vCPU (recomendado)
- **Memory**: 512 MB (recomendado)

## Health Check

Ya está incluido en el Dockerfile:
- Path: /
- Interval: 30s
- Timeout: 3s
- Retries: 3

## Deploy

1. Asegúrate de que las variables de entorno estén configuradas
2. Click en "Rebuild" o "Redeploy"
3. Espera 3-5 minutos para que complete el build
4. El servicio debería iniciar correctamente

## Troubleshooting

Si el servicio no inicia:
1. Revisa los logs en EasyPanel
2. Verifica que todas las variables VITE_* estén configuradas
3. Asegúrate de que el puerto sea 80
4. Confirma que nginx.conf esté en la raíz del proyecto
