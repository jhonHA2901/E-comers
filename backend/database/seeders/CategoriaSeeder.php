<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias = [
            [
                'nombre' => 'Crepes Dulces',
                'descripcion' => 'Deliciosos crepes con ingredientes dulces y frutas frescas',
            ],
            [
                'nombre' => 'Crepes Salados',
                'descripcion' => 'Crepes salados con carnes, quesos y vegetales',
            ],
            [
                'nombre' => 'Bebidas Calientes',
                'descripcion' => 'Café, té y otras bebidas calientes',
            ],
            [
                'nombre' => 'Bebidas Frías',
                'descripcion' => 'Jugos, smoothies y bebidas refrescantes',
            ],
            [
                'nombre' => 'Postres',
                'descripcion' => 'Postres y dulces especiales',
            ],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}
