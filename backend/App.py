#!/usr/bin/env python3
""" Server entry point """
import os
from __init__ import create_app
import logging


env = os.getenv('FLASK_ENV', 'development')

app = create_app(env)

#App logging
handler = logging.FileHandler("Logs.log")
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
app.logger.addHandler(handler)
app.logger.setLevel(logging.INFO)

# Flask logging
flask_handler = logging.StreamHandler()
flask_handler.setLevel(logging.INFO)
flask_handler.setFormatter(formatter)
app.logger.addHandler(flask_handler)

if __name__ == '__main__':
    app.run(debug=(env != 'production'))