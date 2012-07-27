__author__ = 'Anton'

import re
import md5
import webapp2
from time import time
import simplejson as json
from utils import get_current_user
from model.model import User, Bookmark
from google.appengine.api import users
from datetime import datetime, timedelta

reg = re.compile(r'\b(((\S+)?)(@|mailto\:|(news|(ht|f)tp(s?))\://)\S+)\b')
inf = 1e10000

class Feed(webapp2.RequestHandler):
  def get(self, last_feed=0):
    last_feed = int(last_feed)
    if last_feed == 0:
      last_feed = inf
    self.response.headers['Content-Type'] = 'application/json'
    user = get_current_user()
    if user:
      q = Bookmark.all().filter('user =', user) \
        .filter('changedate <', last_feed) \
        .order('-changedate').run(limit=50)
      #self.response.out.write(json.dumps({'error': True, 'error_type': 'Bad params', 'original': word}))
      self.response.out.write(json.dumps([i.to_dict() for i in q])) 
    else:
      self.response.out.write(json.dumps({'error': True, 'error_type': 'Not authorized'}))

class BookmarkHandler(webapp2.RequestHandler):     
  def delete(self, id): 
    self.response.headers['Content-Type'] = 'application/json'
    user = get_current_user()
    if user:
      bookmark = Bookmark.get_by_id(id)
      if bookmark:
        if bookmark.user == user:
          bookmark.delete()
          self.response.out.write(json.dumps({'status':'success', 'item':bookmark.to_dict()}))
          return
        else:
          self.response.out.write(json.dumps({'status':'error', 'error_type':'Not allowed'}))
      else:
        self.response.out.write(json.dumps({'status':'error', 'error_type':'Bad id'}))
    else:
      self.response.out.write(json.dumps({'status':'error', 'error_type':'Not authorized'})) 

  def put(self, id):
    self.response.headers['Content-Type'] = 'application/json'
    user = get_current_user()
    if user:
      url = self.request.get('url')
      title = self.request.get('title')
      description = self.request.get('description')
      id = int(self.request.get('id'))
      domain = reg.search(url)
      if domain:
        domain = domain.group()
        bookmark = Bookmark.get_by_id(id)
        if bookmark:
          if bookmark.user.email == user.email:
            bookmark.url=url
            bookmark.title=title
            bookmark.domain=domain
            bookmark.description=unicode(description)
            bookmark.changedate=int(time()*1000)
            bookmark.put()
            self.response.out.write(json.dumps({'status':'success', 'b':description, 'item':bookmark.to_dict()}))
          else:
            self.response.out.write(json.dumps({'status':'error', 'error_type':'Not allowed', "u1":bookmark.user.email, "u2":user.email}))
        else:
          self.response.out.write(json.dumps({'status':'error', 'error_type':'Bad id'}))
      else:
        self.response.out.write(json.dumps({'status':'error', 'error_type':'Bad link'})) 
    else:
      self.response.out.write(json.dumps({'status':'error', 'error_type':'Not authorized'})) 

class BookmarkCreate(webapp2.RequestHandler):     
  def post(self):
    self.response.headers['Content-Type'] = 'application/json'
    user = get_current_user()
    if user:
      url = self.request.get('url')
      title = self.request.get('title')
      description = self.request.get('description')
      domain = reg.search(url)
      if domain:
        domain = domain.group()
        bookmark = Bookmark(url=url, title=title, description=description, user=user, domain=domain, \
                            adddate=int(time()*1000), changedate=int(time()*1000),
                            hurl=md5.new(str(int(time()*1000))).hexdigest())
        bookmark.put()
        self.response.out.write(json.dumps({'status':'success', 'item':bookmark.to_dict()}))
        return 
      else:
        self.response.out.write(json.dumps({'status':'error', 'error_type':'Bad link'})) 
    else:
      self.response.out.write(json.dumps({'status':'error', 'error_type':'Not authorized'})) 


class GetUserInfo(webapp2.RequestHandler):
  def get(self):
    self.response.headers['Content-Type'] = 'application/json'
    user = get_current_user()
    if user:
      self.response.out.write(json.dumps(user.to_dict()))
    else:
      self.response.out.write(json.dumps({'status':'error', 'error_type':'Not authorized'})) 

