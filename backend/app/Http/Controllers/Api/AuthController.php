<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:web', ['except' => ['login', 'register']]);
    }
    /**
     * Registrar un nuevo usuario
     */
    public function register(Request $request)
    {
        try {
            // Validación de campos
            $validated = $request->validate([
                'nombre' => 'required|string|max:100',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|min:6|confirmed',
                'direccion' => 'required|string',
                'telefono' => 'required|string|max:20',
            ]);

            // Crear el usuario
            $user = User::create([
                'nombre' => $validated['nombre'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'direccion' => $validated['direccion'],
                'telefono' => $validated['telefono'],
                'rol' => 'cliente',
            ]);

            // Iniciar sesión automáticamente después del registro
            Auth::login($user);

            // Retornar respuesta exitosa
            return response()->json([
                'success' => true,
                'message' => 'Usuario registrado exitosamente',
                'data' => [
                    'user' => $user->only(['id', 'nombre', 'email', 'rol'])
                ]
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error en registro: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar el registro',
                'error' => env('APP_DEBUG') ? $e->getMessage() : 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Iniciar sesión
     */
    public function login(Request $request)
    {
        try {
            // Validar credenciales
            $credentials = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
                'remember' => 'boolean'
            ]);

            // Intentar autenticar al usuario
            if (!Auth::attempt(
                ['email' => $credentials['email'], 'password' => $credentials['password']],
                $request->filled('remember') // Recordar sesión
            )) {
                return response()->json([
                    'success' => false,
                    'message' => 'Credenciales incorrectas',
                ], 401);
            }
            
            // Regenerar la sesión para prevenir fijación de sesión
            $request->session()->regenerate();

            // Obtener el usuario autenticado
            $user = Auth::user();

            // Regenerar la sesión para prevenir fijación de sesión
            $request->session()->regenerate();

            // Retornar respuesta exitosa
            return response()->json([
                'success' => true,
                'message' => 'Inicio de sesión exitoso',
                'data' => [
                    'user' => $user->only(['id', 'nombre', 'email', 'rol'])
                ]
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error en inicio de sesión: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar el inicio de sesión',
                'error' => env('APP_DEBUG') ? $e->getMessage() : 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Cerrar sesión
     */
    public function logout(Request $request)
    {
        try {
            // Cerrar la sesión
            Auth::logout();
            
            // Invalidar la sesión
            $request->session()->invalidate();
            
            // Regenerar el token CSRF
            $request->session()->regenerateToken();
            
            return response()->json([
                'success' => true,
                'message' => 'Sesión cerrada exitosamente'
            ]);
        } catch (\Exception $e) {
            Log::error('Error al cerrar sesión: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al cerrar la sesión',
                'error' => env('APP_DEBUG') ? $e->getMessage() : 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Obtener información del usuario autenticado
     */
    public function me(Request $request)
    {
        try {
            // Obtener el usuario autenticado
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'No autenticado',
                ], 401);
            }
            
            // Retornar solo la información necesaria del usuario
            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'nombre' => $user->nombre,
                    'email' => $user->email,
                    'rol' => $user->rol,
                    'direccion' => $user->direccion,
                    'telefono' => $user->telefono,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error al obtener información del usuario: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener información del usuario',
                'error' => env('APP_DEBUG') ? $e->getMessage() : 'Error interno del servidor'
            ], 500);
        }
    }
}
