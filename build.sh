#!/bin/sh
echo "Configurando variables de entorno para Vite..."

# Export variables as environment variables for Vite
export VITE_GOOGLE_API_KEY="AIzaSyBD6S8zTScYhJfoxuE1KxpgftkyYcf_oeY"
export VITE_SPREADSHEET_ID="1bs6Keuy9pbcDvunVM15SzSlVKVEDwGVuKwy6HQqN2a0"
export VITE_SHEET_NAME="DATA"
export VITE_SHEET_RANGE="A:Z"

echo "Variables configuradas:"
echo "VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY"
echo "VITE_SPREADSHEET_ID=$VITE_SPREADSHEET_ID"
echo "VITE_SHEET_NAME=$VITE_SHEET_NAME"
echo "VITE_SHEET_RANGE=$VITE_SHEET_RANGE"
echo ""
echo "Iniciando build de Vite..."
npm run build
