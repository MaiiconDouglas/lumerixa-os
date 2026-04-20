<?php

use App\Modules\Auth\Application\DTOs\RegisterWorkspaceDTO;
use App\Modules\Auth\Application\UseCases\RegisterWorkspaceUseCase;
use App\Modules\Auth\Application\UseCases\ValidateVerificationCodeUseCase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    /**
     * Teste Unitário de Fluxo de Cadastro SaaS (Lumerixa OS)
     */
    public function test_complete_onboarding_flow()
    {
        // 1. Simular Geração de Código OTP (Military Security)
        $email = 'test_ceo@lumerixa.os';
        $code = '123456';
        
        DB::table('verification_codes')->insert([
            'email' => $email,
            'code' => $code,
            'expires_at' => now()->addMinutes(15),
            'is_used' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Criar DTO de Entrada (O que viria da tela do React)
        $dto = RegisterWorkspaceDTO::fromRequest([
            'name' => 'CEO Lumerixa',
            'email' => $email,
            'cpf' => '123.456.789-00',
            'password' => 'secret123',
            'tenant_name' => 'Lumerixa Holding',
            'cnpj' => '00.000.000/0001-91',
            'cep' => '01001-000',
            'code' => $code // Código correto para o desafio
        ]);

        // 3. Executar UseCase
        $useCase = app(RegisterWorkspaceUseCase::class);
        $result = $useCase->execute($dto);

        // 4. Verificações de Integridade Relacional (Assertions)
        $this->assertArrayHasKey('user', $result);
        $this->assertArrayHasKey('tenant', $result);
        
        // Verificar se usuário foi cravado no banco
        $this->assertDatabaseHas('users', ['email' => $email]);
        
        // Verificar se a Empresa nasceu
        $this->assertDatabaseHas('tenants', ['name' => 'Lumerixa Holding']);
        
        // Verificar se o Vínculo Multi-tenant existe
        $this->assertDatabaseHas('tenant_user', [
            'user_id' => $result['user']['id'],
            'tenant_id' => $result['tenant']['id'],
            'is_owner' => true
        ]);

        echo "\n✅ TESTE DE CADASTRO LUMERIXA OS: SUCESSO ABSOLUTO!\n";
    }
}
