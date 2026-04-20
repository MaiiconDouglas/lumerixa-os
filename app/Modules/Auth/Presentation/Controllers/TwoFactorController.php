<?php

namespace App\Modules\Auth\Presentation\Controllers;

use App\Modules\Core\Infrastructure\Models\UserModel as User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use PragmaRX\Google2FALaravel\Facade as Google2FA;
use Illuminate\Support\Facades\Auth;

class TwoFactorController extends Controller
{
    /**
     * Inicia o processo de ativação do 2FA.
     */
    public function enable(Request $request)
    {
        $user = $request->user();
        
        if (!$user->two_factor_secret) {
            $user->two_factor_secret = Google2FA::generateSecretKey();
            $user->save();
        }

        $qrCodeUrl = Google2FA::getQRCodeInline(
            config('app.name'),
            $user->email,
            $user->two_factor_secret
        );

        return Inertia::render('Auth/Pages/Settings/TwoFactor', [
            'qrCodeUrl' => $qrCodeUrl,
            'secret' => $user->two_factor_secret,
            'enabled' => $user->two_factor_enabled
        ]);
    }

    /**
     * Confirma e ativa o 2FA.
     */
    public function confirm(Request $request)
    {
        $request->validate(['code' => 'required|string']);
        $user = $request->user();

        $valid = Google2FA::verifyKey($user->two_factor_secret, $request->code);

        if ($valid) {
            $user->two_factor_confirmed_at = now();
            $user->two_factor_enabled = true;
            $user->save();

            return back()->with('success', 'Autenticação de dois fatores ativada!');
        }

        return back()->withErrors(['code' => 'O código informado é inválido.']);
    }

    /**
     * Desativa o 2FA.
     */
    public function disable(Request $request)
    {
        $user = $request->user();
        $user->two_factor_enabled = false;
        $user->two_factor_secret = null;
        $user->two_factor_confirmed_at = null;
        $user->save();

        return back()->with('success', '2FA desativado.');
    }

    /**
     * Página de desafio após login.
     */
    public function challenge()
    {
        if (!session('2fa_pending_user_id')) {
            return redirect()->route('login');
        }

        return Inertia::render('Auth/Pages/TwoFactorChallenge');
    }

    /**
     * Verifica o código durante o login.
     */
    public function verify(Request $request)
    {
        $request->validate(['code' => 'required|string']);
        
        $userId = session('2fa_pending_user_id');
        if (!$userId) return redirect()->route('login');

        $user = User::findOrFail($userId);
        $valid = Google2FA::verifyKey($user->two_factor_secret, $request->code);

        if ($valid) {
            Auth::login($user);
            session()->forget('2fa_pending_user_id');
            return redirect()->intended('/dashboard');
        }

        return back()->withErrors(['code' => 'Código inválido.']);
    }
}
