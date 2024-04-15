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

    @property
    def Ipdata(self):
        return os.getenv("IPDATA_API_KEY")