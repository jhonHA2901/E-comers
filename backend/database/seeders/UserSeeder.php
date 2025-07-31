<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Usuario administrador
        User::create([
            'nombre' => 'Administrador',
            'email' => 'admin@crepescoffee.com',
            'password' => Hash::make('admin123'),
            'direccion' => 'Calle Principal 123, Ciudad',
            'telefono' => '123456789',
            'rol' => 'admin',
        ]);

        // Usuarios cliente de prueba
        User::create([
            'nombre' => 'Juan Pérez',
            'email' => 'juan@example.com',
            'password' => Hash::make('password123'),
            'direccion' => 'Av. Libertad 456, Centro',
            'telefono' => '987654321',
            'rol' => 'cliente',
        ]);

        User::create([
            'nombre' => 'María García',
            'email' => 'maria@example.com',
            'password' => Hash::make('password123'),
            'direccion' => 'Calle Comercio 789, Norte',
            'telefono' => '555666777',
            'rol' => 'cliente',
        ]);

        User::create([
            'nombre' => 'Carlos López',
            'email' => 'carlos@example.com',
            'password' => Hash::make('password123'),
            'direccion' => 'Plaza Mayor 321, Sur',
            'telefono' => '111222333',
            'rol' => 'cliente',
        ]);
    }
}
