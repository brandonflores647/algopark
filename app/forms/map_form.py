from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class MapForm(FlaskForm):
    name = StringField(
        'Name', validators=[DataRequired(), Length(
            min=1, max=20, message='Name must be between 1 and 20 characters long.')])
