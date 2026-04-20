<?php

namespace App\Modules\Auth\Presentation\Controllers;

use App\Modules\Core\Infrastructure\Models\UserModel as User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class ProfileController extends Controller
{
    /**
     * Exibe a página de configurações do usuário.
     */
    public function edit(Request $request)
    {
        $user = $request->user();

        // Buscar auditoria pessoal resiliente
        $activityLogs = collect([]);
        if (\Illuminate\Support\Facades\Schema::hasTable('activity_logs')) {
            $activityLogs = \Illuminate\Support\Facades\DB::table('activity_logs')
                ->where('user_id', $user->id)
                ->latest()
                ->limit(10)
                ->get();
        }

        // Buscar sessões ativas (resiliente ao driver)
        $sessions = collect([]);
        if (config('session.driver') === 'database' && \Illuminate\Support\Facades\Schema::hasTable('sessions')) {
            $sessions = \Illuminate\Support\Facades\DB::table('sessions')
                ->where('user_id', $user->id)
                ->get()
                ->map(function ($session) {
                    return (object) [
                        'id' => $session->id,
                        'ip_address' => $session->ip_address,
                        'is_current_device' => $session->id === request()->session()->getId(),
                        'last_active' => \Carbon\Carbon::createFromTimestamp($session->last_activity)->diffForHumans(),
                        'user_agent' => $session->user_agent,
                    ];
                });
        }

        // Dados de 2FA
        $qrCodeUrl = null;
        if (!$user->two_factor_confirmed_at && $user->two_factor_secret) {
            $qrCodeUrl = \PragmaRX\Google2FALaravel\Facade::getQRCodeInline(
                config('app.name'),
                $user->email,
                $user->two_factor_secret
            );
        }

        return Inertia::render('Auth/Pages/Settings/Profile', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'cpf' => $user->cpf,
                'profile_photo_url' => $user->profile_photo_url,
                'created_at' => $user->created_at,
                'cep' => $user->cep,
                'address' => $user->address,
                'number' => $user->number,
                'complement' => $user->complement,
                'neighborhood' => $user->neighborhood,
                'city' => $user->city,
                'state' => $user->state,
            ],
            'activeTenant' => app(\App\System\Context\TenantContext::class)->get()
        ]);
    }

    /**
     * Exibe a aba de privacidade e segurança.
     */
    public function privacy(Request $request)
    {
        $user = $request->user();

        // Buscar sessões ativas (resiliente ao driver)
        $sessions = collect([]);
        if (config('session.driver') === 'database' && \Illuminate\Support\Facades\Schema::hasTable('sessions')) {
            $sessions = \Illuminate\Support\Facades\DB::table('sessions')
                ->where('user_id', $user->id)
                ->get()
                ->map(function ($session) {
                    return (object) [
                        'id' => $session->id,
                        'ip_address' => $session->ip_address,
                        'is_current_device' => $session->id === request()->session()->getId(),
                        'last_active' => \Carbon\Carbon::createFromTimestamp($session->last_activity)->diffForHumans(),
                        'user_agent' => $session->user_agent,
                    ];
                });
        }

        // Buscar auditoria pessoal resiliente
        $activityLogs = collect([]);
        if (\Illuminate\Support\Facades\Schema::hasTable('activity_logs')) {
            $activityLogs = \Illuminate\Support\Facades\DB::table('activity_logs')
                ->where('user_id', $user->id)
                ->latest()
                ->limit(10)
                ->get();
        }

        // Dados de 2FA
        $qrCodeUrl = null;
        if (!$user->two_factor_confirmed_at && $user->two_factor_secret) {
            $qrCodeUrl = \PragmaRX\Google2FALaravel\Facade::getQRCodeInline(
                config('app.name'),
                $user->email,
                $user->two_factor_secret
            );
        }

        return Inertia::render('Auth/Pages/Settings/Privacy', [
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
            ],
            'sessions' => $sessions,
            'activityLogs' => $activityLogs,
            'twoFactor' => [
                'enabled' => (bool) $user->two_factor_enabled,
                'confirmed' => (bool) $user->two_factor_confirmed_at,
                'qrCodeUrl' => $qrCodeUrl,
                'secret' => $user->two_factor_secret,
            ]
        ]);
    }

    /**
     * Atualiza as informações básicas do perfil.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'cpf' => ['nullable', 'string', 'max:20'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'], // Max 2MB
            'cep' => ['nullable', 'string', 'max:10'],
            'address' => ['nullable', 'string', 'max:255'],
            'number' => ['nullable', 'string', 'max:20'],
            'complement' => ['nullable', 'string', 'max:255'],
            'neighborhood' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:50'],
        ]);

        if ($request->hasFile('photo')) {
            if ($user->profile_photo_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($user->profile_photo_path);
            }
            $user->profile_photo_path = $request->file('photo')->store('profile-photos', 'public');
        }

        $user->fill([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'cpf' => $validated['cpf'],
            'cep' => $validated['cep'],
            'address' => $validated['address'],
            'number' => $validated['number'],
            'complement' => $validated['complement'],
            'neighborhood' => $validated['neighborhood'],
            'city' => $validated['city'],
            'state' => $validated['state'],
        ]);

        $user->save();

        return back()->with('success', 'Sua identidade foi protocolada com sucesso no ecossistema.');
    }

    /**
     * Inicia o processo de alteração segura de e-mail.
     */
    public function requestEmailChange(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($request->user()->id)],
        ]);

        $user = $request->user();
        $code = rand(100000, 999999);

        // Armazenar na sessão por 15 minutos
        $request->session()->put('email_change', [
            'new_email' => $request->email,
            'code' => $code,
            'expires_at' => now()->addMinutes(15),
        ]);

        // Simulação de envio de e-mail (Log)
        \Illuminate\Support\Facades\Log::info("Email change code for user {$user->id}: {$code}. Sending to {$user->email} and {$request->email}");

        // No futuro, usar Mail::to($user->email)->send(...) e Mail::to($request->email)->send(...)

        return back()->with('success', 'Códigos de verificação enviados para ambos os e-mails.');
    }

    /**
     * Confirma a alteração de e-mail via código.
     */
    public function confirmEmailChange(Request $request)
    {
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ]);

        $changeData = $request->session()->get('email_change');

        if (!$changeData || now()->isAfter($changeData['expires_at'])) {
            return back()->withErrors(['code' => 'Solicitação expirada ou inexistente.']);
        }

        if ($request->code !== (string) $changeData['code']) {
            return back()->withErrors(['code' => 'Código de verificação inválido.']);
        }

        $user = $request->user();
        $user->email = $changeData['new_email'];
        $user->email_verified_at = null;
        $user->save();

        $request->session()->forget('email_change');

        return back()->with('success', 'E-mail atualizado com sucesso.');
    }

    /**
     * Atualiza a senha do usuário.
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Senha alterada com sucesso.');
    }

    /**
     * Encerra todas as sessões em outros dispositivos.
     */
    public function logoutOtherSessions(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        \Illuminate\Support\Facades\Auth::logoutOtherDevices($request->password);

        return back()->with('success', 'Sessões em outros dispositivos encerradas.');
    }

    /**
     * Deleta a conta do usuário (Danger Zone).
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        \Illuminate\Support\Facades\Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
