import json
import pickle
import crud
from model import db, City, Continent, Climate, connect_to_db
import server
from request_climate import get_climate

connect_to_db(server.app)

#========= CONTINENT-RELEATED DICTIONARIES =================
# Open continens_in_db dictionary (keys = 2-letter continent codes, values = continent objects)
with open("data/continents_in_db.pkl","rb") as f:
    continents_in_db = pickle.load(f)

# Open country_continent dictionary (keys = iso2 country codes, values = continent objects)
with open("data/country_continent_dict.pkl","rb") as f:
    country_continent_dict = pickle.load(f)


#========= CITY TABLE - ROW CREATION =================
# Load data from a city JSON file as a list of dictionary and save it in a variable
with open('data/cities_json/cities_batch_3_fixit.json') as f:
    city_list = json.loads(f.read())


# **** Check point to ensure you don't accidentally runs a file you already ran **** 
# List of city names
city_name_list=[]
for city in City.query.all():
    city_name_list.append(city.city_name)

for city in city_list[1:4]:
    if city['city_ascii'] in city_name_list:
        print(city['city_ascii'])
        raise (f'Doublecheck if city already exists in database')
# **** End of check point ****


# Create cities (city objects), store them in a list to add climate data later
cities_in_db = []
for city in city_list[1:]: #city is a dictionary & city_list a list of dictionaries
    city_name, country, iso2, lat, lon, pop = (city['city_ascii'],
                                               city['country'],
                                               city['iso2'],
                                               city['lat'],
                                               city['lng'],
                                               city['population'])
    
    
    # create a city object
    db_city = crud.create_city(city_name, country, iso2, lat, lon, pop)
    cities_in_db.append(db_city)

#========= CLIMATE TABLE =================
# Loop over the list of city objects 
# and create corresponding climate data
for city in cities_in_db:
    # Find the city's continent by looking up iso2 key in the country_continent dict
    continent = country_continent_dict[city.iso2]
    city.continent = continent # Associate the city with the right continent via sqlalchemy relationship
    db.session.commit() # Commit changes

    # Request 12-month climate data for a given city
    climate_data = get_climate(city.lat, city.lon) 
    
    for month_data in climate_data['data']:

        month, prcp, pres = (month_data['month'],
                             month_data['prcp'],
                             month_data['pres'])
        
        tavg, tmax, tmin, tsun = (month_data['tavg'],
                                  month_data['tmax'],
                                  month_data['tmin'],
                                  month_data['tsun'])
        
        # Create the climate rows in the 'climates' table
        db_climate = crud.create_climate (month,
                                          prcp,
                                          pres,
                                          tavg,
                                          tmax,
                                          tmin,
                                          tsun,
                                          city,
                                          continent)                        
