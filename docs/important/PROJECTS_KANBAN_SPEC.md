# Especificação: Gestão de Projetos & Kanban

Este documento detalha o funcionamento técnico do módulo de Projetos no Lumerixa OS v3.0, respeitando as Regras de Negócio (RN) oficiais.

## 1. Regras de Negócio Aplicadas
- **RN-044**: Toda tarefa DEVE ter um responsável vinculado.
- **RN-045**: Toda tarefa DEVE possuir um status válido controlado pelo sistema de colunas.
- **RN-046**: Rastreabilidade total: Mudança de status, prioridade ou responsável gera log de histórico.
- **RN-047**: Integração de Origem: Projetos podem ser vinculados a `service_id` (Serviços/Marketplace) ou `client_id` (CRM).

## 2. Hierarquia de Dados
1.  **Project**: Agrupador principal vinculado ao Tenant.
2.  **Kanban Column**: Segmentação de estágios de entrega.
3.  **Task**: Unidade de trabalho com prioridade, prazo e horas estimadas.

## 3. Fluxo de Trabalho (Workflow)
- **Drag-and-Drop Sensorial**: O Kanban opera com arraste persistente entre colunas e reordenação interna.
- **Persistência em Tempo Real**: A transição dispara o endpoint `/api/tasks/{task}/move`, que sincroniza o estado global.
- **Dashboard Executiva**: Uma visão macro em `/m/projects/dashboard` consolida KPIs de produtividade e saúde dos projetos.

## 4. Próximas Implementações
- **Time Tracking**: Contador de tempo real investido em tarefas.
- **LumiAI Insights**: Resumos gerados por IA baseados no fluxo do Kanban.
- **Attachments**: Integração com Storage para arquivos de projeto.

---
🚀 *Documento editável para expansão do módulo de Projetos.*
