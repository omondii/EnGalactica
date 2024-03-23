#!/usr/bin/env python3
""" Redis Caching system """
from flask import jsonify, request
from datetime import timedelta
import json


def cache_response(timeout=300):
    """A cache checker decorator function
    Args: sets a 5 mins expiration period"""
    def decorator(view_func):
        """ Decorator function Function
        Args: A view/endpoint"""
        def wrapper(*args, **kwargs):
            from App import redis_client
            cache_key = f'api:{request.url}'

            response = redis_client.get(cache_key)
            if response is not None:
                return jsonify(json.loads(response))
            
            result = view_func(*args, **kwargs)
            redis_client.set(cache_key, json.dumps(result), ex=timeout)
            return result
        return wrapper
    return decorator

