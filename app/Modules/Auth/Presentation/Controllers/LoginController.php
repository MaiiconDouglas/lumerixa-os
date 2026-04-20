<?php

namespace App\Modules\Auth\Presentation\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function create()
    {
        return Inertia::render('Modules/Auth/Pages/Login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $user = Auth::user();

            if ($user->two_factor_enabled) {
                // Logout imediato e redirecionamento para desafio
                Auth::logout();
                session(['2fa_pending_user_id' => $user->id]);
                
                return redirect()->route('2fa.challenge');
            }

            $request->session()->regenerate();

            // Redirecionamento Inteligente Lumerixa OS
            if ($user->hasRole('super-admin')) {
                return redirect()->route('admin.dashboard');
            }

            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'email' => 'As credenciais fornecidas não correspondem aos nossos registros.',
        ])->onlyInput('email');
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
