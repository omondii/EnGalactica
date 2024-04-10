#!/usr/bin/env python3
""" API Blueprint """
from flask import Blueprint


app_views = Blueprint('app_views', __name__, url_prefix='')

# Redis Configuration
config = {
    'CACHE_TYPE': 'redis',
    'CACHE_REDIS_URL':'redis://localhost:6379/0'
    }
