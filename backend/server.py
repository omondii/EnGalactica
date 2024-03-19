#!/usr/bin/env python3
"""  """
from flask import Flask
from dotenv import load_dotenv
import os
from nasapy import Nasa

load_dotenv()
nkey = os.getenv("NASA_API_KEY")

app = Flask(__name__)
nasa = Nasa(key=nkey)

@app.route("/POTD")
def daily_pic():
    return nasa.picture_of_the_day(hd=True)

if __name__ == '__main__':
    app.run()