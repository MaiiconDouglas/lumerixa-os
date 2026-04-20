LUMERIXA GLOBAL SOLUTIONS

Documento Oficial de Regras de Negócio

Versão 2.0 — Especificação Formal para Produto, Tecnologia e Operação

Finalidade: consolidar as regras oficiais da Lumerixa em formato executável, servindo como base para arquitetura do produto, fluxos operacionais, segurança, governança de dados, permissões, IA, planos comerciais e critérios de implementação.

Base consolidada a partir de:

Documento Oficial de Regras de Negócio

Estrutura Completa do Produto

Plano de Negócios — Lumerixa Global Solutions 2026

Abril de 2026

1. Objetivo do documento

Este documento formaliza as regras de negócio oficiais da Lumerixa Global Solutions em um padrão utilizável por times de produto, tecnologia, comercial, implantação, compliance e operação. O objetivo é transformar diretrizes estratégicas em regras claras, auditáveis e implementáveis.

2. Princípios estruturantes

Toda operação começa por uma pessoa identificada e ocorre dentro de um contexto empresarial definido.

Cada empresa opera como tenant isolado, sem mistura automática de dados, contexto, IA ou histórico.

O produto é modular: cada módulo pode funcionar de forma independente, mas deve integrar-se ao ecossistema quando habilitado.

A IA atua como apoio à interpretação, recomendação e alerta; ela não toma decisão final nem executa ação crítica sem confirmação humana.

O histórico do negócio deve ser preservado. Como regra geral, registros não são apagados; são arquivados, cancelados ou estornados com rastreabilidade.

O sistema deve ser simples na ponta e robusto por trás, priorizando clareza, segurança, consistência e evolução do cliente.

3. Escopo de aplicação

Estas regras se aplicam às seguintes camadas do ecossistema Lumerixa:

Core: identidade, empresa, permissões, billing, assinatura e logs.

ERP: financeiro, compras, estoque, vendas e fiscal futuro.

CRM: leads, pipeline, histórico e automações comerciais.

RH: cadastro de colaboradores, jornada, desempenho e histórico.

Jurídico: contratos, documentos, versionamento e compliance.

Projetos: tarefas, responsáveis, status, prazos e produtividade.

Marketing: campanhas, origem, canais e integração com CRM.

IA: leitura de dados, relatórios, alertas e recomendações.

Personalização e integrações externas: campos, fluxos e APIs sob controle de governança.

4. Glossário executivo

Termo

Definição oficial

Conta principal

Pessoa física responsável pelo ingresso no sistema, identificada por CPF ou equivalente internacional.

Empresa

Unidade operacional identificada por CNPJ ou equivalente, sempre vinculada a uma conta principal.

Tenant

Ambiente lógico isolado de dados, regras, histórico, arquivos e permissões de uma empresa.

Módulo

Conjunto funcional independente e integrável do produto.

Ação crítica

Operação com impacto relevante em dados, permissões, contratos, cobrança, integrações ou segurança.

Arquivamento

Inativação lógica do registro, preservando histórico e rastreabilidade.

Plano

Pacote comercial que define módulos liberados, limites operacionais e recursos disponíveis.

5. Regras de identidade e contexto

RN-001 — Toda operação no sistema deve começar por uma pessoa física identificada por CPF ou equivalente internacional.

RN-002 — Toda operação empresarial deve ocorrer dentro de um contexto ativo de empresa identificado por CNPJ ou equivalente internacional.

RN-003 — Um CPF pode possuir vínculo com múltiplos CNPJs; um CNPJ deve possuir exatamente um responsável principal ativo por vez.

RN-004 — Quando um usuário possuir acesso a múltiplas empresas, a seleção do contexto empresarial deve ser explícita antes de ações críticas.

RN-005 — Nenhuma empresa pode operar produtivamente sem estar vinculada a um responsável principal e a um plano válido.

6. Regras de isolamento multi-tenant

RN-006 — Cada empresa deve operar em ambiente lógico isolado, sem compartilhamento automático de dados entre tenants.

RN-007 — Logs, arquivos, integrações, consultas, permissões e uso de IA devem respeitar o contexto da empresa ativa.

RN-008 — Toda consulta, mutação e exportação de dados deve validar o tenant ativo antes da execução.

RN-009 — O sistema deve impedir visualização cruzada de dados entre empresas, salvo recursos expressamente desenhados para holdings e apenas quando contratados.

7. Regras de usuários, papéis e permissões

RN-010 — Papéis base do sistema: Administrador, Gestor, Operacional e Visualizador.

