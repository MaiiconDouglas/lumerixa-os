<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Modules\Auth\Presentation\Controllers\LoginController;
use App\Modules\Auth\Presentation\Controllers\RegisterController;
use App\Modules\Core\Presentation\Controllers\DashboardController;
use App\Modules\Admin\Presentation\Controllers\AdminController;

Route::get('/', function () {
    return view('welcome');
});

// Cadastro de Workspace (Multi-tenant) - PRIORIDADE SOBERANA
Route::controller(RegisterController::class)->group(function () {
    Route::get('/register', 'create')->name('register');
    Route::post('/register', 'store')->name('register.store');
    Route::post('/register/send-code', 'sendCode')->middleware('throttle:3,1')->name('register.send-code');
    Route::post('/register/verify-code', 'verifyCode')->middleware('throttle:10,1')->name('register.verify-code');
    Route::get('/api/proxy/cnpj/{cnpj}', 'proxyCnpj')->name('register.proxy-cnpj');
});

// Painéis Administrativos (Autenticados)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(\App\System\Http\Middleware\EnsureUserIsTenantMember::class)->name('dashboard');
    Route::get('/admin', [AdminController::class, 'index'])->middleware('super-admin')->name('admin.dashboard');

    // Módulos de Negócio (Clientes)
    Route::middleware(\App\System\Http\Middleware\EnsureUserIsTenantMember::class)->group(function () {
        Route::get('/crm', [\App\Modules\CRM\Presentation\Controllers\CRMController::class, 'index'])->name('crm');
        Route::get('/erp', [\App\Modules\ERP\Presentation\Controllers\ERPController::class, 'index'])->name('erp');
        Route::get('/hr', [\App\Modules\HR\Presentation\Controllers\HRController::class, 'index'])->name('hr');
        Route::get('/legal', [\App\Modules\Legal\Presentation\Controllers\LegalController::class, 'index'])->name('legal');
        Route::get('/projects/dashboard', [\App\Modules\Project\Presentation\Controllers\ProjectController::class, 'dashboard'])->name('projects.dashboard');
        Route::get('/projects', [\App\Modules\Project\Presentation\Controllers\ProjectController::class, 'index'])->name('projects');
        Route::post('/projects', [\App\Modules\Project\Presentation\Controllers\ProjectController::class, 'store'])->name('projects.store');
        Route::get('/projects/{project:slug}', [\App\Modules\Project\Presentation\Controllers\ProjectController::class, 'show'])->name('projects.show');
    });
});

// Autenticação
Route::get('/login', [LoginController::class, 'create'])->name('login');
Route::post('/login', [LoginController::class, 'store'])->middleware('throttle:6,1');
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');


// Gestão de Membros (ACL UI)
Route::middleware(['auth'])->group(function () {
    Route::get('/members', [\App\Modules\Auth\Presentation\Controllers\MemberController::class, 'index'])->name('members.index');
    Route::post('/members/{user}/role', [\App\Modules\Auth\Presentation\Controllers\MemberController::class, 'updateRole'])->name('members.update-role');

    // Configurações de Perfil
    Route::get('/settings/profile', [\App\Modules\Auth\Presentation\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::match(['GET', 'POST', 'PATCH'], '/settings/profile', [\App\Modules\Auth\Presentation\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::put('/settings/password', [\App\Modules\Auth\Presentation\Controllers\ProfileController::class, 'updatePassword'])->name('profile.password');
    Route::post('/settings/logout-others', [\App\Modules\Auth\Presentation\Controllers\ProfileController::class, 'logoutOtherSessions'])->name('profile.logout-others');
    Route::post('/settings/email/request', [\App\Modules\Auth\Presentation\Controllers\ProfileController::class, 'requestEmailChange'])->name('profile.email.request');
    Route::post('/settings/email/confirm', [\App\Modules\Auth\Presentation\Controllers\ProfileController::class, 'confirmEmailChange'])->name('profile.email.confirm');

    Route::get('/settings/privacy', [\App\Modules\Auth\Presentation\Controllers\ProfileController::class, 'privacy'])->name('settings.privacy');
    Route::get('/settings/organization', [\App\Modules\Auth\Presentation\Controllers\TenantController::class, 'edit'])->name('organization.edit');
    Route::match(['POST', 'PATCH'], '/settings/organization', [\App\Modules\Auth\Presentation\Controllers\TenantController::class, 'update'])->name('organization.update');

    Route::get('/settings/help', function () {
        return \Inertia\Inertia::render('Auth/Pages/Settings/Help');
    })->name('settings.help');

    // Workspaces / Transição PF -> PJ
    Route::get('/workspaces/create', [\App\Modules\Auth\Presentation\Controllers\WorkspaceController::class, 'create'])->name('workspaces.create');
    Route::post('/workspaces', [\App\Modules\Auth\Presentation\Controllers\WorkspaceController::class, 'store'])->name('workspaces.store');

    // Segurança / 2FA
    Route::get('/settings/2fa', [\App\Modules\Auth\Presentation\Controllers\TwoFactorController::class, 'enable'])->name('2fa.settings');
    Route::post('/settings/2fa/confirm', [\App\Modules\Auth\Presentation\Controllers\TwoFactorController::class, 'confirm'])->name('2fa.confirm');
    Route::delete('/settings/2fa', [\App\Modules\Auth\Presentation\Controllers\TwoFactorController::class, 'disable'])->name('2fa.disable');
});

// Desafio 2FA (Aberto mas validado por sessão)
Route::get('/2fa/challenge', [\App\Modules\Auth\Presentation\Controllers\TwoFactorController::class, 'challenge'])->name('2fa.challenge');
Route::post('/2fa/challenge', [\App\Modules\Auth\Presentation\Controllers\TwoFactorController::class, 'verify'])->name('2fa.verify');
