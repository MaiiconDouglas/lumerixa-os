<?php
declare(strict_types=1);

namespace App\Modules\Core\Infrastructure\Models;

use App\Core\Domain\Traits\HasUuid7;
use App\Core\Domain\Traits\HasAuditTrail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Representação da Entidade Tenant (CNPJ/Empresa) no Eloquent.
 */
class TenantModel extends Model
{
    use HasUuid7, HasAuditTrail, SoftDeletes;

    protected $table = 'tenants';

    protected $fillable = [
        'name',
        'razao_social',
        'nome_fantasia',
        'cnpj',
        'account_type',
        'domain',
        'is_active',
        'cep',
        'logradouro',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'uf',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Mapeamento reverso dos membros humanos vinculados a esta conta mestra.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(UserModel::class, 'tenant_user', 'tenant_id', 'user_id')
                    ->withPivot('is_owner')
                    ->withTimestamps();
    }
}
