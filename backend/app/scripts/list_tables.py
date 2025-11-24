"""Lista tabelas existentes via SQLAlchemy Inspector sem usar psql.

Uso:
  python app/scripts/list_tables.py
"""

from sqlalchemy import inspect
from app.db.database import engine

def main():
    insp = inspect(engine)
    tables = insp.get_table_names()
    if not tables:
        print("Nenhuma tabela encontrada.")
    else:
        print("Tabelas:")
        for t in tables:
            print(f" - {t}")

if __name__ == "__main__":
    main()
