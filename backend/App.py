#!/usr/bin/env python3
"""  """
from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
from dotenv import load_dotenv
import os
from nasapy import Nasa
from datetime import datetime
import requests

load_dotenv()
nkey = os.getenv("NASA_API_KEY")

app = Flask(__name__)
app.register_blueprint()
CORS(app, resources = {'r/backend/*': {'origins': 'http://localhost:8080'}})

nasa = Nasa(key=nkey)

@app.route("/POTD")
def daily_pic():
    """ View func to retrieve & return the Picture Of The Day from the Nasa Api using
    users current time.
    Returns json containing the Picture and Information about it
    """
    today = datetime.today().strftime('%Y-%m-%d')
    url = f'https://api.nasa.gov/planetary/apod?api_key={nkey}&date={today}'

    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    
@app.route('/skymap')
def skymap():
    pass

if __name__ == '__main__':
    app.run()