<?php
declare(strict_types=1);

namespace App\Modules\Auth\Application\UseCases;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Validador de Prova de Posse de Identidade.
 */
class ValidateVerificationCodeUseCase
{
    public function execute(string $email, string $code, bool $burn = true): bool
    {
        $verification = DB::table('verification_codes')
            ->where('email', $email)
            ->where('code', $code)
            ->where('is_used', false)
            ->where('expires_at', '>', now())
            ->first();

        if (! $verification) {
            throw ValidationException::withMessages([
                'code' => ['O código fornecido é inválido ou já expirou. Peça um novo desafio.'],
            ]);
        }

        // Marcar desafio como completado apenas na etapa final (para impedir ataques de Replay)
        if ($burn) {
            DB::table('verification_codes')
                ->where('id', $verification->id)
                ->update(['is_used' => true]);
        }

        return true;
    }
}
