from flask import Blueprint
from flask_login import login_required
from app.models import Map

map_routes = Blueprint('map', __name__)

@map_routes.route('/all/<userId>')
def getAll(userId):
    maps = Map.query.filter_by(ownerId=userId).all()
    data = [i.toDict() for i in maps]
    return {'maps': data}
