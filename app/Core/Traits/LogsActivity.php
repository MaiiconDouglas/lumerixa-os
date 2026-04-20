<?php

namespace App\Core\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\System\Context\TenantContext;

trait LogsActivity
{
    protected static function bootLogsActivity()
    {
        foreach (['created', 'updated', 'deleted'] as $event) {
            static::$event(function (Model $model) use ($event) {
                $model->logActivity($event);
            });
        }
    }

    protected function logActivity(string $event)
    {
        $oldValues = $event === 'updated' ? array_intersect_key($this->getRawOriginal(), $this->getDirty()) : null;
        $newValues = $event === 'deleted' ? null : $this->getDirty();

        // Evitar logs vazios em updates sem mudança real
        if ($event === 'updated' && empty($newValues)) {
            return;
        }

        DB::table('activity_logs')->insert([
            'id' => \Illuminate\Support\Str::uuid(),
            'tenant_id' => app(TenantContext::class)->getId(),
            'user_id' => Auth::id(),
            'event' => $event,
            'auditable_type' => get_class($this),
            'auditable_id' => $this->getKey(),
            'old_values' => $oldValues ? json_encode($oldValues) : null,
            'new_values' => $newValues ? json_encode($newValues) : null,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'url' => request()->fullUrl(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
