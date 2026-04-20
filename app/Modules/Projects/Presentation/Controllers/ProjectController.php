<?php

namespace App\Modules\Projects\Presentation\Controllers;

use App\Modules\Projects\Infrastructure\Models\ProjectModel;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Auth/Pages/Projects/Roadmap', [
            'projects' => ProjectModel::with('tasks')->latest()->get(),
            'stats' => [
                'active_projects' => ProjectModel::where('status', 'active')->count()
            ]
        ]);
    }
}
