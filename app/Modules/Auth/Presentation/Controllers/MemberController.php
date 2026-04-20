<?php

namespace App\Modules\Auth\Presentation\Controllers;

use App\Modules\Core\Infrastructure\Models\UserModel as User;
use App\System\Context\TenantContext;
use App\Modules\Auth\Domain\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use App\Modules\Auth\Presentation\Requests\UpdateMemberRoleRequest;
use OpenApi\Attributes as OA;

#[OA\Tag(name: "Equipe", description: "Gestão de Membros e ACL do Workspace")]
class MemberController extends Controller
{
    #[OA\Get(
        path: "/members",
        summary: "Lista membros do Workspace",
        description: "Retorna a lista de usuários vinculados ao tenant ativo com seus respectivos papéis.",
        tags: ["Equipe"],
        responses: [
            new OA\Response(response: 200, description: "Lista de membros via Inertia")
        ]
    )]
    public function index(TenantContext $tenantContext)
    {
        $tenantId = $tenantContext->getId();

        // Buscar usuários vinculados a este tenant
        $members = User::whereHas('tenants', function ($query) use ($tenantId) {
            $query->where('tenants.id', $tenantId);
        })->with(['roles' => function ($query) use ($tenantId) {
            $query->where('role_user.tenant_id', $tenantId);
        }])->get();

        // Buscar roles disponíveis para este tipo de tenant para o dropdown de convite
        $roles = Role::all(); // Depois podemos filtrar por perfil_cnpj baseado no tenant ativo

        return Inertia::render('Auth/Pages/Members', [
            'members' => $members,
            'availableRoles' => $roles
        ]);
    }

    /**
     * Mudar o papel de um membro.
     */
    public function updateRole(UpdateMemberRoleRequest $request, string $userId, TenantContext $tenantContext)
    {
        $tenantId = $tenantContext->getId();
        $user = User::findOrFail($userId);

        // Remover roles antigos no tenant e adicionar novo
        $user->roles()->wherePivot('tenant_id', $tenantId)->detach();
        $user->assignRole($request->role_slug, $tenantId);

        return back()->with('success', 'Nível de acesso atualizado.');
    }
}
