<?php

namespace App\Modules\Auth\Presentation\Controllers;

use App\System\Context\TenantContext;
use App\Modules\Auth\Application\UseCases\RegisterWorkspaceUseCase;
use App\Modules\Auth\Application\DTOs\RegisterWorkspaceDTO;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class WorkspaceController extends Controller
{
    /**
     * Lista organizações/empresas do usuário.
     */
    public function index(Request $request)
    {
        return Inertia::render('Auth/Pages/Workspaces/Index', [
            'workspaces' => $request->user()->tenants
        ]);
    }

    /**
     * Exibe o formulário de criação de novo Workspace (Transição).
     */
    public function create()
    {
        return Inertia::render('Auth/Pages/Workspaces/Create');
    }

    /**
     * Processa a criação de um novo Workspace PJ para um usuário existente (Transição PF -> PJ).
     */
    public function store(Request $request, RegisterWorkspaceUseCase $useCase)
    {
        $user = $request->user();

        // Regra de Negócio: Validamos o CNPJ e criamos o novo contexto
        $validated = $request->validate([
            'cnpj' => 'required|string|size:14|unique:tenants,cnpj',
            'company_name' => 'required|string|max:255',
            'trade_name' => 'nullable|string|max:255',
        ]);

        // Aqui poderíamos chamar uma versão adaptada do UseCase ou apenas criar o Tenant
        // Para manter o Clean Architecture, o ideal é injetar a lógica de criação
        
        // Simulação de transição
        $tenant = \App\Modules\Core\Infrastructure\Models\TenantModel::create([
            'id' => \Illuminate\Support\Str::uuid7(),
            'name' => $validated['company_name'],
            'cnpj' => $validated['cnpj'],
            'profile_type' => 'PJ',
        ]);

        $user->tenants()->attach($tenant->id, ['is_owner' => true]);
        $user->assignRole('master', (string) $tenant->id);

        return back()->with('success', 'Nova empresa ativada com sucesso!');
    }
}
