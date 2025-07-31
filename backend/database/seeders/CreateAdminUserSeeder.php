<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nombre' => 'Administrador',
            'email' => 'harryhuaman2901@gmail.com',
            'password' => Hash::make('71082708@#j'),
            'direccion' => 'Dirección del Administrador',
            'telefono' => '123456789',
            'rol' => 'admin',
        ]);
    }
}
