<?php
declare(strict_types=1);

namespace App\Modules\Core\Application\UseCases;

use App\Modules\Core\Domain\Repositories\IUserRepository;
use Illuminate\Support\Facades\Hash;
use App\Modules\Core\Infrastructure\Models\UserModel;

class RegisterUserUseCase
{
    /**
     * Inversão de Dependência garantida no construtor.
     */
    public function __construct(
        private IUserRepository $userRepository
    ) {}

    /**
     * Fluxo completo e encapsulado. Um Controller NUNCA deve chamar o Hash 
     * e o Model individualmente.
     */
    public function execute(string $name, string $email, string $password): UserModel
    {
        // 1. Domain Rule pura sem vazamento para interface
        if ($this->userRepository->findByEmail($email)) {
            throw new \DomainException("O E-mail já está em uso na base global.");
        }

        // 2. Orquestração e Entidade
        $user = new UserModel();
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);

        // 3. Persistência
        $this->userRepository->save($user);

        return $user;
    }
}
