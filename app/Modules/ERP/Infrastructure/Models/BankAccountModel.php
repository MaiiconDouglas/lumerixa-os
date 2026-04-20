<?php

namespace App\Modules\ERP\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Core\Domain\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class BankAccountModel extends Model
{
    use SoftDeletes, BelongsToTenant, HasUuids;

    protected $table = 'erp_bank_accounts';

    protected $fillable = [
        'tenant_id',
        'name',
        'bank_name',
        'type',
        'balance',
        'is_active',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
        'is_active' => 'boolean',
    ];
}
