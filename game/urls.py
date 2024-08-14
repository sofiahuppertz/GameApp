from django.urls import path

from . import views

urlpatterns = [
    path("playmode/", views.playmode, name="playmode"),
    path("pong/<str:mode>/", views.pong, name="pong"),
]