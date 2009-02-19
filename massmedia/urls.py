from django.conf.urls.defaults import *

urlpatterns = patterns('massmedia.views',
    (r'type/(?P<type>[-\w]+)/$', 'list_by_type'),
    (r'collection/(?P<pk>\d+)/(?P<type>[-\w]+)/$', 'list_by_collection_by_type'),
    (r'collection/(?P<pk>\d+)/$', 'list_by_collection'),
    (r'widget/(?P<pk>\d+)/(?P<type>[-\w]+)/$', 'widget'),
    ('', 'list'),
)
