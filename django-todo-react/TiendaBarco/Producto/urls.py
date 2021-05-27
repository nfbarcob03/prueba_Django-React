from django.urls import path, include
from django.conf.urls import url

from . import views
from rest_framework import routers


urlpatterns = [
    url(r'^crearListarProductos/$', views.CrearListarProductos),
    url(r'^productoDetalle/(?P<pk>[0-9]+)$', views.ProductoDetalle),
]