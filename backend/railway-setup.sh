#!/bin/bash

# Script de configuración para Railway

# Copiar archivo .env.railway a .env
cp .env.railway .env

# Generar clave de aplicación
php artisan key:generate --force

# Optimizar la aplicación
php artisan optimize:clear
php artisan optimize

# Ejecutar migraciones
php artisan migrate --force

# Ejecutar seeders si es necesario
php artisan db:seed --force

echo "Configuración completada con éxito."