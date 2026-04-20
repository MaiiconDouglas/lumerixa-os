<?php
declare(strict_types=1);

namespace App\Modules\Auth\Application\UseCases;

use App\Modules\Auth\Application\DTOs\RegisterWorkspaceDTO;
use App\Modules\Core\Infrastructure\Models\UserModel;
use App\Modules\Core\Infrastructure\Models\TenantModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * Motor transacional de Cadastro (Use Case).
 * Ele engloba a inserção simultânea dos alicerces SaaS (Pessoa, Empresa e Permissão) garantindo "All or Nothing" num Fail-Safe DB.
 */
class RegisterWorkspaceUseCase
{
    public function __construct(
        private ValidateVerificationCodeUseCase $validator
    ) {}

    public function execute(RegisterWorkspaceDTO $dto): array
    {
        // 1. Validação de Prova de Posse (Código de Segurança Militar)
        $this->validator->execute($dto->email, $dto->verificationCode);

        // 2. Proteção contra duplicação de CPF/Email
        if (UserModel::where('email', $dto->email)->orWhere('cpf', $dto->cpf)->exists()) {
            throw ValidationException::withMessages([
                'email' => ['A Identidade (CPF/Email) já possui um Workspace registrado.'],
            ]);
        }

        return DB::transaction(function () use ($dto) {
            
            // 3. Fundação Empresarial Expandida (Cadastro de CNPJ + Endereço Físico)
            $tenant = TenantModel::create([
                'name' => $dto->tenantName,
                'cnpj' => !empty($dto->cnpj) ? $dto->cnpj : null,
                'account_type' => $dto->accountType,
                'is_active' => true,
                'cep' => $dto->cep,
                'logradouro' => $dto->logradouro,
                'numero' => $dto->numero,
                'complemento' => $dto->complemento,
                'bairro' => $dto->bairro,
                'cidade' => $dto->cidade,
                'uf' => $dto->uf,
            ]);

            // 4. Fundação Pessoal (Usuário Identidade com CPF e Telefone)
            $user = UserModel::create([
                'name' => $dto->userName,
                'email' => $dto->email,
                'cpf' => $dto->cpf,
                'phone' => $dto->phone,
                'password' => Hash::make($dto->password),
            ]);

            // 5. Elo de Propriedade e Autoridade (ACL Master)
            $user->tenants()->attach($tenant->id, ['is_owner' => true]);
            $user->assignRole('master', (string) $tenant->id);

            $token = $user->createToken('lumerixa_root_access')->plainTextToken;

            return [
                'user' => ['id' => $user->id, 'name' => $user->name, 'cpf' => $user->cpf],
                'tenant' => ['id' => $tenant->id, 'name' => $tenant->name],
                'token' => $token
            ];
        });
    }
}
