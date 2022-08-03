from .db import db

class Object(db.Model):
    __tablename__ = 'objects'

    id = db.Column(db.Integer, primary_key=True)
    typeId = db.Column(db.Integer, db.ForeignKey("objecttypes.id", ondelete='CASCADE'), nullable=False)
    mapId = db.Column(db.Integer, db.ForeignKey("maps.id", ondelete='CASCADE'), nullable=False)
    xPos = db.Column(db.Integer, nullable=False)
    yPos = db.Column(db.Integer, nullable=False)

    type = db.relationship('ObjectType', back_populates='object')
    map = db.relationship('Map', back_populates='objects')

    def toDict(self):
        return {
            'id': self.id,
            'typeId': self.typeId,
            'mapId': self.mapId,
            'xPos': self.xPos,
            'yPos': self.yPos
        }
