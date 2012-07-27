__author__ = 'Anton Rodin anton.v.rodon@gmail.com'

from google.appengine.ext import db


class User(db.Model):
    user = db.UserProperty()
    email = db.EmailProperty()
    name = db.StringProperty(required=True)

    def to_dict(self):
       d = dict([(p, unicode(getattr(self, p))) for p in self.properties()])
       del d['user']
       d['id'] = self.key().id()
       return d
    

class Bookmark(db.Model):
    user = db.ReferenceProperty(User, collection_name="bookmarks", required=True)
    url = db.StringProperty(required=True)
    description = db.TextProperty()
    title = db.StringProperty(required=True)
    domain = db.StringProperty(required=True)
    adddate = db.IntegerProperty(required=True)
    changedate = db.IntegerProperty(required=True)
    hurl = db.StringProperty(required=True)
    
    def to_dict(self):
       d = dict([(p, unicode(getattr(self, p))) for p in self.properties()])
       del d['user']
       d['id'] = self.key().id()
       return d