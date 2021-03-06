
"""
DONT TOUCH

This was used to get data from open australia API about all politicians of Australia

Then, twitter handles grabbed and pushed onto mongodb.


"""
import api_key

import pymongo
from openaustralia import OpenAustralia
from bs4 import BeautifulSoup
import requests

KEY = api_key.OA_KEY
TVFY_KEY = api_key.tvfy_key
api_client = OpenAustralia(KEY)


mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]

politicians = database["Politicians"]

def get_all_names():
    """ gets a list of all politicians
    
        returns: a list of dictionaries
        each dictionary contains:
        "person_id", 
        "twitter"
        "first",
        "last",
        "party"
    """
    representatives = api_client.get_representatives()
    senators = api_client.get_senators()
    all_politicians = representatives + senators
    res = []
    for person in all_politicians:
        twitter_handle = get_twitter_handle(f"{person['name']} twitter")
        house = get_details(person["person_id"])[0]
        roles = get_details(person["person_id"])[1]

        politician = {"person_id": person["person_id"], "twitter": twitter_handle, "first": person["first_name"], "last": person["last_name"], "party": person["party"], "house": house, "roles": roles}
        res.append(politician)
    return res

def get_twitter_handle(query):
    search_response = requests.get(f"https://www.google.com/search?q={query}&start=0").content
    print(query)
    document = BeautifulSoup(search_response, "html.parser").find_all("a")
    handle = ""
    for i in range(0, 30):
        if "/url?q=https://twitter.com/" in document[i]["href"]:
            handle = document[i]["href"]
            break

    handle = handle.replace("/url?q=https://twitter.com/", "")
    handle = handle.split("%3F")[0]
    if "&" in handle:
        handle = handle.split("&")[0]
    if "/" in handle:
        handle = handle.split("/")[0]
    print(handle)
    return handle

def get_details(id):
    req = requests.get(f"https://theyvoteforyou.org.au/api/v1/people/{id}.json?key={TVFY_KEY}").json()
    house = req["latest_member"]["house"]
    if "representatives" in house.lower():
        house = "House of Representatives"
    else: 
        house = "Senate"

    roles = ", ".join([role["position"] for role in req["offices"]])
    return [house, roles]


response = get_all_names()

for politic_man in response:
    politicians.update_one({"person_id": politic_man["person_id"]}, {"$set": politic_man}, upsert=True) # Adds politician to DB otherwise doesnt change anything

print("Added all politicians from openAustralia")