<?php

namespace App\Modules\Legal\Presentation\Controllers;

use App\Modules\Legal\Infrastructure\Models\ContractModel;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Auth/Pages/Legal/Compliance', [
            'contracts' => ContractModel::latest()->get(),
            'stats' => [
                'active_contracts' => ContractModel::where('status', 'active')->count()
            ]
        ]);
    }
}
