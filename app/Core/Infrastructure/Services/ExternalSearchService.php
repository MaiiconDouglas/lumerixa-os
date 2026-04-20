<?php
declare(strict_types=1);

namespace App\Core\Infrastructure\Services;

use Illuminate\Support\Facades\Http;

/**
 * Motor de buscas Externas (Open Data Integration).
 * Encapsula chamadas via HTTP para fontes públicas de alta confiabilidade.
 */
class ExternalSearchService
{
    /**
     * Busca CEP via Web Service (ViaCEP).
     */
    public function findAddressByCep(string $cep): array
    {
        $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");
        
        if ($response->failed()) {
            return ['error' => 'Serviço de CEP indisponível no momento.'];
        }

        return $response->json();
    }

    /**
     * Busca Dados Empresariais via Web Service (Consultas Públicas).
     */
    public function findCompanyByCnpj(string $cnpj): array
    {
        // CNPJ só com números para a API
        $cnpj = preg_replace('/[^0-9]/', '', $cnpj);
        
        // Exemplo usando ReceitaWS (API Pública Gratuita limitada a 3 por minuto)
        $response = Http::get("https://receitaws.com.br/v1/cnpj/{$cnpj}");
        
        if ($response->failed()) {
            return ['error' => 'API da Receita indisponível.'];
        }

        return $response->json();
    }
}
