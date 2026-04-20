<?php

namespace App\Modules\Project\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Project\Domain\Models\Task;
use App\Modules\Project\Domain\Models\KanbanColumn;
use App\System\Context\TenantContext;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $tenantId = app(TenantContext::class)->getId();

        $validated = $request->validate([
            'project_id' => 'required|uuid',
            'kanban_column_id' => 'required|uuid',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high,critical',
        ]);

        // Pegar a última posição na coluna
        $lastPosition = Task::where('kanban_column_id', $validated['kanban_column_id'])->max('position') ?? -1;

        $task = Task::create([
            'tenant_id' => $tenantId,
            'project_id' => $validated['project_id'],
            'kanban_column_id' => $validated['kanban_column_id'],
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'priority' => $validated['priority'],
            'position' => $lastPosition + 1
        ]);

        return response()->json($task->load('responsible'));
    }

    public function move(Request $request, Task $task): JsonResponse
    {
        $validated = $request->validate([
            'kanban_column_id' => 'required|uuid',
            'position' => 'required|integer',
            'new_order' => 'nullable|array', // Array de IDs na nova ordem
        ]);

        $oldColumnId = $task->kanban_column_id;
        $newColumnId = $validated['kanban_column_id'];
        $newPosition = $validated['position'];

        // Se o usuário enviou a nova ordem da coluna (mais eficiente)
        if ($request->has('new_order')) {
            foreach ($request->new_order as $index => $taskId) {
                Task::where('id', $taskId)->update([
                    'kanban_column_id' => $newColumnId, // Garante que todos estão na coluna certa
                    'position' => $index
                ]);
            }
        } else {
            // Lógica fallback: Move o card específico e ajusta os outros
            $task->update([
                'kanban_column_id' => $newColumnId,
                'position' => $newPosition
            ]);
        }

        return response()->json(['success' => true]);
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();
        return response()->json(['success' => true]);
    }
}
