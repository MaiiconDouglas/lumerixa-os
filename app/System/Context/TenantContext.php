<?php
declare(strict_types=1);

namespace App\System\Context;

class TenantContext
{
    private ?string $tenantId = null;

    private ?\App\Modules\Core\Infrastructure\Models\TenantModel $tenant = null;

    public function setId(string $id): void
    {
        $this->tenantId = $id;
        $this->tenant = null; // Reset cache
    }

    public function getId(): ?string
    {
        return $this->tenantId;
    }

    public function get(): ?\App\Modules\Core\Infrastructure\Models\TenantModel
    {
        if (!$this->tenantId) {
            return null;
        }

        if (!$this->tenant) {
            $this->tenant = \App\Modules\Core\Infrastructure\Models\TenantModel::find($this->tenantId);
        }

        return $this->tenant;
    }

    public function hasTenant(): bool
    {
        return $this->tenantId !== null;
    }
}
