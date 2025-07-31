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

Para desplegar en Railway, sigue estos pasos:

1. Crea una cuenta en Railway.app
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno necesarias
4. Configura los servicios para el backend y frontend

Consulta la documentación de Railway para más detalles sobre la configuración específica.