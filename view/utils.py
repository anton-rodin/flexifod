__author__ = 'Anton'

from google.appengine.api import users, memcache
from model.model import User
from time import time
import re

def get_current_user(user=None):
  if not user:
    user = users.get_current_user() # while - url: .* login: required not necessary
  if user:
    user_cache = memcache.get("user-"+user.email())
    if user_cache is None:
      user_cache = User.get_by_key_name(user.email())
      if user_cache:
      	memcache.add("user-"+user.email(), user_cache)
    return user_cache