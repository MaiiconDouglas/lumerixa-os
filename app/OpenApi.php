<?php

namespace App;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: "Lumerixa OS API",
    version: "1.0.0",
    description: "Documentação oficial da API do Lumerixa OS (Multi-Tenant, Gestão e Faturamento)."
)]
#[OA\Server(
    url: "https://api.lumerixa.com",
    description: "Servidor Produção"
)]
#[OA\Server(
    url: "http://localhost:8000",
    description: "Servidor Local"
)]
#[OA\SecurityScheme(
    securityScheme: "sanctum",
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "Digite o token gerado no login para autenticar as requisições na API."
)]
class OpenApi
{
}
