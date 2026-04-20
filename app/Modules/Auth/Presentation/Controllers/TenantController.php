<?php

namespace App\Modules\Auth\Presentation\Controllers;

use App\Modules\Core\Infrastructure\Models\TenantModel;
use App\System\Context\TenantContext;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TenantController extends Controller
{
    /**
     * Exibe a página de configurações da organização.
     */
    public function edit()
    {
        $tenant = app(TenantContext::class)->get();

        if (!$tenant) {
            return redirect()->route('dashboard')->with('error', 'Nenhuma organização ativa selecionada.');
        }

        // Verifica se o usuário tem permissão para gerenciar o tenant (ex: dono ou admin)
        // Por enquanto, simplificamos permitindo se ele for membro do tenant_user com is_owner = true
        $isOwner = \Illuminate\Support\Facades\DB::table('tenant_user')
            ->where('tenant_id', $tenant->id)
            ->where('user_id', auth()->id())
            ->where('is_owner', true)
            ->exists();

        return Inertia::render('Auth/Pages/Settings/Organization', [
            'tenant' => $tenant,
            'isOwner' => $isOwner
        ]);
    }

    /**
     * Atualiza os dados da organização.
     */
    public function update(Request $request)
    {
        $tenant = app(TenantContext::class)->get();

        if (!$tenant) {
            return back()->with('error', 'Operação não permitida.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'razao_social' => ['nullable', 'string', 'max:255'],
            'nome_fantasia' => ['nullable', 'string', 'max:255'],
            'cnpj' => ['nullable', 'string', 'max:20'],
            'domain' => ['nullable', 'string', 'max:255', 'unique:tenants,domain,' . $tenant->id],
        ]);

        $tenant->update($validated);

        return back()->with('success', 'Dados da organização atualizados com sucesso.');
    }
}
