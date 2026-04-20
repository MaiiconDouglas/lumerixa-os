<?php

namespace App\Modules\Auth\Domain\Traits;

use App\Modules\Auth\Domain\Models\Role;
use App\System\Context\TenantContext;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasRoles
{
    /**
     * Relacionamento de Papéis escopado por Tenant através da tabela pivot.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id')
            ->withPivot('tenant_id')
            ->withTimestamps();
    }

    /**
     * Verifica se o usuário possui um papel específico (Escopado ou Soberano).
     */
    public function hasRole(string $roleSlug): bool
    {
        $tenantId = app(TenantContext::class)->getId();
        
        return $this->roles()
            ->where(function ($query) use ($tenantId) {
                // Se estivermos em um tenant, busca o papel no tenant OU o papel global (soberano)
                $query->where('role_user.tenant_id', $tenantId)
                      ->orWhereNull('role_user.tenant_id');
            })
            ->where('slug', $roleSlug)
            ->exists();
    }

    /**
     * Verifica se o usuário possui uma permissão específica.
     */
    public function hasPermission(string $permissionSlug): bool
    {
        $tenantId = app(TenantContext::class)->getId();

        return $this->roles()
            ->where(function ($query) use ($tenantId) {
                $query->where('role_user.tenant_id', $tenantId)
                      ->orWhereNull('role_user.tenant_id');
            })
            ->whereHas('permissions', function ($query) use ($permissionSlug) {
                $query->where('slug', $permissionSlug);
            })
            ->exists();
    }

    /**
     * Atribui um papel ao usuário.
     */
    public function assignRole(string $roleSlug, ?string $tenantId = null): void
    {
        // Se não for passado tenantId e não houver contexto, será uma role global
        $tenantId = $tenantId ?? app(TenantContext::class)->getId();
        $role = Role::where('slug', $roleSlug)->firstOrFail();

        // Evita duplicidade
        if (!$this->hasRole($roleSlug)) {
            $this->roles()->attach($role->id, ['tenant_id' => $tenantId]);
        }
    }
}
