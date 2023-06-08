from pymongo import MongoClient
client = MongoClient('mongodb+srv://shipping9916:test@shipping99.anarzzd.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

doc = {
    'name':'기성',
    'age':29
}
db.users.insert_one(doc)