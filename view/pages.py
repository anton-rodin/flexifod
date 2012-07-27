__author__ = 'Anton'

import os
import jinja2
import webapp2
import simplejson as json
from utils import get_current_user
from model.model import User, Bookmark
from google.appengine.api import users

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')))

class MainPage(webapp2.RequestHandler):
  def get(self, dir=None):
    user = get_current_user()
    if user is None:
        self.redirect('/login')
    else:
        template = jinja_environment.get_template('main.html')
        params = {"username":user.name, "logout": users.create_logout_url('/')}
        params['header'] = { 'stream':True }
        params['dir'] = dir
        self.response.out.write(template.render(params))

class PublicPage(webapp2.RequestHandler):
  def get(self, hurl):
    template = jinja_environment.get_template('public.html')
    bookmark = Bookmark.all().filter('hurl =', hurl).get()
    params = {'title': bookmark.title, 'url': bookmark.url, 'description':bookmark.description }
    self.response.out.write(template.render(params))

class LoginPage(webapp2.RequestHandler):
    def chack_login(self):
        params = {}
        google_user = users.get_current_user()
        if google_user:
            params['google_user'] = True
        else:
            params['google_user'] = False
            params['login_url'] = users.create_login_url("/login")
        user = get_current_user(google_user)
        if user:
            params['user'] = True
        else:
            params['user'] = False
            #return self.redirect('/')
        template = jinja_environment.get_template('login.html')
        self.response.out.write(template.render(params))
    def get(self):
        self.chack_login()
    def post(self):        
        google_user = users.get_current_user()
        name = self.request.get('name')
        user = User(name=name, email=google_user.email(), user=google_user,key_name=google_user.email())
        user.put()
        settings = Settings(user=user, key_name=google_user.email())
        settings.put()
        self.chack_login()
