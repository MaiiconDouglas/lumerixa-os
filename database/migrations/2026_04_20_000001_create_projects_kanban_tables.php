<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Projetos: O Coração da Operação
        Schema::create('projects', function (Blueprint $blueprint) {
            $blueprint->uuid('id')->primary();
            $blueprint->foreignUuid('tenant_id')->constrained('tenants')->cascadeOnDelete();
            
            // Vínculos de Negócio
            $blueprint->uuid('client_id')->nullable()->index(); // Vinculado ao CRM
            $blueprint->uuid('service_id')->nullable()->index(); // Vinculado ao Marketplace/Serviços
            
            $blueprint->string('name');
            $blueprint->string('slug')->index();
            $blueprint->text('description')->nullable();
            $blueprint->string('status')->default('active'); // active, paused, completed, cancelled
            $blueprint->date('start_date')->nullable();
            $blueprint->date('end_date')->nullable();
            $blueprint->decimal('budget', 15, 2)->default(0);
            $blueprint->json('metadata')->nullable();
            $blueprint->timestamps();
            $blueprint->softDeletes();
        });

        // 2. Colunas do Kanban
        Schema::create('kanban_columns', function (Blueprint $blueprint) {
            $blueprint->uuid('id')->primary();
            $blueprint->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $blueprint->string('name');
            $blueprint->integer('position')->default(0);
            $blueprint->string('color', 7)->default('#f53003');
            $blueprint->timestamps();
        });

        // 3. Tarefas: A Unidade de Valor
        Schema::create('tasks', function (Blueprint $blueprint) {
            $blueprint->uuid('id')->primary();
            $blueprint->foreignUuid('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $blueprint->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $blueprint->foreignUuid('kanban_column_id')->constrained('kanban_columns')->cascadeOnDelete();
            $blueprint->foreignUuid('user_id')->nullable()->constrained('users')->nullOnDelete(); // Responsável
            
            $blueprint->string('title');
            $blueprint->text('description')->nullable();
            $blueprint->string('priority')->default('medium'); // low, medium, high, critical
            $blueprint->integer('position')->default(0); // Ordenação na coluna
            
            $blueprint->date('due_date')->nullable();
            $blueprint->json('tags')->nullable();
            $blueprint->decimal('estimated_hours', 8, 2)->default(0);
            $blueprint->decimal('actual_hours', 8, 2)->default(0);
            
            $blueprint->timestamps();
            $blueprint->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('kanban_columns');
        Schema::dropIfExists('projects');
    }
};
