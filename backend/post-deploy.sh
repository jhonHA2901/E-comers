#!/bin/bash

# Script para ejecutar después del despliegue en Railway

echo "Ejecutando tareas post-despliegue..."

# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimizar la aplicación
php artisan optimize

# Generar enlaces simbólicos para el almacenamiento
php artisan storage:link

# Ejecutar migraciones si es necesario (sin --force porque ya se ejecutó en el comando de inicio)
# php artisan migrate

echo "Tareas post-despliegue completadas."