from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Object

object_routes = Blueprint('object', __name__)

@object_routes.route('/all/<mapId>')
def getAll(mapId):
    objects = Object.query.filter_by(mapId=mapId).all()
    data = [i.toDict() for i in objects]
    return {'objects': data}

# @object_routes.route('/new', methods=['POST'])
# def create():
#     data = request.json
#     new_map = Map(
#         name=data['name'],
#         ownerId=data['ownerId']
#     )
#     db.session.add(new_map)
#     db.session.commit()
#     return new_map.toDict()

# @object_routes.route('/update', methods=['PATCH'])
# def update():
#     data = request.json
#     map = Map.query.get(data['id'])
#     map.name = data['name']
#     db.session.commit()
#     return map.toDict()

# @object_routes.route('/delete', methods=['DELETE'])
# def delete():
#     data = request.json
#     Map.query.filter_by(id=data['id']).delete()
#     db.session.commit()
#     return 'Map successfully deleted!'
