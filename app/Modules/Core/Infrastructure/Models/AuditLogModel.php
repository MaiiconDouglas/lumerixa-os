<?php
declare(strict_types=1);

namespace App\Modules\Core\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use App\Core\Domain\Traits\HasUuid7;

class AuditLogModel extends Model
{
    use HasUuid7;

    protected $table = 'audit_logs';

    protected $fillable = [
        'tenant_id',
        'user_id',
        'action',
        'auditable_type',
        'auditable_id',
        'old_payload',
        'new_payload',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'old_payload' => 'array',
        'new_payload' => 'array',
    ];
}
