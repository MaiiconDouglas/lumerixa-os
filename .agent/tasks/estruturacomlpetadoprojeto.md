Atue como um Arquiteto de Software Sênior, especialista em Laravel, React, Inertia.js, Clean Architecture, DDD, SaaS multi-tenant, segurança aplicada, performance, escalabilidade e engenharia de produto empresarial.

Sua missão é analisar, reprojetar e refatorar completamente este sistema para um padrão arquitetural moderno, desacoplado, seguro, escalável, mobile first e preparado para evolução contínua.

====================================
1. OBJETIVO PRINCIPAL
====================================

Quero que você transforme este projeto em uma plataforma SaaS empresarial robusta, com arquitetura limpa e preparada para crescimento real, considerando:

- frontend em React + Inertia.js
- backend em Laravel
- banco de dados MySQL
- todos os IDs sequenciais substituídos por UUID
- abordagem mobile first
- foco extremo em:
  - organização arquitetural
  - separação de responsabilidades
  - segurança
  - desempenho
  - manutenibilidade
  - escalabilidade
  - clareza de domínio
  - evolução modular

Não quero apenas sugestões superficiais.
Quero uma proposta de refatoração profissional, profunda e aplicável.

====================================
2. CONTEXTO DO PRODUTO
====================================

O sistema é uma plataforma empresarial modular, multiempresa, escalável e orientada a contexto.

Ele deve ser preparado para sustentar módulos como:
- Core
- ERP
- CRM
- RH
- Jurídico
- Projetos
- Marketing
- Financeiro
- IA
- Personalizações futuras

Regras centrais que a arquitetura deve respeitar:
- toda operação começa por uma pessoa
- identidade principal baseada em CPF
- contexto empresarial baseado em CNPJ
- 1 CPF pode ter múltiplos CNPJs
- cada empresa deve operar em ambiente isolado
- não pode haver mistura automática de dados entre empresas
- permissões devem existir por perfil, módulo e ação
- logs devem ser obrigatórios
- histórico deve ser preservado
- dados sensíveis devem ser auditáveis
- IA apoia, sugere e interpreta, mas não decide nem executa ações críticas sem confirmação
- módulos devem ser independentes, porém integráveis
- funcionalidades e limites devem poder ser ativados por plano

====================================
3. O QUE VOCÊ DEVE FAZER
====================================

Quero que você:

1. Analise a arquitetura atual do projeto
2. Identifique problemas estruturais, técnicos e arquiteturais
3. Proponha uma nova arquitetura alvo
4. Reestruture backend e frontend com Clean Architecture
5. Organize o sistema por domínio, módulo e responsabilidade
6. Aplique princípios de segurança, performance e escalabilidade
7. Adapte a base para multi-tenant
8. Substitua IDs sequenciais por UUID
9. Estruture a base para auditoria, permissões e histórico
10. Pense o sistema como produto SaaS empresarial de longo prazo

====================================
4. DIRETRIZES OBRIGATÓRIAS DE ARQUITETURA
====================================

A arquitetura deve seguir os princípios de:
- Clean Architecture
- SOLID
- Separation of Concerns
- DDD quando fizer sentido
- baixo acoplamento
- alta coesão
- independência de framework
- código orientado a casos de uso
- clareza de domínio
- escalabilidade modular

A solução deve evitar:
- controllers com regra de negócio
- models anêmicos ou sobrecarregados
- acoplamento forte entre frontend e backend
- lógica de negócio espalhada em componentes de interface
- dependência direta de infraestrutura dentro do domínio
- repetição desnecessária de código
- mistura de contexto entre empresas
- estrutura desorganizada por conveniência de framework

====================================
5. BACKEND - LARAVEL
====================================

Refatore o backend para uma arquitetura baseada em camadas como:

- Domain
- Application
- Infrastructure
- Presentation

Quero separação clara entre:
- entidades
- value objects
- regras de negócio
- casos de uso
- contratos
- implementações
- persistência
- autenticação/autorização
- comunicação HTTP
- eventos
- filas
- auditoria
- integrações

Estruture o backend com:

A. Domain
- Entities
- Value Objects
- Domain Services
- Domain Rules
- Domain Exceptions
- Contracts / Interfaces
- Policies conceituais de domínio quando fizer sentido

B. Application
- Use Cases
- DTOs
- Commands / Queries se necessário
- Application Services
- Validators
- Mappers
- Handlers
- Orquestração de fluxos

