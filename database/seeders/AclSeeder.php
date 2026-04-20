<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Modules\Auth\Domain\Models\Role;
use App\Modules\Auth\Domain\Models\Permission;

class AclSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Criar Permissões Base
        $permissions = [
            ['name' => 'Configurações de Workspace', 'slug' => 'core.settings', 'group' => 'Sistema'],
            ['name' => 'Gestão de Usuários', 'slug' => 'auth.manage', 'group' => 'Sistema'],
            ['name' => 'Acesso Financeiro Total', 'slug' => 'finance.full', 'group' => 'Financeiro'],
            ['name' => 'Visualizar Financeiro', 'slug' => 'finance.view', 'group' => 'Financeiro'],
            ['name' => 'Gestão de Clientes (CRM)', 'slug' => 'crm.manage', 'group' => 'Operacional'],
        ];

        foreach ($permissions as $p) {
            Permission::updateOrCreate(['slug' => $p['slug']], $p);
        }

        // 2. Criar Papéis (Roles) com Restrição de Perfil de CNPJ
        
        // MASTER: Global, disponível para PF e PJ
        $roleMaster = Role::updateOrCreate(['slug' => 'master'], [
            'name' => 'Administrador Master',
            'perfil_cnpj' => null, 
        ]);
        $roleMaster->permissions()->sync(Permission::all()->pluck('id'));

        // FINANCEIRO: Estrito para PJ (Empresas)
        $roleFinance = Role::updateOrCreate(['slug' => 'financeiro'], [
            'name' => 'Gestão Financeira',
            'perfil_cnpj' => 'PJ',
        ]);
        $roleFinance->permissions()->sync(
            Permission::whereIn('slug', ['finance.full', 'finance.view'])->pluck('id')
        );

        // OPERADOR: Comum para ambos
        $roleOperador = Role::updateOrCreate(['slug' => 'operador'], [
            'name' => 'Operador de CRM',
            'perfil_cnpj' => null,
        ]);
        $roleOperador->permissions()->sync(
            Permission::whereIn('slug', ['crm.manage'])->pluck('id')
        );
    }
}
