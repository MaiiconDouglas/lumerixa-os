Sistema Administrativo da Lumerixa

Visão geral

A Lumerixa deve operar como uma plataforma administrativa empresarial modular, multiempresa, escalável e orientada a contexto. O sistema administrativo será o núcleo operacional do negócio, responsável por gerenciar identidade, empresas, usuários, permissões, planos, faturamento, módulos, auditoria, dados estratégicos, atendimento e inteligência operacional.

O objetivo não é apenas ter um painel interno, mas um sistema empresarial completo que permita:

administrar a própria Lumerixa como empresa

operar clientes em arquitetura SaaS multi-tenant

controlar planos, módulos, faturamento e acessos

acompanhar performance, crescimento, retenção e riscos

oferecer base para expansão em CRM, ERP, RH, Jurídico, Projetos, Marketing e IA

1. Estrutura macro do sistema

1.1 Camadas do sistema

Painel Institucional Lumerixa

Painel Operacional SaaS

Painel do Cliente/Tenant

Camada de IA e insights

Camada de integrações

Camada de auditoria e compliance

1.2 Tipos de operação

operação interna da Lumerixa

operação por cliente

operação por empresa do cliente

operação por módulo

operação por plano

1.3 Base conceitual

identidade principal: pessoa

contexto operacional: empresa

acesso controlado por tenant

módulos independentes e integráveis

histórico obrigatório

IA assistiva, nunca autônoma em ação crítica

2. Módulos do sistema administrativo da Lumerixa

2.1 Módulo Core Administrativo

Responsável por toda a estrutura base.

Funcionalidades

cadastro de usuários

cadastro de empresas

vínculo usuário x empresa

troca de contexto empresarial

gestão de papéis

gestão de permissões

logs globais

configurações do sistema

parâmetros institucionais

centros de custo internos

unidades de negócio da Lumerixa

Entidades principais

users

persons

companies

company_users

roles

permissions

role_permissions

user_permissions

system_settings

audit_logs

2.2 Módulo de Gestão da Própria Empresa Lumerixa

Esse módulo é o administrativo interno da própria Lumerixa como empresa.

Áreas

financeiro interno

comercial interno

marketing interno

contratos internos

RH interno

projetos internos

suporte e implantação

parceiros e afiliados

governança

Funções

controlar receitas recorrentes

controlar despesas da operação

acompanhar CAC, LTV, churn, MRR, ARR

gerir equipe interna

gerir onboarding dos clientes

gerir contratos, SLAs e propostas

controlar demandas de implantação

acompanhar tickets e suporte

2.3 Módulo de Clientes SaaS

Responsável por administrar a base de clientes da plataforma.

Funcionalidades

cadastro de cliente

cadastro de conta principal

histórico comercial

status do cliente

classificação do cliente

estágio de onboarding

plano contratado

módulos ativos

saúde da conta

risco de churn

observações estratégicas

documentos e anexos

Status sugeridos

lead

negociação

implantação

ativo

suspenso

cancelado

inadimplente

enterprise em acompanhamento

Entidades principais

clients

client_profiles

client_status_histories

client_health_scores

client_notes

client_documents

2.4 Módulo de Planos, Assinaturas e Billing

Responsável por monetização e controle contratual.

Funcionalidades

cadastro de planos

cadastro de add-ons

tabela de limites por plano

ciclo de cobrança

assinatura por cliente

upgrade

downgrade

suspensão

reativação

histórico de cobrança

gestão de faturas

cupons e campanhas comerciais

cálculo de excedentes

Planos base

Start

Growth

Scale

Enterprise

Limites por plano

quantidade de usuários

quantidade de empresas

módulos liberados

armazenamento

volume de registros

uso de IA

uso de API

suporte incluído

Entidades principais

plans

plan_modules

plan_limits

subscriptions

subscription_items

invoices

payments

coupons

overage_rules

2.5 Módulo de Módulos e Licenciamento

Responsável por ativar e desativar recursos do produto.

Funcionalidades

catálogo de módulos

submódulos

recursos internos por módulo

dependências entre módulos

regras de ativação

feature flags

ativação por tenant

ativação por plano

ativação por contrato customizado

Módulos iniciais

Core

CRM

ERP

RH

Jurídico

Projetos

Marketing

IA

Personalização

Entidades principais

modules

module_features

tenant_modules

feature_flags

module_dependencies

2.6 Módulo Comercial da Lumerixa

