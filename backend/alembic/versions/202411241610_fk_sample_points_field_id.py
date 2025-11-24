"""Alter sample_points.field_id to UUID FK

Revision ID: 202411241610
Revises: 202411241500
Create Date: 2024-11-24 16:10:00
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '202411241610'
down_revision = '202411241500'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Convert existing field_id text to UUID and add FK constraint
    # 1) Alter type using casting
    op.alter_column('sample_points', 'field_id',
                    type_=postgresql.UUID(as_uuid=True),
                    postgresql_using='field_id::uuid')
    # 2) Add foreign key constraint referencing fields.id
    op.create_foreign_key('fk_sample_points_field_id', 'sample_points', 'fields', ['field_id'], ['id'], ondelete='CASCADE')


def downgrade() -> None:
    op.drop_constraint('fk_sample_points_field_id', 'sample_points', type_='foreignkey')
    op.alter_column('sample_points', 'field_id', type_=sa.String(length=36))