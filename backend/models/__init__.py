#!/usr/bin/env python3
""" API Blueprint """
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='')


from models.location import *
from models.space import *
from models.cache import *