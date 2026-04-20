<?php

namespace App\System\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsSuperAdmin
{
    /**
     * Garante que o usuário possua a role de 'super-admin' para acessar a área global.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // Verifica se o usuário tem o perfil de super-admin (Spatie via HasRoles)
        if (!Auth::user()->hasRole('super-admin')) {
            // Se for admin comum ou outro papel, não tem acesso global
            abort(403, 'Acesso restrito à governança global Lumerixa OS.');
        }

        return $next($request);
    }
}
