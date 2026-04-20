<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Modules\Auth\Presentation\Controllers\RegisterController;
use App\Modules\Auth\Presentation\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// API Auth Modular
Route::prefix('auth')->middleware('throttle:6,1')->group(function () {
    Route::post('/register', [RegisterController::class, 'store']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/send-code', [RegisterController::class, 'sendCode']);
});
// API de Projetos (Kanban)
Route::middleware(['auth:sanctum', \App\System\Http\Middleware\EnsureUserIsTenantMember::class])->group(function () {
    Route::post('/tasks', [\App\Modules\Project\Presentation\Controllers\TaskController::class, 'store']);
    Route::patch('/tasks/{task}/move', [\App\Modules\Project\Presentation\Controllers\TaskController::class, 'move']);
    Route::delete('/tasks/{task}', [\App\Modules\Project\Presentation\Controllers\TaskController::class, 'destroy']);
});
