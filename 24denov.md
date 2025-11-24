**Resumo Geral**
- Backend: Ajuste de ambiente (.env correto com `database_url`), criação de venv, instalação de dependências e correção das migrações Alembic (baseline / recriação do schema).
- Usuário: Criação de script `seed_user.py` para garantir usuário admin; correção de erro de mapeamento adicionando `app/models/__init__.py`.
- Segurança: Reinstalação e pin de versão do `bcrypt` no pyproject.toml para eliminar incompatibilidade com passlib (erro `__about__`), mantendo o pré‑hash SHA-256 já implementado.
- Rotas: Adicionados `GET /users/` e rota raiz `/` em main.py para evitar 404 e 405.
- Mobile: Ajustado client.ts para usar `BASE_URL` configurável e direcionar de fato para o backend onde o usuário existe; instruções para usar IP local ou ngrok.
- Diagnóstico Login 400: Identificado que o app enviava requisições para uma URL sem o usuário criado (domínio ngrok antigo); após alinhar BASE_URL e seed, o login retornou 200 e token válido.
- Migrações: Erro “DuplicateTable” resolvido fazendo limpeza do schema e rodando `alembic upgrade head` dentro da venv correta.
- Scripts utilitários: Adicionados `list_tables.py` (inspeção de tabelas via SQLAlchemy) e pacote `scripts` para organização.

**Arquivos Modificados**
- users.py: inclusão de `GET /users/`.
- main.py: rota raiz `/`.
- __init__.py: import central de modelos.
- seed_user.py: criação/ajuste para importar todos modelos.
- list_tables.py: listagem de tabelas.
- pyproject.toml: pin `bcrypt==3.2.0`.
- client.ts: baseURL parametrizada.

**Principais Problemas Resolvidos**
- 500/422 criação/login: causados por migração inconsistente e email inválido.
- DuplicateTable Alembic: ausência de baseline / tabelas pré-existentes.
- 400 no Expo: discrepância entre backend real e a BASE_URL usada no app.
- Erro bcrypt: conflito de versão (corrigido com pin).
- 404/405: ausência de rotas para `/` e `GET /users/`.

**Fluxo Atual de Login**
- Usuário existe (seed ou POST /users/).
- App envia POST para `/auth/login` na BASE_URL correta.
- Backend valida senha (pré-hash + bcrypt), gera JWT e retorna `access_token`.
- Interceptor no client.ts passa JWT nas próximas requisições.

**Próximos Passos (Opcional)**
- Adicionar paginação em `GET /users/`.
- Implementar refresh token / logout server-side.
- Criar script único de setup (`setup_dev.py`) automatizando migração + seed.
- Melhorar observabilidade (logs estruturados para falhas de login).

Se quiser uma dessas melhorias, é só dizer que eu implemento. Deseja seguir com algo específico agora?