# Plano de Projeto

## Índice

- [Objetivo do Projeto](#objetivo-do-projeto)
- [Público-Alvo](#público-alvo)
- [Fase 1 – Análise e Detalhamento de Requisitos](#fase-1--análise-e-detalhamento-de-requisitos)
- [Fase 2 – Design e Arquitetura do Sistema](#fase-2--design-e-arquitetura-do-sistema)
- [Fase 3 – Planejamento do Projeto e Gestão de Riscos](#fase-3--planejamento-do-projeto-e-gestão-de-riscos)
- [Fase 4 – Desenvolvimento e Implementação](#fase-4--desenvolvimento-e-implementação)
- [Fase 5 – Testes e Validação](#fase-5--testes-e-validação)
- [Fase 6 – Implantação e Lançamento](#fase-6--implantacao-e-lancamento)
- [Fase 7 – Suporte e Manutenção](#fase-7--suporte-e-manutencao)
- [Referências](#referencias)

## Referências Cruzadas

- [`IMPLEMENTACAO.md`](./IMPLEMENTACAO.md): Detalha a arquitetura, tecnologias, estrutura de pastas, fluxo de dados, principais componentes e orientações técnicas para desenvolvimento e expansão do projeto.
- [`FLUXO_DE_TELAS.md`](./FLUXO_DE_TELAS.md): Apresenta os perfis de usuário, análise das telas, funcionalidades e fluxos de acesso, servindo como guia para mockups e usabilidade.

---

## Objetivo do Projeto

Gerar um aplicativo/plataforma que auxilie na gestão agrícola, centralizando todas as informações da lavoura em um único local. O sistema oferecerá informações por panorama da fazenda, permitindo dividir a área em talhões.

## Público-Alvo

- Produtores: Acesso limitado (visualização de dados e download de mapas)
- Técnicos/Funcionários: Acesso total (adicionar informações)
- Equipe de Geoprocessamento: Upload de mapas, acesso a todos os clientes e dados
- Equipe de Campo: Inserção de informações de fertilidade, fotos, visitas e shapes de contorno da área

---

## Fase 1 – Análise e Detalhamento de Requisitos

### 1. Documento de Requisitos de Software (DRS)

- Propósito do DRS
- Escopo do Sistema
- Definições, Acrônimos e Abreviações

#### Descrição Geral

- Perspectiva do Produto
- Funções do Produto: Gestão Agrícola Integrada, Panorama da Fazenda por talhões
- Características do Usuário: Perfis e acessos
- Restrições, Premissas e Dependências

#### Requisitos Funcionais (RF)

- RF001: Visualização de Mapas Agrícolas (fertilidade, correção, aplicação, colheita)
- RF002: Imagens de Satélite (Sentinel-2, NDVI/NDRE, médias)
- RF003: Download de Arquivos
- RF004: Visitas/Avaliações de Campo
- RF005: Armazenamento por Cliente
- RF006: Upload de Mapas (Geoprocessamento)
- RF007: Gestão de Acessos por Perfil

#### Requisitos Não Funcionais (RNF)

- Usabilidade, desempenho, segurança, confiabilidade, manutenibilidade, compatibilidade, identidade visual

#### Requisitos de Integração (RI)

- RI001: Integração com Google Earth Engine (GEE)
- RI002: Upload de Mapas (SMS/Google Drive)

#### Requisitos Offline (RO)

- RO001: Visualização offline dos dados/mapas

#### Glossário

### 2. Matriz de Rastreabilidade de Requisitos (MRR)

| ID        | Descrição                       | Caso de Uso   | Módulo           | Teste       | Status |
| --------- | ------------------------------- | ------------- | ---------------- | ----------- | ------ |
| RF001.01  | Visualizar mapas de fertilidade | CU_VisMapas   | Visualização     | TS_VM01     | Novo   |
| RF002.01  | Visualizar Sentinel-2           | CU_VisImagens | Imagens Satélite | TS_VI01     | Novo   |
| RF003.01  | Download de arquivos            | CU_Download   | Downloads        | TS_DA01     | Novo   |
| RF004.01  | Inserir visitas/avaliações      | CU_InsVisitas | Visitas          | TS_GV01     | Novo   |
| RNF006.01 | Acessível em Web/Mobile         | N/A           | Infraestrutura   | TS_Comp01   | Novo   |
| RI001.01  | Integração com GEE              | N/A           | Integrações      | TS_IntGEE01 | Novo   |
| RO001.01  | Visualização offline            | CU_VisOffline | Offline          | TS_Off01    | Novo   |

---

## Fase 2 – Design e Arquitetura do Sistema

### 1. Documento de Arquitetura de Software (DAS)

- Visão Geral: Modelo em 3 camadas (Frontend, Backend, Dados)
- Diagramas: Componentes e Implantação
- Modelagem de Dados: Cliente, Fazenda, Talhão, Mapa, Visita, Satélite
- Fluxos de Dados: Upload de mapa, visita em campo, visualização por produtor
- Tecnologias: React, React Native, Node.js/Spring Boot/Django, PostgreSQL + PostGIS, AWS S3/GCP Storage, GEE, Mapbox/Leaflet

### 2. Protótipos (Wireframes e Mockups)

- Login/Cadastro
- Dashboard (Panorama da Fazenda e Talhões)
- Visualização de Mapas (camadas)
- Imagens de Satélite (NDVI/NDRE)
- Detalhes do Talhão
- Inserção de Visita (com fotos e informações)
- Download de Arquivos
- Upload de Mapas (Geoprocessamento)
- Gerenciamento de Clientes

---

## Fase 3 – Planejamento do Projeto e Gestão de Riscos

### 1. Plano de Projeto Detalhado

- Escopo: Aplicativo Web e Mobile, visualização de mapas, integração GEE, offline
- Cronograma:
  | Fase | Início | Fim | Semanas | Entregas |
  |------|--------|-----|---------|----------|
  | F1 – Análise | Sem 1 | Sem 4 | 4 | DRS, MRR |
  | F2 – Design | Sem 5 | Sem 8 | 4 | DAS, Protótipos |
  | F3 – Planejamento | Sem 5 | Sem 6 | 2 | Plano Projeto/Riscos |
  | F4 – Desenvolvimento | Sem 9 | Sem 20 | 12 | Backend, Frontend, Integrações |
  | F5 – Testes | Sem 21 | Sem 24 | 4 | Relatórios |
  | F6 – Implantação | Sem 25 | Sem 26 | 2 | MVP em Produção |
  | F7 – Suporte | Sem 26+ | Contínuo | - | Manuais, Treinamento |

- Orçamento:
  - Equipe (PM, Analistas, Devs, QA, Eng. Geoespacial, UX)
  - Softwares/APIs (design, GEE, cloud)
  - Infraestrutura (servidores, storage)
  - Contingência (10–15%)

### 2. Plano de Gestão de Riscos

- Riscos de Requisitos: mudanças e NDVI indefinido
- Riscos Tecnológicos: integração GEE, desempenho offline
- Riscos de Cronograma: atrasos de feedback, equipe reduzida
- Riscos Operacionais: aceitação do usuário final
- Mitigação: PoCs, refinamento contínuo, arquitetura escalável

---

## Fase 4 – Desenvolvimento e Implementação

- Código-fonte em repositório Git (Frontend, Mobile, Backend, Integrações)
- Documentação técnica (APIs, Banco de Dados, Deploy)

---

## Fase 5 – Testes e Validação

- Plano de Testes: Unidade, Integração, Sistema, UAT, Performance, Segurança, Usabilidade, Offline
- Cenários de Teste: Produtor (visualizar mapas, download, offline), Técnico (visitas, fotos, fertilidade), Geoprocessamento (upload mapas, integrações GEE)
- Relatórios de Testes: bugs, cobertura, critérios de aceite

---

## Fase 6 – Implantação e Lançamento

- Plano de Implantação: preparação, instalação, migração, testes pós-implantação, rollback
- Treinamento: Geoprocessamento e Técnicos (uso completo), Produtores (uso básico, offline, download)
- Manuais: separados por perfil de usuário

---

## Fase 7 – Suporte e Manutenção

- Canais de Suporte: e-mail, telefone, chamados
- Níveis: N1 (básico/FAQ), N2 (técnico), N3 (correções/desenvolvimento)
- SLA: prazos por criticidade
- Manutenção Preventiva: segurança, performance
- Manutenção Evolutiva: novas funcionalidades e melhorias

---

Este plano pode ser ajustado conforme o projeto evolui e novas necessidades surgirem.
