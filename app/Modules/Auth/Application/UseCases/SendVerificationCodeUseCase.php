<?php
declare(strict_types=1);

namespace App\Modules\Auth\Application\UseCases;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

use App\System\Validation\EmailFilter;
use Illuminate\Validation\ValidationException;

/**
 * Motor de Geração de Desafios de Identidade por E-mail.
 * Baseado no Padrão de Segurança Militar (One-Time Password).
 */
class SendVerificationCodeUseCase
{
    public function execute(string $email): void
    {
        // 0. Filtro Anti-Spam / Anti-Temporary
        if (EmailFilter::isDisposable($email)) {
            throw ValidationException::withMessages([
                'email' => ['E-mails temporários não são permitidos. Use um e-mail corporativo ou de mercado.'],
            ]);
        }
        // 1. Geração do Token de Segurança de 6 dígitos aleatórios
        $code = (string) rand(100000, 999999);
        $expiresAt = now()->addMinutes(15);

        // 2. Persistência Blindada para Validação Posterior
        DB::table('verification_codes')->insert([
            'email' => $email,
            'code' => $code,
            'expires_at' => $expiresAt,
            'is_used' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 3. Despacho Real (No Laravel Cloud ou Local via Log/SMTP)
        // Aqui simularíamos o e-mail:
        // Mail::to($email)->send(new VerificationCodeMail($code));
        
        // Registrar no log local para fins de desenvolvimento do usuário local
        \Log::info("CÓDIGO DE SEGURANÇA LUMERIXA PARA {$email}: {$code}");
    }
}