RN-011 — Permissões devem ser controladas por módulo e por ação: visualizar, criar, editar, excluir logicamente, aprovar, exportar e administrar.

RN-012 — Administrador possui acesso total ao tenant; Gestor possui acesso por área; Operacional executa fluxos permitidos; Visualizador apenas consulta.

RN-013 — Toda alteração de permissão deve gerar log, com usuário executor, data, escopo e justificativa quando aplicável.

RN-014 — Ações críticas exigem confirmação explícita e, quando necessário, dupla etapa de validação.

8. Regras de dados, integridade e rastreabilidade

RN-015 — Campos críticos obrigatórios não podem ser ignorados; o backend deve validar formato, presença, contexto e consistência.

RN-016 — Como regra geral, registros de negócio não devem ser apagados fisicamente; devem ser arquivados, estornados, cancelados ou inativados.

RN-017 — Toda alteração relevante deve manter histórico de antes/depois, autor, data, empresa e origem da ação.

RN-018 — O sistema deve bloquear dados inconsistentes, conflitantes, duplicados ou sem vínculo de origem.

RN-019 — Importações, exportações e integrações devem ser auditáveis.

9. Regras de modularidade e planos

RN-020 — Os módulos do sistema podem ser ativados ou desativados conforme o plano contratado.

RN-021 — Módulos são independentes em termos de interface, mas podem depender de dados de outros módulos para gerar valor.

RN-022 — O sistema deve aplicar limites por plano para usuários, armazenamento, volume de registros, empresas, uso de IA e API.

RN-023 — Upgrade pode ampliar capacidade imediatamente após validação comercial e financeira.

RN-024 — Downgrade não pode causar perda silenciosa de dados; deve haver bloqueio ou adequação controlada antes da conclusão.

10. Regras operacionais por módulo

10.1 Core

RN-025 — O módulo Core é obrigatório para todos os clientes, pois sustenta identidade, empresa, permissões, assinatura, billing e logs.

RN-026 — Cada empresa deve possuir status de assinatura, plano, ciclo de cobrança, add-ons e histórico de faturamento interno.

RN-027 — Em caso de inadimplência, o sistema pode restringir funcionalidades conforme política comercial, preservando ao menos acesso básico para regularização.

10.2 CRM

RN-028 — Todo lead deve possuir origem identificada.

RN-029 — Todo lead deve possuir status ou etapa válida do funil.

RN-030 — Leads não podem ser duplicados dentro do mesmo tenant por chaves relevantes como e-mail, telefone, documento ou combinação equivalente.

RN-031 — Histórico de interação comercial é obrigatório.

RN-032 — Conversão de lead em cliente, venda, projeto ou oportunidade deve preservar o histórico de origem.

10.3 ERP / Financeiro

RN-033 — Toda transação financeira deve possuir origem categorizada.

RN-034 — Registros financeiros não podem ser excluídos em fluxo normal; correções devem ocorrer por estorno, ajuste ou cancelamento controlado.

RN-035 — Valores devem ser consistentes entre bruto, líquido, juros, multa, desconto e saldo.

RN-036 — O sistema deve permitir visão por competência e por liquidação.

RN-037 — Conciliações devem ser rastreáveis.

10.4 RH

RN-038 — Cada colaborador deve estar vinculado a uma empresa.

RN-039 — Histórico do colaborador não pode ser apagado.

RN-040 — Desligamento deve inativar a pessoa no fluxo operacional, sem apagar seu legado histórico.

10.5 Jurídico

RN-041 — Todo contrato deve possuir versão, status, autor e trilha de alteração.

RN-042 — Alterações contratuais devem preservar versões anteriores integralmente.

RN-043 — Contratos relevantes podem exigir workflow de aprovação e assinatura.

10.6 Projetos

RN-044 — Toda tarefa deve possuir responsável definido.

RN-045 — Toda tarefa deve possuir status válido.

RN-046 — Alterações de prazo, prioridade, etapa e conclusão devem ser rastreáveis.

RN-047 — Projetos podem nascer de vendas, contratos ou demandas internas, mantendo vínculo com sua origem.

10.7 Marketing

RN-048 — Toda campanha deve possuir objetivo, período, responsável e origem de canal.

RN-049 — Leads gerados por campanhas devem manter rastreabilidade até o CRM.

10.8 IA

RN-050 — A IA pode ler, interpretar, resumir, comparar, alertar e sugerir; não pode decidir sozinha nem alterar dados críticos sem confirmação humana.

