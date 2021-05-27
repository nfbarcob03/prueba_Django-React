from django.urls import path, include
from django.conf.urls import url

from . import views
from rest_framework import routers


urlpatterns = [
    url(r'^crearListarClientes/$', views.CrearListarClientes),
    url(r'^clienteDetalle/(?P<pk>[0-9]+)$', views.ClienteDetalle),
]