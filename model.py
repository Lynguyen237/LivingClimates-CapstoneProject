from flask_sqlalchemy import SQLAlchemy

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
        

# Reference: https://fellowship.hackbrightacademy.com/materials/pt7g/exercises/ratings-v2/
    