<?php
declare(strict_types=1);

namespace App\Modules\Core\Presentation\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Modules\Core\Application\UseCases\RegisterUserUseCase;
use Illuminate\Routing\Controller;

/**
 * Controller focado exclusivamente em gerenciar as requisições HTTP 
 * e passá-las para os Casos de Uso Core. Ele NÃO detém regra de negócio e 
 * NÃO se comunica com Eloquent/DB - blindando contra vulnerabilidades e sujeira.
 */
class UserController extends Controller
{
    public function store(Request $request, RegisterUserUseCase $useCase): JsonResponse
    {
        try {
            // A camada de Presentation aponta para o Use Case e lida com Exceções
            $user = $useCase->execute(
                name: $request->input('name', ''),
                email: $request->input('email', ''),
                password: $request->input('password', '')
            );

            return response()->json([
                'success' => true,
                'message' => 'Usuário inserido de forma segura no Domínio Core.',
                'data' => [
                    'id' => $user->id,
                    'email' => $user->email
                ]
            ], 201);
            
        } catch (\DomainException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 422);
        }
    }
}
