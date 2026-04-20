<?php

namespace App\Modules\Project\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Core\Domain\Traits\HasUuid7;

class KanbanColumn extends Model
{
    use HasUuid7;

    protected $fillable = [
        'project_id',
        'name',
        'position',
        'color'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'kanban_column_id')->orderBy('position');
    }
}
