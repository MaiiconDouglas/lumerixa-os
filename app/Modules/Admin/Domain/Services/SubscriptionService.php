<?php
declare(strict_types=1);

namespace App\Modules\Admin\Domain\Services;

use App\Modules\Admin\Infrastructure\Models\SubscriptionModel;
use App\System\Context\TenantContext;

class SubscriptionService
{
    /**
     * Verifica se o tenant atual possui o módulo específico ativo no seu plano.
     */
    public function canAccessModule(string $moduleKey): bool
    {
        $subscription = $this->getActiveSubscription();
        
        if (!$subscription || !$subscription->plan) {
            return false;
        }

        // Se for admin global, acesso total
        if (auth()->check() && auth()->user()->hasRole('admin')) {
            return true;
        }

        $features = $subscription->plan->features;
        
        // Exemplo: 'modules' => ['crm', 'erp']
        $activeModules = $features['modules'] ?? [];
        
        return in_array($moduleKey, $activeModules);
    }

    /**
     * Verifica se o tenant atingiu o limite de usuários.
     */
    public function canAddUser(): bool
    {
        $subscription = $this->getActiveSubscription();
        if (!$subscription) return false;

        $maxUsers = $subscription->plan->features['max_users'] ?? 0;
        
        if ($maxUsers === 0) return true; // 0 = Ilimitado (Enterprise)

        $currentUsers = \App\Modules\Core\Infrastructure\Models\UserModel::count();
        
        return $currentUsers < $maxUsers;
    }

    protected function getActiveSubscription()
    {
        $tenantId = app(TenantContext::class)->getId();
        
        return SubscriptionModel::where('tenant_id', $tenantId)
            ->where('status', 'active')
            ->with('plan')
            ->first();
    }
}
