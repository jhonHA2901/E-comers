<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nombre' => 'Administrador',
            'email' => 'admin@crepescoffee.com',
            'password' => Hash::make('admin123'),
            'direccion' => 'Dirección del Administrador',
            'telefono' => '123456789',
            'rol' => 'admin',
        ]);

        User::create([
            'nombre' => 'Cliente Demo',
            'email' => 'cliente@crepescoffee.com',
            'password' => Hash::make('cliente123'),
            'direccion' => 'Dirección del Cliente',
            'telefono' => '987654321',
            'rol' => 'cliente',
        ]);
    }
} 