<?php
declare(strict_types=1);

namespace App\Core\Domain\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use App\System\Context\TenantContext;

class TenantScope implements Scope
{
    /**
     * Aplica o filtro de tenant_id em todas as consultas.
     */
    public function apply(Builder $builder, Model $model): void
    {
        // 1. Super Admin Bypass (RN-009): Administradores globais podem ver tudo
        // Nota: auth()->user() pode retornar o UserModel que possui a trait HasRoles
        if (auth()->check() && auth()->user()->hasRole('admin')) {
            return;
        }

        // 2. Filtro Regular: Obtemos o contexto do tenant via service container
        $context = app(TenantContext::class);
        
        if ($context->hasTenant()) {
            $builder->where($model->getTable() . '.tenant_id', $context->getId());
        }
    }
}
