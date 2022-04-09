import api_key

import pymongo
import tweepy

mongo_client = pymongo.MongoClient(api_key.MONGO_STRING)
database = mongo_client["Pondo2022Database"]

politicians = database["Politicians"]

bearer_token = "AAAAAAAAAAAAAAAAAAAAAHkpbQEAAAAAXkh8flIDh1RqTgQafNfh2%2FfLWmM%3D1MhVHAqS6n1Eqgy08KZ0VyISAWUwqLcnr0E6AlK7Inkfu8lp6H"
consumer_key = "bkKiqZyBJtgebeNW1GYLmFxdi"
consumer_secret = "Ii9C95BzDcf5KefTj92tzBzFNkXgWraaUjoTY3TQOmZuSWhltf"
access_token = "928909452-r5zISsx7kBWsLkQQqUIYNos5bEhUSitS3BS8hyP4"
access_token_secret = "i4f32wD2g0R4NECNqPY2QGXkbv7pZ1GTOfYT8szU8Yiho"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)
client = tweepy.Client(bearer_token)


def grabProfilePic(username):
    """
    I: twitter handle/usename
    O: user pfp url
    """
    user = client.get_user(username=username, user_fields=["profile_image_url"])

    # prints username, id and pfp
    return(user.data.profile_image_url)

def grabTweets(username): 
    """
    I: twitter handle/username
    O: list of tweets
    """
    # returns a list of tweet ids
    user = client.get_user(username = username)
    tweets = client.get_users_tweets(id=user.data.id, exclude = "retweets", max_results = 100, tweet_fields = "public_metrics") # 100 tweets
    return tweets.data

def tweet_data(tweets):
    """
    I: list of tweets
    O: returns a list of dictionaries for each tweet
        {tweet_id, tweet_text, retweets, replies, likes, quotes, score}
    """
    res = []
    for tweet in tweets:
        tweet_id = tweet.id
        tweet_text = tweet.text
        metrics = tweet.public_metrics
        rt, replies, likes, quotes = metrics['retweet_count'], metrics['reply_count'], metrics['like_count'], metrics['quote_count']

        # cal the score of each tweet
        a, b, c = 1, 2, 3
        score = likes / (rt * a + replies * b + quotes * c)

        tweet_dict = {"id": tweet_id, 
                      "text": tweet_text, 
                      "retweets": rt, 
                      "replies" : replies, 
                      "likes": likes,
                      "quotes": quotes,
                       "score": score}
        res.append(tweet_dict)
    return res

long_list_of_tweets = grabTweets()
print("Done. Contains: ", len(long_list_of_tweets), " number of tweets")

