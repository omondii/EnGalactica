#!/usr/bin/env python3
""" Application entry point """
from backend import create_app


if __name__ == '__main__':
    app = create_app('development')
