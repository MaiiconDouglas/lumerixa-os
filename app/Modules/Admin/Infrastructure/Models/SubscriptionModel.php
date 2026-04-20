<?php
declare(strict_types=1);

namespace App\Modules\Admin\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Core\Domain\Traits\HasUuid7;

class SubscriptionModel extends Model
{
    use HasUuid7, SoftDeletes;

    protected $table = 'subscriptions';

    protected $fillable = [
        'tenant_id',
        'plan_id',
        'status',
        'trial_ends_at',
        'ends_at',
        'payment_method',
    ];

    protected $casts = [
        'trial_ends_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function plan()
    {
        return $this->belongsTo(PlanModel::class, 'plan_id');
    }

    public function tenant()
    {
        return $this->belongsTo(\App\Modules\Core\Infrastructure\Models\TenantModel::class, 'tenant_id');
    }
}