Responsável pelo funil de venda da própria empresa.

Funcionalidades

leads B2B

pipeline comercial

origem do lead

propostas

reuniões

follow-up

diagnóstico empresarial

recomendação de plano

fechamento

conversão em cliente

Etapas sugeridas

lead novo

qualificação

diagnóstico

proposta

negociação

fechamento ganho

fechamento perdido

Entidades principais

sales_leads

sales_pipelines

sales_stages

proposals

meetings

followups

lead_sources

2.7 Módulo de Implantação e Onboarding

Responsável por colocar o cliente dentro da operação.

Funcionalidades

checklist de onboarding

configuração inicial do tenant

ativação de módulos

configuração de equipes

parametrização

importação de dados

treinamento

acompanhamento inicial

aceite de implantação

Etapas sugeridas

cadastro aprovado

ambiente criado

configuração inicial

migração/importação

treinamento

operação assistida

onboarding concluído

Entidades principais

onboarding_processes

onboarding_tasks

onboarding_templates

onboarding_notes

data_import_jobs

2.8 Módulo de Suporte e Customer Success

Responsável por sustentação e retenção.

Funcionalidades

abertura de tickets

classificação por prioridade

classificação por módulo

SLA por plano

base de conhecimento

health score do cliente

acompanhamento de uso

alertas de risco

campanhas de retenção

NPS e satisfação

Entidades principais

support_tickets

ticket_messages

ticket_categories

slas

customer_success_playbooks

nps_surveys

churn_risk_flags

2.9 Módulo Financeiro Interno da Lumerixa

Responsável pelo financeiro da própria empresa.

Funcionalidades

contas a pagar

contas a receber

receitas recorrentes

despesas operacionais

comissões

fluxo de caixa

centros de custo

relatórios gerenciais

previsões financeiras

Entidades principais

internal_accounts_payable

internal_accounts_receivable

cash_flows

financial_categories

cost_centers

commissions

2.10 Módulo Jurídico e Compliance

Responsável por contratos, políticas e conformidade.

Funcionalidades

contratos com clientes

termos de uso

políticas de privacidade

aceite eletrônico

versionamento contratual

incidentes LGPD

trilha de auditoria

gestão documental

políticas internas

Entidades principais

contracts

contract_versions

legal_acceptances

privacy_consents

compliance_incidents

policy_documents

2.11 Módulo RH Interno

Responsável pela equipe da Lumerixa.

Funcionalidades

cadastro de colaboradores

cargos

departamentos

permissões internas

jornada

metas

performance

trilha de treinamentos

histórico do colaborador

Entidades principais

employees

departments

job_positions

employee_histories

performance_reviews

trainings

2.12 Módulo Projetos Internos

Responsável por roadmap e execução interna.

Funcionalidades

backlog

sprints

tarefas

prioridades

roadmap

squads

entregas

status técnico

produtividade

Entidades principais

projects

project_tasks

project_boards

sprints

roadmap_items

2.13 Módulo IA Administrativa

Responsável por inteligência operacional.

Funções

resumo executivo da operação

alertas de inadimplência

risco de churn

sugestão de upsell

leitura de uso de módulos

gargalos de suporte

análise de performance comercial

priorização de clientes estratégicos

Limites

nunca cancelar cliente automaticamente

nunca mudar plano automaticamente

nunca alterar dados críticos sem confirmação

nunca misturar dados entre empresas

3. Perfis do sistema

3.1 Perfis internos da Lumerixa

Super Admin

Diretor

Financeiro

Comercial

Customer Success

Suporte

Implantação

Jurídico

RH

Produto

Desenvolvedor

Analista

3.2 Perfis do cliente

Admin do cliente

Gestor

Operacional

Visualizador

3.3 Regra de acesso

Toda permissão deve obedecer:

quem é o usuário

a qual empresa pertence

em qual tenant opera

qual papel possui

qual módulo tenta acessar

qual ação deseja executar

4. Telas principais do sistema

4.1 Dashboard executivo

MRR

ARR

clientes ativos

inadimplentes

onboarding em andamento

tickets abertos

uso da plataforma

churn previsto

upsell sugerido

4.2 Gestão de clientes

listagem

perfil 360 do cliente

plano atual

módulos ativos

histórico comercial

histórico financeiro

histórico de suporte

saúde da conta

4.3 Gestão de empresas

empresas por cliente

status

contexto ativo

documentos

responsáveis

limites

4.4 Gestão de usuários

