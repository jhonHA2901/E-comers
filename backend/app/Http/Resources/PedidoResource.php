<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PedidoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'total' => $this->total,
            'estado' => $this->estado,
            'metodo_pago' => $this->metodo_pago,
            'usuario' => [
                'id' => $this->usuario->id,
                'nombre' => $this->usuario->nombre,
                'email' => $this->usuario->email,
            ],
            'detalles' => $this->detalles->map(function ($detalle) {
                return [
                    'id' => $detalle->id,
                    'cantidad' => $detalle->cantidad,
                    'precio_unitario' => $detalle->precio_unitario,
                    'producto' => [
                        'id' => $detalle->producto->id,
                        'nombre' => $detalle->producto->nombre,
                        'imagen' => $detalle->producto->imagen,
                    ],
                ];
            }),
            'pago' => $this->pago ? [
                'id' => $this->pago->id,
                'monto' => $this->pago->monto,
                'estado_pago' => $this->pago->estado_pago,
                'fecha_pago' => $this->pago->fecha_pago,
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
