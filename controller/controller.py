__author__ = 'Anton Rodin'

import webapp2
import os
from view.api import Feed, BookmarkHandler, BookmarkCreate, GetUserInfo
from view.error import Error404
from view.pages import MainPage, LoginPage, PublicPage

debug = os.environ.get('SERVER_SOFTWARE', '').startswith('Dev')

app = webapp2.WSGIApplication([('/login', LoginPage),
                               ('/$', MainPage),
                               ('/app/(.*)', MainPage),
                               ('/public/(.*)', PublicPage),
                               ('/api/bookmark/feed/(\d+)', Feed),
                               ('/api/bookmark/create', BookmarkCreate),
                               ('/api/bookmark/(\d+)', BookmarkHandler),
                               ('/api/user/info', GetUserInfo),
                               ('/.*', Error404)],
                                debug=debug)