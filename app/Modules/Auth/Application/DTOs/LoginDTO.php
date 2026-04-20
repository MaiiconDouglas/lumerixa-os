<?php
declare(strict_types=1);

namespace App\Modules\Auth\Application\DTOs;

/**
 * DTO que blinda a camada de aplicação purificando Request da Apresentação.
 * Combate frontal à Mass Assignment (A01 OWASP).
 */
final class LoginDTO
{
    public function __construct(
        public readonly string $email,
        public readonly string $password,
        public readonly ?string $tenantId = null
    ) {}

    public static function fromRequest(array $data): self
    {
        /** 
         * Qualquer dado externo além dos descritos aqui será descartado. 
         */
        return new self(
            email: $data['email'] ?? '',
            password: $data['password'] ?? '',
            tenantId: $data['tenant_id'] ?? null
        );
    }
}
