import api_key
import requests
import pymongo

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]
politicians = database["Politicians"]
policiesdb = database["Policies"]



KEY = api_key.tvfy_key

def get_all_policy_comparisons():
    policies = {}
    for politician in politicians.find({}):
        id = politician["person_id"]
        
        # querying the api
        response = requests.get(f"https://theyvoteforyou.org.au/api/v1/people/{id}.json?key={KEY}").json()

        pol_list = []
        for policy in response["policy_comparisons"]:
            item = {}
            
            item["policyName"] = policy["policy"]["name"]
            item["policyDesc"] = policy["policy"]["description"]  # also add ID  AAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            item["agreement"] = policy["agreement"]
            item["voted"] = policy["voted"]
            
            pol_list.append(item)
        print("Hi")

        policies.append({"person_id": politician["person_id"], "policies": pol_list})

        print(f"queried {politician['first']} politician{'last'}")
    return policies

def get_all_policy_comparisons2():
    policies = []
    for politician in politicians.find({}):
        person_id = politician["person_id"]

        response = requests.get(f"https://theyvoteforyou.org.au/api/v1/people/{person_id}.json?key={KEY}").json()

        for policy in response["policy_comparisons"]:

            for index, existing_policy in enumerate(policies):
                if existing_policy["id"] == policy["policy"]["id"]:
                    # update dict we already have with the politician we are looking at at the current moment in time lmao
                    policies[index]["participants"].append({
                        "person_id": person_id,
                        "agreement": policy["agreement"],
                        "voted": policy["voted"]
                    })
                    break
            else:
                policies.append({
                    "id": policy["policy"]["id"],
                    "policyName": policy["policy"]["name"],
                    "policyDesc": policy["policy"]["description"],
                    "participants": [{
                        "person_id": person_id,
                        "agreement": policy["agreement"],
                        "voted": policy["voted"]
                    }]
                })
        print(politician["first"], politician["last"])
    return policies


a = get_all_policy_comparisons2()

for x in a:
    policiesdb.update_one({"id": x["id"]}, {"$set": x}, upsert=True)

print("Done")




# {
#     "policy_id": 2095,
#     "policyName": "A Thing That Taxes The Rich",
#     "policyDesc": "sigouhsohdg",
#     "voters": [users etc]
# }