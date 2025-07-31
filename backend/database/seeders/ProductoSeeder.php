<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\Categoria;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crepes Dulces (categoría 1)
        Producto::create([
            'nombre' => 'Crepe de Nutella y Plátano',
            'descripcion' => 'Crepe relleno con Nutella y plátanos frescos',
            'precio' => 8.50,
            'stock' => 50,
            'imagen' => 'crepe-nutella.jpg',
            'categoria_id' => 1,
        ]);

        Producto::create([
            'nombre' => 'Crepe de Fresas y Crema',
            'descripcion' => 'Crepe con fresas frescas y crema chantilly',
            'precio' => 9.00,
            'stock' => 45,
            'imagen' => 'crepe-fresas.jpg',
            'categoria_id' => 1,
        ]);

        Producto::create([
            'nombre' => 'Crepe de Manzana y Canela',
            'descripcion' => 'Crepe con manzanas caramelizadas y canela',
            'precio' => 8.00,
            'stock' => 40,
            'imagen' => 'crepe-manzana.jpg',
            'categoria_id' => 1,
        ]);

        // Crepes Salados (categoría 2)
        Producto::create([
            'nombre' => 'Crepe de Jamón y Queso',
            'descripcion' => 'Crepe relleno con jamón serrano y queso manchego',
            'precio' => 10.50,
            'stock' => 35,
            'imagen' => 'crepe-jamon.jpg',
            'categoria_id' => 2,
        ]);

        Producto::create([
            'nombre' => 'Crepe de Pollo y Champiñones',
            'descripcion' => 'Crepe con pollo a la plancha y champiñones salteados',
            'precio' => 11.00,
            'stock' => 30,
            'imagen' => 'crepe-pollo.jpg',
            'categoria_id' => 2,
        ]);

        Producto::create([
            'nombre' => 'Crepe Vegetariano',
            'descripcion' => 'Crepe con espinacas, tomates y queso feta',
            'precio' => 9.50,
            'stock' => 25,
            'imagen' => 'crepe-vegetariano.jpg',
            'categoria_id' => 2,
        ]);

        // Bebidas Calientes (categoría 3)
        Producto::create([
            'nombre' => 'Café Americano',
            'descripcion' => 'Café negro tradicional',
            'precio' => 3.50,
            'stock' => 100,
            'imagen' => 'cafe-americano.jpg',
            'categoria_id' => 3,
        ]);

        Producto::create([
            'nombre' => 'Cappuccino',
            'descripcion' => 'Café con leche espumada y cacao',
            'precio' => 4.50,
            'stock' => 80,
            'imagen' => 'cappuccino.jpg',
            'categoria_id' => 3,
        ]);

        Producto::create([
            'nombre' => 'Té Verde',
            'descripcion' => 'Té verde natural con propiedades antioxidantes',
            'precio' => 3.00,
            'stock' => 60,
            'imagen' => 'te-verde.jpg',
            'categoria_id' => 3,
        ]);

        // Bebidas Frías (categoría 4)
        Producto::create([
            'nombre' => 'Smoothie de Frutas',
            'descripcion' => 'Smoothie natural de frutas mixtas',
            'precio' => 5.50,
            'stock' => 40,
            'imagen' => 'smoothie-frutas.jpg',
            'categoria_id' => 4,
        ]);

        Producto::create([
            'nombre' => 'Limonada Natural',
            'descripcion' => 'Limonada fresca con menta',
            'precio' => 4.00,
            'stock' => 50,
            'imagen' => 'limonada.jpg',
            'categoria_id' => 4,
        ]);

        // Postres (categoría 5)
        Producto::create([
            'nombre' => 'Tiramisú',
            'descripcion' => 'Postre italiano con café y mascarpone',
            'precio' => 6.50,
            'stock' => 20,
            'imagen' => 'tiramisu.jpg',
            'categoria_id' => 5,
        ]);

        Producto::create([
            'nombre' => 'Cheesecake',
            'descripcion' => 'Tarta de queso con frutos rojos',
            'precio' => 7.00,
            'stock' => 15,
            'imagen' => 'cheesecake.jpg',
            'categoria_id' => 5,
        ]);
    }
}
