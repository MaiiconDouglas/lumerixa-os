<?php
declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpar cache de permissões do Spatie
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Definição das Ações Base (RN-011)
        $actions = ['view', 'create', 'edit', 'delete_logical', 'approve', 'export', 'administer'];
        
        // 2. Definição dos Módulos/Entidades iniciais
        $modules = ['crm_leads', 'erp_financeiro', 'rh_colaboradores', 'juridico_contratos', 'projetos_tarefas'];

        // Criar permissões para cada combinação módulo:ação
        foreach ($modules as $module) {
            foreach ($actions as $action) {
                $name = "{$module}:{$action}";
                $p = Permission::findOrCreate($name);
                $p->slug = $name;
                $p->save();
            }
        }

        // 3. Criação dos Papéis Oficiais (RN-010 / RN-012)
        
        // Super Administrador: Soberania Global (RN-009 / RN-012)
        $superAdmin = Role::findOrCreate('super-admin');
        $superAdmin->slug = 'super-admin';
        $superAdmin->save();
        $superAdmin->givePermissionTo(Permission::all());

        // Administrador de Tenant: Acesso Total na sua empresa (RN-012)
        $adminRole = Role::findOrCreate('admin');
        $adminRole->slug = 'admin';
        $adminRole->save();
        $adminRole->givePermissionTo(Permission::all());

        // ROLE SOBERANA MASTER: Criada no Onboarding para o Dono do Workspace
        $masterRole = Role::findOrCreate('master');
        $masterRole->slug = 'master';
        $masterRole->save();
        $masterRole->givePermissionTo(Permission::all());

        // Gestor: Acesso por área (Exemplo CRM/Projetos)
        $gestor = Role::findOrCreate('gestor');
        $gestor->slug = 'gestor';
        $gestor->save();
        $gestor->givePermissionTo(Permission::where('name', 'like', 'crm_%')->orWhere('name', 'like', 'projetos_%')->get());

        // Faturamento (Financeiro): Acesso ao ERP
        $faturamento = Role::findOrCreate('faturamento');
        $faturamento->slug = 'faturamento';
        $faturamento->save();
        $faturamento->givePermissionTo(Permission::where('name', 'like', 'erp_financeiro%')->get());

        // Operacional: Executa fluxos permitidos (Criar/Editar mas não Administer)
        $operacional = Role::findOrCreate('operacional');
        $operacional->slug = 'operacional';
        $operacional->save();
        $operacional->givePermissionTo(Permission::where('name', 'not like', '%:administer')->get());

        // Visualizador: Apenas consulta (RN-012)
        $visualizador = Role::findOrCreate('visualizador');
        $visualizador->slug = 'visualizador';
        $visualizador->save();
        $visualizador->givePermissionTo(Permission::where('name', 'like', '%:view')->get());
    }
}
