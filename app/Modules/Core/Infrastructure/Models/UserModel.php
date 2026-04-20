<?php
declare(strict_types=1);

namespace App\Modules\Core\Infrastructure\Models;

use App\Core\Domain\Traits\HasUuid7;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Core\Domain\Traits\HasAuditTrail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Permission\Traits\HasRoles; // Após a instalação do pacote na Fase 2

use App\Modules\Auth\Domain\Traits\HasRoles;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserModel extends Authenticatable
{
    // Tokens de Sessão (Sanctum) + UUIDv7 de alta performance + Trilha de Auditoria automática + ACL Permissões + Preservação de Histórico
    use HasApiTokens, Notifiable, HasUuid7, HasAuditTrail, HasRoles, SoftDeletes, HasFactory; 
    
    // Assegurando qual tabela esse model mapeia para não gerar falhas de resolução de nome do Module
    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'cpf',
        'phone',
        'password',
        'profile_photo_path',
        'cep',
        'address',
        'number',
        'complement',
        'neighborhood',
        'city',
        'state',
    ];

    /**
     * Get the URL to the user's profile photo.
     */
    public function getProfilePhotoUrlAttribute(): string
    {
        return $this->profile_photo_path
                    ? \Illuminate\Support\Facades\Storage::url($this->profile_photo_path)
                    : 'https://ui-avatars.com/api/?name='.urlencode($this->name).'&color=f53003&background=000';
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relação fundamental: Em quais empresas este CPF/Membro trabalha/opera?
     */
    public function tenants(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(TenantModel::class, 'tenant_user', 'user_id', 'tenant_id')
                    ->withPivot('is_owner')
                    ->withTimestamps();
    }
}
