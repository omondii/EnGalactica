#!/usr/bin/env python3
""" USes the NASA Asteroids API to:
Returns;
    Asteroids closest to earth based on its date
"""
from models import app_views
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import requests

load_dotenv()
nkey = os.getenv("NASA_API_KEY")

@app_views.route('/skymap', strict_slashes=False)
def NeoWs():
    """ View to return Near Earth Asteroid information within a
    7 day period
    """
    try:
        end = datetime.today().strftime('%Y-%m-%d')
        start = (datetime.today() - timedelta(days=7)).strftime('%Y-%m-%d')
        url = f'https://api.nasa.gov/neo/rest/v1/feed?start_date={start}&end_date={end}&api_key={nkey}'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f'Request failed with status code {response.status_code}')
    except Exception as e:
        print(f'Error: {e}')
