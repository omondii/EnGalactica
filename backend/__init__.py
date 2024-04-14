#!/usr/bin/env python3
""" Flask Application factory """
import os
from flask import Flask
from config import config
from flask_cors import CORS
from flask_caching import Cache
from dotenv import load_dotenv


def create_app(config_name):
    """ Function factory definition """
    load_dotenv()

    app = Flask(__name__, static_folder='frontend/build')
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    app.config.from_pyfile('../config.py')

    CORS(app, resources={'r/backend/*': {'origins': 'http://localhost:5000'}})
    cache = Cache(app, config = {
        'CACHE_TYPE': 'redis',
        'CACHE_REDIS_URL':'redis://localhost:6379/0'})


    return app