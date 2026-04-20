<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Modules\Core\Infrastructure\Models\UserModel;
use Illuminate\Support\Facades\Hash;

class AdminMasterSeeder extends Seeder
{
    /**
     * Garante a existência do usuário SOBERANO do sistema.
     */
    public function run(): void
    {
        $admin = UserModel::updateOrCreate(
            ['email' => 'admin@lumerixa.ai'],
            [
                'name' => 'Super Admin Lumerixa',
                'password' => Hash::make('lumerixa123'),
                'email_verified_at' => now(),
            ]
        );

        // Atribuir o papel de governança global
        if (!$admin->hasRole('super-admin')) {
            $admin->assignRole('super-admin');
        }
    }
}
