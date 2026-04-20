<?php

namespace App\Modules\HR\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Core\Domain\Traits\BelongsToTenant;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class EmployeeModel extends Model
{
    use SoftDeletes, BelongsToTenant, HasUuids;

    protected $table = 'hr_employees';

    protected $fillable = [
        'tenant_id',
        'name',
        'position',
        'department',
        'salary',
        'hire_date',
        'status',
    ];

    protected $casts = [
        'salary' => 'decimal:2',
        'hire_date' => 'date',
    ];
}
