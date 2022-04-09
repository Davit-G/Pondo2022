import api_key
import requests
import pymongo

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]
politicians = database["Politicians"]
policiesdb = database["Policies"]



KEY = api_key.tvfy_key

def get_all_policy_comparisons():
    policies = []
    for politician in politicians.find({}):
        id = politician["person_id"]
        
        # querying the api
        response = requests.get(f"https://theyvoteforyou.org.au/api/v1/people/{id}.json?key={KEY}").json()

        pol_list = []
        for policy in response["policy_comparisons"]:
            item = {}
            item["policyName"] = policy["policy"]["name"]
            item["policyDesc"] = policy["policy"]["description"]
            item["agreement"] = policy["agreement"]
            item["voted"] = policy["voted"]
            
            pol_list.append(item)
        print("Hi")

        policies.append({"person_id": politician["person_id"], "policies": pol_list})

        print(f"queried {politician['first']} politician{'last'}")
    return policies

a = get_all_policy_comparisons()

for x in a:
    policiesdb.update_one({"person_id": x["person_id"]}, {"$set": x}, upsert=True)

print("Done")