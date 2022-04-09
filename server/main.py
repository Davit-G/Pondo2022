from random import random
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

import api_key
import pymongo

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]
politicians = database["Politicians"]
tweets = database["Tweets"]

@app.get('/')
async def root():
    return "<h1>something</h1>"


@app.get('/politicians')
async def politician_list():
    pol_list = list(
        politicians.find({}, { # the first argument means that it will get everything from mongodb
        # the second field is a "project" which indicates which fields we want to keep and what ones we dont want
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
    random_politicians = list(politicians.aggregate([{ # aggregate lets us use the sample function in mongodb which gets random documents
    #also doesnt get duplicates
        "$sample": {
            "size": 2
        }
    }])) # you need this list cause mongodb aint giving us a list, it gives us a generator, so dont touch this bit

    del random_politicians[0]["_id"]
    del random_politicians[1]["_id"]
    return {"data": random_politicians}
