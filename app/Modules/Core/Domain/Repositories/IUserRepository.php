<?php
declare(strict_types=1);

namespace App\Modules\Core\Domain\Repositories;

/**
 * Interface do Repositório.
 * Desacopla as Regras de Aplicação (Use Cases) do Eloquent/Banco de Dados.
 * Facilita a criação de Mocks nos testes unitários e reforça o Clean Architecture.
 */
interface IUserRepository
{
    public function findById(string $id): ?object;
    public function findByEmail(string $email): ?object;
    public function save(object $user): void;
}
