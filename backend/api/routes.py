#!/usr/bin/env python3
import os
from flask import Flask, jsonify, Blueprint, current_app
from datetime import datetime, timedelta
import requests
from api import app_views
from dotenv import load_dotenv
from .location import get_userloc


# Load Env variables from .env
load_dotenv()
nkey = os.getenv("NASA_API_KEY")
rapid_key =os.getenv("RAPIDAPI_API_KEY")

@app_views.route("/POTD", strict_slashes=False, methods=['GET'])
#@cache.cached(timeout=100)
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


@app_views.route('/skymap', strict_slashes=False, methods=['GET', 'POST'])
#@cache.cached(timeout=10)
def NeoWs():
    """ View to return Near Earth Asteroid information within a
    7 day period -> NASA NeoWs API
    """
    try:
        end = datetime.today().strftime('%Y-%m-%d')
        start = (datetime.today() - timedelta(days=7)).strftime('%Y-%m-%d')
        url = f'https://api.nasa.gov/neo/rest/v1/feed?start_date={start}&end_date={end}&api_key={nkey}'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': f'Request failed with status code {response.status_code}'}), response.status_code
    except Exception as e:
        return jsonify({'error': f'Internal Server Error: {e}'}), 500


@app_views.route('/moon', strict_slashes=False)
#@cache.cached(timeout=10)
def planets():
    """ View function to return the moon/sun & planets in the night sky
    based on user location
    """
    try:
        data = get_userloc()
        longitude = data.longitude
        latitude = data.latitude
        
        querystring = {"lat":latitude,"lon":longitude}

        headers = {
            "X-RapidAPI-Key": rapid_key,
            "X-RapidAPI-Host": "moon-phase.p.rapidapi.com"
            }
        url = f'https://moon-phase.p.rapidapi.com/advanced?lat={latitude}&lon={longitude}'
        response = requests.get(url, headers=headers, params=querystring)
        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': f'Request failed with status code {response.status_code}'}), response.status_code
    except Exception as e:
        return jsonify({'error': f'Internal Server Error: {e}'}), 500