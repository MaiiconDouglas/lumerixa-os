<?php

namespace App\Modules\Auth\Domain\Models;

use App\Core\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasUuid;

    protected $fillable = ['name', 'slug', 'perfil_cnpj'];

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'permission_role');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(\App\Modules\Core\Infrastructure\Models\UserModel::class, 'role_user')
            ->withPivot('tenant_id');
    }
}
