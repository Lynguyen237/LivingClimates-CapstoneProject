from flask_sqlalchemy import SQLAlchemy
# import request_climate

db = SQLAlchemy()

class Climate(db.Model):
    """ Climate for all coordinates """

    __tablename__ = 'climates'

    coordinate = db.Column(db.Integer,
                           autoincrement=True,
                           primary_key=True,)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)
    month = db.Column(db.Integer)
    tavg = db.Column(db.Float)
    tmin = db.Column(db.Float)
    tmax = db.Column(db.Float)
    prcp = db.Column(db.Integer)
    pres = db.Column(db.Float)
    tsun = db.Column(db.Integer)

    def __repr__(self):
        """Show lon lat """
        return f'<lon={self.lon} lat={self.lat}>'

test = [{'month': 1, 'tavg': -0.7, 'tmin': -4.4, 'tmax': 3.1, 'prcp': 84, 'pres': None, 'tsun': None}, {'month': 2, 'tavg': 0.5, 'tmin': -3.5, 'tmax': 4.5, 'prcp': 78, 'pres': None, 'tsun': None}, {'month': 3, 'tavg': 5, 'tmin': 0.6, 'tmax': 9.3, 'prcp': 99, 'pres': None, 'tsun': None}, {'month': 4, 'tavg': 10.7, 'tmin': 5.7, 'tmax': 15.6, 'prcp': 102, 'pres': None, 'tsun': None}, {'month': 5, 'tavg': 16.5, 'tmin': 11.4, 'tmax': 21.6, 'prcp': 107, 'pres': None, 'tsun': None}, {'month': 6, 'tavg': 21.6, 'tmin': 16.7, 'tmax': 26.5, 'prcp': 90, 'pres': None, 'tsun': None}, {'month': 7, 'tavg': 24.6, 'tmin': 19.8, 'tmax': 29.3, 'prcp': 107, 'pres': None, 'tsun': None}, {'month': 8, 'tavg': 23.8, 'tmin': 19.1, 'tmax': 28.4, 'prcp': 102, 'pres': None, 'tsun': None}, {'month': 9, 'tavg': 19.6, 'tmin': 14.8, 'tmax': 24.3, 'prcp': 96, 'pres': None, 'tsun': None}, {'month': 10, 'tavg': 13.5, 'tmin': 8.7, 'tmax': 18.3, 'prcp': 84, 'pres': None, 'tsun': None}, {'month': 11, 'tavg': 8.1, 'tmin': 4, 'tmax': 12.1, 'prcp': 104, 'pres': None, 'tsun': None}, {'month': 12, 'tavg': 2.2, 'tmin': -1.3, 'tmax': 5.7, 'prcp': 94, 'pres': None, 'tsun': None}]

# connection.execute(climates.insert(),test)


def connect_to_db(flask_app, db_uri='postgresql:///climates', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    connect_to_db(app)

# Reference: https://fellowship.hackbrightacademy.com/materials/pt7g/exercises/ratings-v2/
    