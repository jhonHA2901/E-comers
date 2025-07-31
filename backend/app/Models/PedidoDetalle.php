<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoDetalle extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'producto_id',
        'cantidad',
        'precio_unitario',
    ];

    protected $casts = [
        'precio_unitario' => 'decimal:2',
    ];

    /**
     * Obtener el pedido al que pertenece este detalle
     */
    public function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }

    /**
     * Obtener el producto de este detalle
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}
