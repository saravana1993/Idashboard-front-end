import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql+pymysql://flask_user:flask_password@db/flask_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False