<?php

namespace App\Modules\Projects\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class TaskModel extends Model
{
    use SoftDeletes, HasUuids;

    protected $table = 'project_tasks';

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'status',
        'priority',
    ];

    public function project()
    {
        return $this->belongsTo(ProjectModel::class, 'project_id');
    }
}
