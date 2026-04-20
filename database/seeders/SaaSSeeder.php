<?php
declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Modules\Admin\Infrastructure\Models\PlanModel;

class SaaSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Start',
                'slug' => 'start',
                'description' => 'Ideal para profissionais liberais e pequenas empresas.',
                'price_monthly' => 99.00,
                'price_yearly' => 990.00,
                'features' => [
                    'max_users' => 5,
                    'max_companies' => 1,
                    'storage_gb' => 5,
                    'support' => 'email',
                ],
            ],
            [
                'name' => 'Growth',
                'slug' => 'growth',
                'description' => 'Para empresas em crescimento que precisam de mais braço.',
                'price_monthly' => 299.00,
                'price_yearly' => 2990.00,
                'features' => [
                    'max_users' => 20,
                    'max_companies' => 3,
                    'storage_gb' => 20,
                    'support' => 'chat',
                ],
            ],
            [
                'name' => 'Scale',
                'slug' => 'scale',
                'description' => 'Estrutura completa para médias empresas.',
                'price_monthly' => 799.00,
                'price_yearly' => 7990.00,
                'features' => [
                    'max_users' => 100,
                    'max_companies' => 10,
                    'storage_gb' => 100,
                    'support' => 'priority',
                ],
            ],
            [
                'name' => 'Enterprise',
                'slug' => 'enterprise',
                'description' => 'Volume massivo e IA avançada para grandes corporações.',
                'price_monthly' => 1999.00,
                'price_yearly' => 19990.00,
                'features' => [
                    'max_users' => 0, // ilimitado
                    'max_companies' => 0, // ilimitado
                    'storage_gb' => 1000,
                    'support' => '24/7 Dedicated',
                ],
            ],
        ];

        foreach ($plans as $plan) {
            PlanModel::firstOrCreate(['slug' => $plan['slug']], $plan);
        }
    }
}
