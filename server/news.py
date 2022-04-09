import api_key
from newsapi import NewsApiClient
import pymongo
import requests

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]
KEY = api_key.news_key
news_client = NewsApiClient(KEY)

def get_articles_on_politicians():
    articles = []
    politicians = database["Politicians"]
    for politician in politicians.find({}):
        name = f"{politician['first']} {politician['last']}"
        print(name)
        titles = get_news_headlines(name)
        print(titles)
        articles.append({politician["person_id"]: titles})
    return articles



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