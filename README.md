# Crepes & Coffee - Sistema Completo

Este repositorio contiene el sistema completo de Crepes & Coffee, que incluye:

- **Backend API**: Desarrollado en Laravel 10
- **Frontend Web**: Desarrollado en React
- **Aplicación de Administración**: Desarrollada en C# WPF

## Estructura del Proyecto

```
/
├── backend/               # API Laravel y Frontend React
│   ├── app/              # Código principal de Laravel
│   ├── frontend/         # Aplicación React
│   └── ...               # Otros archivos de Laravel
├── admin-app/            # Aplicación de administración en C# WPF
│   └── CrepesCoffeeAdmin/
└── imagenes/             # Recursos gráficos compartidos
```

## Requisitos

### Backend y Frontend Web
- PHP 8.1 o superior
- Composer
- MySQL 5.7 o superior
- Node.js y npm
- Laragon (recomendado) o XAMPP

### Aplicación de Administración
- Windows 10/11 (64-bit)
- .NET 6.0 Runtime o superior

## Instalación y Configuración

### Backend (Laravel)

1. Navegar al directorio del backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
composer install
```

3. Configurar base de datos:
   - Crear una base de datos MySQL llamada `crepes_CBD`
   - Copiar `.env.example` a `.env`
   - Configurar las credenciales de la base de datos en `.env`

4. Generar clave de aplicación:
```bash
php artisan key:generate
```

5. Ejecutar migraciones y seeders:
```bash
php artisan migrate:fresh --seed
```

6. Iniciar servidor:
```bash
php artisan serve --port=8002
```

### Frontend (React)

1. Navegar al directorio del frontend:
```bash
cd backend/frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm start
```

La aplicación web estará disponible en `http://localhost:3000`

### Aplicación de Administración (C# WPF)

1. Abrir la solución en Visual Studio 2022:
```
admin-app/CrepesCoffeeAdmin/CrepesCoffeeAdmin.csproj
```

2. Compilar y ejecutar la aplicación desde Visual Studio

## Credenciales de Prueba

### Administrador
- **Email:** admin@crepescoffee.com
- **Contraseña:** admin123

### Cliente
- **Email:** juan@example.com
- **Contraseña:** password123

## Despliegue en Railway

Este proyecto está configurado para ser desplegado fácilmente en Railway. Sigue estos pasos detallados:

### 1. Preparación

- Asegúrate de que tu código esté en un repositorio de GitHub
- Verifica que has realizado commit de todos los archivos de configuración (railway.json, nixpacks.toml, .env.railway, etc.)

### 2. Crear cuenta y proyecto en Railway

1. Crea una cuenta en [Railway.app](https://railway.app/) si aún no tienes una
2. Desde el dashboard, haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu cuenta de GitHub y selecciona el repositorio

### 3. Configurar base de datos

1. En tu proyecto de Railway, haz clic en "New Service"
2. Selecciona "Database" y luego "MySQL"
3. Espera a que se aprovisione la base de datos
4. Anota las credenciales de conexión (host, puerto, nombre de base de datos, usuario y contraseña)

### 4. Configurar variables de entorno

En la sección "Variables" de tu proyecto en Railway, configura las siguientes variables:

```
APP_NAME=CrepesAndCoffee
APP_ENV=production
APP_DEBUG=false
APP_URL=${RAILWAY_PUBLIC_DOMAIN}

DB_CONNECTION=mysql
DB_HOST=${RAILWAY_PRIVATE_DOMAIN}
DB_PORT=${RAILWAY_PORT}
DB_DATABASE=${RAILWAY_DATABASE}
DB_USERNAME=${RAILWAY_USERNAME}
DB_PASSWORD=${RAILWAY_PASSWORD}
```

### 5. Despliegue

Railway detectará automáticamente la configuración en los archivos railway.json y nixpacks.toml, y comenzará el proceso de construcción y despliegue.

### 6. Verificación

1. Una vez completado el despliegue, haz clic en la URL generada para acceder a tu aplicación
2. Verifica que la aplicación funcione correctamente
3. Revisa los logs en caso de errores

### Solución de problemas comunes

- **Error de base de datos**: Verifica que las variables de entorno de la base de datos estén correctamente configuradas
- **Error de compilación**: Revisa los logs de construcción para identificar el problema específico
- **Error de aplicación**: Revisa los logs de la aplicación para identificar errores en tiempo de ejecución