<?php
declare(strict_types=1);

namespace App\Modules\Admin\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admin\Infrastructure\Models\PlanModel;
use App\Modules\Admin\Infrastructure\Models\SubscriptionModel;
use App\Modules\Core\Infrastructure\Models\TenantModel;
use App\Modules\Core\Infrastructure\Models\UserModel;
use App\Modules\Core\Infrastructure\Models\AuditLogModel;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Dashboard Executivo Global (Super Admin).
     */
    public function index()
    {
        // Métricas SaaS Reais (Fase Inicial)
        $metrics = [
            'total_mrr' => SubscriptionModel::where('status', 'active')->join('plans', 'subscriptions.plan_id', '=', 'plans.id')->sum('plans.price_monthly'),
            'active_tenants' => TenantModel::where('is_active', true)->count(),
            'total_users' => UserModel::count(),
            'health_score' => 98, // Mock inicial para conformidade visual
        ];

        // Últimas assinaturas
        $latestSubscriptions = SubscriptionModel::with(['tenant', 'plan'])
            ->latest()
            ->take(5)
            ->get();

        // Logs de Auditoria Globais (RN-009 Bypass ativo)
        $auditLogs = AuditLogModel::latest()->take(10)->get();

        return Inertia::render('Modules/Admin/Pages/Dashboard', [
            'metrics' => $metrics,
            'latestSubscriptions' => $latestSubscriptions,
            'auditLogs' => $auditLogs,
        ]);
    }
}