RN-051 — A IA deve respeitar o tenant ativo e não pode misturar dados entre empresas.

RN-052 — Uso da IA deve gerar trilha de auditoria relevante quando impactar operação ou decisão.

RN-053 — O uso da IA deve respeitar limites de plano, tokens e priorização de processamento.

11. Regras comerciais e jornada do cliente

RN-054 — A entrada comercial deve ocorrer por uma dor de negócio identificada, e não apenas pela venda indiscriminada de módulos.

RN-055 — O onboarding formal deve incluir diagnóstico, parametrização, configuração inicial, permissões, treinamento e primeiros registros mínimos.

RN-056 — O sistema deve orientar o cliente em sua evolução: diagnóstico → organização → uso → expansão.

RN-057 — Personalizações, integrações avançadas e fluxos especiais devem ser tratados como escopo premium ou enterprise.

RN-058 — Retenção deve ser sustentada por histórico preservado, visão integrada, automação e apoio contextual da IA.

12. Regras de segurança, compliance e infraestrutura

RN-059 — Toda operação deve respeitar autenticação forte, autorização, contexto do tenant e trilha de auditoria.

RN-060 — O sistema deve operar em conformidade com LGPD, incluindo proteção de dados, rastreabilidade, retenção e governança de incidentes.

RN-061 — APIs e integrações externas exigem autenticação, escopo, monitoramento e limites de requisição.

RN-062 — Uploads devem respeitar tipo, tamanho, política de retenção, compressão quando aplicável e contexto do tenant.

RN-063 — O ambiente deve manter backups automáticos, políticas de recuperação e observabilidade operacional.

RN-064 — O sistema deve suportar escalabilidade progressiva com filas, separação lógica por tenant e balanceamento conforme crescimento.

13. Matriz resumida de ações críticas

Ação

Exemplo

Confirmação

Log obrigatório

Exclusão lógica / arquivamento

Arquivar contrato, cliente, tarefa, usuário

Sim

Sim

Financeiro sensível

Estorno, ajuste, cancelamento

Sim

Sim

Permissões

Promover para administrador, liberar módulo

Sim

Sim

Plano / assinatura

Upgrade, downgrade, suspensão

Sim

Sim

Integração externa

Conectar API, importar dados

Sim

Sim

IA com impacto operacional

Aplicar sugestão que altera processo

Sim

Sim

14. Critérios de aceite para implementação

Toda rota de leitura e escrita deve validar usuário autenticado, tenant ativo, papel e permissão.

Toda entidade principal deve carregar company_id/tenant_id ou vínculo equivalente quando aplicável.

Toda ação crítica deve exigir confirmação explícita na interface e gerar log no backend.

Nenhum módulo deve operar sem validação do plano e dos limites contratados.

Entidades críticas devem possuir histórico, soft delete ou fluxo equivalente de arquivamento.

A IA só pode sugerir; execução automática de ação crítica deve ser bloqueada por padrão.

Consultas, importações e exportações devem respeitar isolamento multi-tenant.

Toda alteração de contrato, permissão, assinatura e financeiro sensível deve ser auditável.

15. Pendências estratégicas para a versão 3.0 do documento

Política detalhada de cancelamento, retenção e portabilidade de dados.

SLA por plano e política formal de suporte.

Governança de incidentes de segurança e comunicação ao cliente.

Matriz completa de aprovação por perfil e por módulo.

Política de holding/grupo econômico quando houver múltiplas empresas sob o mesmo controlador.

Política oficial de uso de IA, transparência e consentimento contextual.

16. Decisões arquiteturais recomendadas

Para evitar desalinhamento técnico, recomenda-se formalizar como diretriz oficial da empresa o stack principal do produto padrão:

Backend padrão

Laravel

Frontend padrão

React com Inertia

Banco relacional padrão

MySQL ou PostgreSQL, conforme estratégia final

Modelo de aplicação

Monólito modular multi-tenant, com evolução futura para serviços especializados apenas quando necessário

17. Conclusão executiva

A Lumerixa já possui visão estratégica consistente de produto, negócio e posicionamento. Esta versão 2.0 consolida essa visão em regras de negócio formais, transformando diretrizes em base operacional para backlog, arquitetura, desenvolvimento, comercial, onboarding, segurança e governança.

A regra final do sistema permanece: Clareza + Estrutura + Evolução. Em termos práticos, isso significa organizar o negócio do cliente, evitar complexidade desnecessária, preservar histórico, apoiar decisões com responsabilidade e permitir expansão controlada do uso da plataforma.