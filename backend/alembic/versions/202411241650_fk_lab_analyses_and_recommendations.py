"""FK UUID for lab_analyses and recommendations

Revision ID: 202411241650
Revises: 202411241610
Create Date: 2024-11-24 16:50:00
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '202411241650'
down_revision = '202411241610'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # lab_analyses.sample_point_id to UUID FK
    op.alter_column('lab_analyses', 'sample_point_id',
                    type_=postgresql.UUID(as_uuid=True),
                    postgresql_using='sample_point_id::uuid')
    op.create_foreign_key('fk_lab_analyses_sample_point_id', 'lab_analyses', 'sample_points', ['sample_point_id'], ['id'], ondelete='CASCADE')

    # recommendations.analysis_id to UUID FK
    op.alter_column('recommendations', 'analysis_id',
                    type_=postgresql.UUID(as_uuid=True),
                    postgresql_using='analysis_id::uuid')
    op.create_foreign_key('fk_recommendations_analysis_id', 'recommendations', 'lab_analyses', ['analysis_id'], ['id'], ondelete='CASCADE')
    # ensure uniqueness constraint if not already
    # Already unique via model; if missing add:
    # op.create_unique_constraint('uq_recommendations_analysis_id', 'recommendations', ['analysis_id'])


def downgrade() -> None:
    op.drop_constraint('fk_recommendations_analysis_id', 'recommendations', type_='foreignkey')
    op.alter_column('recommendations', 'analysis_id', type_=sa.String(length=36))
    op.drop_constraint('fk_lab_analyses_sample_point_id', 'lab_analyses', type_='foreignkey')
    op.alter_column('lab_analyses', 'sample_point_id', type_=sa.String(length=36))