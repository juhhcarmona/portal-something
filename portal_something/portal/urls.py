
from django.conf.urls import include, url
from . import views
from .api import PostResource


urlpatterns = [
    url(r'api/posts/', include(PostResource.urls())),
    url(r'^$', views.index),
    url(r'list/', views.list_all),
    url(r'new/', views.new_item),
    url(r'edit/(?P<pk>[0-9]+)/$', views.edit_item),
    url(r'details/(?P<pk>[0-9]+)/$', views.list_item),
]