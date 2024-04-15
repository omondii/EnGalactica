#!/usr/bin/env python3
""" Routes Blueprint definition """
from flask import Blueprint, current_app

app_views = Blueprint('app_views', __name__)

from . import routes