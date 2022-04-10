import api_key

import pymongo
from openaustralia import OpenAustralia

KEY = api_key.OA_KEY
api_client = OpenAustralia(KEY)

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]

politicians = database["Politicians"]


def get_all_names():
    """ gets a list of all politicians
    
        returns: a list of dictionaries
        each dictionary contains:
        "person_id", 
        "first",
        "last",
        "party"
    """
    representatives = api_client.get_representatives()
    senators = api_client.get_senators()
    # print(f"mp is {len(representatives)}, senate is {len(senators)}")
    all_politicians = representatives + senators
    res = []
    for person in all_politicians:
        politician = {"person_id": person["person_id"], "first": person["first_name"], "last": person["last_name"], "party": person["party"],}
        res.append(politician)
    return res

def get_all_parties():
    pass


for politic_man in get_all_names():
    politicians.update_one({"person_id": politic_man["person_id"]}, {"$set": politic_man}, upsert=True) # Adds politician to DB otherwise doesnt change anything

print("Added all politicians from openAustralia")
