# Fluxo de Telas e Arquitetura de Perfis

## Índice

- [Perfis de Usuário](#perfis-de-usuário)
- [Análise de Telas e Funcionalidades](#análise-de-telas-e-funcionalidades)
- [Fluxo de Acesso por Tipo de Usuário](#fluxo-de-acesso-por-tipo-de-usuário)
- [Observações para Mockup e Design](#observações-para-mockup-e-design)
- [Referências](#referências)

## Referências Cruzadas

- [`PLANO_DE_PROJETO.md`](./PLANO_DE_PROJETO.md): Estrutura completa do projeto, objetivos, público-alvo, requisitos, cronograma, riscos, testes, implantação e suporte.
- [`IMPLEMENTACAO.md`](./IMPLEMENTACAO.md): Arquitetura, tecnologias, estrutura de pastas, fluxo de dados, principais componentes e orientações técnicas para desenvolvimento.

## Perfis de Usuário

- **Sócio/Administrador (César, Bruna):** Acesso "guarda-chuva" a todas as informações e funcionalidades.
- **Funcionário de Geoprocessamento:** Acesso total aos dados de todos os clientes, upload e edição de mapas.
- **Produtor/Cliente:** Acesso limitado, focado em visualização dos próprios dados e mapas.
- **Técnico de Campo:** Acesso para registrar visitas, pontos de fertilidade e shapes de contorno de área.

---

## Análise de Telas e Funcionalidades

### 1. Tela de Login

- Acesso: Todos os usuários
- Fluxo: E-mail e senha → Validação → Redirecionamento para dashboard conforme perfil

### 2. Dashboard (Tela Inicial)

- Acesso: Todos os usuários
- Fluxo:
  - Sócio/Geoprocessamento: Resumo de clientes, busca geral
  - Produtor: Perfil próprio, fazendas e talhões
  - Técnico de Campo: Clientes atendidos, registro de visitas
- Funcionalidades:
  - Barra de busca centralizada
  - Acesso rápido a mapas e dados
  - Feed de atividades recentes

### 3. Gerenciamento de Produtores/Clientes

- Acesso: Sócio/Geoprocessamento
- Funcionalidades:
  - Lista de produtores
  - Adicionar novo produtor
  - Busca por nome

### 4. Perfil do Produtor

- Acesso: Todos os usuários (visualização adaptada)
- Funcionalidades:
  - Informações básicas
  - Mapas da fazenda (fertilidade, colheita, aplicação, correção)
  - Imagem de satélite (Sentinel-2, NDVI/NDRE)
  - Sócio/Geoprocessamento: Upload de mapas, edição, aba de visitas, aba financeira (futuro)
  - Técnico de Campo: Registro de visitas

### 5. Visualização de Mapas (Online/Offline)

- Acesso: Todos os usuários
- Funcionalidades:
  - Visualização completa
  - Download para uso offline
  - Zoom e navegação
  - Status online/offline

### 6. Registro de Visitas

- Acesso: Sócio/Geoprocessamento e Técnico de Campo
- Funcionalidades:
  - Adicionar informações da visita
  - Inserir fotos e dados da área

### 7. Módulo Financeiro (Futuro)

- Acesso: Sócio/Administrador
- Funcionalidades:
  - Registro de pedidos, área, datas de pagamento
  - Assinatura digital

---

## Fluxo de Acesso por Tipo de Usuário

**Sócio/Geoprocessamento:**
Login → Dashboard → Gerenciar Clientes/Buscar → Perfil do Produtor (Aba Lavoura, Visitas, Financeiro) → Visualização de Mapas

**Técnico de Campo:**
Login → Dashboard → Buscar Produtor/Meus Mapas → Perfil do Produtor (Aba Lavoura, Visitas) → Visualização de Mapas

**Produtor:**
Login → Dashboard → Perfil do Produtor (Aba Lavoura) → Visualização de Mapas

---

## Observações para Mockup e Design

- Telas devem ser intuitivas e responsivas
- Fluxos de acesso claros e adaptados ao perfil
- Elementos visuais alinhados à identidade da empresa
- Sinalização clara de status online/offline

Este documento serve como referência para o desenvolvimento do mockup no Figma e para o alinhamento entre equipe técnica e cliente.
