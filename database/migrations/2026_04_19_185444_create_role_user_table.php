<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tabela pivot customizada para Multi-tenancy RBAC (RN-010)
        // Permite que um usuário tenha diferentes papéis em diferentes empresas
        Schema::create('role_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('role_id'); // Referência ao Spatie Role
            $table->uuid('user_id'); // Referência ao UserModel (UUIDv7)
            $table->uuid('tenant_id')->nullable(); // Contexto do Isolamento (pode ser null para Super Admin)
            $table->timestamps();

            // Foreign keys
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');

            // Garantir que um usuário tenha apenas uma vez o mesmo papel no mesmo tenant
            $table->unique(['role_id', 'user_id', 'tenant_id']);
        });

        // Tabela pivot para permissões customizadas (opcional para o domínio)
        Schema::create('permission_role', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('permission_id');
            $table->unsignedBigInteger('role_id');
            $table->timestamps();

            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_role');
        Schema::dropIfExists('role_user');
    }
};
