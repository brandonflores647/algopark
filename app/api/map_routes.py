from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Map, Object
from app.forms import MapForm

map_routes = Blueprint('map', __name__)

def validation_errors_to_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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
    form = MapForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.json
        map = Map.query.get(data['mapId'])
        map.name = form.data['name']
        db.session.commit()
        return map.toDict()
    return {'errors': validation_errors_to_messages(form.errors)}, 400

@map_routes.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Map.query.filter_by(id=data['mapId']).delete()
    db.session.commit()
    return 'Map successfully deleted!'
