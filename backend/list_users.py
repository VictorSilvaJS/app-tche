"""Lista usuários do banco garantindo que todos os modelos sejam importados
Importante: execute com o venv ativado no diretório `backend`.
"""
from importlib import import_module
from app.db.database import SessionLocal

# Importa todos os módulos de modelos para garantir que os mappers do SQLAlchemy
# sejam registrados antes de criar a sessão/consultar as tabelas.
MODEL_MODULES = [
    'app.models.base',
    'app.models.user',
    'app.models.property',
    'app.models.field',
    'app.models.sample_point',
    'app.models.lab_analysis',
    'app.models.recommendation',
    'app.models.culture'
]

for m in MODEL_MODULES:
    try:
        import_module(m)
    except Exception as e:
        # não falha aqui; só informa se um módulo não existir
        print(f"Aviso: não foi possível importar {m}: {e}")

def main():
    db = SessionLocal()
    try:
        # import local do modelo User (após registros dos mappers)
        from app.models.user import User
        users = db.query(User).all()
        if not users:
            print("Nenhum usuário encontrado.")
            return
        for u in users:
            print(u.id, u.email, getattr(u, 'name', None))
    finally:
        db.close()

if __name__ == '__main__':
    main()
from app.db.database import SessionLocal
from app.models.user import User
db = SessionLocal()
for u in db.query(User).all():
    try:
        print(u.id, u.email, u.name)
    except Exception:
        print("user row:", u)
db.close()
