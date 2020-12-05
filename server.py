# from flask import Flask
from flask import (Flask, render_template, request, flash, session, redirect, jsonify, session)
from model import connect_to_db, Climate, Continent, City, db, func
from flask_debugtoolbar import DebugToolbarExtension # Add Flask DebugToolbar
import datetime

app = Flask(__name__)
app.permanent_session_lifetime = datetime.timedelta(days=365)
app.secret_key = 'random' # Set a random key for the DebugToolbar


@app.route('/')
@app.route('/about')
@app.route('/favorites')
@app.route('/save-our-planet')
def homepage():
    """Show the homepage with the search filters"""
    return render_template('main.html')



@app.route('/results.json')
def get_query_result_json():
    """Get search query results and save them in a json file"""

    month = request.args.get('month') # month is a string after being passed via HTTP
    month = [int(i) for i in month.split(',')] # Store all the months user chooses as integer in a list
    tavgLow = request.args.get('tavgLow')
    tavgHigh = request.args.get('tavgHigh')
    prcp = request.args.get('prcp')
    continent = request.args.get('continent')
    iso2 = request.args.get('iso2')

    # Connect to db to retrieve the city & continent objects meeting the criteria
    results = db.session.query(City,Continent).select_from(City).join(Climate).join(Continent)\
                .filter(Climate.month.in_(month), Climate.tavg >= tavgLow, Climate.tavg <= tavgHigh)    
    
    if prcp == "quartile":
        results = results.filter(Climate.prcp <=27)
    elif prcp == "quartile2":
        results = results.filter(Climate.prcp > 27, Climate.prcp <=60)
    elif prcp == "quartile3":
        results = results.filter(Climate.prcp > 60, Climate.prcp <=110)
    elif prcp == "quartile4":
        results = results.filter(Climate.prcp > 110)

    if continent:
        results = results.filter(Continent.continent_name == continent)
    if iso2:
        results = results.filter(City.iso2 == iso2)
    
    results = results.group_by(City,Continent)\
                    .having(func.count(Climate.month)==len(month)).limit(20).all()

    print(results)
    
    # Create a dictionary in JSON format
    result_dict = {}

    for (city, continent) in results: 
        city_info = {'lat':city.lat,
                    'lon':city.lon,
                    'iso2':city.iso2}
                    
        if continent.continent_name not in result_dict:
            result_dict[continent.continent_name] = {city.country:\
                                                    {city.city_name:city_info}}
        
        if city.country not in result_dict[continent.continent_name]:
            result_dict[continent.continent_name]\
                    .update({city.country:\
                            {city.city_name:city_info}})
            
        if city.city_name not in result_dict[continent.continent_name][city.country]:
            result_dict[continent.continent_name]\
                    [city.country]\
                    .update({city.city_name:city_info})
    
    print(result_dict)
    return jsonify({'results':result_dict})
    

@app.route('/maps')
def show_map():
    """Show map with a marker"""

    return render_template('maps-react.html', session=session)   


@app.route('/save_to_session')
def save_to_session():
    """Save the favorited cities to the 'session' cookie"""

    city_name = request.args.get('city_name')
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    country = request.args.get('country')

    # Create a city_name key in the session
    session[city_name] = {'lat':lat,'lon':lon, 'country':country} 

    # session[month] = {'city_name':city_name}

    return redirect('/')


@app.route('/unsave_to_session')
def unsave_to_session():
    """Save the favorited cities to the session cookie"""
    
    city_name = request.args.get('city_name')

    session.pop(city_name) # Remove the key with the city name from the session

    return redirect('/')


@app.route('/favorites.json')
def get_favorites():
    """Get the list of favorite cities to determine if the favorite box should be checked"""
    fav_cities = {}
    for city in session:
        fav_cities[city]=session[city]

    return(jsonify({'favorites':fav_cities}))


if __name__ == '__main__':

    # connect to your database before app.run gets called. If you don’t do this, 
    # Flask won’t be able to access your database!
    connect_to_db(app)
    
    app.run(host='0.0.0.0', debug = True)

    app.debug = True # Set debug mode to True before enabling the toolbar

    DebugToolbarExtension(app) # Enable the DebugToolbar