from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[username_exists, Length(min=3, max=40, message='Username must be between 3 and 40 characters')])
    email = StringField('email', validators=[DataRequired(message='Email field is required.'), user_exists, Email()])
    password = StringField('password', validators=[DataRequired(message='Password field is required.')])
