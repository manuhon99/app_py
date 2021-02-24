import requests
import pymongo
from py.dbconnect import *
import datetime

dbcollectionname = "users"


def verifyFbToken(fbtoken, fbuserid):
    clientId = getConfig('fbclientId')
    clientSecret = getConfig('fbclientSecret')
    apptokenurl = ('https://graph.facebook.com/oauth/access_token?client_id='
                   + clientId + '&client_secret=' + clientSecret
                   + '&grant_type=client_credentials')
    appToken = requests.get(apptokenurl).json()['access_token']
    debugtokenurl = ('https://graph.facebook.com/v3.2/debug_token?input_token='
                     + fbtoken + '&access_token=' + str(appToken))
    userId = requests.get(debugtokenurl).json()['data']['user_id']
    print('Logged User: ' + userId)
    if userId == fbuserid:
        # profileurl = ('https://graph.facebook.com/v3.2/' + fbuserid +
        #               '?fields=first_name,last_name,profile_pic,email&access_token='
        #               + fbtoken)
        # profile = requests.get(profileurl).json()
        return userId
    return 'error'

def saveUser(request):
    data = {"login": request.args.get("login"),
            "userid": request.args.get("userid"),
            "latitude": request.args.get("latitude"),
            "longitude": request.args.get("longitude"),
            "name": request.args.get("username"),
            "email": request.args.get("useremail"),
            "token": request.args.get("token"),
            "timestamp": datetime.datetime.utcnow()}
    dbcollection = dbConnection("users")
    user = dbcollection.find_one({"userid": data["userid"]})
    if user in ('', None):
        dbuserid = dbcollection.insert_one(data).inserted_id
        return saveData(dbcollectionname, data)

    else:
        dbuserid = user["_id"]
        return saveData(dbcollectionname, data)

    return str(dbuserid)
