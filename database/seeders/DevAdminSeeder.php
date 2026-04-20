<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Modules\Core\Infrastructure\Models\UserModel;
use App\Modules\Core\Infrastructure\Models\TenantModel;
use App\Modules\Auth\Domain\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DevAdminSeeder extends Seeder
{
    /**
     * Provisionamento de acessos para simulação de fluxo de cliente e suporte.
     */
    public function run(): void
    {
        // 1. Garantir que os Papéis existem
        $roleSuper = Role::firstOrCreate(['slug' => 'super-admin'], ['name' => 'Super Administrador']);
        $roleMaster = Role::firstOrCreate(['slug' => 'master'], ['name' => 'Administrador Master']);

        // 2. Conta SOBERANA (admin@lumerixa.ai) - Continua como Super Admin Global
        $adminUser = UserModel::updateOrCreate(
            ['email' => 'admin@lumerixa.ai'],
            [
                'name' => 'Suporte Lumerixa (Soberano)',
                'password' => Hash::make('lumerixa123'),
                'email_verified_at' => now(),
            ]
        );
        $adminUser->assignRole('super-admin', null);

        // 3. Conta CLIENTE (dev@lumerixa.com) - Simula um usuário que se cadastrou
        $devUser = UserModel::updateOrCreate(
            ['email' => 'dev@lumerixa.com'],
            [
                'name' => 'Maicon Douglas (Cliente Teste)',
                'password' => Hash::make('32537165'),
                'email_verified_at' => now(),
            ]
        );

        // LIMPEZA: Remover qualquer role global anterior para simular cliente real
        DB::table('role_user')->where('user_id', $devUser->id)->delete();

        // 4. Pegar o Tenant de Teste (Nexus Forge)
        $tenant = TenantModel::where('domain', 'nexus_forge')->first();

        if ($tenant) {
            // Vincular como Membro Proprietário do Tenant
            $devUser->tenants()->syncWithoutDetaching([$tenant->id => ['is_owner' => true]]);
            
            // Atribuir papel de MASTER *apenas* para este Tenant
            $devUser->assignRole('master', $tenant->id);
            
            $this->command->info("Usuário dev@lumerixa.com agora acessa APENAS o tenant '{$tenant->name}' como Master. 🚀🏆");
        } else {
            $this->command->warn("Tenant 'nexus_forge' não encontrado. Rodar SystemSeeder primeiro!");
        }

        $this->command->info('Configuração de perfis de teste finalizada com sucesso! 🚀🏆');
    }
}
