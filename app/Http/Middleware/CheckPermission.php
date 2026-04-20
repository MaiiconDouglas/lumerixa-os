<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Middleware de barreira ACL.
     * Verifica se o usuário autenticado possui a permissão no tenant atual.
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        if (!$request->user() || !$request->user()->hasPermission($permission)) {
            abort(403, 'Acesso Negado: Você não possui a permissão [' . $permission . '] para esta operação.');
        }

        return $next($request);
    }
}
