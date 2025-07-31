# ☕ Crepes & Coffee - Panel de Administración

Aplicación de escritorio en C# WPF para la gestión administrativa del e-commerce "Crepes & Coffee".

## 🚀 Características

### 📊 Dashboard
- **KPIs en tiempo real**: Ventas totales, pedidos, usuarios, productos
- **Productos más vendidos**: Ranking de productos con mayor demanda
- **Ventas por mes**: Gráficos de tendencias de ventas
- **Actualización automática**: Datos actualizados en tiempo real

### 🛍️ Gestión de Productos
- **Lista completa**: Vista de todos los productos con filtros
- **Búsqueda avanzada**: Por nombre, descripción y categoría
- **Filtros por categoría**: Organización por tipo de producto
- **Acciones CRUD**: Crear, editar, eliminar productos
- **Gestión de stock**: Control de inventario en tiempo real

### 📦 Gestión de Pedidos
- **Vista de pedidos**: Lista completa con detalles del cliente
- **Filtros por estado**: Pendiente, pagado, preparando, entregado
- **Búsqueda por cliente**: Filtrado por nombre o teléfono
- **Cambio de estado**: Actualización del estado de pedidos
- **Detalles completos**: Información completa de cada pedido

### 👥 Gestión de Usuarios (Próximamente)
- **Lista de usuarios**: Administración de cuentas de clientes
- **Roles y permisos**: Gestión de roles de usuario
- **Estadísticas**: Información de actividad de usuarios

### 📂 Gestión de Categorías (Próximamente)
- **Organización**: Crear y gestionar categorías de productos
- **Jerarquía**: Estructura organizativa de productos

## 🛠️ Tecnologías Utilizadas

- **.NET 6.0**: Framework de desarrollo
- **WPF (Windows Presentation Foundation)**: Interfaz de usuario
- **C#**: Lenguaje de programación
- **Newtonsoft.Json**: Serialización JSON
- **System.Net.Http**: Cliente HTTP para API
- **Material Design**: Estilo visual moderno

## 📋 Requisitos del Sistema

- **Windows 10/11** (64-bit)
- **.NET 6.0 Runtime** o superior
- **4 GB RAM** mínimo
- **100 MB** de espacio en disco
- **Conexión a Internet** para comunicación con API

## 🔧 Instalación

### Opción 1: Ejecutable (Recomendado)
1. Descarga el archivo `.exe` desde la sección de releases
2. Ejecuta el instalador
3. Sigue las instrucciones del asistente
4. La aplicación se instalará automáticamente

### Opción 2: Desarrollo
1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd admin-app/CrepesCoffeeAdmin
```

2. Abre la solución en Visual Studio 2022

3. Restaura los paquetes NuGet:
```bash
dotnet restore
```

4. Compila y ejecuta:
```bash
dotnet build
dotnet run
```

## 🔐 Configuración

### Configuración de API
La aplicación se conecta automáticamente a la API Laravel. Asegúrate de que:

1. **El backend esté ejecutándose** en `http://localhost:8000`
2. **Las rutas de API** estén disponibles
3. **CORS esté configurado** correctamente

### Credenciales de Administrador
Para acceder al panel necesitas:
- **Email**: Cuenta de administrador válida
- **Contraseña**: Contraseña de la cuenta admin
- **Rol**: El usuario debe tener rol "admin"

## 📱 Uso de la Aplicación

### 1. Inicio de Sesión
- Ejecuta la aplicación
- Ingresa tus credenciales de administrador
- Haz clic en "Iniciar Sesión"

### 2. Dashboard
- **Vista general**: KPIs y estadísticas principales
- **Actualizar datos**: Botón para refrescar información
- **Navegación**: Menú lateral para acceder a otras secciones

### 3. Gestión de Productos
- **Ver productos**: Lista completa con filtros
- **Agregar producto**: Botón "+" para crear nuevos productos
- **Editar**: Botón de lápiz para modificar productos
- **Eliminar**: Botón de papelera para eliminar productos

### 4. Gestión de Pedidos
- **Ver pedidos**: Lista con filtros por estado
- **Cambiar estado**: Botón para actualizar estado de pedidos
- **Ver detalles**: Información completa de cada pedido
- **Búsqueda**: Filtrado por cliente o teléfono

## 🔒 Seguridad

- **Autenticación**: Sistema de login seguro
- **Autorización**: Solo administradores pueden acceder
- **Sesiones**: Autenticación basada en sesiones
- **Validación**: Validación de entrada en todos los formularios
- **Logs**: Registro de actividades administrativas

## 🐛 Solución de Problemas

### Error de Conexión
```
Error: No se puede conectar al servidor
```
**Solución**: Verifica que el backend Laravel esté ejecutándose

### Error de Autenticación
```
Error: Credenciales incorrectas
```
**Solución**: Verifica tu email y contraseña de administrador

### Error de Permisos
```
Error: Acceso denegado
```
**Solución**: Asegúrate de que tu cuenta tenga rol "admin"

### Error de API
```
Error: Error al cargar datos
```
**Solución**: Verifica la configuración de CORS en el backend

## 📞 Soporte

Para soporte técnico:
- **Email**: soporte@crepescoffee.com
- **Documentación**: [URL_DOCUMENTACION]
- **Issues**: [URL_REPOSITORIO]/issues

## 🔄 Actualizaciones

La aplicación se actualiza automáticamente. Para actualizaciones manuales:
1. Descarga la nueva versión
2. Cierra la aplicación actual
3. Instala la nueva versión
4. Reinicia la aplicación

## 📄 Licencia

Este software es propiedad de "Crepes & Coffee" y está protegido por derechos de autor.

---

**Desarrollado con ❤️ para Crepes & Coffee**