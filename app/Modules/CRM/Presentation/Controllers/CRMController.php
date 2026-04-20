<?php

namespace App\Modules\CRM\Presentation\Controllers;

use App\Modules\CRM\Infrastructure\Models\LeadModel;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CRMController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Auth/Pages/CRM/Leads', [
            'leads' => LeadModel::latest()->get(),
            'stats' => [
                'total_value' => LeadModel::sum('opportunity_value'),
                'count' => LeadModel::count()
            ]
        ]);
    }
}
