<?php

namespace App\Modules\Project\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Project\Domain\Models\Project;
use App\Modules\Project\Domain\Models\KanbanColumn;
use App\Modules\Project\Domain\Models\Task;
use App\System\Context\TenantContext;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function dashboard(): Response
    {
        $tenantId = app(TenantContext::class)->getId();
        
        $projects = Project::where('tenant_id', $tenantId)
            ->withCount(['tasks', 'columns'])
            ->latest()
            ->take(5)
            ->get();

        $metrics = [
            'activeCount' => Project::where('tenant_id', $tenantId)->where('status', 'active')->count(),
            'dueToday' => Task::where('tenant_id', $tenantId)
                ->whereDate('due_date', now())
                ->count(),
            'overdue' => Task::where('tenant_id', $tenantId)
                ->whereDate('due_date', '<', now())
                ->whereHas('column', function($q) { $q->where('name', '!=', 'Concluído'); })
                ->count(),
            'avgTime' => '1.2d'
        ];

        return Inertia::render('Modules/Project/Dashboard', [
            'recentProjects' => $projects,
            'metrics' => $metrics
        ]);
    }

    public function index(): Response
    {
        $tenantId = app(TenantContext::class)->getId();
        
        $projects = Project::where('tenant_id', $tenantId)
            ->withCount(['tasks', 'columns'])
            ->latest()
            ->get();

        return Inertia::render('Modules/Project/Index', [
            'projects' => $projects
        ]);
    }

    public function show(Project $project): Response
    {
        // Garantir que pertence ao tenant
        $tenantId = app(TenantContext::class)->getId();
        if ($project->tenant_id !== $tenantId) {
            abort(403);
        }

        $project->load(['columns.tasks.responsible']);

        return Inertia::render('Modules/Project/Kanban', [
            'project' => $project
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = app(TenantContext::class)->getId();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project = Project::create([
            'tenant_id' => $tenantId,
            'name' => $validated['name'],
            'slug' => str($validated['name'])->slug()->toString(),
            'description' => $validated['description'],
            'status' => 'active'
        ]);

        // Criar colunas padrão
        $columns = ['A Fazer', 'Em Andamento', 'Concluído'];
        foreach ($columns as $index => $name) {
            KanbanColumn::create([
                'project_id' => $project->id,
                'name' => $name,
                'position' => $index
            ]);
        }

        return back();
    }
}
