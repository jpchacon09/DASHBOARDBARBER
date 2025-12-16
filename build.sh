#!/bin/sh
echo "Generando .env para el build..."
echo "VITE_GOOGLE_API_KEY=${VITE_GOOGLE_API_KEY}" > .env
echo "VITE_SPREADSHEET_ID=${VITE_SPREADSHEET_ID}" >> .env
echo "VITE_SHEET_NAME=${VITE_SHEET_NAME}" >> .env
echo "VITE_SHEET_RANGE=${VITE_SHEET_RANGE}" >> .env
echo "Archivo .env generado:"
cat .env
npm run build
