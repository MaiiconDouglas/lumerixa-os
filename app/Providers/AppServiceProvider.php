<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Modules\Core\Domain\Repositories\IUserRepository;
use App\Modules\Core\Infrastructure\Repositories\UserRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Binding de Repositórios do Domínio Core
        $this->app->bind(IUserRepository::class, UserRepository::class);

        // Registro do Contexto do Tenant como Singleton para isolamento global
        $this->app->singleton(\App\System\Context\TenantContext::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
