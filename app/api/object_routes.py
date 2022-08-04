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

@object_routes.route('/create_many', methods=['POST'])
def create_many():
    data = request.json
    for obj in data['objects'].values():
        new_obj = Object(
            typeId = obj['typeId'],
            mapId = data['mapId'],
            xPos = obj['xPos'],
            yPos = obj['yPos']
        )
        db.session.add(new_obj)
    db.session.commit()
    return data

@object_routes.route('/update', methods=['PATCH'])
def update():
    data = request.json
    object = Object.query.get(data['id'])
    object.typeId = data['typeId']
    object.xPos = data['xPos']
    object.yPos = data['yPos']
    db.session.commit()
    return object.toDict()

@object_routes.route('/update_many', methods=['PATCH'])
def update_many():
    data = request.json
    for i in data['newObjects'].keys():
        if i not in data['oldObjects'].keys():
            new_obj = Object(
                typeId = data['newObjects'][i]['typeId'],
                mapId = data['mapId'],
                xPos = data['newObjects'][i]['xPos'],
                yPos = data['newObjects'][i]['yPos']
            )
            db.session.add(new_obj)
    for j in data['oldObjects'].keys():
        if j not in data['newObjects'].keys():
            if 'id' in data['oldObjects'][j]:
                Object.query.filter_by(id=data['oldObjects'][j]['id']).delete()
            else:
                Object.query.filter_by(
                    mapId=data['mapId'],
                    xPos=data['oldObjects'][j]['xPos'],
                    yPos=data['oldObjects'][j]['yPos']).delete()

    db.session.commit()
    return data

@object_routes.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Object.query.filter_by(id=data['id']).delete()
    db.session.commit()
    return 'Object successfully deleted!'
