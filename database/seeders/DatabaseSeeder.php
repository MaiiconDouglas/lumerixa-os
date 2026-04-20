<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Semente Mestre Lumerixa OS v2.0
     */
    public function run(): void
    {
        // 1. Criar Papéis e Permissões Base (Admin, Super-Admin, etc.)
        $this->call(RoleSeeder::class);

        // 2. Criar o Usuário Soberano (admin@lumerixa.ai / super-admin)
        $this->call(AdminMasterSeeder::class);

        // 3. Popular Contexto de Negócio (Tenants, CRM, ERP, Assinaturas)
        $this->call(SystemSeeder::class);

        // 4. Provisionar Acessos DEV e Simulação de Cliente
        $this->call(DevAdminSeeder::class);
    }
}
