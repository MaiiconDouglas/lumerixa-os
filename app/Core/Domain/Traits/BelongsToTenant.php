<?php
declare(strict_types=1);

namespace App\Core\Domain\Traits;

use App\Core\Domain\Scopes\TenantScope;
use Illuminate\Support\Facades\Session;

trait BelongsToTenant
{
    /**
     * Boot da trait para registrar o Global Scope e o evento de criação.
     */
    protected static function bootBelongsToTenant(): void
    {
        static::addGlobalScope(new TenantScope());

        // Ao criar um novo registro, injeta automaticamente o tenant_id ativo
        static::creating(function ($model) {
            if (!$model->tenant_id) {
                $context = app(\App\System\Context\TenantContext::class);
                if ($context->hasTenant()) {
                    $model->tenant_id = $context->getId();
                } elseif (Session::has('active_tenant_id')) {
                    $model->tenant_id = Session::get('active_tenant_id');
                }
            }
        });
    }

    /**
     * Relação com o Tenant.
     */
    public function tenant()
    {
        // Usamos o nome completo da classe para evitar problemas de descoberta circular
        return $this->belongsTo(\App\Modules\Core\Infrastructure\Models\TenantModel::class, 'tenant_id');
    }
}
