<?php

namespace App\Modules\CRM\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Core\Domain\Traits\BelongsToTenant; // Assumindo que a trait de isolamento existe aqui

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class LeadModel extends Model
{
    use SoftDeletes, BelongsToTenant, HasUuids;

    protected $table = 'crm_leads';

    protected $fillable = [
        'tenant_id',
        'name',
        'email',
        'phone',
        'status',
        'opportunity_value',
        'notes',
    ];

    protected $casts = [
        'opportunity_value' => 'decimal:2',
    ];
}
