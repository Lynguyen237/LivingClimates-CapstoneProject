from flask import Flask
from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db

app = Flask(__name__)

if __name__ == '__main__'
    app.run(host='0.0.0.0', debug = True)