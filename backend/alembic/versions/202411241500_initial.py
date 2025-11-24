"""initial

Revision ID: 202411241500
Revises: 
Create Date: 2024-11-24 15:00:00

"""
from alembic import op
import sqlalchemy as sa
import uuid
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '202411241500'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('users',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('name', sa.String(length=120), nullable=False),
        sa.Column('email', sa.String(length=160), nullable=False, unique=True),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
    )
    op.create_index('ix_users_email', 'users', ['email'], unique=True)

    op.create_table('properties',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('name', sa.String(length=120), nullable=False),
        sa.Column('owner_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
    )
    op.create_index('ix_properties_owner_id', 'properties', ['owner_id'])

    op.create_table('fields',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('name', sa.String(length=120), nullable=False),
        sa.Column('property_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('properties.id'), nullable=False),
        sa.Column('polygon_wkt', sa.String(), nullable=True),
    )
    op.create_index('ix_fields_property_id', 'fields', ['property_id'])

    op.create_table('sample_points',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('field_id', sa.String(length=36), nullable=False),
        sa.Column('depth_cm', sa.Integer(), nullable=False),
        sa.Column('collected_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('latitude', sa.Float(), nullable=True),
        sa.Column('longitude', sa.Float(), nullable=True),
    )
    op.create_index('ix_sample_points_field_id', 'sample_points', ['field_id'])

    op.create_table('lab_analyses',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('sample_point_id', sa.String(length=36), nullable=False),
        sa.Column('ph_h2o', sa.Float(), nullable=True),
        sa.Column('p_mg_dm3', sa.Float(), nullable=True),
        sa.Column('k_cmol_dm3', sa.Float(), nullable=True),
        sa.Column('ca_cmol_dm3', sa.Float(), nullable=True),
        sa.Column('mg_cmol_dm3', sa.Float(), nullable=True),
        sa.Column('mo_g_kg', sa.Float(), nullable=True),
    )
    op.create_index('ix_lab_analyses_sample_point_id', 'lab_analyses', ['sample_point_id'])

    op.create_table('recommendations',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('analysis_id', sa.String(length=36), nullable=False),
        sa.Column('n_kg_ha', sa.Float(), nullable=True),
        sa.Column('p2o5_kg_ha', sa.Float(), nullable=True),
        sa.Column('k2o_kg_ha', sa.Float(), nullable=True),
        sa.Column('lime_t_ha', sa.Float(), nullable=True),
    )
    op.create_index('ix_recommendations_analysis_id', 'recommendations', ['analysis_id'])

    op.create_table('cultures',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('name', sa.String(length=80), nullable=False, unique=True),
    )


def downgrade() -> None:
    op.drop_table('cultures')
    op.drop_index('ix_recommendations_analysis_id', table_name='recommendations')
    op.drop_table('recommendations')
    op.drop_index('ix_lab_analyses_sample_point_id', table_name='lab_analyses')
    op.drop_table('lab_analyses')
    op.drop_index('ix_sample_points_field_id', table_name='sample_points')
    op.drop_table('sample_points')
    op.drop_index('ix_fields_property_id', table_name='fields')
    op.drop_table('fields')
    op.drop_index('ix_properties_owner_id', table_name='properties')
    op.drop_table('properties')
    op.drop_index('ix_users_email', table_name='users')
    op.drop_table('users')