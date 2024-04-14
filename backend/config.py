import os
from dotenv import load_dotenv


load_dotenv()

class Config:
    """ Configuration variables for flask """
    @staticmethod
    def init_app(app):
        pass

class DefaultConfig(Config):
    """ Base environment variables """
    DEBUG = False

    @property
    def nkey(self):
        return os.getenv("NASA_API_KEY")

    @property
    def rapid_key(self):
        return os.getenv("RAPIDAPI_API_KEY")

class DevConfig(DefaultConfig):
    """ Development env variables """
    DEBUG = True

class ProdConfig(DefaultConfig):
    """ Production env variables """
    pass


config = {
    'development': DevConfig,
    'production': ProdConfig,
    'default': DevConfig
}