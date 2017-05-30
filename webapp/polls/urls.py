from django.conf.urls import url

from . import views

urlpatterns = [
  url(r'^get_recommendations/$', views.index, name='index'),
  url(r'^rating/$', views.rating, name='rating'),
  url(r'^', views.FrontendAppView.as_view()),
]