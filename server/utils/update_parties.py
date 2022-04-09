import api_key
import pymongo

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]
politicians = database["Politicians"]
parties = database["Parties"]

party_set = set()
for politician in politicians.find({}):
    party_set.add(politician['party'])

for party in party_set:
    if parties.find_one({ 'name': party }) is not None:
        continue
    parties.insert_one({ 'name': party })