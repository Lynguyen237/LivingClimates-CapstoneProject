import json
import pickle #https://www.pitt.edu/~naraehan/python3/pickling.html
from model import db, City, Continent, Climate, connect_to_db
import server

connect_to_db(server.app)

#========= CONTINENTS_IN_DB DICTIONARY (PKL)=================
# Create a continent dictionary with 2-letter continent codes as keys & continent objects as values.
# Save the dictionaries into a pickle file for later use

continents_in_db = {}
for continent_object in Continent.query.all():
    continents_in_db[continent_object.continent_code] = continent_object

f = open("data/continents_in_db.pkl","wb")
pickle.dump(continents_in_db,f)
f.close()

    # **** Unpickle syntax (use rb to read binary file) ***
    # with open("data/continents_in_db.pkl","rb") as f:
    #     continents_in_db = pickle.load(f)


#========= COUNTRY_CONTINENT_DICT DICTIONARY (PKL) =================
# Create country_continent dictionary with ios2 country codes as keys & continent objects as values
# Save the dictionaries into a pickle file for later use

with open('data/country-continent.json') as f:
    country_continent = json.loads(f.read())

country_continent_dict = {}
for item in country_continent:
    iso2 = item['Two_Letter_Country_Code']
    country_continent_dict[iso2] = continents_in_db[item['Continent_Code']]

with open("data/country_continent_dict.pkl", "wb") as f:
    pickle.dump(country_continent_dict,f)


#========= CITY FILES (JSON) =================
# Divide the list of cities into smaller files, each containing 2k cities or fewer
# to comply with the 2k daily climates API requests.
# https://appdividend.com/2019/11/13/how-to-convert-python-list-to-json-example/ 
with open('data/cities_json/worldcities_edited.json') as f:
    worldcities = json.loads(f.read())

no_of_cities = len(worldcities) #26542
counter = 1

for i in range(no_of_cities)[::2000]:
    # Format file as cities_batch_{batch_number}_{first_city_order}_{last_city_order}.json
    with open(f'data/cities_json/cities_batch_{counter}_{i+1}to{i//1000+2}k.json','w', encoding='utf-8') as f:
        json.dump(worldcities[i:i+2000], f, ensure_ascii=False, indent=4)
    print(f'file {counter} done')
    counter += 1