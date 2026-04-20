<?php
declare(strict_types=1);

namespace App\Modules\Auth\Presentation\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Modules\Auth\Application\DTOs\LoginDTO;
use App\Modules\Auth\Application\UseCases\LoginUseCase;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;

/**
 * Este Controller é minimalista de forma intencional!
 * Toda a regra de "Mass Assignment" e lógica de "Token e Hashing" pertencem 
 * aos DTOs e Use Cases respectivamente.
 */
class AuthController extends Controller
{
    public function login(Request $request, LoginUseCase $useCase): JsonResponse
    {
        // A proteção Mass Assignment mora aqui: Transformamos um Input qualquer no Contrato Certo
        $dto = LoginDTO::fromRequest($request->all());

        try {
            $result = $useCase->execute($dto);

            return response()->json([
                'success' => true,
                'message' => 'Autenticação fluida inicializada com sucesso.',
                'data' => $result
            ], 200);
            
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 401);
        }
    }
}
