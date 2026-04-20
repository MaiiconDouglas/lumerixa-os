<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\System\Http\Middleware\TenantMiddleware::class,
            \App\System\Http\Middleware\HandleInertiaRequests::class,
        ]);

        $middleware->api(append: [
            \App\System\Http\Middleware\TenantMiddleware::class,
        ]);

        $middleware->alias([
            'super-admin' => \App\System\Http\Middleware\EnsureUserIsSuperAdmin::class,
            'permission' => \App\Http\Middleware\CheckPermission::class,
            'guard.subscription' => \App\System\Http\Middleware\SubscriptionGuardMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function ($response, $e, $request) {
            if (in_array($response->getStatusCode(), [500, 503, 404, 403])) {
                return \Inertia\Inertia::render('Error', [
                    'status' => $response->getStatusCode(),
                ])->toResponse($request)->setStatusCode($response->getStatusCode());
            } elseif ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'A página expirou. Por favor, tente novamente.',
                ]);
            }

            return $response;
        });
    })->create();
