<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Motor Multi-Tenant do Produto.
     * Todas as operações e isolamentos convergem nestas chaves.
     */
    public function up(): void
    {
        // 1. O Tenant (Empresa do Cliente)
        Schema::create('tenants', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Base 100% UUIDv7 Performance
            $table->string('name');
            $table->string('cnpj', 20)->unique()->nullable();
            $table->enum('account_type', ['PJ', 'PF'])->default('PJ');
            $table->string('domain')->unique()->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes(); // Prevenção contra deleção catastrófica de clientes
        });

        // 2. A Ponte N:N (Membro Pessoal -> Empresa)
        // Permite o caso de uso onde "João A" é Dono na Empresa "X" e Visualizador na Empresa "Y"
        Schema::create('tenant_user', function (Blueprint $table) {
            $table->foreignUuid('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            
            // Flags rápidas adicionais (além do Spatie Permissions) para root operations
            $table->boolean('is_owner')->default(false);
            
            $table->timestamps();

            // Uma pessoa não pode ser membro duas vezes da mesma empresa no BD
            $table->primary(['tenant_id', 'user_id']); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenant_user');
        Schema::dropIfExists('tenants');
    }
};
