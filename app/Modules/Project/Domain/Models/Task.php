<?php

namespace App\Modules\Project\Domain\Models;

use App\Modules\Core\Infrastructure\Models\UserModel;
use App\Modules\Core\Infrastructure\Models\TenantModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Core\Domain\Traits\HasUuid7;

class Task extends Model
{
    use SoftDeletes, HasUuid7;

    protected $fillable = [
        'tenant_id',
        'project_id',
        'kanban_column_id',
        'user_id',
        'title',
        'description',
        'priority',
        'position',
        'due_date',
        'tags',
        'estimated_hours',
        'actual_hours'
    ];

    protected $casts = [
        'tags' => 'array',
        'due_date' => 'date',
        'estimated_hours' => 'decimal:2',
        'actual_hours' => 'decimal:2',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(TenantModel::class, 'tenant_id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function column(): BelongsTo
    {
        return $this->belongsTo(KanbanColumn::class, 'kanban_column_id');
    }

    public function responsible(): BelongsTo
    {
        return $this->belongsTo(UserModel::class, 'user_id');
    }
}
