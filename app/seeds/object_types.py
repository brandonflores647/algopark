from app.models import db, ObjectType

def seed_object_types():
    wall = ObjectType(
        name='Wall', canCross=False, isStart=False, isEnd=False)
    start = ObjectType(
        name='Start', canCross=True, isStart=True, isEnd=False)
    end = ObjectType(
        name='End', canCross=True, isStart=False, isEnd=True)
    slow = ObjectType(
        name='Slow', canCross=True, speedMultiplier=4, isStart=False, isEnd=False)

    db.session.add(wall)
    db.session.add(start)
    db.session.add(end)
    db.session.add(slow)

    db.session.commit()

def undo_object_types():
    db.session.execute('TRUNCATE objecttypes RESTART IDENTITY CASCADE;')
    db.session.commit()
