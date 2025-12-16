#!/bin/sh
echo "Generando .env para el build..."

# Hardcoded values (temporal workaround for EasyPanel)
cat > .env << 'EOF'
VITE_GOOGLE_API_KEY=AIzaSyBD6S8zTScYhJfoxuE1KxpgftkyYcf_oeY
VITE_SPREADSHEET_ID=1bs6Keuy9pbcDvunVM15SzSlVKVEDwGVuKwy6HQqN2a0
VITE_SHEET_NAME=DATA
VITE_SHEET_RANGE=A:Z
EOF

echo "Archivo .env generado:"
cat .env
echo ""
echo "Iniciando build de Vite..."
npm run build
