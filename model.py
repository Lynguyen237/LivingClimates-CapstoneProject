from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from flask import jsonify # For query troubleshooting

# import request_climate

db = SQLAlchemy()

class City(db.Model):
    """ Cities with their lat, lon, and country info """
    
    __tablename__ = 'cities'

    location_id = db.Column(db.Integer,
                           autoincrement=True,
                           primary_key=True)
    city_name = db.Column(db.String, nullable=False)
    iso2 = db.Column(db.String) # country 2-letter code
    country = db.Column(db.String, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)
    pop = db.Column(db.Integer)

    continent_id = db.Column(db.Integer, db.ForeignKey('continents.continent_id'))

    continent = db.relationship('Continent', backref='cities')
   
    #climates = a list of Climate objects by months
    

    def __repr__(self):
        """Show coordinate's lat and long"""
        return f'<city={self.city_name}: lat={self.lat} lon={self.lon}>'


class Continent(db.Model):
    """List of countries and their continents"""

    __tablename__ = 'continents'

    continent_id = db.Column(db.Integer,
                           autoincrement=True,
                           primary_key=True)
    continent_name = db.Column(db.String, nullable=False)    
    continent_code = db.Column(db.String, nullable=False)

    
    # cities = a list of City objects belonging to a given continent

    # climates = a list of Climate objects associated with each continent

    def __repr__(self):
        """Show country name, 2_letter_country_code, continent"""
        return f'<continent_code={self.continent_code} continent={self.continent_name}>'


class Climate(db.Model):
    """ Climate in a given month with temperature in celcius and precipitation in millimeter"""

    __tablename__ = 'climates'

    climate_id = db.Column(db.Integer,
                           autoincrement=True,
                           primary_key=True,)
    month = db.Column(db.Integer)
    tavg = db.Column(db.Float)
    tmin = db.Column(db.Float)
    tmax = db.Column(db.Float)
    prcp = db.Column(db.Integer)
    pres = db.Column(db.Float)
    tsun = db.Column(db.Integer)

    location_id = db.Column(db.Integer, db.ForeignKey('cities.location_id'))
    continent_id = db.Column(db.Integer, db.ForeignKey('continents.continent_id'))
    
    city = db.relationship('City', backref='climates')
    continent = db.relationship('Continent', backref='climates')

    def __repr__(self):
        """Show month & avg temp """
        return f'<month={self.month} tavg={self.tavg}>'


def connect_to_db(flask_app, db_uri='postgresql:///climates', echo=True):
    # Configuration: https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    connect_to_db(app)

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

# Relationship: 
#   One city or continent can have multiple climates.
#   One continent can have multiple cities

# Reference: https://fellowship.hackbrightacademy.com/materials/pt7g/exercises/ratings-v2/
# Reference: https://docs.sqlalchemy.org/en/13/orm/basic_relationships.html
# In many-to-one, the many table holds the foreign key.

    