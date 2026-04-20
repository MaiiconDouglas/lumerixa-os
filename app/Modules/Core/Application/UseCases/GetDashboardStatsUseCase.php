<?php
declare(strict_types=1);

namespace App\Modules\Core\Application\UseCases;

use App\Modules\Core\Infrastructure\Models\UserModel;
use App\System\Context\TenantContext;

class GetDashboardStatsUseCase
{
    private TenantContext $tenantContext;

    public function __construct(TenantContext $tenantContext)
    {
        $this->tenantContext = $tenantContext;
    }

    public function execute(): array
    {
        $tenantId = $this->tenantContext->getId();

        if (!$tenantId) {
            return [
                'members_count' => 0,
                'profile_type' => 'PF',
            ];
        }

        // Contagem de membros vinculados ao tenant
        $membersCount = UserModel::whereHas('tenants', function ($query) use ($tenantId) {
            $query->where('tenants.id', $tenantId);
        })->count();

        // Métricas de CRM (RN-032)
        $leadsCount = \App\Modules\CRM\Infrastructure\Models\LeadModel::count();
        $opportunityValue = \App\Modules\CRM\Infrastructure\Models\LeadModel::sum('opportunity_value');

        // Métricas de ERP (RN-025)
        $income = \App\Modules\ERP\Infrastructure\Models\TransactionModel::where('type', 'income')->sum('amount');
        $expense = \App\Modules\ERP\Infrastructure\Models\TransactionModel::where('type', 'expense')->sum('amount');

        $activeTenant = $this->tenantContext->get();

        return [
            'members_count' => $membersCount,
            'profile_type' => $activeTenant ? $activeTenant->profile_type : 'PF',
            'tenant_name' => $activeTenant ? $activeTenant->name : 'Workspace',
            'crm' => [
                'leads_count' => $leadsCount,
                'opportunities_value' => $opportunityValue,
            ],
            'erp' => [
                'balance' => $income - $expense,
                'income' => $income,
                'expense' => $expense,
            ]
        ];
    }
}
