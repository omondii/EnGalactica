#!/usr/bin/env python3
""" Uses the NASA Asteroids API to:
Returns:
    Asteroids closest to earth based on its date
"""
from flask import jsonify
from models import app_views
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import requests
from .location import get_userloc

load_dotenv()
nkey = os.getenv("NASA_API_KEY")
rapid_key = os.getenv("RAPIDAPI_API_KEY")


@app_views.route('/skymap', strict_slashes=False, methods=['GET', 'POST'])
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


@app_views.route('/news', strict_slashes=False, methods=['GET'])
def TiS():
    """Today in Space
    Returns An Article containing todays News in Space"""
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


@app_views.route('/lunar', strict_slashes=False, methods=['GET'])
def lunar_calendar():
    """ Retrieves the lunar calendar representing all the phases of the moon
    for the whole year"""
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
