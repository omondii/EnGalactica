#!/usr/bin/env python3
""" Flask Backend entry point. """
from flask import Flask, jsonify, Blueprint
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
import requests
from models import app_views
from flask_caching import Cache
from models import config


load_dotenv()
nkey = os.getenv("NASA_API_KEY")
rapid_key = os.getenv("RAPIDAPI_API_KEY")

app = Flask(__name__, static_folder='frontend/build')
app.register_blueprint(app_views)
CORS(app, resources = {'r/backend/*': {'origins': 'http://localhost:5000'}})
cache = Cache(app, config)


@app.route("/POTD", strict_slashes=False, methods=['GET'])
@cache.cached(timeout=100)
def daily_pic():
    """ View func to retrieve & return the Picture Of The Day from the Nasa Api using
    users current time.
    Returns json containing the Picture and Information about it
    """
    try:
        today = datetime.today().strftime('%Y-%m-%d')
        url = f'https://api.nasa.gov/planetary/apod?api_key={nkey}&date={today}'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if 'url' not in data:
                yesterday = (datetime.today() - timedelta(days=1)).strftime('%Y-%m-%d')
                url = f'https://api.nasa.gov/planetary/apod?api_key={nkey}&date={yesterday}'
                response = requests.get(url)
                data = response.json()
            return data
        else:
            return jsonify({'error': 'Failed to fetch POTD'})
    except Exception as e:
        print(f'Error: {e}')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
from models.space import *