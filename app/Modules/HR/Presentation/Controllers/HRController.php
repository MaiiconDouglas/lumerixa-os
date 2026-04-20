<?php

namespace App\Modules\HR\Presentation\Controllers;

use App\Modules\HR\Infrastructure\Models\EmployeeModel;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class HRController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Auth/Pages/HR/Team', [
            'employees' => EmployeeModel::latest()->get(),
            'stats' => [
                'total_count' => EmployeeModel::count(),
                'avg_salary' => EmployeeModel::avg('salary')
            ]
        ]);
    }
}
