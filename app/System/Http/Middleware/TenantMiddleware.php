<?php
declare(strict_types=1);

namespace App\System\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\System\Context\TenantContext;

class TenantMiddleware
{
    /**
     * Intercepta a requisição, descobre qual CNPJ/Empresa o usuário selecionou
     * na interface, e injeta esse ID no TenantContext para isolamento global
     * do Banco de Dados no backend.
     */
    public function handle(Request $request, Closure $next)
    {
        // 1. Identifica o Tenant vindo da Sessão (Navegação Web) ou Header (API Mobile)
        // Padronizamos para usar 'active_tenant_id' para clareza
        $tenantId = $request->session()->get('active_tenant_id') ?? $request->header('X-Tenant-ID');

        // 2. Se o usuário estiver logado mas sem tenant na sessão, tentamos descobrir um (Primeiro Acesso)
        if (!$tenantId && \Illuminate\Support\Facades\Auth::check()) {
            $tenant = \Illuminate\Support\Facades\Auth::user()->tenants()->first();
            if ($tenant) {
                $tenantId = $tenant->id;
                $request->session()->put('active_tenant_id', $tenantId);
            }
        }

        // 3. Ativa o isolamento absoluto no contexto global
        if ($tenantId) {
            app(TenantContext::class)->setId($tenantId);
        }

        return $next($request);
    }
}
