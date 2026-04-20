<?php
declare(strict_types=1);

namespace App\System\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Modules\Admin\Domain\Services\SubscriptionService;
use Symfony\Component\HttpFoundation\Response;

class SubscriptionGuardMiddleware
{
    /**
     * Middleware Soberano (RN-022): Bloqueia ações que excedam os limites do plano.
     */
    public function handle(Request $request, Closure $next, string $resource): Response
    {
        $subscriptionService = app(SubscriptionService::class);

        // Se for admin global, ignoramos restrições operacionais
        if (auth()->check() && auth()->user()->hasRole('admin')) {
            return $next($request);
        }

        $canProceed = match($resource) {
            'user' => $subscriptionService->canAddUser(),
            'crm' => $subscriptionService->canAccessModule('crm'),
            'erp' => $subscriptionService->canAccessModule('erp'),
            default => true
        };

        if (!$canProceed) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => "Seu plano atual atingiu o limite para o recurso: {$resource}. Por favor, faça um upgrade no Painel Administrativo."
                ], 403);
            }
            
            return back()->with('error', "Limite de plano atingido para: {$resource}.");
        }

        return $next($request);
    }
}
