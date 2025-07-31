# API Documentation - Crepes & Coffee E-commerce

## Base URL
```
http://localhost:8000/api
```

## Autenticación
La API utiliza Laravel Sanctum para la autenticación. Incluye el token en el header:
```
Authorization: Bearer {token}
```

## Endpoints

### Autenticación

#### POST /register
Registrar un nuevo usuario cliente.

**Body:**
```json
{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "direccion": "Calle Principal 123",
    "telefono": "123456789"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Usuario registrado exitosamente",
    "data": {
        "user": {...},
        "token": "1|abc123...",
        "token_type": "Bearer"
    }
}
```

#### POST /login
Iniciar sesión.

**Body:**
```json
{
    "email": "juan@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Login exitoso",
    "data": {
        "user": {...},
        "token": "1|abc123...",
        "token_type": "Bearer"
    }
}
```

#### POST /logout
Cerrar sesión (requiere autenticación).

#### GET /me
Obtener información del usuario actual (requiere autenticación).

### Perfil de Usuario

#### GET /profile
Obtener perfil del usuario (requiere autenticación).

#### PUT /profile
Actualizar perfil del usuario (requiere autenticación).

**Body:**
```json
{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "direccion": "Nueva dirección",
    "telefono": "987654321"
}
```

#### PUT /profile/password
Cambiar contraseña (requiere autenticación).

**Body:**
```json
{
    "current_password": "password123",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

### Productos

#### GET /productos
Obtener lista de productos con filtros.

**Query Parameters:**
- `categoria_id` (opcional): ID de la categoría
- `precio_min` (opcional): Precio mínimo
- `precio_max` (opcional): Precio máximo
- `page` (opcional): Número de página

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "nombre": "Crepe de Nutella",
            "descripcion": "Delicioso crepe...",
            "precio": "8.50",
            "stock": 50,
            "imagen": "crepe-nutella.jpg",
            "categoria": {
                "id": 1,
                "nombre": "Crepes Dulces"
            }
        }
    ],
    "current_page": 1,
    "last_page": 1,
    "total": 12
}
```

#### GET /productos/{id}
Obtener un producto específico.

#### POST /productos (Solo Admin)
Crear un nuevo producto.

**Body:**
```json
{
    "nombre": "Nuevo Crepe",
    "descripcion": "Descripción del producto",
    "precio": 10.50,
    "stock": 25,
    "imagen": "nuevo-crepe.jpg",
    "categoria_id": 1
}
```

#### PUT /productos/{id} (Solo Admin)
Actualizar un producto.

#### DELETE /productos/{id} (Solo Admin)
Eliminar un producto.

### Categorías

#### GET /categorias
Obtener todas las categorías.

#### GET /categorias/{id}
Obtener una categoría específica.

#### POST /categorias (Solo Admin)
Crear una nueva categoría.

**Body:**
```json
{
    "nombre": "Nueva Categoría",
    "descripcion": "Descripción de la categoría"
}
```

#### PUT /categorias/{id} (Solo Admin)
Actualizar una categoría.

#### DELETE /categorias/{id} (Solo Admin)
Eliminar una categoría.

### Pedidos

#### POST /pedidos
Crear un nuevo pedido (requiere autenticación).

**Body:**
```json
{
    "productos": [
        {
            "producto_id": 1,
            "cantidad": 2
        },
        {
            "producto_id": 3,
            "cantidad": 1
        }
    ]
}
```

#### GET /pedidos
Obtener pedidos del usuario (requiere autenticación).

#### GET /pedidos/{id}
Obtener un pedido específico (requiere autenticación).

#### GET /admin/pedidos (Solo Admin)
Obtener todos los pedidos.

#### PUT /admin/pedidos/{id}/status (Solo Admin)
Actualizar estado del pedido.

**Body:**
```json
{
    "estado": "pagado"
}
```

### Pagos

#### POST /pagos/preference
Crear preferencia de pago con Mercado Pago (requiere autenticación).

**Body:**
```json
{
    "pedido_id": 1
}
```

**Response:**
```json
{
    "success": true,
    "message": "Preferencia de pago creada exitosamente",
    "data": {
        "preference_id": "123456789",
        "init_point": "https://www.mercadopago.com/checkout/v1/redirect?pref_id=123456789",
        "sandbox_init_point": "https://sandbox.mercadopago.com/checkout/v1/redirect?pref_id=123456789"
    }
}
```

#### GET /pagos/status/{pedidoId}
Obtener estado del pago (requiere autenticación).

#### POST /webhook/mercadopago
Webhook de Mercado Pago (público).

### Administrador

#### GET /admin/dashboard (Solo Admin)
Obtener estadísticas del dashboard.

**Response:**
```json
{
    "success": true,
    "data": {
        "kpis": {
            "total_ventas": 1500.00,
            "total_pedidos": 25,
            "pedidos_pendientes": 5,
            "pedidos_pagados": 15,
            "total_usuarios": 50,
            "total_productos": 12
        },
        "productos_mas_vendidos": [...],
        "ventas_por_mes": [...],
        "estados_pedidos": [...]
    }
}
```

#### GET /admin/users (Solo Admin)
Obtener lista de usuarios clientes.

#### DELETE /admin/users/{id} (Solo Admin)
Eliminar un usuario cliente.

## Estados de Pedidos
- `pendiente`: Pedido creado, pendiente de pago
- `pagado`: Pedido pagado
- `preparando`: Pedido en preparación
- `entregado`: Pedido entregado
- `cancelado`: Pedido cancelado

## Estados de Pago
- `pendiente`: Pago pendiente
- `completado`: Pago completado
- `fallido`: Pago fallido

## Códigos de Error
- `400`: Bad Request - Datos inválidos
- `401`: Unauthorized - No autenticado
- `403`: Forbidden - Sin permisos
- `404`: Not Found - Recurso no encontrado
- `422`: Unprocessable Entity - Error de validación
- `500`: Internal Server Error - Error del servidor

## Ejemplos de Uso

### 1. Registro y Login
```bash
# Registrar usuario
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "direccion": "Calle Principal 123",
    "telefono": "123456789"
  }'

# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### 2. Obtener Productos
```bash
curl -X GET "http://localhost:8000/api/productos?categoria_id=1&page=1" \
  -H "Authorization: Bearer {token}"
```

### 3. Crear Pedido
```bash
curl -X POST http://localhost:8000/api/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "productos": [
      {
        "producto_id": 1,
        "cantidad": 2
      }
    ]
  }'
```

## Configuración de Mercado Pago
Para que los pagos funcionen, configura las siguientes variables en el archivo `.env`:

```env
MERCADOPAGO_ACCESS_TOKEN=your_access_token_here
MERCADOPAGO_PUBLIC_KEY=your_public_key_here
MERCADOPAGO_WEBHOOK_SECRET=your_webhook_secret_here
``` 