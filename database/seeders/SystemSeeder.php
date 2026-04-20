<?php
declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Modules\Core\Infrastructure\Models\TenantModel;
use App\Modules\Core\Infrastructure\Models\UserModel;
use App\Modules\Admin\Infrastructure\Models\PlanModel;
use App\Modules\Admin\Infrastructure\Models\SubscriptionModel;
use App\Modules\CRM\Infrastructure\Models\LeadModel;
use App\Modules\ERP\Infrastructure\Models\TransactionModel;
use App\Modules\HR\Infrastructure\Models\EmployeeModel;
use App\Modules\Legal\Infrastructure\Models\ContractModel;
use App\Modules\Project\Domain\Models\Project;
use App\Modules\Project\Domain\Models\Task;
use App\Modules\Project\Domain\Models\KanbanColumn;
use App\System\Context\TenantContext;

class SystemSeeder extends Seeder
{
    /**
     * Semente de Contexto Completo Lumerixa OS v3.0 (Soberano)
     */
    public function run(): void
    {
        // 1. Garantir que temos planos
        $this->call(SaaSSeeder::class);
        $plan = PlanModel::where('slug', 'scale')->first();

        // 2. Criar um Tenant corporativo de exemplo
        $tenant = TenantModel::create([
            'name' => 'Nexus Forge Industrial',
            'domain' => 'nexus_forge',
            'account_type' => 'PJ',
            'is_active' => true,
        ]);

        // 3. Ativar Assinatura (Unificando Administrativo e Tenant)
        SubscriptionModel::create([
            'tenant_id' => $tenant->id,
            'plan_id' => $plan->id,
            'status' => 'active',
            'trial_ends_at' => now()->addDays(30),
        ]);

        // 4. Setar contexto para criação de dados de negócio (Isolamento RN-006)
        $context = app(TenantContext::class);
        $context->setId((string)$tenant->id);

        // 5. Popular CRM (Leads)
        LeadModel::create([
            'tenant_id' => $tenant->id,
            'name' => 'Tech Dynamics SA',
            'email' => 'contato@techdynamics.com',
            'status' => 'proposal',
            'opportunity_value' => 45000.00,
        ]);

        // 6. Popular ERP (Transações)
        TransactionModel::create([
            'tenant_id' => $tenant->id,
            'type' => 'income',
            'category' => 'Venda Software',
            'amount' => 5000.00,
            'due_date' => now(),
            'paid_at' => now(),
        ]);

        // 7. Popular RH (Colaboradores)
        EmployeeModel::create([
            'tenant_id' => $tenant->id,
            'name' => 'Ana Clara Silva',
            'position' => 'Engenheira de Software Senior',
            'department' => 'Tecnologia',
            'salary' => 15000.00,
            'hire_date' => now()->subMonths(12),
        ]);

        // 8. Popular Jurídico (Contratos)
        ContractModel::create([
            'tenant_id' => $tenant->id,
            'title' => 'Contrato de Prestação de Serviços - Nexus v1',
            'type' => 'service',
            'status' => 'active',
            'start_date' => now()->subMonths(2),
            'value' => 120000.00,
        ]);

        // 9. Popular Projetos (Roadmap Soberano)
        $project = Project::create([
            'tenant_id' => $tenant->id,
            'name' => 'Implementação de IA Preditiva',
            'slug' => 'ia-preditiva-nexus',
            'description' => 'Desenvolvimento de algoritmos para previsão de churn.',
            'status' => 'active',
            'start_date' => now(),
            'end_date' => now()->addMonths(3),
        ]);

        // Criar Colunas Padrão para o Projeto
        $col1 = KanbanColumn::create(['project_id' => $project->id, 'name' => 'A Fazer', 'position' => 0]);
        $col2 = KanbanColumn::create(['project_id' => $project->id, 'name' => 'Em Andamento', 'position' => 1]);
        $col3 = KanbanColumn::create(['project_id' => $project->id, 'name' => 'Concluído', 'position' => 2]);

        Task::create([
            'tenant_id' => $tenant->id,
            'project_id' => $project->id,
            'kanban_column_id' => $col3->id,
            'title' => 'Coleta de dados brutos',
            'description' => 'Exportação do DW para processamento.',
            'priority' => 'high',
        ]);

        Task::create([
            'tenant_id' => $tenant->id,
            'project_id' => $project->id,
            'kanban_column_id' => $col2->id,
            'title' => 'Treinamento do modelo v1',
            'description' => 'Ajuste de hiperparâmetros no Scikit-Learn.',
            'priority' => 'critical',
        ]);
        
        echo "Lumerixa OS v3.0 Contexto Sincronizado: Nexus Forge Ativo no Plano Scale.\n";
    }
}