C. Infrastructure
- Eloquent Models apenas como detalhe de persistência
- Repositories concretos
- Providers
- Cache
- Filas
- Banco de dados
- Serviços externos
- Logs
- Observabilidade
- Gateways
- Storage
- Implementações de autenticação e integração

D. Presentation
- Controllers
- Requests
- Resources / Transformers
- Middleware
- Rotas
- Responses
- Inertia adapters / response builders

====================================
6. FRONTEND - REACT + INERTIA
====================================

Refatore o frontend com arquitetura escalável e organizada por domínio/módulo.

Quero separar claramente:
- páginas
- componentes visuais
- componentes de negócio
- hooks
- serviços
- schemas
- estados
- adapters
- layouts
- módulos
- tipos
- utilitários

A estrutura do frontend deve seguir:
- componentização forte
- reutilização real
- design system base
- convenções consistentes
- fácil manutenção
- expansão futura sem caos estrutural

O frontend deve ser preparado para:
- dashboards
- tabelas complexas
- filtros
- formulários reutilizáveis
- permissões por módulo
- menus dinâmicos
- múltiplos contextos por empresa
- feedback visual consistente
- loading, empty states, errors e success states bem tratados

====================================
7. MOBILE FIRST
====================================

Toda a interface deve ser reprojetada com abordagem mobile first.

Isso significa:
- começar pelo celular e expandir para tablet/desktop
- navegação simples e objetiva
- menus adaptáveis
- formulários pensados para telas pequenas
- tabelas responsivas
- dashboards reorganizáveis
- boa legibilidade
- foco em velocidade e clareza operacional
- evitar poluição visual
- experiência intuitiva para usuário operacional e gestor

Quero que a arquitetura da interface priorize:
- usabilidade
- responsividade real
- acessibilidade básica
- performance visual
- consistência entre módulos

====================================
8. SEGURANÇA
====================================

A refatoração deve ter foco extremo em segurança.

Implemente e proponha estrutura para:
- autenticação segura
- autorização granular por perfil, módulo e ação
- isolamento de tenant/empresa
- proteção contra acesso cruzado entre empresas
- proteção contra SQL Injection
- proteção contra XSS
- proteção contra CSRF
- proteção contra mass assignment
- validação robusta de entrada
- saneamento de dados
- confirmação para ações críticas
- auditoria de ações sensíveis
- logs obrigatórios
- versionamento de alterações críticas
- armazenamento seguro de credenciais
- gestão de secrets por ambiente
- conformidade com LGPD e rastreabilidade

Considere também:
- rate limiting
- throttling
- políticas de senha
- sessões seguras
- eventuais estratégias de 2FA no futuro
- trilhas de auditoria
- monitoramento de comportamento suspeito

====================================
9. PERFORMANCE
====================================

A proposta deve melhorar fortemente o desempenho da aplicação.

Considere:
- redução de queries desnecessárias
- prevenção de N+1
- eager loading estratégico
- paginação correta
- cache de leitura onde fizer sentido
- filas para processamento pesado
- lazy loading inteligente no frontend
- code splitting quando aplicável
- carregamento otimizado de assets
- otimização de renderização
- indexação de banco
- redução de payload
- padronização de serialização de dados
- monitoramento de gargalos

Quero o sistema preparado para:
- crescimento de base de clientes
- aumento de volume de dados
- crescimento por módulos
- múltiplos usuários simultâneos
- expansão gradual sem reescrever tudo depois

====================================
10. BANCO DE DADOS - MYSQL
====================================

Reestruture a modelagem do banco com foco em:
- integridade
- clareza
- rastreabilidade
- multi-tenant
- performance
- manutenibilidade

Regras obrigatórias:
- substituir todos os IDs sequenciais por UUID
- revisar todas as foreign keys
- manter integridade relacional
- aplicar índices estratégicos
- preparar tabelas para multi-tenant
- garantir separação por empresa
- prever auditoria e histórico
- adotar soft delete onde fizer sentido
- evitar exclusão destrutiva para dados críticos
- estruturar tabelas de permissões, planos, módulos, logs e contextos

Quero que você detalhe:
- estratégia de UUID
- impacto em migrations
- impacto em relacionamentos
- impacto em performance
- boas práticas de indexação com UUID
- forma ideal de implementação no Laravel

====================================
11. MULTI-TENANT
====================================

