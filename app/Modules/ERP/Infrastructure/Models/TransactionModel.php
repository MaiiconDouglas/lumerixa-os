<?php

namespace App\Modules\ERP\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Core\Domain\Traits\BelongsToTenant;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class TransactionModel extends Model
{
    use SoftDeletes, BelongsToTenant, HasUuids;

    protected $table = 'erp_transactions';

    protected $fillable = [
        'tenant_id',
        'type',
        'category',
        'amount',
        'due_date',
        'paid_at',
        'description',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'paid_at' => 'date',
    ];
}
