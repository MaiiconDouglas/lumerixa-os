<?php
declare(strict_types=1);

namespace App\Modules\Core\Presentation\Controllers;

use App\Modules\Core\Application\UseCases\GetDashboardStatsUseCase;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(GetDashboardStatsUseCase $useCase): Response
    {
        $stats = $useCase->execute();

        return Inertia::render('Core/Pages/Dashboard', [
            'stats' => $stats
        ]);
    }
}
