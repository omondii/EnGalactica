#!/usr/bin/env python3
""" Server entry point """
import os
from __init__ import create_app


env = os.getenv('FLASK_ENV', 'development')

app = create_app(env)

if __name__ == '__main__':
    app.run(debug=(env != 'production'))