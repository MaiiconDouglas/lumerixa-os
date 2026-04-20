<?php
declare(strict_types=1);

namespace App\Modules\Core\Infrastructure\Repositories;

use App\Modules\Core\Domain\Repositories\IUserRepository;
use App\Modules\Core\Infrastructure\Models\UserModel;

/**
 * Mapeador pragmático oficial entre a Clean Architecture e o Eloquent ORM.
 * Este Repository implementa o IUserRepository do Domínio Core.
 * Ele permite que o Cadastro e o Login nunca saibam o que é um Model do Laravel!
 */
class UserRepository implements IUserRepository
{
    public function findById(string $id): ?object
    {
        return UserModel::find($id);
    }

    public function findByEmail(string $email): ?object
    {
        return UserModel::where('email', $email)->first();
    }

    public function save(object $user): void
    {
        if ($user instanceof UserModel) {
            $user->save();
        } else {
            throw new \InvalidArgumentException("O Objeto fornecido não pode ser persistido neste Banco MySQL.");
        }
    }
}
