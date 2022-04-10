import uvicorn
from random import random
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from models.models import Vote, Id
from pathlib import Path


app = FastAPI()

origins = [
    "https://cardsagainstau.com",
    "http://cardsagainstau.com",
    "http://103.1.185.148:8000",
    "http://103.1.185.148"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import api_key
import pymongo

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]
politicians = database["Politicians"]
tweets = database["Tweets"]
parties = database["Parties"]
policies = database["Policies"]

@app.get('/')
def root():
    return "someting"
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
            "count": 1,
            "image": 1,
            "house": 1,
            "roles": 1,
            "oa_image": 1
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

@app.get('/politician/{person_id}')
async def get_politician(person_id: str):
    politician = politicians.find_one({ 'person_id': person_id })
    del politician["_id"]
    return politician


@app.get('/parties')
async def get_parties():
    found_parties = list(parties.find({}))
    return found_parties

@app.get('/worstfromparties')
async def get_parties():
    worst_politicians = []
    for party in parties.find({}):
        worst_from_party = politicians.find({"party": party["name"]}).sort("count", -1)[0]
        del worst_from_party["_id"]
        worst_politicians.append( worst_from_party )
    return {"data": worst_politicians}


@app.get('/random_policy')
async def random_policy():
    random_policy2 = list(policies.aggregate([{ # aggregate lets us use the sample function in mongodb which gets random documents
        "$sample": {
            "size": 1
        }
    }]))

    del random_policy2[0]["_id"]
    return {"data": random_policy2}



@app.get('/get_all_policies')
async def get_all_policies():
    return list(policies.find({}, {"_id": 0, "policyName": 1, "id": 1, "policyDesc": 1}))



@app.get('/parties_to_policy_broke/')  # SPAGHET CODE DONT TOUCH
async def parties_for_policyBROKE(id: str):
    print(id)
    participants = list(policies.find( {"id": int(id)}, {"_id": 0, "participants": 1}))
    partiesList = [{}]
    #return participants
    for participant in participants[0]["participants"]: # people in the policy request, it;s multiple people
        for i, party in enumerate(partiesList):
            found_pol = politicians.find_one({"person_id": participant["person_id"]},{"_id": 0, "party": 1})
            if "party" in party:
                if party["party"] is found_pol["party"]: # if we found the party that participant belongs to
                    if participant["voted"]:
                        partiesList[i]["numVotes"] += 1
                        partiesList[i]["agreementSum"] += participant["agreement"]
                        break
                    else:
                        break #dont do anything if voter didnt vote
                else: 
                    continue # go to other ppl bru
            
        else:
            partiesList.append({
                "numVotes": 0,
                "agreementSum": 0,
                "party": found_pol["party"]
            })
    return partiesList

@app.get('/parties_to_policy/')
async def parties_for_policy(id: str):
    print(id)
    participants = list(policies.find( {"id": int(id)}, {"_id": 0, "participants": 1}))



    partiesList = {}
    for party in parties.find({}, {"name": 1, "_id": 0}):
        partiesList[party["name"]] = {
            "numVotes":0,
            "agreementSum":0,
            "party": party["name"]
        }

    #return participants
    for participant in participants[0]["participants"]: # people in the policy request, it;s multiple people
        
        found_pol = politicians.find_one({"person_id": participant["person_id"]},{"_id": 0, "party": 1})
        if participant["voted"]:
            partiesList[found_pol["party"]]["numVotes"] += 1
            partiesList[found_pol["party"]]["agreementSum"] += float(participant["agreement"])
    return partiesList

    

@app.post('/vote/')
async def vote(usr_vote: Vote):
    better_id = usr_vote.better_politician_id
    worse_id = usr_vote.worse_politician_id

    # add one to counter of worse politician
    if politicians.find_one({'person_id': better_id}) is None:
        return HTTPException(status_code=404, detail='a politician was not found')
    if politicians.find_one({'person_id': worse_id}) is None:
        return HTTPException(status_code=404, detail='a politician was not found')
    
    worse_politician = politicians.find_one({ 'person_id': better_id })
    if 'count' not in worse_politician:
        politicians.update_one({'_id': worse_politician['_id']}, {'$set': { 'count': 1 }})
    else:
        politicians.update_one({'_id': worse_politician['_id']}, {'$set': { 'count': worse_politician['count'] + 1 }})


# endpoint which gives all parties
if __name__ == '__main__':
    uvicorn.run(
        'main:app',
        host='0.0.0.0',
        port=8000,
        # ssl_keyfile='./keys/privkey.pem',
        # ssl_certfile='./keys/cert.pem'
    )