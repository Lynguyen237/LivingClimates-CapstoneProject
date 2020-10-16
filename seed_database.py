import os
import json

import crud
import model
import server
from request_climate import get_climate

#only needed if changing happens in model.py or database is changed
os.system('dropdb climates') 
os.system('createdb climates')

model.connect_to_db(server.app)
model.db.create_all()

# Load data from a city JSON file and save it in a variable
with open('data/samplecities.json') as f:
    city_data = json.loads(f.read())

# Create cities, store them in a list to add climate data later
cities_in_db = []
for city in city_data: #city is a dictionary & city_data a list of dictionaries
    city_name, country, lat, lon = (city['city'],
                                    city['country'],
                                    city['lat'],
                                    city['lng'])
    # create a city object
    db_city = crud.create_city(city_name, country, lat, lon)
    cities_in_db.append(db_city)

# Loop over the list of city object 
# and create corresponding climate data
for city in cities_in_db:
    climate_data = get_climate(city.lat, city.lon)

    for month_data in climate_data['data']:

        month, prcp, pres = (month_data['month'],
                             month_data['prcp'],
                             month_data['pres'])
        
        tavg, tmax, tmin, tsun = (month_data['tavg'],
                                  month_data['tmax'],
                                  month_data['tmin'],
                                  month_data['tsun'])

        db_climate = crud.create_climate (month,
                                          prcp,
                                          pres,
                                          tavg,
                                          tmax,
                                          tmin,
                                          tsun,
                                          city)                        
