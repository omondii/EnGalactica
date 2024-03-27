#!/usr/bin/env python3
""" Views for all location functionalities """
from flask import Blueprint, jsonify
import ipdata
import os
from dotenv import load_dotenv

location_bp = Blueprint('location', __name__)

load_dotenv()
key = os.getenv("IPDATA_API_KEY")

#@cache_response(timeout=21600)
def get_userloc():
    """ Get user latitude and longitude based on their IP address
    Returns Longitude, Latitude
    """
    ipdata.api_key = key
    data = ipdata.lookup()
    return data

"""
user_location_data = get_userloc()
print(user_location_data)
"""