from django.conf.urls.defaults import *

urlpatterns = patterns('massmedia.views',
    (r'type/(?P<type>[-\w]+)/$', 'list_by_type'),
    (r'collection/(?P<id>\d+)/(?P<type>[-\w]+)/$', 'list_by_collection_by_type'),
    (r'collection/(?P<id>\d+)/$', 'list_by_collection'),
    (r'widget/(?P<id>\d+)/(?P<type>[-\w]+)/$','widget'),
    ('','list'),
)
