import api_key

import pymongo
import requests

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]

politicians = database["Politicians"]

def grabTweets():
    tweets = []

    for politician in politicians.find({}):
        twitter_handle = politician["twitter"]
        print(twitter_handle)

        # do your stuff here

        tweets.append("""     in here you put a tweet or some tweets idfk just end up making it one array in the end       """)
    return tweets

long_list_of_tweets = grabTweets()
print("Done. Contains: ", len(long_list_of_tweets), " number of tweets")