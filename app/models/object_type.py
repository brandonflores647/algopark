from .db import db

class ObjectType(db.Model):
    __tablename__ = 'objecttypes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    canCross = db.Column(db.Boolean, nullable=False)
    speedMultiplier = db.Column(db.Numeric, nullable=True)
    isStart = db.Column(db.Boolean, nullable=False)
    isEnd = db.Column(db.Boolean, nullable=False)

    objects = db.relationship('Object', back_populates='type', cascade='all, delete-orphan')

    def toDict(self):
        return {
            'id': self.id,
            'name': self.name,
            'canCross': self.canCross,
            'speedMultiplier': self.speedMultiplier,
            'isStart': self.isStart,
            'isEnd': self.isEnd
        }
