from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Object

object_routes = Blueprint('object', __name__)

@object_routes.route('/all/<mapId>')
def getAll(mapId):
    objects = Object.query.filter_by(mapId=mapId).all()
    data = [i.toDict() for i in objects]
    return {'objects': data}

@object_routes.route('/new', methods=['POST'])
def create():
    data = request.json
    new_object = Object(
        typeId=data['typeId'],
        mapId=data['mapId'],
        xPos=data['xPos'],
        yPos=data['typeId'],
    )
    db.session.add(new_object)
    db.session.commit()
    return new_object.toDict()

@object_routes.route('/update', methods=['PATCH'])
def update():
    data = request.json
    object = Object.query.get(data['id'])
    object.typeId = data['typeId']
    object.xPos = data['xPos']
    object.yPos = data['yPos']
    db.session.commit()
    return object.toDict()

# @object_routes.route('/delete', methods=['DELETE'])
# def delete():
#     data = request.json
#     Map.query.filter_by(id=data['id']).delete()
#     db.session.commit()
#     return 'Map successfully deleted!'
