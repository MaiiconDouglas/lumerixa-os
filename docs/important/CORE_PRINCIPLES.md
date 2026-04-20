# Princípios Soberanos Lumerixa OS

As regras abaixo são as leis fundamentais de desenvolvimento do ecossistema v3.0. Toda nova funcionalidade deve respeitar estes princípios.

## 1. Identidade e Contexto
- **RN-001**: O Ponto zero é o CPF (Pessoa Física).
- **RN-002**: Toda operação ocorre dentro de um contexto empresarial (CNPJ).
- **RN-004**: A seleção do contexto deve ser explícita antes de ações críticas.

## 2. Soberania de Dados (Multi-tenant)
- **RN-006**: Isolamento lógico absoluto. Dados de uma empresa NUNCA se misturam com outra.
- **RN-008**: Validação de `tenant_id` em toda consulta, mutação ou exportação.

## 3. Integridade e Rastreabilidade
- **RN-016**: **Soft Delete**. Registros de negócio não são apagados fisicamente. Use e abuse de `SoftDeletes` do Laravel.
- **RN-017**: **Logs de Auditoria**. Alterações relevantes devem manter trilha de quem, quando e o que mudou (antes/depois).

## 4. Arquitetura Técnica
- **Stack**: Laravel + React/Inertia.
- **Modularidade**: Cada funcionalidade deve nascer em um módulo (`app/Modules/...`).
- **Segurança**: Validação de permissões por ação (Visualizar, Criar, Editar, Deletar Lógicamente, Aprovar, Exportar, Administrar).

---
🚀 *Documento editável para governança tecnológica.*
