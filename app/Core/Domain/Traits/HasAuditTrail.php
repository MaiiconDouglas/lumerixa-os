<?php
declare(strict_types=1);

namespace App\Core\Domain\Traits;

use App\System\Context\TenantContext;

/**
 * Trait desenhada para gerar Trilhas de Auditoria Irrefutáveis (RN-013 / RN-017).
 */
trait HasAuditTrail
{
    public static function bootHasAuditTrail(): void
    {
        static::created(function ($model) {
            self::logAction($model, 'CREATED');
        });

        static::updated(function ($model) {
            self::logAction($model, 'UPDATED');
        });

        static::deleted(function ($model) {
            self::logAction($model, 'DELETED');
        });
    }

    protected static function logAction($model, string $action): void
    {
        // Resgatamos o contexto via Service Container
        $tenantId = app(TenantContext::class)->getId();
        $userId = auth()->id();
        
        $oldPayload = $action === 'UPDATED' ? json_encode($model->getOriginal()) : null;
        $newPayload = json_encode($model->getAttributes());
        $ipAddress = request()->ip();

        // Persistência Irrefutável (RN-017): Registro em banco de dados
        \App\Modules\Core\Infrastructure\Models\AuditLogModel::create([
            'tenant_id' => $tenantId,
            'user_id' => $userId,
            'action' => $action,
            'auditable_type' => get_class($model),
            'auditable_id' => $model->id,
            'old_payload' => $oldPayload ? json_decode($oldPayload, true) : null,
            'new_payload' => json_decode($newPayload, true),
            'ip_address' => $ipAddress,
            'user_agent' => request()->userAgent(),
        ]);
    }
}
