# Lumerixa SaaS - Master Refactoring Plan (Enterprise Modular Monolith)

## Fase 1: Fundação Estrutural, UUIDv7 e Multi-Tenant Base
- [x] Configuração da Estrutura Base (`app/System`, `app/Core`, `app/Modules`).
- [x] Implementação de UUIDv7 (Performance Index B-Tree).
- [x] Implementação de Contexto `TenantContext` e Identidade Global do Request.
- [x] Implementação de `TenantScope` (Single Database Isolation).

## Fase 2: Segurança, Identidade e Base ACL
- [x] Extração de Domínio de Autenticação (Casos de Uso, DTOs Zero-Trust).
- [x] Trilha de Auditoria (Logging Transacional Irrefutável).
- [x] Injeção L5-Swagger para Documentação Contratual.
- [x] Adaptação do ACL (Permissões e Roles granulares atrelados a Perfis de CNPJ).

## Fase 3: Refatoração de Frontend e Componentização Modular (Mobile First)
- [ ] Desacoplamento de views velhas para Design System com Atomic Design em React.
- [ ] Refatoração das Tabelas (Paginação + Filters Server-Side).
- [ ] Implementar Central State/Contexto Global Multi-empresa (Zustand/Context).

## Fase 4: Domínios Periféricos e Core Actions (CRM, ERP, RH)
- [ ] Migração do Domínio CRM.
- [ ] Migração do Domínio ERP.
- [ ] Separação e orquestração via Handlers/Jobs (Zero lógica transacional nas APIs).
- [ ] Finalizar camada de cache e validação P99 (Core Web Vitals).
