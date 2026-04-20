<?php

namespace App\Modules\ERP\Presentation\Controllers;

use App\Modules\ERP\Infrastructure\Models\TransactionModel;
use App\Modules\ERP\Infrastructure\Models\BankAccountModel;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ERPController extends Controller
{
    public function index(): Response
    {
        $transactions = TransactionModel::latest()->limit(10)->get();
        
        $totalIncome = TransactionModel::where('type', 'income')->sum('amount');
        $totalExpense = TransactionModel::where('type', 'expense')->sum('amount');
        
        // Mocking target for Ticket Médio (as seen in old project)
        $revenueCount = TransactionModel::where('type', 'income')->count();
        $ticketMedio = $revenueCount > 0 ? $totalIncome / $revenueCount : 0;

        // Cash Flow Trend (Last 6 months)
        $cashFlow = DB::table('erp_transactions')
            ->select(
                DB::raw("DATE_FORMAT(due_date, '%Y-%m') as month"),
                DB::raw("SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income"),
                DB::raw("SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense")
            )
            ->where('due_date', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('Auth/Pages/ERP/Finance', [
            'transactions' => $transactions,
            'accounts' => BankAccountModel::where('is_active', true)->get(),
            'stats' => [
                'balance' => $totalIncome - $totalExpense,
                'income' => $totalIncome,
                'expense' => $totalExpense,
                'ticket_medio' => $ticketMedio,
                'savings_rate' => $totalIncome > 0 ? (($totalIncome - $totalExpense) / $totalIncome) * 100 : 0,
            ],
            'cash_flow' => $cashFlow
        ]);
    }
}
