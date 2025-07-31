<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class DisableSessionForApi
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Handle preflight requests
        if ($request->isMethod('OPTIONS')) {
            return response('', 200)
                ->header('Access-Control-Allow-Origin', $request->header('Origin') ?? '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN, Accept')
                ->header('Access-Control-Allow-Credentials', 'true');
        }

        // Solo deshabilitar sesión para rutas específicas que no necesitan autenticación
        $excludedRoutes = [
            'api/sanctum/csrf-cookie',
            'api/auth/register',
            'api/auth/login',
            'api/auth/refresh-token',
            'api/auth/forgot-password',
            'api/auth/reset-password',
            'api/email/verify/*',
            'api/email/resend',
        ];

        // Verificar si la ruta actual está en la lista de rutas excluidas
        $shouldDisableSession = false;
        foreach ($excludedRoutes as $route) {
            if ($request->is($route)) {
                $shouldDisableSession = true;
                break;
            }
        }

        if ($shouldDisableSession) {
            Config::set('session.driver', 'array');
            
            // Asegurar que la sesión se inicialice correctamente
            if ($request->hasSession()) {
                $request->session()->setId(Str::uuid()->toString());
            }
        }

        // Procesar la solicitud
        $response = $next($request);

        // Agregar encabezados CORS a la respuesta
        return $response->header('Access-Control-Allow-Origin', $request->header('Origin') ?? '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN, Accept')
            ->header('Access-Control-Expose-Headers', 'XSRF-TOKEN')
            ->header('Access-Control-Allow-Credentials', 'true');

        return $next($request);
    }
}
