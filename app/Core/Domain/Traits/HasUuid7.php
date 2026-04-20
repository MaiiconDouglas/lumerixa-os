<?php
declare(strict_types=1);

namespace App\Core\Domain\Traits;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;

trait HasUuid7
{
    use HasUuids;

    /**
     * Generate a new UUID for the model.
     * Overrides HasUuids to use UUIDv7 (timestamp ordered) instead of UUIDv4.
     */
    public function newUniqueId(): string
    {
        return (string) Str::uuid7();
    }
}
