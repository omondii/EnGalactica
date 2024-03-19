#!/usr/bin/env python3
"""  """
from flask import Flask, jsonify
from dotenv import load_dotenv
import os
from nasapy import Nasa
from datetime import datetime
import requests

load_dotenv()
nkey = os.getenv("NASA_API_KEY")

app = Flask(__name__)
nasa = Nasa(key=nkey)

@app.route("/POTD")
def daily_pic():
    today = datetime.today().strftime('%Y-%m-%d')
    url = f'https://api.nasa.gov/planetary/apod?api_key={nkey}&date={today}'

    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())

if __name__ == '__main__':
    app.run()