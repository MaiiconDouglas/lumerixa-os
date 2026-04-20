<?php
declare(strict_types=1);

namespace App\Core\Presentation;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="Lumerixa SaaS API Documentation",
 *      description="Swagger/OpenAPI UI para a Arquitetura Multi-Tenant Lumerixa. Base de segurança validada segundo OWASP 2025.",
 *      @OA\Contact(
 *          email="security@lumerixa.com"
 *      )
 * )
 *
 * @OA\Server(
 *      url=L5_SWAGGER_CONST_HOST,
 *      description="Principal Lumerixa API Server"
 * )
 *
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
 *      in="header",
 *      name="Authorization",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT",
 *      description="Sanctum Token Auth para Endpoints Privados"
 * )
 *
 * @OA\SecurityScheme(
 *      securityScheme="tenantId",
 *      in="header",
 *      name="X-Tenant-ID",
 *      type="apiKey",
 *      description="CNPJ (UUID) Ativo para isolamento da Arquitetura Multi-Tenant."
 * )
 */
class ApiDocs
{
    // Classe placeholder atuando unicamente para prover as anotações do @OA Base 
    // sem poluir o pipeline de Http/Controllers, mantendo aderência ao Domain-Driven Design.
}
