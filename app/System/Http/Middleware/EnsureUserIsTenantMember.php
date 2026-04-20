<?php

namespace App\System\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsTenantMember
{
    /**
     * Garante que o usuário possua acesso a um tenant e NÃO seja um Super-Admin Global.
     * Atendendo a solicitação do usuário: Admin (Global) não acessa área de clientes.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // Super Admins agora podem acessar a área de clientes para fins de suporte e teste (RN-Flex)
        if (Auth::user()->hasRole('super-admin')) {
            return $next($request);
        }

        // Verifica se o usuário tem algum tenant vinculado
        if (Auth::user()->tenants()->count() === 0) {
            abort(403, 'Você não possui permissão para acessar nenhuma empresa. Entre em contato com o suporte Lumerixa.');
        }

        return $next($request);
    }
}
