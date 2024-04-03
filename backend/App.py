#!/usr/bin/env python3
"""  """
from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
from dotenv import load_dotenv
import os
from nasapy import Nasa
from datetime import datetime, timedelta
import requests
from models import app_views
import redis
from models.cache import cache_response


load_dotenv()
nkey = os.getenv("NASA_API_KEY")

app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, resources = {'r/backend/*': {'origins': 'http://backend:5000'}})
redis_client = redis.Redis(db=0)

nasa = Nasa(key=nkey)

@app.route("/POTD", strict_slashes=False, methods=['GET'])
#@cache_response(timeout=600)
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
        

if __name__ == '__main__':
    app.run(debug=True)
