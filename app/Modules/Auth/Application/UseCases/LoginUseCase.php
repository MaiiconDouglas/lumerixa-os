<?php
declare(strict_types=1);

namespace App\Modules\Auth\Application\UseCases;

use App\Modules\Auth\Application\DTOs\LoginDTO;
use App\Modules\Core\Domain\Repositories\IUserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * Caso de Uso central de Autenticação.
 * Aqui respeitamos a integridade total do usuário e checamos o banco de dados
 * SEM que o Controller saiba como a verificação é feita.
 */
class LoginUseCase
{
    public function __construct(
        private IUserRepository $userRepository
    ) {}

    public function execute(LoginDTO $dto): array
    {
        // 1. Invocando o contrato do Core para resgatar o usuário
        $user = $this->userRepository->findByEmail($dto->email);

        // 2. Validação Zero Trust (Timing attack safe usando Hash::check do Laravel)
        if (! $user || ! Hash::check($dto->password, $user->password)) {
            // Em Clean Arch podemos usar DTOs de Erro ou Exceptions próprias limitadas ao domínio.
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas ou não existem.'],
            ]);
        }

        // 3. Geração do Token SPA / API Stateless do Sanctum com Plaint Text Seguro
        $tokenName = 'lumerixa_saas_access';
        $token = $user->createToken($tokenName, ['*'])->plainTextToken;

        // 4. Se o DTO continha o CNPJ (Tenant) selecionado pela UI, 
        // poderíamos despachar aqui um evento para registrar no Log de Eventos de Cibersegurança que o User logou na Empresa X.

        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token,
        ];
    }
}
