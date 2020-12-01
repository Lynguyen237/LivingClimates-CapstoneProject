"""CRUD operations"""

from model import db, City, Continent, Climate, connect_to_db


def create_city (city_name, country, iso2, lat, lon, pop):
    """Create and return a city with their lat & lon"""
    city = City(city_name=city_name, 
                country=country, 
                iso2=iso2,
                lat=lat, 
                lon=lon,
                pop=pop)

    db.session.add(city)
    db.session.commit()

    return city


def create_continent(continent_name, continent_code):
    """Create and return a continent"""
    continent = Continent(continent_name=continent_name,
                          continent_code=continent_code)

    db.session.add(continent)
    db.session.commit()

    return continent

def create_climate (month, prcp, pres, tavg, tmax, tmin, tsun, city, continent):
    """Create and return a month climate"""
    climate = Climate(month=month,
                      prcp=prcp,
                      pres=pres,
                      tavg=tavg,
                      tmax=tmax,
                      tmin=tmin,
                      tsun=tsun,
                      city=city,
                      continent=continent)
    
    db.session.add(climate)
    db.session.commit()

    return climate


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

# test = [{'month': 1, 'tavg': -0.7, 'tmin': -4.4, 'tmax': 3.1, 'prcp': 84, 'pres': None, 'tsun': None}, {'month': 2, 'tavg': 0.5, 'tmin': -3.5, 'tmax': 4.5, 'prcp': 78, 'pres': None, 'tsun': None}, {'month': 3, 'tavg': 5, 'tmin': 0.6, 'tmax': 9.3, 'prcp': 99, 'pres': None, 'tsun': None}, {'month': 4, 'tavg': 10.7, 'tmin': 5.7, 'tmax': 15.6, 'prcp': 102, 'pres': None, 'tsun': None}, {'month': 5, 'tavg': 16.5, 'tmin': 11.4, 'tmax': 21.6, 'prcp': 107, 'pres': None, 'tsun': None}, {'month': 6, 'tavg': 21.6, 'tmin': 16.7, 'tmax': 26.5, 'prcp': 90, 'pres': None, 'tsun': None}, {'month': 7, 'tavg': 24.6, 'tmin': 19.8, 'tmax': 29.3, 'prcp': 107, 'pres': None, 'tsun': None}, {'month': 8, 'tavg': 23.8, 'tmin': 19.1, 'tmax': 28.4, 'prcp': 102, 'pres': None, 'tsun': None}, {'month': 9, 'tavg': 19.6, 'tmin': 14.8, 'tmax': 24.3, 'prcp': 96, 'pres': None, 'tsun': None}, {'month': 10, 'tavg': 13.5, 'tmin': 8.7, 'tmax': 18.3, 'prcp': 84, 'pres': None, 'tsun': None}, {'month': 11, 'tavg': 8.1, 'tmin': 4, 'tmax': 12.1, 'prcp': 104, 'pres': None, 'tsun': None}, {'month': 12, 'tavg': 2.2, 'tmin': -1.3, 'tmax': 5.7, 'prcp': 94, 'pres': None, 'tsun': None}]
