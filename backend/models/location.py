#!/usr/bin/env python3
""" Views for all location functionalities """
from flask import Blueprint
import ipdata
import os

location_bp = Blueprint('location', __name__)
ip_Key = os.environ.get("IPDATA_KEY")

def get_userloc():
    ipdata.ip_key = ip_Key
    data = ipdata.lookup()
    return(data.latitude, data.longitude)

latitude, longitude = get_userloc()
print(f"Latitude: {latitude}, Longitude: {longitude}")

