# from flask import Flask
from flask import (Flask, render_template, request, flash, session, redirect, jsonify, session)
from model import connect_to_db, Climate, Continent, City, db, func
from flask_debugtoolbar import DebugToolbarExtension # Add Flask DebugToolbar

app = Flask(__name__)
app.secret_key = 'random' # Set a random key for the DebugToolbar


@app.route('/')
def homepage():
    """Show the homepage with the search filters"""
    return render_template('homepage.html')


@app.route('/results.json')
def get_query_result_json():
    """Get search query results and save them in a json file"""

    month = request.args.get('month') # month is a string after being passed via HTTP
    month = [int(i) for i in month.split(',')] # Store all the months user chooses as integer in a list
    tavg = request.args.get('tavg')
    tmin = request.args.get('tmin')
    tmax = request.args.get('tmax')
    continent = request.args.get('continent')

    # Connect to db to retrieve the city objects meeting the criteria
    results = db.session.query(City,Continent).select_from(City).join(Climate).join(Continent)

    if tavg == "under10": 
        results = results.filter(Climate.month.in_(month), Climate.tavg < 10)

    elif tavg == "10to20":
        results = results.filter(Climate.month.in_(month),
                                 Climate.tavg >= 10,
                                 Climate.tavg < 20)
    else:
        results = results.filter(Climate.month.in_(month), Climate.tavg >= 20)
    
    # Check if the optional filters exist, if so add them to the query
    if tmin:
        results = results.filter(Climate.tmin >= tmin)
    if tmax:
        results = results.filter(Climate.tmax <= tmax)
    if continent:
        results = results.filter(Continent.continent_name == continent)
    
    results = results.group_by(City,Continent)\
                     .having(func.count(Climate.month)==len(month))\
                     .order_by(func.random()).limit(20).all()
    # Display 20 results by random https://stackoverflow.com/questions/60805/getting-random-row-through-sqlalchemy

    
    result_dict = {}

    for (city, continent) in results: 
        city_info = {'lat':city.lat,
                     'lon':city.lon}
                     
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

    city_list = []

    for (city, continent) in results:
        city_list.append(city.city_name)

    return jsonify({'results':result_dict,
                    'city_list': city_list})
    

@app.route('/maps')
def show_map():
    """Show map with a marker"""

    return render_template('maps.html', session=session)   


@app.route('/save_to_session')
def save_to_session():
    
    city_name = request.args.get('city_name')
    session[city_name] = city_name  # Create a key with the city name in the session

    # session[month] = {'city_name':city_name}

    return redirect('/')


@app.route('/unsave_to_session')
def unsave_to_session():

    city_name = request.args.get('city_name')
    session.pop(city_name) # Remove the key with the city name from the session

    return redirect('/')


@app.route('/favorites.json')
def get_favorites():
    """Get the list of favorite cities to determine if the favorite box should be checked"""
    fav_cities = []
    for city in session:
        fav_cities.append(city)

    return(jsonify({'favorites':fav_cities}))


if __name__ == '__main__':

    # connect to your database before app.run gets called. If you don’t do this, 
    # Flask won’t be able to access your database!
    connect_to_db(app)
    
    app.run(host='0.0.0.0', debug = True)

    app.debug = True # Set debug mode to True before enabling the toolbar

    DebugToolbarExtension(app) # Enable the DebugToolbar