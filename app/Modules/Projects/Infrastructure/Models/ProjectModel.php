<?php

namespace App\Modules\Projects\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Core\Domain\Traits\BelongsToTenant;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProjectModel extends Model
{
    use SoftDeletes, BelongsToTenant, HasUuids;

    protected $table = 'project_projects';

    protected $fillable = [
        'tenant_id',
        'name',
        'description',
        'status',
        'due_date',
    ];

    protected $casts = [
        'due_date' => 'date',
    ];

    public function tasks()
    {
        return $this->hasMany(TaskModel::class, 'project_id');
    }
}
