# from flask import Flask
from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
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
    
    results = results.group_by(City,Continent).having(
                func.count(Climate.month)==len(month)).order_by(func.random()).limit(20).all()
                # Display 20 results by random https://stackoverflow.com/questions/60805/getting-random-row-through-sqlalchemy

    result_list = []

    for (city, continent) in results: 
            result_list.append({"city_name":city.city_name,
                                "country":city.country,
                                "continent":continent.continent_name,
                                "lat":city.lat,
                                "lon":city.lon
                                })
  
    return jsonify({"city": result_list})
    

# Old route not handling multiple-month search correctly
# @app.route('/results.json')
# def get_query_result_json():
#     month = request.args.get('month') # month is a string after being passed
#     month = [int(i) for i in month.split(',')] # Store all the months user chooses in a list
#     tavg = request.args.get('tavg')
#     tmin = request.args.get('tmin')
#     tmax = request.args.get('tmax')

#     # Connect to db to retrieve the city objects meeting the criteria
#     results = Climate.query

#     if tavg == "under10": 
#         results = results.filter(Climate.month.in_(month), Climate.tavg < 10)

#     elif tavg == "10to20":
#         results = results.filter(Climate.month.in_(month),
#                                  Climate.tavg >= 10,
#                                  Climate.tavg < 20)
#     else:
#         results = results.filter(Climate.month.in_(month), Climate.tavg >= 20)
    
#     # Check if values for tmin and tmax exist, if so add them to the query
#     if tmin:
#         results = results.filter(Climate.tmin >= tmin)
#     if tmax:
#         results = results.filter(Climate.tmax <= tmax)

#     results_list = []

#     for climate in results:
#             results_list.append({"city_name":climate.city.city_name,
#                                 "country":climate.city.country,
#                                 "month":climate.month,
#                                 "tavg":climate.tavg
#                                 })
    
#     return jsonify({"city": results_list})


# =================================================================
# Old route when submitting form requires redirecting to a new page.
# =================================================================
# @app.route('/results')
# def get_query_result():
#     """Show the search results"""
#     # query_params = request.args.to_dict(flat=False)
#     month = request.args.getlist('month') # Store all the months user chooses in a list
#     tavg = request.args.get('tavg')
#     tmin = request.args.get('tmin')
#     tmax = request.args.get('tmax')

#     # Dictionary to look up the text value for the month
#     month_dict = {1: 'Jan', 
#                   2: 'Feb', 
#                   3: 'Mar',
#                   4: 'Apr',
#                   5: 'May',
#                   6: 'Jun',
#                   7: 'Jul',
#                   8: 'Aug',
#                   9: 'Sep',
#                   10: 'Oct',
#                   11: 'Nov',
#                   12: 'Dec'} 
    
    
#     # Connect to db to retrieve the city objects meeting the criteria
#     results = Climate.query
    
#     # Check the value of average temperature and construct the query accordingly
#     if tavg == "under10": 
#         results = results.filter(Climate.month.in_(month), Climate.tavg < 10)
#     elif tavg == "10to20":
#         results = results.filter(Climate.month.in_(month), 
#                                  Climate.tavg >= 10,
#                                  Climate.tavg < 20)
#     else:
#         results = results.filter(Climate.month.in_(month), Climate.tavg >= 20)
    
#     # Check if values for tmin and tmax exist, if so add them to the query
#     if tmin:
#         results = results.filter(Climate.tmin >= tmin)
#     if tmax:
#         results = results.filter(Climate.tmax <= tmax)

#     return render_template('results.html', results=results, month_dict=month_dict)


@app.route('/maps')
def show_map():
    """Show map with a marker"""
    return render_template('maps.html')   


if __name__ == '__main__':

    # connect to your database before app.run gets called. If you don’t do this, 
    # Flask won’t be able to access your database!
    connect_to_db(app)
    
    app.run(host='0.0.0.0', debug = True)

    app.debug = True # Set debug mode to True before enabling the toolbar

    DebugToolbarExtension(app) # Enable the DebugToolbar