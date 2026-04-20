<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Evolução da Identidade (CPF é a Chave de Identidade na Lumerixa)
        Schema::table('users', function (Blueprint $table) {
            $table->string('cpf', 14)->unique()->after('email')->nullable();
            $table->string('phone', 20)->after('cpf')->nullable();
        });

        // 2. Evolução do Contexto Empresarial (Endereço Completo no Tenant)
        Schema::table('tenants', function (Blueprint $table) {
            $table->string('cep', 9)->nullable();
            $table->string('logradouro')->nullable();
            $table->string('numero', 10)->nullable();
            $table->string('complemento')->nullable();
            $table->string('bairro')->nullable();
            $table->string('cidade')->nullable();
            $table->string('uf', 2)->nullable();
        });

        // 3. Sistema de Segurança Militar (Códigos Efêmeros de Validação)
        Schema::create('verification_codes', function (Blueprint $table) {
            $table->id();
            $table->string('email')->index();
            $table->string('code', 6); // Código de 6 dígitos
            $table->timestamp('expires_at');
            $table->boolean('is_used')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('verification_codes');
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn(['cep', 'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'uf']);
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['cpf', 'phone']);
        });
    }
};
