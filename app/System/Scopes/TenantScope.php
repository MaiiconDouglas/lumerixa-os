<?php
declare(strict_types=1);

namespace App\System\Scopes;

use App\System\Context\TenantContext;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TenantScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        /** @var TenantContext $context */
        $context = app(TenantContext::class);

        // Se há um tenant ativo no contexto, forçamos o filtro.
        if ($context->hasTenant()) {
            $builder->where($model->getTable() . '.tenant_id', $context->getId());
        }
    }
}
