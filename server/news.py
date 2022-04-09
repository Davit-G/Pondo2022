import api_key
from newsapi import NewsApiClient
import pymongo
import requests

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]
politicians = database["Politicians"]
articles = database["Articles"]


KEY = api_key.news_key
news_client = NewsApiClient(KEY)

def get_articles_on_politicians():
    j = 0
    for politician in politicians.find({}):

        name = f"{politician['first']} {politician['last']}"
        if articles.count_documents({ 'person_id': politician["person_id"] }, limit = 1) == 0:
            titles = get_news_headlines(name)
            print(titles)

            stuff_to_add = {"person_id": politician["person_id"], "titles": titles}
            print(name)
            articles.update_one({"person_id": politician["person_id"]}, {"$set": stuff_to_add }, upsert=True)

            j += 1
        print(j)

def get_news_headlines(query):
    news = news_client.get_everything(f"+{query}", sort_by="relevancy")
    titles = []
    if news["totalResults"] == 0:
        return None
    else:
        for article_title in range(news["totalResults"]):
            if article_title == 3:
                return titles
            else:
                titles.append(news["articles"][article_title]["title"])
    return titles


get_articles_on_politicians()