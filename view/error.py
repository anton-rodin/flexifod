__author__ = 'Anton'

import webapp2
#from google.appengine.ext import webapp

class Error404(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Error 404: Page is not found')