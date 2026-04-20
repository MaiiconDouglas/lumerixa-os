<?php

namespace App\Modules\Project\Domain\Models;

use App\Modules\Core\Infrastructure\Models\UserModel;
use App\Modules\Core\Infrastructure\Models\TenantModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Core\Domain\Traits\HasUuid7;

class Project extends Model
{
    use SoftDeletes, HasUuid7;

    protected $fillable = [
        'tenant_id',
        'client_id',
        'service_id',
        'name',
        'slug',
        'description',
        'status',
        'start_date',
        'end_date',
        'budget',
        'metadata'
    ];

    protected $casts = [
        'metadata' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'budget' => 'decimal:2',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(TenantModel::class, 'tenant_id');
    }

    public function columns(): HasMany
    {
        return $this->hasMany(KanbanColumn::class, 'project_id')->orderBy('position');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'project_id');
    }
}
