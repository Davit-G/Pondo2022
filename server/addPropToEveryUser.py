import api_key

import pymongo
import requests


mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]

politicians = database["Politicians"]



for pol in politicians.find({}):
    politicians.update_one({"person_id": pol["person_id"]}, {"$set": {"count": 0}}, upsert=True)