from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Map, Object

map_routes = Blueprint('map', __name__)

@map_routes.route('/all/<userId>')
def getAll(userId):
    maps = Map.query.filter_by(ownerId=userId).all()
    data = [i.toDict() for i in maps]

    for i in range(len(maps)):
        objectDict = {i.id: i.toDict() for i in maps[i].objects}
        data[i]['objects'] = objectDict

    return {'maps': data}

@map_routes.route('/new', methods=['POST'])
def create():
    data = request.json
    new_map = Map(
        name=data['name'],
        ownerId=data['ownerId']
    )
    db.session.add(new_map)

    db.session.commit()
    return new_map.toDict()

@map_routes.route('/update', methods=['PATCH'])
def update():
    data = request.json
    map = Map.query.get(data['id'])
    map.name = data['name']
    db.session.commit()
    return map.toDict()

@map_routes.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Map.query.filter_by(id=data['mapId']).delete()
    db.session.commit()
    return 'Map successfully deleted!'