usuários globais

usuários por empresa

convites

papéis

permissões

logs de acesso

4.5 Gestão de planos

planos cadastrados

comparação

recursos

limites

add-ons

4.6 Billing

assinaturas

faturas

pagamentos

inadimplência

ajuste manual

4.7 Módulos

catálogo

dependências

tenants ativos

feature flags

4.8 Implantação

fila de onboarding

checklist

responsável

progresso

4.9 Suporte

tickets

SLA

prioridade

módulo afetado

4.10 Auditoria

logs

eventos críticos

histórico de alterações

exportações

5. Fluxos críticos do sistema

5.1 Fluxo de novo cliente

lead entra no CRM interno

comercial qualifica

proposta é emitida

cliente fecha

assinatura é criada

tenant é provisionado

módulos são ativados

onboarding começa

cliente entra em operação

customer success acompanha evolução

5.2 Fluxo de upgrade

cliente solicita ou IA sugere upgrade

comercial ou sistema valida necessidade

nova precificação é aplicada

cobrança é ajustada

limites e módulos são expandidos

log obrigatório

5.3 Fluxo de inadimplência

fatura vence

sistema gera alerta

cliente recebe aviso

regras de tolerância são aplicadas

conta pode entrar em restrição

reativação ocorre após regularização

5.4 Fluxo de abertura de empresa dentro do tenant

usuário admin seleciona criação de empresa

sistema valida plano

sistema valida limite de empresas

empresa é criada

contexto novo fica disponível

logs são gerados

6. Regras de negócio administrativas

6.1 Regras gerais

toda operação começa por um usuário autenticado

toda operação empresarial exige contexto ativo

nenhum dado de tenant pode vazar para outro tenant

histórico nunca deve ser perdido

ações críticas exigem confirmação

6.2 Regras comerciais

cliente sem assinatura ativa não opera plenamente

downgrade não pode apagar dados silenciosamente

upgrade pode liberar recursos após confirmação de cobrança

customizações devem ser tratadas como contrato adicional

6.3 Regras operacionais

todo ticket deve ter prioridade e categoria

todo onboarding deve ter responsável

toda proposta deve ter validade

toda fatura deve ter status rastreável

todo contrato deve ter versão

6.4 Regras de segurança

logs obrigatórios em toda ação relevante

autenticação forte

controle de sessão

limite de requisições

segregação de ambientes

criptografia de dados sensíveis

7. Indicadores do sistema administrativo

7.1 Indicadores de negócio

MRR

ARR

CAC

LTV

churn

ticket médio

expansão por cliente

7.2 Indicadores operacionais

tempo de onboarding

tempo médio de implantação

tempo médio de atendimento

tickets por módulo

inadimplência

uso por plano

7.3 Indicadores de produto

módulos mais usados

recursos mais usados

taxa de ativação

retenção por módulo

uso da IA

8. Estrutura recomendada para MVP administrativo

Fase 1

Core

Clientes SaaS

Planos e Billing

Módulos e licenciamento

Comercial interno

Onboarding

Suporte

Dashboard executivo

Fase 2

Financeiro interno

Jurídico e contratos

RH interno

Projetos internos

relatórios avançados

Fase 3

IA administrativa

automações

motor de health score

portal de parceiros

marketplace de integrações

9. Estrutura de navegação sugerida

Dashboard

Clientes

Empresas

Usuários

Planos

Assinaturas

Faturas

Módulos

Comercial

Onboarding

Suporte

Financeiro

Jurídico

RH

Projetos

Auditoria

Configurações

10. Direção arquitetural recomendada

Backend

Laravel

arquitetura modular por domínio

autenticação segura

policies e permissions

logs e auditoria

filas e eventos

billing desacoplado

Frontend

React com Inertia

layout administrativo responsivo

páginas por domínio

componentes reutilizáveis

tabelas, filtros, dashboards e formulários padronizados

Banco

MySQL ou PostgreSQL

UUID como chave primária

isolamento por tenant

auditoria e soft delete quando aplicável

11. Entregável final esperado

O sistema administrativo da Lumerixa deve permitir que a empresa:

administre sua própria operação com visão de negócio

administre toda a base de clientes SaaS

controle faturamento, planos e módulos

acompanhe onboarding, suporte e retenção

opere em contexto multiempresa com segurança

cresça sem perder governança

Esse é o núcleo para transformar a Lumerixa em uma empresa de software com operação real, escalável e profissional.