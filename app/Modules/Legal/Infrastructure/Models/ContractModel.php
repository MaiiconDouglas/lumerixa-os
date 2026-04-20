<?php

namespace App\Modules\Legal\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Core\Domain\Traits\BelongsToTenant;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ContractModel extends Model
{
    use SoftDeletes, BelongsToTenant, HasUuids;

    protected $table = 'legal_contracts';

    protected $fillable = [
        'tenant_id',
        'title',
        'type',
        'status',
        'start_date',
        'end_date',
        'value',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'value' => 'decimal:2',
    ];
}
