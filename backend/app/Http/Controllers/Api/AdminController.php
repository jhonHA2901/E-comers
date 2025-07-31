<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Dashboard con estadísticas
     */
    public function dashboard(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Acceso denegado'
            ], 403);
        }

        // Estadísticas generales
        $totalVentas = Pedido::where('estado', '!=', 'cancelado')->sum('total');
        $totalPedidos = Pedido::count();
        $pedidosPendientes = Pedido::where('estado', 'pendiente')->count();
        $pedidosPagados = Pedido::where('estado', 'pagado')->count();
        $totalUsuarios = User::where('rol', 'cliente')->count();
        $totalProductos = Producto::count();

        // Productos más vendidos
        $productosMasVendidos = DB::table('pedido_detalles')
            ->join('productos', 'pedido_detalles.producto_id', '=', 'productos.id')
            ->select('productos.nombre', DB::raw('SUM(pedido_detalles.cantidad) as total_vendido'))
            ->groupBy('productos.id', 'productos.nombre')
            ->orderBy('total_vendido', 'desc')
            ->limit(5)
            ->get();

        // Ventas por mes (últimos 6 meses)
        $ventasPorMes = Pedido::where('estado', '!=', 'cancelado')
            ->where('created_at', '>=', now()->subMonths(6))
            ->select(
                DB::raw('MONTH(created_at) as mes'),
                DB::raw('YEAR(created_at) as año'),
                DB::raw('SUM(total) as total_ventas'),
                DB::raw('COUNT(*) as total_pedidos')
            )
            ->groupBy('mes', 'año')
            ->orderBy('año', 'desc')
            ->orderBy('mes', 'desc')
            ->get();

        // Estados de pedidos
        $estadosPedidos = Pedido::select('estado', DB::raw('COUNT(*) as total'))
            ->groupBy('estado')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'kpis' => [
                    'total_ventas' => $totalVentas,
                    'total_pedidos' => $totalPedidos,
                    'pedidos_pendientes' => $pedidosPendientes,
                    'pedidos_pagados' => $pedidosPagados,
                    'total_usuarios' => $totalUsuarios,
                    'total_productos' => $totalProductos,
                ],
                'productos_mas_vendidos' => $productosMasVendidos,
                'ventas_por_mes' => $ventasPorMes,
                'estados_pedidos' => $estadosPedidos,
            ]
        ]);
    }

    /**
     * Obtener todos los usuarios (solo admin)
     */
    public function getUsers(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Acceso denegado'
            ], 403);
        }

        $users = User::where('rol', 'cliente')
            ->withCount('pedidos')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    /**
     * Eliminar usuario (solo admin)
     */
    public function deleteUser(Request $request, $id)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Acceso denegado'
            ], 403);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        if ($user->rol === 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'No se puede eliminar un administrador'
            ], 400);
        }

        // Verificar si tiene pedidos
        if ($user->pedidos()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede eliminar un usuario con pedidos'
            ], 400);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado exitosamente'
        ]);
    }
}
