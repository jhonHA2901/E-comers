# Crepes & Coffee - Backend API

Backend completo para el e-commerce "Crepes & Coffee" desarrollado en Laravel 10 con API REST.

## 🚀 Características

- ✅ **Autenticación completa** con Laravel Sanctum
- ✅ **Gestión de productos** con categorías
- ✅ **Sistema de pedidos** con estados
- ✅ **Integración con Mercado Pago** para pagos
- ✅ **Panel de administrador** con estadísticas
- ✅ **API REST** completamente documentada
- ✅ **Validaciones** robustas
- ✅ **Base de datos** MySQL optimizada
- ✅ **CORS** configurado para frontend
- ✅ **Datos de prueba** incluidos

## 📋 Requisitos

- PHP 8.1 o superior
- Composer
- MySQL 5.7 o superior
- Laragon (recomendado) o XAMPP

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd backend
```

2. **Instalar dependencias**
```bash
composer install
```

3. **Configurar base de datos**
   - Crear una base de datos MySQL llamada `crepes_CBD`
   - Copiar `.env.example` a `.env`
   - Configurar las credenciales de la base de datos en `.env`

4. **Generar clave de aplicación**
```bash
php artisan key:generate
```

5. **Ejecutar migraciones y seeders**
```bash
php artisan migrate:fresh --seed
```

6. **Configurar Mercado Pago (opcional)**
   - Obtener credenciales de Mercado Pago
   - Agregar al archivo `.env`:
```env
MERCADOPAGO_ACCESS_TOKEN=your_access_token_here
MERCADOPAGO_PUBLIC_KEY=your_public_key_here
MERCADOPAGO_WEBHOOK_SECRET=your_webhook_secret_here
```

7. **Iniciar servidor**
```bash
php artisan serve
```

El servidor estará disponible en `http://localhost:8000`

## 📚 Estructura del Proyecto

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/           # Controladores de la API
│   │   └── Middleware/        # Middlewares personalizados
│   ├── Models/                # Modelos Eloquent
│   └── Http/Resources/        # Resources para formatear respuestas
├── config/                    # Archivos de configuración
├── database/
│   ├── migrations/            # Migraciones de la base de datos
│   └── seeders/              # Seeders con datos de prueba
├── routes/
│   └── api.php               # Rutas de la API
└── API_DOCUMENTATION.md      # Documentación completa de la API
```

## 🔐 Usuarios de Prueba

### Administrador
- **Email:** admin@crepescoffee.com
- **Contraseña:** admin123
- **Rol:** admin

### Clientes
- **Email:** juan@example.com
- **Contraseña:** password123
- **Rol:** cliente

- **Email:** maria@example.com
- **Contraseña:** password123
- **Rol:** cliente

## 📊 Base de Datos

### Tablas Principales

1. **users** - Usuarios del sistema
2. **categorias** - Categorías de productos
3. **productos** - Productos del catálogo
4. **pedidos** - Pedidos de los clientes
5. **pedido_detalles** - Detalles de cada pedido
6. **pagos** - Información de pagos

### Relaciones

- Un usuario puede tener muchos pedidos
- Una categoría puede tener muchos productos
- Un pedido puede tener muchos detalles
- Un pedido tiene un pago asociado

## 🔌 Endpoints Principales

### Autenticación
- `POST /api/register` - Registrar usuario
- `POST /api/login` - Iniciar sesión
- `POST /api/logout` - Cerrar sesión

### Productos
- `GET /api/productos` - Listar productos
- `GET /api/productos/{id}` - Obtener producto
- `POST /api/productos` - Crear producto (admin)
- `PUT /api/productos/{id}` - Actualizar producto (admin)
- `DELETE /api/productos/{id}` - Eliminar producto (admin)

### Pedidos
- `POST /api/pedidos` - Crear pedido
- `GET /api/pedidos` - Listar pedidos del usuario
- `GET /api/admin/pedidos` - Listar todos los pedidos (admin)

### Pagos
- `POST /api/pagos/preference` - Crear preferencia de pago
- `GET /api/pagos/status/{pedidoId}` - Estado del pago

### Administrador
- `GET /api/admin/dashboard` - Estadísticas del dashboard
- `GET /api/admin/users` - Listar usuarios
- `DELETE /api/admin/users/{id}` - Eliminar usuario

## 🛡️ Seguridad

- **Autenticación:** Laravel Sanctum con tokens
- **Autorización:** Middleware personalizado para roles
- **Validación:** Validaciones robustas en todos los endpoints
- **CORS:** Configurado para permitir peticiones del frontend
- **Sanitización:** Datos sanitizados automáticamente

## 🔄 Estados de Pedidos

1. **pendiente** - Pedido creado, pendiente de pago
2. **pagado** - Pedido pagado exitosamente
3. **preparando** - Pedido en preparación
4. **entregado** - Pedido entregado al cliente
5. **cancelado** - Pedido cancelado

## 💳 Integración con Mercado Pago

El sistema incluye integración completa con Mercado Pago:

- Creación de preferencias de pago
- Webhook para confirmar pagos
- Manejo de estados de pago
- URLs de redirección configuradas

## 📈 Estadísticas del Dashboard

El panel de administrador incluye:

- **KPIs principales:**
  - Total de ventas
  - Número de pedidos
  - Pedidos pendientes/pagados
  - Total de usuarios y productos

- **Gráficos:**
  - Productos más vendidos
  - Ventas por mes
  - Distribución de estados de pedidos

## 🧪 Testing

Para ejecutar las pruebas:

```bash
php artisan test
```

## 📝 Logs

Los logs se encuentran en:
```
storage/logs/laravel.log
```

## 🔧 Comandos Útiles

```bash
# Limpiar caché
php artisan cache:clear

# Limpiar configuración
php artisan config:clear

# Regenerar autoload
composer dump-autoload

# Ver rutas disponibles
php artisan route:list

# Crear un nuevo usuario admin
php artisan tinker
User::create(['nombre' => 'Admin', 'email' => 'admin@test.com', 'password' => Hash::make('password'), 'rol' => 'admin']);
```

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación, consulta la documentación completa en `API_DOCUMENTATION.md`.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Desarrollado con ❤️ para Crepes & Coffee**
