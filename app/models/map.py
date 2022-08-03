from .db import db
from sqlalchemy.sql import func

class Map(db.Model):
    __tablename__ = 'maps'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    owner = db.relationship('User', back_populates='maps')
    objects = db.relationship('Object', back_populates='map', cascade='all, delete-orphan')

    def toDict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.ownerId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
