<?php
declare(strict_types=1);

namespace App\Modules\Auth\Presentation\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;
use Illuminate\Routing\Controller;
use App\Modules\Auth\Application\DTOs\RegisterWorkspaceDTO;
use App\Modules\Auth\Application\UseCases\RegisterWorkspaceUseCase;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use App\Modules\Auth\Application\UseCases\SendVerificationCodeUseCase;
use App\Modules\Auth\Application\UseCases\ValidateVerificationCodeUseCase;
use App\Modules\Auth\Presentation\Requests\RegisterWorkspaceRequest;
use App\Modules\Auth\Presentation\Requests\SendCodeRequest;
use App\Modules\Auth\Presentation\Requests\VerifyCodeRequest;

/**
 * Controller Inertia limpo. Receptáculo puro não carrega logicas pesadas.
 */
class RegisterController extends Controller
{
    #[OA\Get(
        path: "/register",
        tags: ["Authentication"],
        summary: "Visualiza página de registro"
    )]
    #[OA\Response(response: 200, description: "Página Inertia Renderizada")]
    public function create()
    {
        return Inertia::render('Modules/Auth/Pages/Register');
    }

    #[OA\Post(
        path: "/auth/register",
        tags: ["Authentication"],
        summary: "Consolida Cadastro de Empresa e Usuário Master"
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "email", type: "string", format: "email"),
                new OA\Property(property: "password", type: "string"),
                new OA\Property(property: "tenant_name", type: "string")
            ]
        )
    )]
    #[OA\Response(response: 302, description: "Redirecionamento Pós-cadastro")]
    public function store(RegisterWorkspaceRequest $request, RegisterWorkspaceUseCase $useCase)
    {
        try {
            // 1. Purificação Imediata via Request Validado
            $dto = RegisterWorkspaceDTO::fromRequest($request->validated());

            // 2. Repassa às engrenagens seguras de Banco no UseCase
            $result = $useCase->execute($dto);
            
            // 3. Autenticação e Injeção de Sessão Soberana
            // Garantimos que o ID do Tenant esteja na sessão ANTES do redirecionamento
            Auth::loginUsingId($result['user']['id']);
            $request->session()->put('active_tenant_id', (string) $result['tenant']['id']);
            $request->session()->regenerate(); // Segurança extra
            
            // 4. Despacha o Redirecionamento Direto para o Dashboard Inovador
            return redirect('/dashboard')->with('success', 'Workspace Criado com Sucesso! Bem-vindo ao Lumerixa OS.');

        } catch (ValidationException $e) {
            // Joga os erros de validação de campo
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            // Captura erros sistêmicos (ex: DB, Roles) para que o usuário saiba o que houve
            \Illuminate\Support\Facades\Log::error("FALHA CRÍTICA NO REGISTRO: " . $e->getMessage());
            return back()->withErrors(['email' => 'Ocorreu uma falha na consolidação do Workspace: ' . $e->getMessage()]);
        }
    }

    /**
     * Solicitação de Segurança: Gera e despacha o desafio via e-mail.
     */
    public function sendCode(SendCodeRequest $request, SendVerificationCodeUseCase $useCase)
    {
        try {
            $useCase->execute($request->email);
            return response()->json(['success' => true, 'message' => 'Código de 6 dígitos enviado ao e-mail corporativo.']);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false, 
                'message' => $e->getMessage(),
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Validação em tempo real do código OTP para progressão de fluxo.
     */
    public function verifyCode(VerifyCodeRequest $request, ValidateVerificationCodeUseCase $useCase)
    {
        try {
            $useCase->execute($request->email, $request->code, false);
            return response()->json(['success' => true, 'message' => 'Identidade Verificada. Acesso liberado.']);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false, 
                'message' => 'Código inválido ou expirado.',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Proxy para consulta de CNPJ (Evita erros de CORS no navegador).
     */
    public function proxyCnpj(string $cnpj)
    {
        try {
            $response = \Illuminate\Support\Facades\Http::get("https://publica.cnpj.ws/cnpj/{$cnpj}");
            return response()->json($response->json(), $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Falha ao conectar com o serviço de CNPJ.'], 500);
        }
    }
}
