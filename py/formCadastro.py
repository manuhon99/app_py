import pymongo
from py.dbconnect import *
from bson.json_util import dumps
from urllib.parse import unquote
import datetime


dbcollectionname = "messages"

def listCadastro():
    dbcollection = dbConnection(dbcollectionname)
    cursor = dbcollection.find().sort("timestamp", -1).limit(10)
    return dumps(cursor)
 
def saveCadastro(request):
    data = {"contact": request.args.get("contact"),
            "message": request.args.get("message"),
            "userid": request.args.get("userid"),
            "latitude": request.args.get("latitude"),
            "longitude": request.args.get("longitude"),
            "token": request.args.get("token"),
            "timestamp": datetime.datetime.utcnow()}
    print(data)
    return saveData(dbcollectionname, data)