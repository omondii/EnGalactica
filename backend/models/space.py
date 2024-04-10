#!/usr/bin/env python3
""" Uses the NASA Asteroids API to:
Returns:
    Asteroids closest to earth based on its date
"""
from flask import jsonify
from datetime import datetime, timedelta
import requests
from .location import get_userloc
from models import app_views

from App import cache


@app_views.route('/skymap', strict_slashes=False, methods=['GET', 'POST'])
#@cache.cached(timeout=10)
def NeoWs():
    """ View to return Near Earth Asteroid information within a
    7 day period -> NASA NeoWs API
    """
    from App import nkey
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
    from App import rapid_key
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


@app_views.route('/news', strict_slashes=False, methods=['GET'])
#@cache.cached(timeout=10)
def TiS():
    """Today in Space
    Returns An Article containing todays News in Space"""
    from App import rapid_key
    try:
        url = "https://spacenews.p.rapidapi.com/datenews/1"
        headers = {
            "X-RapidAPI-Key": rapid_key,
            "X-RapidAPI-Host": "spacenews.p.rapidapi.com"
            }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': f'Request failed with status code {response.status_code}'}), response.status_code
    except Exception as e:
        return jsonify({'error': f'Internal Server Error: {e}'}), 500


@app_views.route('/lunar', strict_slashes=False, methods=['GET'])@cache.cached(timeout=10)
def lunar_calendar():
    """ Retrieves the lunar calendar representing all the phases of the moon
    for the whole year"""
    from App import rapid_key
    try:
        url = "https://moon-phase.p.rapidapi.com/calendar"
        querystring = {"format":"html"}
        headers = {
            "X-RapidAPI-Key": rapid_key,
            "X-RapidAPI-Host": "moon-phase.p.rapidapi.com"
            }
        response = requests.get(url, headers=headers, params=querystring)
        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': f'Request failed with status code {response.status_code}'}), response.status_code
    except Exception as e:
        return jsonify({'error': f'Internal Server Error: {e}'}), 500

