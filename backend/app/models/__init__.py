"""Carrega todos os modelos para que relacionamentos por string funcionem em scripts standalone.

Evita erros como:
  expression 'Property' failed to locate a name ('Property')

Ao importar este pacote, todos os modelos são registrados no mapper.
"""

from importlib import import_module

_MODEL_MODULES = [
    "user",
    "property",
    "field",
    "sample_point",
    "recommendation",
    "culture",
    "lab_analysis",
]

for _m in _MODEL_MODULES:
    import_module(f"app.models.{_m}")

__all__ = _MODEL_MODULES
