<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PedidoController extends Controller
{
    /**
     * Obtener pedidos del usuario autenticado
     */
    public function index(Request $request)
    {
        $pedidos = $request->user()->pedidos()
            ->with(['detalles.producto', 'pago'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $pedidos
        ]);
    }

    /**
     * Obtener un pedido específico
     */
    public function show(Request $request, $id)
    {
        $pedido = Pedido::with(['detalles.producto', 'pago', 'usuario'])
            ->where('id', $id)
            ->where('usuario_id', $request->user()->id)
            ->first();

        if (!$pedido) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $pedido
        ]);
    }

    /**
     * Crear un nuevo pedido
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'productos' => 'required|array|min:1',
            'productos.*.producto_id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        // Verificar stock y calcular total
        $total = 0;
        $detalles = [];

        foreach ($request->productos as $item) {
            $producto = Producto::find($item['producto_id']);
            
            if ($producto->stock < $item['cantidad']) {
                return response()->json([
                    'success' => false,
                    'message' => "Stock insuficiente para el producto: {$producto->nombre}"
                ], 400);
            }

            $subtotal = $producto->precio * $item['cantidad'];
            $total += $subtotal;

            $detalles[] = [
                'producto_id' => $producto->id,
                'cantidad' => $item['cantidad'],
                'precio_unitario' => $producto->precio,
            ];
        }

        try {
            DB::beginTransaction();

            // Crear el pedido
            $pedido = Pedido::create([
                'usuario_id' => $request->user()->id,
                'total' => $total,
                'estado' => 'pendiente',
                'metodo_pago' => 'mercado_pago',
            ]);

            // Crear los detalles del pedido
            foreach ($detalles as $detalle) {
                PedidoDetalle::create([
                    'pedido_id' => $pedido->id,
                    'producto_id' => $detalle['producto_id'],
                    'cantidad' => $detalle['cantidad'],
                    'precio_unitario' => $detalle['precio_unitario'],
                ]);

                // Actualizar stock
                $producto = Producto::find($detalle['producto_id']);
                $producto->decrement('stock', $detalle['cantidad']);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pedido creado exitosamente',
                'data' => $pedido->load(['detalles.producto'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            
            return response()->json([
                'success' => false,
                'message' => 'Error al crear el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener todos los pedidos (solo admin)
     */
    public function adminIndex(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Acceso denegado'
            ], 403);
        }

        $pedidos = Pedido::with(['usuario', 'detalles.producto', 'pago'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $pedidos
        ]);
    }

    /**
     * Actualizar estado del pedido (solo admin)
     */
    public function updateStatus(Request $request, $id)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Acceso denegado'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'estado' => 'required|in:pendiente,pagado,preparando,entregado,cancelado',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $pedido = Pedido::find($id);

        if (!$pedido) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado'
            ], 404);
        }

        $pedido->update(['estado' => $request->estado]);

        return response()->json([
            'success' => true,
            'message' => 'Estado del pedido actualizado exitosamente',
            'data' => $pedido->load(['usuario', 'detalles.producto'])
        ]);
    }
}
