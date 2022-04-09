import api_key
from openaustralia import OpenAustralia

KEY = api_key.OA_KEY
api_client = OpenAustralia(KEY)

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