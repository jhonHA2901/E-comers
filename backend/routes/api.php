<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\PedidoController;
use App\Http\Controllers\Api\PagoController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

/*
|--------------------------------------------------------------------------
| Public Routes (No Authentication Required)
|--------------------------------------------------------------------------
*/

// Authentication
Route::prefix('auth')->group(function () {
    // Rutas públicas
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    // Rutas protegidas (requieren autenticación)
    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
    
    // Rutas de recuperación de contraseña (opcionales)
    // Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    // Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
});

// Public Product Routes
Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);

// Public Category Routes
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/categorias/{id}', [CategoriaController::class, 'show']);

// MercadoPago Webhook (Public)
Route::post('/webhook/mercadopago', [PagoController::class, 'webhook']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Require Authentication)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum'])->group(function () {
    // Authentication
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });

    // User Profile
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show']);
        Route::put('/', [ProfileController::class, 'update']);
        Route::put('/password', [ProfileController::class, 'changePassword']);
    });

    // Orders
    Route::apiResource('pedidos', PedidoController::class)->except(['update', 'destroy']);
    
    // Payments
    Route::prefix('pagos')->group(function () {
        Route::post('/preference', [PagoController::class, 'createPreference']);
        Route::get('/status/{pedidoId}', [PagoController::class, 'getPaymentStatus']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin Routes (Require Admin Role)
    |--------------------------------------------------------------------------
    */
    Route::middleware(['admin'])->prefix('admin')->group(function () {
        // Products Management
        Route::apiResource('productos', ProductoController::class)->except(['index', 'show']);
        
        // Categories Management
        Route::apiResource('categorias', CategoriaController::class)->except(['index', 'show']);
        
        // Orders Management
        Route::get('/pedidos', [PedidoController::class, 'adminIndex']);
        Route::put('/pedidos/{id}/status', [PedidoController::class, 'updateStatus']);
        
        // Dashboard & Stats
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        
        // Users Management
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    });
}); 