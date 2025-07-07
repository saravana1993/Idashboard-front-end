#from . import db
from flask_login import UserMixin
from sqlalchemy.types import JSON as GenericJSON

# class User(db.Model, UserMixin):
#     __tablename__ = "user"
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     password = db.Column(db.String(255), nullable=False)



