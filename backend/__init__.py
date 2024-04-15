#!/usr/bin/env python3
""" Flask Application factory """
import os
from flask import Flask
from flask_cors import CORS
from flask_caching import Cache


cache = Cache()

def create_app(config_filename):
    """ Creates an app instance based on config file """
    app = Flask(__name__, static_folder='frontend/build')
    app.config.from_pyfile('./config.py')

    CORS(app, resources={'r/backend/*': {'origins': 'http://localhost:5000'}})
    cache.init_app(app, config={
        'CACHE_TYPE': 'redis',
        'CACHE_REDIS_URL': 'redis://localhost:6379/0'
    })
    
    # Register Blueprints
    from api import app_views
    app.register_blueprint(app_views)

    return app