A arquitetura deve ficar preparada para SaaS multi-tenant.

Quero que você defina a melhor abordagem para:
- isolamento por empresa
- contexto por CNPJ
- vínculo com usuário responsável
- segurança de acesso por tenant
- filtros automáticos por tenant
- middleware/context resolver
- escopo de dados
- permissões por tenant
- atuação de usuários com múltiplas empresas
- troca segura de contexto empresarial

Explique:
- qual estratégia de multi-tenant recomenda
- single database com tenant_id ou outra abordagem
- vantagens e desvantagens
- como garantir isolamento sem fragilidade
- como isso impacta backend, frontend e banco

====================================
12. PERMISSÕES, AUDITORIA E HISTÓRICO
====================================

A solução deve ter base sólida para governança.

Estruture:
- RBAC ou modelo híbrido de permissões
- papéis como administrador, gestor, operacional e visualizador
- permissões por módulo
- permissões por ação
- logs obrigatórios
- trilha de auditoria
- registro de alterações
- histórico preservado
- versionamento em contratos ou dados jurídicos quando necessário
- rastreabilidade de ações críticas
- confirmação em operações de alto risco

====================================
13. IA E FUTURAS INTEGRAÇÕES
====================================

A arquitetura deve ficar preparada para evolução futura com:
- motor de IA
- automações
- jobs assíncronos
- integrações externas
- APIs públicas e privadas
- webhooks
- marketplace de integrações
- módulos customizados

A IA deve ser tratada como:
- camada de apoio
- leitura contextual
- geração de alertas
- resumos
- recomendações
- diagnóstico
- nunca decisão autônoma crítica sem confirmação humana

====================================
14. O QUE EU QUERO NA SUA RESPOSTA
====================================

Quero que você entregue a resposta em formato altamente estruturado, incluindo:

1. Diagnóstico do projeto atual
- problemas de arquitetura
- problemas de organização
- problemas de segurança
- problemas de performance
- problemas de escalabilidade
- problemas de modelagem
- problemas de frontend
- problemas de backend

2. Arquitetura alvo proposta
- visão geral
- princípios adotados
- racional das decisões

3. Estrutura completa de pastas do backend

4. Estrutura completa de pastas do frontend

5. Explicação detalhada das camadas

6. Estratégia de UUID

7. Estratégia de multi-tenant

8. Estratégia de autenticação e autorização

9. Estratégia de auditoria e histórico

10. Estratégia de performance

11. Estratégia mobile first

12. Estratégia modular por domínio

13. Convenções de código recomendadas

14. Fluxo exemplo de um módulo real
Exemplo:
- criação de empresa
- cadastro de usuário
- criação de lead no CRM
- criação de tarefa em projetos
- lançamento financeiro no ERP

15. Exemplo prático de como um caso de uso deve ficar no backend

16. Exemplo prático de como uma página/módulo deve ficar no frontend

17. Plano de migração/refatoração por etapas
- fase 1
- fase 2
- fase 3
- fase 4

====================================
15. ESTILO DA RESPOSTA
====================================

Sua resposta deve ser:
- técnica
- estratégica
- profunda
- prática
- orientada à execução
- com visão de produto SaaS real
- sem superficialidade
- sem respostas genéricas
- sem resumir demais
- com exemplos reais
- com estrutura profissional

====================================
16. RESTRIÇÃO IMPORTANTE
====================================

Não quero apenas teoria.
Não quero apenas boas práticas genéricas.
Não quero apenas uma opinião abstrata.

Quero que você proponha uma refatoração concreta, profissional e aplicável ao projeto, como se estivesse definindo a arquitetura oficial de um SaaS empresarial moderno.

Se encontrar falhas graves no projeto atual, aponte com clareza e proponha a correção.

Se necessário, reestruture completamente a organização do código.

====================================
17. ORDEM DE EXECUÇÃO DA SUA RESPOSTA
====================================

Responda exatamente nesta ordem:

1. Diagnóstico do projeto atual
2. Problemas encontrados
3. Arquitetura alvo
4. Estrutura de pastas backend
5. Estrutura de pastas frontend
6. Estratégia de domínio e módulos
7. Estratégia de UUID
8. Estratégia de multi-tenant
9. Estratégia de segurança
10. Estratégia de performance
11. Estratégia mobile first
12. Estratégia de permissões, logs e auditoria
13. Exemplos práticos
14. Plano de migração em fases
15. Recomendação final
