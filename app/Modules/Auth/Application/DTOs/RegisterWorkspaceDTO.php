<?php
declare(strict_types=1);

namespace App\Modules\Auth\Application\DTOs;

/**
 * Escudo Frontend -> Backend
 * Nenhuma requisição entra no banco sem passar pelo formato estrito daqui.
 */
final class RegisterWorkspaceDTO
{
    public function __construct(
        public readonly string $userName,
        public readonly string $email,
        public readonly string $cpf,
        public readonly string $password,
        public readonly string $tenantName,
        public readonly string $accountType = 'PJ',
        public readonly string $cnpj = '',
        public readonly string $phone = '',
        public readonly string $cep = '',
        public readonly string $logradouro = '',
        public readonly string $numero = '',
        public readonly string $complemento = '',
        public readonly string $bairro = '',
        public readonly string $cidade = '',
        public readonly string $uf = '',
        public readonly string $verificationCode = ''
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            userName: $data['name'] ?? '',
            email: $data['email'] ?? '',
            cpf: $data['cpf'] ?? '',
            password: $data['password'] ?? '',
            tenantName: $data['tenant_name'] ?? '',
            accountType: $data['account_type'] ?? 'PJ',
            cnpj: $data['cnpj'] ?? '',
            phone: $data['phone'] ?? '',
            cep: $data['cep'] ?? '',
            logradouro: $data['logradouro'] ?? '',
            numero: $data['numero'] ?? '',
            complemento: $data['complemento'] ?? '',
            bairro: $data['bairro'] ?? '',
            cidade: $data['cidade'] ?? '',
            uf: $data['uf'] ?? '',
            verificationCode: $data['code'] ?? ''
        );
    }
}
