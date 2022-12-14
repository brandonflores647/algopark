"""added map,object,object_type

Revision ID: b3fcdde2ec28
Revises: ffdc0a98111c
Create Date: 2022-08-03 12:41:00.949992

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b3fcdde2ec28'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('objecttypes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('canCross', sa.Boolean(), nullable=False),
    sa.Column('speedMultiplier', sa.Numeric(), nullable=False),
    sa.Column('isStart', sa.Boolean(), nullable=False),
    sa.Column('isEnd', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('maps',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('objects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('typeId', sa.Integer(), nullable=False),
    sa.Column('mapId', sa.Integer(), nullable=False),
    sa.Column('xPos', sa.Integer(), nullable=False),
    sa.Column('yPos', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['mapId'], ['maps.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['typeId'], ['objecttypes.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('objects')
    op.drop_table('maps')
    op.drop_table('objecttypes')
    # ### end Alembic commands ###
