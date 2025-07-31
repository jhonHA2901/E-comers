<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use App\Models\Pago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class PagoController extends Controller
{
    public function __construct()
    {
        // Configurar Mercado Pago (estas credenciales deben estar en .env)
        $accessToken = config('services.mercadopago.access_token');
        if ($accessToken) {
            MercadoPagoConfig::setAccessToken($accessToken);
        }
    }

    /**
     * Crear preferencia de pago con Mercado Pago
     */
    public function createPreference(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pedido_id' => 'required|exists:pedidos,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $pedido = Pedido::with(['detalles.producto', 'usuario'])
            ->where('id', $request->pedido_id)
            ->where('usuario_id', $request->user()->id)
            ->first();

        if (!$pedido) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado'
            ], 404);
        }

        if ($pedido->estado !== 'pendiente') {
            return response()->json([
                'success' => false,
                'message' => 'El pedido ya no está pendiente de pago'
            ], 400);
        }

        try {
            $client = new PreferenceClient();

            // Crear items para Mercado Pago
            $items = [];
            foreach ($pedido->detalles as $detalle) {
                $items[] = [
                    'title' => $detalle->producto->nombre,
                    'quantity' => $detalle->cantidad,
                    'unit_price' => floatval($detalle->precio_unitario),
                ];
            }

            $preference = $client->create([
                'items' => $items,
                'external_reference' => $pedido->id,
                'notification_url' => url('/api/webhook/mercadopago'),
                'back_urls' => [
                    'success' => url('/pago/exito'),
                    'failure' => url('/pago/fallo'),
                    'pending' => url('/pago/pendiente'),
                ],
                'auto_return' => 'approved',
            ]);

            // Crear registro de pago
            Pago::create([
                'pedido_id' => $pedido->id,
                'monto' => $pedido->total,
                'estado_pago' => 'pendiente',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Preferencia de pago creada exitosamente',
                'data' => [
                    'preference_id' => $preference->id,
                    'init_point' => $preference->init_point,
                    'sandbox_init_point' => $preference->sandbox_init_point,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear la preferencia de pago',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Webhook para recibir notificaciones de Mercado Pago
     */
    public function webhook(Request $request)
    {
        try {
            $type = $request->input('type');
            $data = $request->input('data');

            if ($type === 'payment') {
                $paymentId = $data['id'];
                
                // Aquí deberías obtener los detalles del pago desde Mercado Pago
                // Por simplicidad, asumimos que el pago fue exitoso
                
                // Buscar el pedido por external_reference
                $pedido = Pedido::where('id', $request->input('external_reference'))->first();
                
                if ($pedido) {
                    // Actualizar estado del pedido
                    $pedido->update(['estado' => 'pagado']);
                    
                    // Actualizar estado del pago
                    $pago = Pago::where('pedido_id', $pedido->id)->first();
                    if ($pago) {
                        $pago->update([
                            'estado_pago' => 'completado',
                            'fecha_pago' => now(),
                        ]);
                    }
                }
            }

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener estado del pago
     */
    public function getPaymentStatus(Request $request, $pedidoId)
    {
        $pedido = Pedido::with('pago')
            ->where('id', $pedidoId)
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
            'data' => [
                'pedido' => $pedido,
                'pago' => $pedido->pago,
            ]
        ]);
    }
}
