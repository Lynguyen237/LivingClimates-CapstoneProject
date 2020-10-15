from flask import Flask
from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db, Climate, City
from flask_debugtoolbar import DebugToolbarExtension # Add Flask DebugToolbar

app = Flask(__name__)
app.secret_key = 'random' # Set a random key for the DebugToolbar


@app.route('/')
def homepage():
    """Show the homepage with the search filters"""
    return render_template('homepage.html')


@app.route('/results')
def search_result():
    """Show the search results"""
    query_params = request.args.to_dict(flat=False)
    month = request.args.get('month') #use .getlist to get multiple parameters
    tavg = request.args.get('tavg')

    # Create an empty list to store city objects meeting the search criteria
    results = []
    
    # Connect to db to retrieve the city objects meeting the criteria
    if tavg == "under10": 
        results = Climate.query.filter(Climate.month == month, Climate.tavg < 10).all()
    elif tavg == "10to20":
        results = Climate.query.filter(Climate.month == month, 
                                       Climate.tavg >= 10,
                                       Climate.tavg < 20).all()
    else:
        results = Climate.query.filter(Climate.month == month, Climate.tavg >= 20).all()
    

    return render_template('results.html', results=results, month=month, params=query_params)
                        


if __name__ == '__main__':

    # connect to your database before app.run gets called. If you don’t do this, 
    # Flask won’t be able to access your database!
    connect_to_db(app)
    
    app.run(host='0.0.0.0', debug = True)

    app.debug = True # Set debug mode to True before enabling the toolbar

    DebugToolbarExtension(app) # Enable the DebugToolbar