<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'total',
        'estado',
        'metodo_pago',
    ];

    protected $casts = [
        'total' => 'decimal:2',
    ];

    /**
     * Obtener el usuario que realizó el pedido
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    /**
     * Obtener los detalles del pedido
     */
    public function detalles()
    {
        return $this->hasMany(PedidoDetalle::class);
    }

    /**
     * Obtener el pago asociado al pedido
     */
    public function pago()
    {
        return $this->hasOne(Pago::class);
    }
}
