from random import random
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

import api_key
import pymongo

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]
politicians = database["Politicians"]


@app.get('/')
async def root():
    return "<h1>something</h1>"


@app.get('/politicians')
async def politician_list():
    pol_list = list(
        politicians.find({}, {
            "first": 1,
            "last": 1,
            "_id": 0,
            "party": 1,
            "person_id": 1,
            "count": 1
        }))
    return {"data": pol_list}


@app.get('/random_politicians')
async def politician_list():
    random_politician = list(politicians.aggregate([{
        "$sample": {
            "size": 1
        }
    }]))[0] # you need this list and [0] bullshit cause mongodb aint giving us a dict

    random_politician2 = list(politicians.aggregate([{
        "$sample": {
            "size": 1
        }
    }]))[0] # you need this list and [0] bullshit cause mongodb aint giving us a dict

    del random_politician["_id"]
    del random_politician2["_id"]
    return {"data": [random_politician, random_politician2]}
