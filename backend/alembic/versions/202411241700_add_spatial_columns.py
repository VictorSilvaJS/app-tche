"""Add spatial columns and populate

Revision ID: 202411241700
Revises: 202411241650
Create Date: 2024-11-24 17:00:00
"""
from alembic import op
import sqlalchemy as sa
from geoalchemy2 import Geometry

revision = "202411241700"
down_revision = "202411241650"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Ensure PostGIS extension
    op.execute("CREATE EXTENSION IF NOT EXISTS postgis")

    # Add geometry column to fields
    op.add_column("fields", sa.Column("geom", Geometry(geometry_type="MULTIPOLYGON", srid=4326), nullable=True))
    # Populate from existing WKT if present
    op.execute(
        "UPDATE fields SET geom = ST_Multi(ST_GeomFromText(polygon_wkt, 4326)) WHERE polygon_wkt IS NOT NULL AND polygon_wkt <> ''"
    )
    # Create spatial index
    op.execute("CREATE INDEX IF NOT EXISTS idx_fields_geom ON fields USING GIST (geom)")

    # Add geometry column to sample_points
    op.add_column("sample_points", sa.Column("geom", Geometry(geometry_type="POINT", srid=4326), nullable=True))
    op.execute(
        "UPDATE sample_points SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) WHERE latitude IS NOT NULL AND longitude IS NOT NULL"
    )
    op.execute("CREATE INDEX IF NOT EXISTS idx_sample_points_geom ON sample_points USING GIST (geom)")

    # Optionally set NOT NULL if all rows populated (left nullable for safety)


def downgrade() -> None:
    op.execute("DROP INDEX IF EXISTS idx_sample_points_geom")
    op.drop_column("sample_points", "geom")
    op.execute("DROP INDEX IF EXISTS idx_fields_geom")
    op.drop_column("fields", "geom")
    # Extension left installed (safe); to remove uncomment:
    # op.execute("DROP EXTENSION IF EXISTS postgis")
